---
title: 'API Reference (Swagger)'
---

# :material-api: API Reference (Swagger)

<div id="swagger-ui"></div>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
<script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
<script>
  function renderSwagger() {
    var container = document.getElementById('swagger-ui');
    if (container && typeof SwaggerUIBundle !== 'undefined') {
      window.ui = SwaggerUIBundle({
        url: "../../assets/openapi.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function() {
      if (typeof SwaggerUIBundle === 'undefined') {
        var script = document.querySelector('script[src*="swagger-ui-bundle"]');
        if (script) script.addEventListener('load', renderSwagger);
      } else {
        setTimeout(renderSwagger, 100);
      }
    });
  } else {
    window.addEventListener('DOMContentLoaded', renderSwagger);
  }
</script>


## Histórico de Versões

| Versão | Data | Descrição | Autor |
|--------|------|-----------|-------|
| 1.0 | 28/06/2026 | Criação e estruturação do documento | Pedro Henrique P. Santos |



