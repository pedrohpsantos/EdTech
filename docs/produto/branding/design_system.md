# :material-palette-swatch: Design System

Nosso Design System é construído para transmitir segurança, tecnologia e sofisticação.

## 1. Sistema de Cores

A assinatura visual do produto é **Deep Purple** com contrastes em **Amber**.

###  Cores Primárias (Deep Purple)

<div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #4A148C; border-radius: 12px; margin-bottom: 8px;"></div><b>Primary 700</b><br/><code>#4A148C</code></div>
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #6A1B9A; border-radius: 12px; margin-bottom: 8px;"></div><b>Primary 500</b><br/><code>#6A1B9A</code></div>
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #7C4DFF; border-radius: 12px; margin-bottom: 8px;"></div><b>Primary 400</b><br/><code>#7C4DFF</code></div>
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #D1C4E9; border-radius: 12px; margin-bottom: 8px; border: 1px solid #ddd;"></div><b>Primary 200</b><br/><code>#D1C4E9</code></div>
</div>

###  Cores de Destaque (Amber)

<div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;">
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #FF6D00; border-radius: 12px; margin-bottom: 8px;"></div><b>Accent 600</b><br/><code>#FF6D00</code></div>
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #FF9100; border-radius: 12px; margin-bottom: 8px;"></div><b>Accent 500</b><br/><code>#FF9100</code></div>
  <div style="text-align: center;"><div style="width: 80px; height: 80px; background-color: #FFE0B2; border-radius: 12px; margin-bottom: 8px; border: 1px solid #ddd;"></div><b>Accent 100</b><br/><code>#FFE0B2</code></div>
</div>

###  Temas (Background & Surfaces)

=== "Light Theme"
    Ideal para leitura de documentos e painéis claros.

    
    * **Background:** `<div style="display:inline-block; width:15px; height:15px; background:#F7F7FB; border:1px solid #ccc; border-radius:3px; vertical-align:middle;"></div> #F7F7FB`
    * **Surface:** `<div style="display:inline-block; width:15px; height:15px; background:#FFFFFF; border:1px solid #ccc; border-radius:3px; vertical-align:middle;"></div> #FFFFFF`
    * **Border:** `<div style="display:inline-block; width:15px; height:15px; background:#E6E1F0; border-radius:3px; vertical-align:middle;"></div> #E6E1F0`
    * **Text Primary:** `<div style="display:inline-block; width:15px; height:15px; background:#1F1630; border-radius:3px; vertical-align:middle;"></div> #1F1630`
    * **Text Secondary:** `<div style="display:inline-block; width:15px; height:15px; background:#5F5670; border-radius:3px; vertical-align:middle;"></div> #5F5670`

=== "Dark Theme"
    Para foco profundo, logs técnicos e dashboards.

    
    * **Background:** `<div style="display:inline-block; width:15px; height:15px; background:#0F0B1A; border-radius:3px; vertical-align:middle;"></div> #0F0B1A`
    * **Surface:** `<div style="display:inline-block; width:15px; height:15px; background:#171124; border-radius:3px; vertical-align:middle;"></div> #171124`
    * **Surface Elevated:** `<div style="display:inline-block; width:15px; height:15px; background:#211935; border-radius:3px; vertical-align:middle;"></div> #211935`
    * **Border:** `<div style="display:inline-block; width:15px; height:15px; background:#352A52; border-radius:3px; vertical-align:middle;"></div> #352A52`
    * **Text Primary:** `<div style="display:inline-block; width:15px; height:15px; background:#F5F2FF; border-radius:3px; vertical-align:middle;"></div> #F5F2FF`
    * **Text Secondary:** `<div style="display:inline-block; width:15px; height:15px; background:#B9B1CC; border-radius:3px; vertical-align:middle;"></div> #B9B1CC`

---

## 2. Tipografia

A tipografia é essencial para equilibrar o design moderno com a densidade técnica da plataforma.

!!! info "Plus Jakarta Sans — Principal"
    Usada na navegação, botões, títulos e corpos de texto de interface.
    Oferece excelente legibilidade geométrica e tom premium.

!!! tip "JetBrains Mono — Técnica"
    Usada para exibição de *hashes*, logs, timestamps e código.
    Muda instantaneamente o humor de "conteúdo de marketing" para "ferramenta técnica".

---

## 3. Variáveis e Tokens

###  Grid
```css
/* Base Grid de 8px para consistência absoluta */
--spacing-1: 8px;
--spacing-2: 16px;
--spacing-3: 24px;
```

###  Border Radius
```css
--radius-sm: 8px;      /* Cards pequenos e botões */
--radius-md: 12px;     /* Modais e containers médios */
--radius-lg: 14px;     /* Paineis grandes */
--radius-xl: 20px;     /* Elementos destacados */
--radius-pill: 999px;  /* Badges e Tags */
```

###  Shadows
Sombras sutis tingidas com o **Deep Purple** para evitar o aspecto "sujo" de sombras pretas tradicionais.

```css
--shadow-sm: 0 4px 12px rgba(74,20,140,.08);
--shadow-md: 0 12px 30px rgba(74,20,140,.12);
--shadow-lg: 0 18px 42px rgba(74,20,140,.16);
```

---

## Histórico de Versões

| Versão | Data | Descrição | Autor |
| :---: | :---: | :--- | :--- |
| `1.0` | 09/06/2026 | Documentação do Design System e Tokens | Pedro Henrique P. Santos |
| `1.1` | 13/06/2026 | Revisão técnica e reestruturação da documentação | Pedro Henrique P. Santos |

