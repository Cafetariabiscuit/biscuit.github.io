document.getElementById("form-avaliacao").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const comentario = document.getElementById("comentario").value.trim();
  const avaliacao = document.getElementById("avaliacao").value;

  if (!nome || !comentario || !avaliacao) return;

  const nova = { nome, comentario, avaliacao };
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
  lista.push(nova);
  localStorage.setItem("avaliacoes", JSON.stringify(lista));

  document.getElementById("form-avaliacao").reset();
  mostrarAvaliacoes();
});

function mostrarAvaliacoes() {
  const lista = JSON.parse(localStorage.getItem("avaliacoes") || "[]");
  const container = document.getElementById("lista-avaliacoes");
  container.innerHTML = "";

  lista.forEach(av => {
    const bloco = document.createElement("div");
    bloco.innerHTML = `
      <strong>${av.nome}</strong><br>
      ${"⭐".repeat(av.avaliacao)}<br>
      <p>${av.comentario}</p>
      <hr>
    `;
    container.appendChild(bloco);
  });
}

mostrarAvaliacoes();
