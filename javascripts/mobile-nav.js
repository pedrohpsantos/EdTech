document.addEventListener("DOMContentLoaded", function() {
  // Execute only on mobile devices (drawer menu is active)
  function initMobileNav() {
    if (window.innerWidth >= 1220) return; // MkDocs Material breakpoint for desktop is usually 1220px

    const navLinks = document.querySelectorAll(".md-nav__link");

    navLinks.forEach(function(link) {
      // Check if this link has a sibling label with a toggle (which means it's a section header)
      const parentLi = link.closest("li.md-nav__item--nested");
      if (parentLi) {
        // In some setups, the link itself wraps the title. We just want to prevent default navigation 
        // and instead toggle the associated checkbox.
        link.addEventListener("click", function(e) {
          // If the user clicks exactly on the text of a section header in the drawer
          // and it has an associated checkbox for expansion:
          const checkbox = parentLi.querySelector('input[type="checkbox"].md-nav__toggle');
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
