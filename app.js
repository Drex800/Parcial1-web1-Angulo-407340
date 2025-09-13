// app.js
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const searchBar = document.getElementById("searchBar");
  const searchResults = document.getElementById("searchResults");
  const postsContainer = document.getElementById("posts");

  // Navegación SPA
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("data-target");

      sections.forEach(section => section.classList.add("hidden"));
      document.getElementById(target).classList.remove("hidden");

      history.pushState({ section: target }, "", `#${target}`);
    });
  });

  // Manejo de historial (cuando el usuario da atrás/adelante en el navegador)
  window.addEventListener("popstate", e => {
    const section = e.state?.section || "muro";
    sections.forEach(sec => sec.classList.add("hidden"));
    document.getElementById(section).classList.remove("hidden");
  });

  // Búsqueda básica
  const users = ["Juan Pérez", "María López", "Carlos Gómez", "Ana Torres"];
  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    searchResults.innerHTML = "";
    if (query) {
      const results = users.filter(user => user.toLowerCase().includes(query));
      results.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user;
        searchResults.appendChild(li);
      });
    }
  });

  // Publicar en el muro
  const form = document.getElementById("postForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const input = document.getElementById("postInput");
    if (input.value.trim() !== "") {
      const post = document.createElement("div");
      post.className = "post";
      post.textContent = input.value;
      postsContainer.prepend(post);
      input.value = "";
    }
  });
});
