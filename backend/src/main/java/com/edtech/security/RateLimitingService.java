package com.edtech.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import java.time.Duration;
import org.springframework.stereotype.Service;

/** Serviço de rate limiting baseado no algoritmo Token Bucket (Bucket4j). */
@Service
public class RateLimitingService {

  private final Cache<String, Bucket> cache =
      Caffeine.newBuilder().maximumSize(10_000).expireAfterWrite(Duration.ofMinutes(5)).build();

  /** Retorna o bucket associado à chave fornecida, criando um novo se necessário. */
  public Bucket resolveBucket(String key) {
    return cache.get(key, this::newBucket);
  }

  private Bucket newBucket(String key) {
    Bandwidth limit =
        Bandwidth.builder().capacity(5).refillIntervally(5, Duration.ofMinutes(1)).build();
    return Bucket.builder().addLimit(limit).build();
  }
}
