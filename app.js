import { BACKEND_URL } from "./config.js";

// --- Chat ---
const chatInput = document.getElementById("chatInput");
const chatBtn = document.getElementById("chatBtn");
const chatOut = document.getElementById("chatOut");

chatBtn.onclick = async () => {
  chatOut.textContent = "…";
  try {
    const r = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: chatInput.value || "" })
    });
    const j = await r.json();
    chatOut.textContent = j.reply || JSON.stringify(j, null, 2);
  } catch (e) {
    chatOut.textContent = "Errore: " + e.message;
  }
};

// --- Preventivo manuale ---
const materiale = document.getElementById("materiale");
const lavorazioni = document.getElementById("lavorazioni");
const calcBtn = document.getElementById("calcBtn");
const quoteOut = document.getElementById("quoteOut");

calcBtn.onclick = async () => {
  quoteOut.textContent = "…";
  try {
    const r = await fetch(`${BACKEND_URL}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        material: materiale.value || "",
        works: lavorazioni.value || ""
      })
    });
    const j = await r.json();
    if (j.ok) {
      quoteOut.textContent = `Prezzo stimato: € ${j.price}  (kg=${j.kg}, lavorazioni=${j.workUnits})`;
    } else {
      quoteOut.textContent = "Errore: " + (j.error || "sconosciuto");
    }
  } catch (e) {
    quoteOut.textContent = "Errore: " + e.message;
  }
};

// --- Upload PDF ---
const pdfInput = document.getElementById("pdf");
const uploadBtn = document.getElementById("uploadBtn");
const pdfOut = document.getElementById("pdfOut");

uploadBtn.onclick = async () => {
  if (!pdfInput.files[0]) {
    pdfOut.textContent = "Seleziona un PDF.";
    return;
  }
  pdfOut.textContent = "Carico e analizzo…";
  try {
    const fd = new FormData();
    fd.append("file", pdfInput.files[0]);
    const r = await fetch(`${BACKEND_URL}/pdf`, { method: "POST", body: fd });
    const j = await r.json();
    if (j.ok) {
      pdfOut.textContent =
        `Prezzo stimato: € ${j.price}\n` +
        `— Dettagli: kg=${j.kg}, lavorazioni=${j.workUnits}\n\n` +
        `Anteprima testo PDF:\n${j.textPreview}`;
    } else {
      pdfOut.textContent = "Errore: " + (j.error || "sconosciuto");
    }
  } catch (e) {
    pdfOut.textContent = "Errore: " + e.message;
  }
};
}
