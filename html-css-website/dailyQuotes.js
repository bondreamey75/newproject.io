fetch("https://dailyquotes.dev/api/quotes/today", {
  headers: {
    "Authorization": "Bearer Zfmk9UsqkYmDMtUSHmiGiC49TFd477cDiUDtY6z1"
  }
})
.then(res => res.json())
.then(data => {
  const quote = data.quote;
  const author = data.author;
  document.getElementById("quote").innerText = `"${quote}" — ${author}`;
});