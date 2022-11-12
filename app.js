const selectors = {
  textArea: "#inputText",
  translate_text_btn: ".translate-text",
  resultArea: ".final-Result",
};

let languages = [];

let fetchLanguaes = () => {
  const options = {
    method: "GET",
    headers: {
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "2b1cd29875mshd60650737281d1ap159bc0jsn9f9d8143a845",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
  };

  fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      languages = [...response.data.languages];
    })
    .catch((err) => console.error(err));
};



let translateText = async (text) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", `${text}`);
  encodedParams.append("target", "ur");
  encodedParams.append("source", "en");

  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "2b1cd29875mshd60650737281d1ap159bc0jsn9f9d8143a845",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    body: encodedParams,
  };

  let response = await fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  );
  let data = await response.json();
  console.log(await data);
  let translatedText = await data.data.translations[0].translatedText;
  console.log(await translatedText);
  return await translatedText;
};

document
  .querySelector(selectors.translate_text_btn)
  .addEventListener("click", async () => {
    let text = document.querySelector(selectors.textArea).value;
    console.log("Clicked");
    let test = await translateText(text);
    console.log(test);
    document.querySelector(selectors.resultArea).textContent = test;
  });

fetchLanguaes();
