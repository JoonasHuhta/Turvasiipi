"use server";

export interface AIReportResult {
    success: boolean;
    report?: string;
    error?: string;
}

export async function generatePremiumReport(anonymizedData: string): Promise<AIReportResult> {
    // 1. Simulate API Delay (Processing...)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 2. Validate Data
    if (!anonymizedData || anonymizedData.length < 50) {
        return { success: false, error: "Liian vähän dataa analyysiä varten." };
    }

    // 3. Mock Response (Later: OpenAI API Call)
    // This simulates the "intelligent" report structure we want
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
*Tämä raportti on luotu automaattisesti anonymisoidusta datasta OpenAI:n GPT-4 -mallilla. Se ei korvaa juridista neuvontaa.*
    `;

    return {
        success: true,
        report: mockReport
    };
}
