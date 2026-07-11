package com.edtech.security;

import static org.assertj.core.api.Assertions.assertThat;

import io.github.bucket4j.Bucket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class RateLimitingServiceTest {

  private RateLimitingService rateLimitingService;

  @BeforeEach
  void setUp() {
    rateLimitingService = new RateLimitingService();
  }

  @Test
  void shouldCreateNewBucketForNewIp() {
    Bucket bucket = rateLimitingService.resolveBucket("192.168.0.1");
    assertThat(bucket).isNotNull();
    // A new bucket has 5 tokens available initially
    assertThat(bucket.tryConsume(1)).isTrue();
  }

  @Test
  void shouldReturnSameBucketForSameIp() {
    Bucket bucket1 = rateLimitingService.resolveBucket("192.168.0.2");
    Bucket bucket2 = rateLimitingService.resolveBucket("192.168.0.2");
    assertThat(bucket1).isSameAs(bucket2);
  }

  @Test
  void shouldLimitRequestsWhenCapacityExceeded() {
    Bucket bucket = rateLimitingService.resolveBucket("192.168.0.3");

    // Consume 5 tokens
    for (int i = 0; i < 5; i++) {
      assertThat(bucket.tryConsume(1)).isTrue();
    }

    // The 6th token should fail
    assertThat(bucket.tryConsume(1)).isFalse();
  }
}
