"use server";

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export interface AIReportResult {
    success: boolean;
    report?: string;
    error?: string;
    source?: "ai" | "mock";
}

const SYSTEM_PROMPT = `
Olet empaattinen ja asiantunteva työsuojeluasiantuntija. Tehtäväsi on analysoida käyttäjän toimittama lokikirja työpaikkakiusaamisesta ja laatia siitä selkeä, jäsennelty raportti.

Toimi seuraavasti:
1.  **Analysoi:** Tunnista toistuva käyttäytyminen, vallankäyttö ja mahdolliset lakirikkomukset (Työturvallisuuslaki).
2.  **Jäsentele:** Luo raportti, jossa on seuraavat osiot:
    *   **Tilannekuva:** Tiivistelmä tapahtumista.
    *   **Havainnot:** Toistuvat kaavat (esim. eristäminen, nolaaminen).
    *   **Vaikutukset:** Miten tämä vaikuttaa työhön ja jaksamiseen (päätelty tekstistä).
    *   **Juridinen viitekehys:** Lyhyt viittaus relevantteihin pykäliin (jos soveltuu).
    *   **Suositukset:** Konkreettiset seuraavat askeleet (esim. työterveys, ilmoitus esimiehelle).
3.  **Tyyli:** Ole objektiivinen, asiallinen ja tukeva. Älä käytä voimakasta tunnekieltä, vaan pysy faktoissa.
4.  **Tietosuoja:** ÄLÄ KOSKAAN toista raportissa ihmisten oikeita nimiä, vaikka niitä olisi syötteessä. Käytä termejä "Henkilö A", "Esimies", jne.
`;

export async function generatePremiumReport(anonymizedData: string): Promise<AIReportResult> {
    // 1. Check for AWS Credentials
    const hasKeys = process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION;

    if (!hasKeys) {
        console.log("☁️ No AWS keys found. Using Mock Fallback.");
        return generateMockReport(anonymizedData);
    }

    try {
        console.log("☁️ AWS Keys found. Attempting Bedrock call...");

        // 2. Prepare Bedrock Client
        const client = new BedrockRuntimeClient({
            region: process.env.AWS_REGION || "eu-central-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            }
        });

        // 3. Prepare Payload for Claude 3.5 Sonnet
        const payload = {
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 4000,
            messages: [
                { role: "user", content: `${SYSTEM_PROMPT}\n\nLOKIKIRJA:\n${anonymizedData}` }
            ],
            temperature: 0.5,
        };

        const command = new InvokeModelCommand({
            modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0", // Claude 3.5 Sonnet ID
            contentType: "application/json",
            accept: "application/json",
            body: JSON.stringify(payload),
        });

        // 4. Invoke Model
        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        const aiText = responseBody.content[0].text;

        return {
            success: true,
            report: aiText,
            source: "ai"
        };

    } catch (error) {
        console.error("❌ Bedrock Error:", error);
        // Fallback to mock if API fails
        return generateMockReport(anonymizedData);
    }
}

async function generateMockReport(data: string): Promise<AIReportResult> {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockReport = `
# Tilanneanalyysi ja Toimenpidesuositukset

**Analyysin perusteella tilanne on vakava ja täyttää toistuvan häirinnän tunnusmerkit.**

## 1. Tapahtumien kulku ja luonne
Raportoitu aineisto osoittaa selkeän kaavan, jossa uhriin kohdistuu toistuvaa epäasiallista käytöstä. Tapahtumat eivät ole yksittäisiä konflikteja, vaan ne muodostavat jatkumon, joka vaikuttaa heikentävästi työilmapiiriin ja uhrin toimintakykyyn.

Erityisen huolestuttavaa on:
- Tapahtumien tiheys (useita merkintöjä lyhyen ajan sisällä)
- Vallankäytön elementit (esim. ohittaminen päätöksenteossa, julkinen nolaaminen)

## 2. Juridinen viitekehys
Työturvallisuuslain (738/2002) 18 § ja 28 § edellyttävät, että työnantaja puuttuu häirintään heti siitä tiedon saatuaan. Aineiston perusteella voidaan argumentoida, että työntekijän terveys on vaarassa.

## 3. Suositellut toimenpiteet

### A. Välittömät toimet
1.  **Kirjallinen ilmoitus:** Toimita tämä raportti välittömästi esimiehelle ja työsuojeluvaltuutetulle.
2.  **Työterveys:** Varaa aika työkyvyn arviointiin. Tämä dokumentti toimii pohjana lääkärin lausunnolle.

### B. Eskalaatio
Mikäli työnantaja ei reagoi 14 vuorokauden kuluessa, on suositeltavaa olla yhteydessä Aluehallintoviraston (AVI) työsuojelun vastuualueeseen.

---
*Tämä raportti on luotu automaattisesti anonymisoidusta datasta (Testitila - Ei AI-yhteyttä). Se ei korvaa juridista neuvontaa.*
    `;

    return {
        success: true,
        report: mockReport,
        source: "mock"
    };
}
