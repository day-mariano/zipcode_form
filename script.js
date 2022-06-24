const cep = document.getElementById("cep");

const showData = (result) => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo];
    }
  }
};

cep.addEventListener("blur", (e) => {
  let search = cep.value.replace("-", "");
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  fetch(`https://brasilapi.com.br/api/cep/v1/${search}`, options)
    .then((response) => {
      response.json().then((data) => showData(data));
    })
    .catch((e) => console.log(e));
});

