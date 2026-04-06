const input = document.querySelector("#input");
const resultado = document.querySelector("#resultado");

async function buscar() {
  const pais = input.value.trim();
  if (pais === "") return;

  resultado.textContent = "Buscando...";

  try {
    const respuesta = await fetch(
      `https://restcountries.com/v3.1/name/${pais}`,
    );
    const datos = await respuesta.json();
    console.log(datos);

    if (datos.status === 404) {
      resultado.textContent = "País no encontrado. Intenta en inglés.";
      return;
    }

    const p = datos[0];
    resultado.innerHTML = `
        <div class="card">
            <img src="${p.flags.png}" alt="${p.name.common}">
            <h2>${p.name.common}</h2>
            <div class="dato"><span>Capital</span><span>${p.capital[0]}</span></div>
            <div class="dato"><span>Población</span><span>${p.population.toLocaleString()}</span></div>
            <div class="dato"><span>Región</span><span>${p.region}</span></div>
            <div class="dato"><span>Idioma</span><span>${Object.values(p.languages || {})[0] || "N/A"}</span></div>
<div class="dato"><span>Moneda</span><span>${Object.values(p.currencies || {})[0]?.name || "N/A"}</span></div>
        </div>
`;
  } catch (error) {
    resultado.textContent = "Error al buscar el país.";
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscar();
  }
});
