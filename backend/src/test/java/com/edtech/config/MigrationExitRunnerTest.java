package com.edtech.config;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

class MigrationExitRunnerTest {

  @Test
  void testRunWithServlet() {
    MigrationExitRunner runner = new MigrationExitRunner();
    ReflectionTestUtils.setField(runner, "webAppType", "servlet");

    // Should do nothing and not exit
    assertDoesNotThrow(() -> runner.run());
  }

  // We do not test "none" because it calls System.exit(0), which kills the test
  // runner JVM.
}
