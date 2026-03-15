# RealEstateCare-app

Deze app ben ik mee bezig om te maken als eindopdracht voor mijn frontend frameworks module
De RealEstateCare-app is een mobiele‑gerichte webapplicatie waarmee woningcorporaties inspecties kunnen uitvoeren en zaken zoals onderhoud, schade en statusupdates kunnen vastleggen. De app is gebouwd met Vite, Vue en Vuetify, en gebruikt JSON‑Server voor lokale data tijdens ontwikkeling.


## Vereisten
Om dit project te kunnen draaien heb je nodig:
- Node.js
- npm
- Vite (wordt automatisch geïnstalleerd)
- JSON‑Server (zelf installeren)
- Pinia (zelf installeren)
- Pinia plugin persist (zelf installeren)
- indexeddb (idb-keyval)


## commands:

### Clone de repository
`git clone [(https://github.com/sidje96/vite_projects.git)]`

### open de opdrachtenprompt

### Ga naar de projectmap
`cd vite_projects`

### Installeer dependencies
`npm install`

#### opmerkingen
Het project is opgezet met vite.
Voor de mobiele UI gebruik ik vuetify
De data wordt locaal opgehaald uit een JSON bestand die online gezet wordt met JSON-Server
Dit moet je zelf doen. JSON-Server moet geinstalleerd zijn.

#### start de lokale API vanuit de projectmap
`npm run json-server`

#### sidenote
De data wordt uit de goede map gehaald door de configuratie.
Je hoeft dus niet de map te zoeken. 

#### Daarna
`npm run dev`

##### Toepassing accessibility
Ik heb naar mijn mening goed opgelet en getest of alle elementen op de app goed zichtbaar zijn. en labels hebben voor screenreaders. of je met een toetesenbord over de app kan navigeren. en het lijkt erop dat de app wel WCAG 2.1 minimaal gehaald heeft.

##### Sidenotes:
Ik wilde de UI zo maken dat de kleuren allemaal in 1 keer aangepast konden worden. dit is bijna gelukt, maar met de colorpicker in de settings
gingen sommige schaduwen van knoppen niet mee terwijl: als je de kant en klare knoppen gebruikt dan veranderen de knop schaduw kleuren wel en ik weet niet hoe ik dit anders kan doen of hoe ik dit moet oplossen.
Wat ook nog niet werkt is het wachtwoord aanpassen en de notificaties werken ook niet zoals het hoort. Ze simuleren de notificaties en het aanpassen van het wachtwoord, maar om het wachtwoord echt aan te passen moet sowieso nog veel meer opgezet worden, want een wachtwoord mag natuurlijk niet ergens letterlijk in een store staan als deze in het echt ook gebruikt gaat worden. Maar voor dit prototype werkt het voor 1 user wel prima zo.
Hosting heb ik gedaan via netlify. Dit was makkelijk op te zetten.
