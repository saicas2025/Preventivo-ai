async function sendChat() {
  const msg = document.getElementById("chatInput").value;
  const output = document.getElementById("chatOutput");

  const res = await fetch(window.APP_CONFIG.BACKEND_URL + "/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  output.innerHTML += "<p><b>Tu:</b> " + msg + "</p>";
  output.innerHTML += "<p><b>AI:</b> " + data.reply + "</p>";
}

async function calcolaPreventivo() {
  const materiale = document.getElementById("materiale").value;
  const lavorazioni = document.getElementById("lavorazioni").value;
  const output = document.getElementById("preventivoOutput");

  const res = await fetch(window.APP_CONFIG.BACKEND_URL + "/preventivo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ materiale, lavorazioni })
  });

  const data = await res.json();
  output.innerHTML = "<b>Totale:</b> " + data.totale + " €";
}
