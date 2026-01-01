# Ohjeet: Turvasiipi Android-sovelluksen avaamiseen

Olen määrittänyt projektin siten, että Android-sovellus lataa sisällön suoraan Vercel-osoitteestasi. Näin tekoäly ja kaikki muut ominaisuudet toimivat heti.

### 1. Avaa projekti Android Studiossa
Suorita tämä komento projektisi kansiossa:
```powershell
npx cap open android
```
Tämä avaa Android Studion ja lataa `android`-kansion projektina.

### 2. Valmistele simulaattori (jos sinulla ei ole vielä)
1. Etsi Android Studion yläpalkista **"Device Manager"** (yleensä oikeassa yläkulmassa).
2. Valitse **"Create Device"**.
3. Valitse jokin puhelin (esim. Pixel 7) ja klikkaa **Next**.
4. Valitse uusin järjestelmäkuva (esim. "VanillaIceCream" tai "Tiramisu") ja lataa se jos tarpeen.
5. Klikkaa **Finish**.

### 3. Aja sovellus
1. Varmista, että yläpalkin valikossa on valittuna juuri luomasi simulaattori ja **"app"**.
2. Klikkaa vihreää **"Run"**-painiketta (kolmio).

### Jatkokehitys
*   Jos teen koodiin muutoksia, ne päivittyvät automaattisesti Verceliin.
*   Koska Android-sovellus lukee suoraan Verceliä, suurin osa muutoksista näkyy sovelluksessa heti, kun avaat sen uudelleen!
*   Jos tehdään muutoksia sovelluksen kuvakkeeseen tai nimiin, suorita: `npx cap sync android`

### Sovelluksen kuvakkeen (ikonin) vaihtaminen

Android Studio sisältää helpon työkalun kuvakkeen luomiseen:

1.  Klikkaa Android Studiossa hiiren oikealla **`app`**-kansiota (vasemmassa laidassa).
2.  Valitse **New** -> **Image Asset**.
3.  Varmista, että "Icon Type" on **Launcher Icons (Adaptive and Legacy)**.
4.  **Foreground Layer**:
    *   Varmista, että "Asset Type" on **Image**.
    *   Klikkaa kolmea pistettä "Path"-kohdassa ja etsi logosi (löydät sen projektisi `public`-kansiosta).
    *   Käytä "Resize"-liukusäädintä, jotta logo mahtuu turva-alueen (sisempi rengas) sisälle.
5.  **Background Layer**:
    *   Voit valita taustalle värin (Color) tai toisen kuvan.
6.  Klikkaa **Next** ja sitten **Finish**.

Tämä luo automaattisesti kaikki eri kokoiset kuvakkeet, joita Android-puhelimet tarvitsevat.
