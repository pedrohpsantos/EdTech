package br.com.unb.edtech.controller;

import br.com.unb.edtech.dto.RegisterDto;
import br.com.unb.edtech.model.User;
import br.com.unb.edtech.service.JwtService;
import br.com.unb.edtech.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private JwtService jwtService;

    @Test
    void register_WithValidData_MustReturn201Created() throws Exception {
        RegisterDto dto = new RegisterDto("link", "link@unb.br", "ItDangerous2GoAl0ne!");
        User mockUser = User.builder().id(1L).email("link@unb.br").build();

        Mockito.when(userService.register(dto)).thenReturn(mockUser);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                        .andExpect(status().isCreated());

    }

    @Test
    void register_WithInvalidEmail_MustReturn400BadRequest() throws Exception {
        RegisterDto dto = new RegisterDto("link", "link@hyrule.br", "ItDangerous2GoAl0ne!");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                        .andExpect(status().isBadRequest());
    }

    @Test
    void login_WithCorrectCredentials_MustReturn200AndCookie() throws Exception {
        String loginJson = "{\"email\":\"link@unb.br\",\"password\":\"correct\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(cookie().exists("token"))
                .andExpect(cookie().httpOnly("token", true));
    }

    @Test
    void login_WithWrongPassword_MustReturn401Unauthorized() throws Exception {
        String loginJson = "{\"email\":\"link@unb.br\",\"password\":\"wrong\"}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void me_WithoutCookie_MustReturn401Unauthorized() throws Exception {
        mockMvc.perform((get("/api/auth/me")))
                .andExpect(status().isUnauthorized());
    }
}
