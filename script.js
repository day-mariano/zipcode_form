const cep = document.getElementById("cep");
const form = document.getElementById("form")

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
      if (response.status == 404) {
        document.getElementById("cepSmall").innerText = "Não encontrado"
        return
      } else if (response.status >= 400) {
        document.getElementById("cepSmall").innerText = "Erro"
        return
      }
      
      response.json().then((data) => showData(data));
      
    })
    .catch((e) => {
      document.getElementById("cepSmall").innerText = "Erro"
    });
});

// Evitar ação padrão do submit: enter para enviar 
form.addEventListener('submit', function(e) {
  e.preventDefault();
});