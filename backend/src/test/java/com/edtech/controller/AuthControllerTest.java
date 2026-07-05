package com.edtech.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.edtech.model.User;
import com.edtech.repository.UserRepository;
import com.edtech.service.JwtService;
import com.edtech.service.RecoveryService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import static org.mockito.Mockito.*;
import jakarta.servlet.http.Cookie;
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
  }

  @Autowired private UserRepository userRepository;

  @Autowired private JwtService jwtService;

  @DynamicPropertySource
  static void jwtProperties(DynamicPropertyRegistry registry) {
    registry.add("jwt.secret", () -> JWT_SECRET);
    registry.add("jwt.expiration-minutes", () -> "60");
  }
  
  @MockitoBean
  private RecoveryService recoveryService;

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
                                  "password": "%s"
                                }
                                """
                        .formatted(email, password)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isString())
        .andExpect(jsonPath("$.name").value("Ana Pesquisadora"))
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.role").value("RESEARCHER"))
        .andExpect(jsonPath("$.passwordHash").doesNotExist())
        .andExpect(jsonPath("$.password").doesNotExist());

    var user = userRepository.findByEmailIgnoreCase(email).orElseThrow();

    assertThat(user.getPasswordHash()).isNotEqualTo(password);
    assertThat(user.getPasswordHash()).startsWith("$2");
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
                                  "password": "%s"
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
                  "password": "%s"
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
  void loginReturnsHttpOnlyNoneCookieWithoutTokenInBody() throws Exception {
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
        .andExpect(header().string("Set-Cookie", org.hamcrest.Matchers.containsString("token=")))
        .andExpect(header().string("Set-Cookie", org.hamcrest.Matchers.containsString("HttpOnly")))
        .andExpect(
            header().string("Set-Cookie", org.hamcrest.Matchers.containsString("SameSite=Lax")))
        .andExpect(jsonPath("$.email").value(email))
        .andExpect(jsonPath("$.password").doesNotExist())
        .andExpect(jsonPath("$.passwordHash").doesNotExist())
        .andExpect(jsonPath("$.token").doesNotExist());
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

    Cookie cookie = loginAndGetTokenCookie(email, password);

    mockMvc
        .perform(get("/api/auth/me").cookie(cookie))
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
        .perform(get("/api/auth/me").cookie(new Cookie("token", expireDtoken)))
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
    mockMvc.perform(post("/api/auth/recovery/request")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\"}"))
           .andExpect(status().isOk());
    verify(recoveryService, times(1)).requestRecovery("test@unb.br");
  }

  @Test
  void verifyCodeValidReturnsOk() throws Exception {
    when(recoveryService.verifyCode("test@unb.br", "123456")).thenReturn(true);
    mockMvc.perform(post("/api/auth/recovery/verify")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\"}"))
           .andExpect(status().isOk());
  }

  @Test
  void verifyCodeInvalidReturnsBadRequest() throws Exception {
    when(recoveryService.verifyCode("test@unb.br", "123456")).thenReturn(false);
    mockMvc.perform(post("/api/auth/recovery/verify")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\"}"))
           .andExpect(status().isBadRequest());
  }

  @Test
  void resetPasswordValidReturnsOk() throws Exception {
    when(recoveryService.resetPassword("test@unb.br", "123456", "newpass")).thenReturn(true);
    mockMvc.perform(post("/api/auth/recovery/reset")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\", \"newPassword\":\"newpass\"}"))
           .andExpect(status().isOk());
  }

  @Test
  void resetPasswordInvalidReturnsBadRequest() throws Exception {
    when(recoveryService.resetPassword("test@unb.br", "123456", "newpass")).thenReturn(false);
    mockMvc.perform(post("/api/auth/recovery/reset")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"test@unb.br\", \"code\":\"123456\", \"newPassword\":\"newpass\"}"))
           .andExpect(status().isBadRequest());
  }

  @Test
  void logoutClearsCookie() throws Exception {
    String email = uniqueEmail("logout");
    String password = randomPassword();
    registerUser(email, password);
    Cookie cookie = loginAndGetTokenCookie(email, password);

    mockMvc.perform(post("/api/auth/logout").with(csrf()).cookie(cookie))
           .andExpect(status().isOk())
           .andExpect(header().string("Set-Cookie", org.hamcrest.Matchers.containsString("Max-Age=0")));
  }

  private void registerUser(String email, String password) throws Exception {
    mockMvc
        .perform(
            post("/api/auth/register")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerPayload(email, password)))
        .andExpect(status().isCreated());
  }

  private Cookie loginAndGetTokenCookie(String email, String password) throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/api/auth/login")
                    .with(csrf())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(loginPayload(email, password)))
            .andExpect(status().isOk())
            .andReturn();

    Cookie cookie = result.getResponse().getCookie("token");
    assertThat(cookie).isNotNull();
    assertThat(cookie.isHttpOnly()).isTrue();
    assertThat(cookie.getPath()).isEqualTo("/");
    return cookie;
  }

  private String registerPayload(String email, String password) {
    return """
                {
                  "name": "Usuario Teste",
                  "email": "%s",
                  "password": "%s"
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
}
