package com.edtech.config;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.edtech.model.User;
import com.edtech.repository.ProjectMemberRepository;
import com.edtech.repository.ProjectRepository;
import com.edtech.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class DatabaseSeederTest {

  @Mock private UserRepository userRepository;
  @Mock private ProjectRepository projectRepository;
  @Mock private ProjectMemberRepository projectMemberRepository;
  @Mock private PasswordEncoder passwordEncoder;

  @InjectMocks private DatabaseSeeder databaseSeeder;

  @Test
  void testRunWhenDatabaseIsEmpty() {
    when(passwordEncoder.encode(anyString())).thenReturn("hashed-password");
    when(userRepository.findByEmailIgnoreCase(anyString())).thenReturn(Optional.empty());
    when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));
    when(projectRepository.count()).thenReturn(0L);

    databaseSeeder.run();

    // 3 users should be saved
    verify(userRepository, times(3)).save(any(User.class));
    // 3 projects should be saved
    verify(projectRepository, times(3)).save(any(com.edtech.model.Project.class));
    verify(projectMemberRepository, times(6)).save(any(com.edtech.model.ProjectMember.class));
  }

  @Test
  void testRunWhenDatabaseIsPopulated() {
    when(passwordEncoder.encode(anyString())).thenReturn("hashed-password");
    // Return a dummy user so it doesn't create new ones
    when(userRepository.findByEmailIgnoreCase(anyString()))
        .thenReturn(Optional.of(mock(User.class)));
    when(projectRepository.count()).thenReturn(3L);

    databaseSeeder.run();

    // No new users or projects should be saved
    verify(userRepository, never()).save(any(User.class));
    verify(projectRepository, never()).save(any(com.edtech.model.Project.class));
  }
}
