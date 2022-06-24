const cep = document.getElementById("cep");
const fomr = document.getElementById("form")

//Verifica se contém o mesmo campo no doc e add o valor nele
const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo];
    }
  }
};

// Quando tira o foco input cep faz a consulta por fetch
cep.addEventListener("blur", (e) => {
  //tratamento do número
  let search = cep.value.replace("-", "");

  // Caracteristicas da requisição
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  // Requisição pelo BrasilApi e chama showData
  fetch(`https://brasilapi.com.br/api/cep/v1/${search}`, options)
    .then((response) => {
      response.json().then((data) => showData(data));
    })
    .catch((e) => console.log(e));
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
});