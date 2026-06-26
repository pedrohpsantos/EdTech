document.addEventListener("DOMContentLoaded", function() {
  // Execute only on mobile devices (drawer menu is active)
  function initMobileNav() {
    if (window.innerWidth >= 1220) return; // MkDocs Material breakpoint for desktop is usually 1220px

    const navLinks = document.querySelectorAll(".md-nav__link");

    navLinks.forEach(function(link) {
      const parentLi = link.closest("li.md-nav__item--nested");
      if (parentLi) {
        link.addEventListener("click", function(e) {
          // Verifica se o link clicado está dentro do <nav> interno deste parentLi
          // Se estiver, é um link filho/página normal e DEVE navegar
          const innerNav = parentLi.querySelector(':scope > nav');
          if (innerNav && innerNav.contains(link)) {
            return; // Permite a navegação normal
          }
          
          // Caso contrário, é o link principal da categoria. Bloqueamos navegação e abrimos a sanfona.
          const checkbox = parentLi.querySelector(':scope > input[type="checkbox"].md-nav__toggle');
          if (checkbox) {
            e.preventDefault(); // Stop navigation
            checkbox.checked = !checkbox.checked; // Toggle the accordion
          }
        });
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
