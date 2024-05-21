fetch("./header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html; //dentro del argumento del getElementById debe ir el id del div donde quieremos que se inserte lo que estamos fetching
    // Agregar clase 'active' al enlace correspondiente
    let currentPath = window.location.pathname;
    document.querySelectorAll("#header-container .nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPath) {
        link.classList.add("active");
      }
    });
  });

fetch("./footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer-container").innerHTML = html; //dentro del argumento del getElementById debe ir el id del div donde quieremos que se inserte lo que estamos fetching
  });
