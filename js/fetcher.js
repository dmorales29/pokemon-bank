fetch('./header.html')
.then(response => response.text())
.then(html => {
  document.getElementById('header-container').innerHTML =html; //dentro del argumento del getElementById debe ir el id del div donde quieremos que se inserte lo que estamos fetching
}) 

fetch('./footer.html')
.then(response => response.text())
.then(html => {
  document.getElementById('footer-container').innerHTML =html; //dentro del argumento del getElementById debe ir el id del div donde quieremos que se inserte lo que estamos fetching
}) 