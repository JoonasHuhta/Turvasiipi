"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { TimelineEvent } from "@/types";

export async function generateReportAction(events: TimelineEvent[]) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.warn("No GEMINI_API_KEY found, using mock fallback.");
        // Fallback: Just return the descriptions as is, or slightly formatted to show "Simulated"
        return events.map(e => ({
            ...e,
            description: `[SIMULOITU AI-MUOKKAUS]: ${e.description}`
        }));
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Prepare prompt
        const eventText = events.map(e =>
            `Päivämäärä: ${new Date(e.timestamp).toLocaleDateString("fi-FI")}\nKuvaus: ${e.description}\nOsalliset: ${e.peopleInvolved}`
        ).join("\n---\n");

        const prompt = `
      Olet asiantunteva työsuojeluvaltuutettu. Tehtäväsi on muokata seuraavat työpaikkakiusaamiseen liittyvät tapahtumakuvaukset viralliseen, neutraaliin ja asialliseen muotoon.
      Tavoitteena on luoda "Ilmoitus työturvallisuuslain mukaisesta epäasiallisesta kohtelusta".
      
      Ohjeet:
      1. Poista tunteikkaat ilmaukset (esim. "tuntui pahalta", "raivosi"), korvaa ne faktoilla (esim. "korotti ääntään", "epäasiallinen kielenkäyttö").
      2. Säilytä alkuperäiset päivämäärät ja osalliset.
      3. Palauta vastaus SAMASSA JÄRJESTYKSESSÄ kuin syöte.
      4. Palauta vastaus JSON-muodossa, jossa on lista objekteja: { originalId: (ei tarvita), description: "uusi kuvaus" }. 
      MUTTA koska en voi taata järjestystä, palauta vain uusi kuvaus kullekin tapahtumalle selkeästi eroteltuna tai mieluummin yhtenäisenä tekstinä, jos teen raportin.
      
      HETKINEN: Yksinkertaistetaan. Palauta vain taulukko merkkijonoja (string[]), joka vastaa syötettyjä tapahtumia järjestyksessä.
      
      Tapahtumat:
      ${eventText}
    `;

        // For simplicity in this demo, let's just ask to rephrase each individual event to avoid mapping issues.
        // Or better: process them one by one if the list is short? No, that's slow.
        // Let's ask for a structured JSON response.

        const jsonPrompt = `
      Tehtävä: Muuta nämä tapahtumakuvaukset neutraaliksi virkakieleksi.
      Palauta Vain kelvollinen JSON-taulukko (Array of strings), jossa on muokatut kuvaukset samassa järjestyksessä. Älä laita markdown-merkintöjä (\`\`\`json).
      
      Syötteet:
      ${JSON.stringify(events.map(e => e.description))}
    `;

        const result = await model.generateContent(jsonPrompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, "").replace(/```/g, "").trim();

        const start = text.indexOf('[');
        const end = text.lastIndexOf(']');
        if (start === -1 || end === -1) throw new Error("Invalid JSON response");

        const parsedDescriptions = JSON.parse(text.substring(start, end + 1)) as string[];

        return events.map((e, i) => ({
            ...e,
            description: parsedDescriptions[i] || e.description // Fallback to original if mismatch
        }));

    } catch (error) {
        console.error("AI Generation failed:", error);
        throw new Error("Raportin luonti epäonnistui. Tarkista API-avain.");
    }
}
