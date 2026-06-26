document.addEventListener("DOMContentLoaded", function() {
  // Execute only on mobile devices (drawer menu is active)
  function initMobileNav() {
    if (window.innerWidth >= 1220) return; // MkDocs Material breakpoint for desktop is usually 1220px

    const navLinks = document.querySelectorAll(".md-nav__link");

    navLinks.forEach(function(link) {
      // Queremos interceptar APENAS as tags <a> que agem como título de categoria
      // No MkDocs Material, quando tem index, elas ficam dentro de uma div.md-nav__container
      if (link.tagName.toLowerCase() === 'a') {
        const container = link.closest('.md-nav__container');
        if (container) {
          // O link é direto filho do container (título da categoria)
          // Impede a navegação e clica na setinha (label) para abrir a sanfona nativamente
          link.addEventListener("click", function(e) {
            e.preventDefault();
            const label = container.querySelector('label.md-nav__icon');
            if (label) {
              label.click();
            }
          });
        }
      }
    });
  }

  // Run on initial load
  initMobileNav();

  // Material MkDocs uses instant loading, so we must re-init after page transitions
  document.addEventListener("DOMContentSwitch", function() {
    initMobileNav();
  });
});
