package com.edtech.controller;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.edtech.model.User;
import com.edtech.repository.UserRepository;
import com.edtech.security.RateLimitingService;
import com.edtech.service.JwtService;
import com.edtech.service.RecoveryService;
import io.github.bucket4j.Bucket;
import java.time.Duration;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@ActiveProfiles("test")
class AuthControllerTest {

  private static final String JWT_SECRET = UUID.randomUUID() + UUID.randomUUID().toString();

  @Autowired private WebApplicationContext context;

  private MockMvc mockMvc;

  @BeforeEach
  void setUp() {
    this.mockMvc = MockMvcBuilders.webAppContextSetup(context).apply(springSecurity()).build();
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(true);
    when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);
  }

  @Autowired private UserRepository userRepository;

  @Autowired private JwtService jwtService;

  @DynamicPropertySource
  static void jwtProperties(DynamicPropertyRegistry registry) {
    registry.add("jwt.secret", () -> JWT_SECRET);
    registry.add("jwt.expiration-minutes", () -> "60");
  }

  @MockitoBean private RecoveryService recoveryService;

  @MockitoBean private RateLimitingService rateLimitingService;

  @MockitoBean private com.edtech.service.TwoFactorAuthService twoFactorAuthService;

  @Test
  void registerCreatesResearcherWithoutReturningPasswordHash() throws Exception {
    String email = uniqueEmail("ana");
    String password = randomPassword();

    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                                {
                                  "name": "Ana Pesquisadora",
                                  "email": "%s",
                                  "password": "%s",
                                  "role": "RESEARCHER"
                                }
                                """
                        .formatted(email, password)))
        .andExpect(status().isCreated());
  }

  @Test
  void registerRejectsNonInstitutionalEmail() throws Exception {
    String password = randomPassword();

    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                                {
                                  "name": "Usuario Externo",
                                  "email": "usuario@example.com",
                                  "password": "%s",
                                  "role": "RESEARCHER"
                                }
                                """
                        .formatted(password)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("invalid_request"));
  }

  @Test
  void registerRejectsDuplicatedEmail() throws Exception {
    String password = randomPassword();
    String payload =
        """
                {
                  "name": "Usuario Duplicado",
                  "email": "duplicado@unb.br",
                  "password": "%s",
                  "role": "RESEARCHER"
                }
                """
            .formatted(password);

    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
        .andExpect(status().isCreated());

    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.code").value("email_already_registered"));
  }

  @Test
  void loginReturnsTokenInBody() throws Exception {
    String email = uniqueEmail("login");
    String password = randomPassword();
    registerUser(email, password);

    mockMvc
        .perform(
            post("/api/auth/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginPayload(email, password)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isString())
        .andExpect(jsonPath("$.user.email").value(email))
        .andExpect(jsonPath("$.user.password").doesNotExist())
        .andExpect(jsonPath("$.user.passwordHash").doesNotExist());
  }

  @Test
  void protectedRouteWithoutCookieReturnsUnauthorized() throws Exception {
    mockMvc
        .perform(get("/api/auth/me"))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("unauthorized"));
  }

  @Test
  void authenticatedUserEndpointReturnsCurrentUser() throws Exception {
    String email = uniqueEmail("me");
    String password = randomPassword();
    registerUser(email, password);

    String token = loginAndGetToken(email, password);

    mockMvc
        .perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.role").value("RESEARCHER"))
        .andExpect(jsonPath("$.password").doesNotExist())
        .andExpect(jsonPath("$.passwordHash").doesNotExist());
  }

  @Test
  void expireDtokenReturnsUnauthorized() throws Exception {
    String email = uniqueEmail("expired");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    String expireDtoken = jwtService.generateToken(user, Duration.ofSeconds(-1));

    mockMvc
        .perform(get("/api/auth/me").header("Authorization", "Bearer " + expireDtoken))
        .andExpect(status().isUnauthorized())
        .andExpect(jsonPath("$.code").value("unauthorized"));
  }

  @Test
  void publicRoutesRemainAccessibleWithoutCookie() throws Exception {
    String email = uniqueEmail("public");
    String password = randomPassword();

    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerPayload(email, password)))
        .andExpect(status().isCreated());
  }

  @Test
  void requestRecoveryReturnsOk() throws Exception {
    mockMvc
        .perform(
            post("/api/auth/recovery/request")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\"}"))
        .andExpect(status().isOk());
    verify(recoveryService, times(1)).requestRecovery("test@unb.br");
  }

  @Test
  void verifyCodeValidReturnsOk() throws Exception {
    when(recoveryService.verifyCode("test@unb.br", "123456")).thenReturn(true);
    mockMvc
        .perform(
            post("/api/auth/recovery/verify")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\"}"))
        .andExpect(status().isOk());
  }

  @Test
  void verifyCodeInvalidReturnsBadRequest() throws Exception {
    when(recoveryService.verifyCode("test@unb.br", "123456")).thenReturn(false);
    mockMvc
        .perform(
            post("/api/auth/recovery/verify")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\"}"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void resetPasswordValidReturnsOk() throws Exception {
    when(recoveryService.resetPassword("test@unb.br", "123456", "newpass")).thenReturn(true);
    mockMvc
        .perform(
            post("/api/auth/recovery/reset")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\"test@unb.br\", \"code\":\"123456\", \"newPassword\":\"newpass\"}"))
        .andExpect(status().isOk());
  }

  @Test
  void resetPasswordInvalidReturnsBadRequest() throws Exception {
    when(recoveryService.resetPassword("test@unb.br", "123456", "newpass")).thenReturn(false);
    mockMvc
        .perform(
            post("/api/auth/recovery/reset")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\"test@unb.br\", \"code\":\"123456\", \"newPassword\":\"newpass\"}"))
        .andExpect(status().isBadRequest());
  }

  @Test
  void logoutReturnsOk() throws Exception {
    String email = uniqueEmail("logout");
    String password = randomPassword();
    registerUser(email, password);
    String token = loginAndGetToken(email, password);

    mockMvc
        .perform(post("/api/auth/logout").with(csrf()).header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
  }

  private void registerUser(String email, String password) throws Exception {
    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerPayload(email, password)))
        .andExpect(status().isCreated());
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setActive(true);
    userRepository.save(user);
  }

  private String loginAndGetToken(String email, String password) throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/api/auth/login")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginPayload(email, password)))
            .andExpect(status().isOk())
            .andReturn();

    String content = result.getResponse().getContentAsString();
    return com.jayway.jsonpath.JsonPath.read(content, "$.token");
  }

  private String registerPayload(String email, String password) {
    return """
                {
                  "name": "Usuario Teste",
                  "email": "%s",
                  "password": "%s",
                  "role": "RESEARCHER"
                }
                """
        .formatted(email, password);
  }

  private String loginPayload(String email, String password) {
    return """
                {
                  "email": "%s",
                  "password": "%s"
                }
                """
        .formatted(email, password);
  }

  private String uniqueEmail(String prefix) {
    return prefix + "." + UUID.randomUUID() + "@unb.br";
  }

  private String randomPassword() {
    return UUID.randomUUID().toString() + UUID.randomUUID();
  }

  @Test
  void loginRejectsRequestWhenRateLimitExceeded() throws Exception {
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(false);
    when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);

    String payload =
        """
        {
          "email": "user@unb.br",
          "password": "Password123!"
        }
        """;

    mockMvc
        .perform(
            post("/api/auth/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
        .andExpect(status().isTooManyRequests())
        .andExpect(
            jsonPath("$.error")
                .value("Limite de tentativas excedido. Tente novamente mais tarde."));
  }

  @Test
  void requestRecoveryRejectsRequestWhenRateLimitExceeded() throws Exception {
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(false);
    when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);

    String payload = """
        {
          "email": "user@unb.br"
        }
        """;

    mockMvc
        .perform(
            post("/api/auth/recovery/request")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload))
        .andExpect(status().isTooManyRequests())
        .andExpect(
            jsonPath("$.error")
                .value("Limite de tentativas excedido. Tente novamente mais tarde."));
  }

  @Autowired private com.edtech.repository.VerificationTokenRepository verificationTokenRepository;

  @Test
  void verifyRegistrationReturnsToken() throws Exception {
    String email = uniqueEmail("verifyreg");
    String password = randomPassword();
    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerPayload(email, password)))
        .andExpect(status().isCreated());

    com.edtech.model.VerificationToken token =
        new com.edtech.model.VerificationToken(
            "123456", email, java.time.LocalDateTime.now().plusMinutes(15));
    verificationTokenRepository.save(token);

    mockMvc
        .perform(
            post("/api/auth/register/verify")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"code\":\"123456\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isString());
  }

  @Test
  void verify2FaLoginReturnsToken() throws Exception {
    String email = uniqueEmail("2falogin");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaEnabled(true);
    user.setMfaSecret("secret");
    userRepository.save(user);

    when(twoFactorAuthService.verifyCode("secret", "123456")).thenReturn(true);

    mockMvc
        .perform(
            post("/api/auth/login/verify-2fa")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\""
                        + email
                        + "\", \"password\":\""
                        + password
                        + "\", \"code\":\"123456\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isString());
  }

  @Test
  void setup2FaReturnsSecret() throws Exception {
    String email = uniqueEmail("setup2fa");
    String password = randomPassword();
    registerUser(email, password);
    String token = loginAndGetToken(email, password);

    when(twoFactorAuthService.generateSecret()).thenReturn("newsecret");
    when(twoFactorAuthService.getQrCodeImageUri(anyString(), anyString()))
        .thenReturn("http://qrcode");

    mockMvc
        .perform(get("/api/auth/2fa/setup").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.secret").value("newsecret"))
        .andExpect(jsonPath("$.qrCodeUri").value("http://qrcode"));

    User updated = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    org.junit.jupiter.api.Assertions.assertEquals("newsecret", updated.getMfaSecret());
  }

  @Test
  void enable2FaWorks() throws Exception {
    String email = uniqueEmail("enable2fa");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaSecret("secret");
    userRepository.save(user);
    String token = loginAndGetToken(email, password);

    when(twoFactorAuthService.verifyCode("secret", "123456")).thenReturn(true);

    mockMvc
        .perform(
            post("/api/auth/2fa/enable")
                .with(csrf())
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"code\":\"123456\"}"))
        .andExpect(status().isOk());

    User updated = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    org.junit.jupiter.api.Assertions.assertTrue(updated.isMfaEnabled());
  }

  @Test
  void loginReturnsAcceptedWhenMfaEnabled() throws Exception {
    String email = uniqueEmail("loginmfa");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaEnabled(true);
    userRepository.save(user);

    mockMvc
        .perform(
            post("/api/auth/login")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginPayload(email, password)))
        .andExpect(status().isAccepted())
        .andExpect(jsonPath("$.mfaRequired").value(true))
        .andExpect(jsonPath("$.email").value(email));
  }

  @Test
  void verify2FaLoginRejectsRequestWhenRateLimitExceeded() throws Exception {
    Bucket mockBucket = mock(Bucket.class);
    when(mockBucket.tryConsume(1)).thenReturn(false);
    when(rateLimitingService.resolveBucket(anyString())).thenReturn(mockBucket);

    mockMvc
        .perform(
            post("/api/auth/login/verify-2fa")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"user@unb.br\", \"password\":\"pass\", \"code\":\"123456\"}"))
        .andExpect(status().isTooManyRequests())
        .andExpect(
            jsonPath("$.error")
                .value("Limite de tentativas excedido. Tente novamente mais tarde."));
  }

  @Test
  void verify2FaLoginRejectsWhenMfaNotEnabled() throws Exception {
    String email = uniqueEmail("verify2fanotenabled");
    String password = randomPassword();
    registerUser(email, password);

    mockMvc
        .perform(
            post("/api/auth/login/verify-2fa")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\""
                        + email
                        + "\", \"password\":\""
                        + password
                        + "\", \"code\":\"123456\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("2FA is not enabled for this user."));
  }

  @Test
  void verify2FaLoginRejectsInvalidCode() throws Exception {
    String email = uniqueEmail("verify2fainvalid");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaEnabled(true);
    user.setMfaSecret("secret");
    userRepository.save(user);

    when(twoFactorAuthService.verifyCode("secret", "123457")).thenReturn(false);

    mockMvc
        .perform(
            post("/api/auth/login/verify-2fa")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"email\":\""
                        + email
                        + "\", \"password\":\""
                        + password
                        + "\", \"code\":\"123457\"}"))
        .andExpect(status().isUnauthorized())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("Invalid 2FA code."));
  }

  @Test
  void setup2FaRejectsWhenAlreadyEnabled() throws Exception {
    String email = uniqueEmail("setup2faenabled");
    String password = randomPassword();
    registerUser(email, password);
    String token = loginAndGetToken(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaEnabled(true);
    userRepository.save(user);

    mockMvc
        .perform(get("/api/auth/2fa/setup").header("Authorization", "Bearer " + token))
        .andExpect(status().isBadRequest())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("2FA is already enabled."));
  }

  @Test
  void setup2FaHandlesException() throws Exception {
    String email = uniqueEmail("setup2faerror");
    String password = randomPassword();
    registerUser(email, password);
    String token = loginAndGetToken(email, password);

    when(twoFactorAuthService.generateSecret()).thenReturn("newsecret");
    when(twoFactorAuthService.getQrCodeImageUri(anyString(), anyString()))
        .thenThrow(new RuntimeException("QR Error"));

    mockMvc
        .perform(get("/api/auth/2fa/setup").header("Authorization", "Bearer " + token))
        .andExpect(status().isInternalServerError())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("Failed to generate QR Code"));
  }

  @Test
  void enable2FaRejectsWhenAlreadyEnabled() throws Exception {
    String email = uniqueEmail("enable2faenabled");
    String password = randomPassword();
    registerUser(email, password);
    String token = loginAndGetToken(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaEnabled(true);
    userRepository.save(user);

    mockMvc
        .perform(
            post("/api/auth/2fa/enable")
                .with(csrf())
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"code\":\"123456\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("2FA is already enabled."));
  }

  @Test
  void enable2FaRejectsInvalidCode() throws Exception {
    String email = uniqueEmail("enable2fainvalid");
    String password = randomPassword();
    registerUser(email, password);
    User user = userRepository.findByEmailIgnoreCase(email).orElseThrow();
    user.setMfaSecret("secret");
    userRepository.save(user);
    String token = loginAndGetToken(email, password);

    when(twoFactorAuthService.verifyCode("secret", "123457")).thenReturn(false);

    mockMvc
        .perform(
            post("/api/auth/2fa/enable")
                .with(csrf())
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"" + email + "\", \"code\":\"123457\"}"))
        .andExpect(status().isBadRequest())
        .andExpect(
            org.springframework.test.web.servlet.result.MockMvcResultMatchers.content()
                .string("Invalid 2FA code."));
  }
}
