---
title: API Reference (Swagger)
hide:
  - navigation
  - toc
---

# API Reference (Swagger)

<div id="redoc-container"></div>

<script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
<script>
  function renderRedoc() {
    var container = document.getElementById('redoc-container');
    if (container && typeof Redoc !== 'undefined') {
      Redoc.init('../../assets/openapi.json', {
        theme: {
          colors: { primary: { main: '#6200ea' } },
          typography: { fontFamily: 'Inter, sans-serif' }
        }
      }, container);
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function() {
      if (typeof Redoc === 'undefined') {
        var script = document.querySelector('script[src*="redoc"]');
        if (script) script.addEventListener('load', renderRedoc);
      } else {
        // Redoc already loaded, but we need a slight delay to ensure DOM is ready
        setTimeout(renderRedoc, 100);
      }
    });
  } else {
    window.addEventListener('DOMContentLoaded', renderRedoc);
  }
</script>


## Histórico de Versão

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 28/06/2026 | Criação e estruturação do documento | Pedro Henrique P. Santos |
