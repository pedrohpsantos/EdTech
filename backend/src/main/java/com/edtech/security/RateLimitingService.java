package com.edtech.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

/** Serviço de rate limiting baseado no algoritmo Token Bucket (Bucket4j). */
@Service
public class RateLimitingService {

  private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

  /** Retorna o bucket associado ao IP fornecido, criando um novo se necessário. */
  public Bucket resolveBucket(String key) {
    return cache.computeIfAbsent(key, this::newBucket);
  }

  private Bucket newBucket(String key) {
    // 5 requisições por minuto por IP
    Bandwidth limit =
        Bandwidth.builder().capacity(5).refillIntervally(5, Duration.ofMinutes(1)).build();
    return Bucket.builder().addLimit(limit).build();
  }
}
