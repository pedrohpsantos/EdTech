# DESIGN SYSTEM - EdTech

## 1. Sistema de Cores

### Primárias
| Nome        | HEX     | RGB         |
| ----------- | ------- | ----------- |
| Primary 700 | #4A148C | 74 20 140   |
| Primary 500 | #6A1B9A | 106 27 154  |
| Primary 400 | #7C4DFF | 124 77 255  |
| Primary 200 | #D1C4E9 | 209 196 233 |

### Destaque
| Nome       | HEX     |
| ---------- | ------- |
| Accent 600 | #FF6D00 |
| Accent 500 | #FF9100 |
| Accent 100 | #FFE0B2 |

### Light Theme
| Nome           | HEX     |
| -------------- | ------- |
| Background     | #F7F7FB |
| Surface        | #FFFFFF |
| Border         | #E6E1F0 |
| Text Primary   | #1F1630 |
| Text Secondary | #5F5670 |

### Dark Theme
| Nome             | HEX     |
| ---------------- | ------- |
| Background       | #0F0B1A |
| Surface          | #171124 |
| Surface Elevated | #211935 |
| Border           | #352A52 |
| Text Primary     | #F5F2FF |
| Text Secondary   | #B9B1CC |

### Semânticas
| Tipo    | HEX     |
| ------- | ------- |
| Success | #2E7D32 |
| Warning | #ED6C02 |
| Error   | #D32F2F |
| Info    | #0288D1 |

## 2. Tipografia

### Principal
**Plus Jakarta Sans**
Uso: Títulos, Navegação, Botões, Formulários, Texto.
*(Alternativas: Inter, Manrope, Source Sans 3)*

### Técnica
**JetBrains Mono**
Uso: Logs, IDs, Hashes, Auditoria, Timestamps.
*(Alternativas: IBM Plex Mono, Fira Code)*

## 3. Variáveis e Tokens

### Grid
`8px Base Grid`

### Border Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 14px;
--radius-xl: 20px;
--radius-pill: 999px;
```

### Shadows
```css
--shadow-sm: 0 4px 12px rgba(74,20,140,.08);
--shadow-md: 0 12px 30px rgba(74,20,140,.12);
--shadow-lg: 0 18px 42px rgba(74,20,140,.16);
```

### Motion
```css
--fast: 120ms;
--base: 180ms;
--slow: 260ms;
--easing: cubic-bezier(0.4, 0, 0.2, 1);
```
