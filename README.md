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
Ik heb naar mijn mening goed opgelet en getest of alle elementen op de app goed zichtbaar zijn. en labels hebben voor screenreaders. of je met een toetesenbord over de app kan navigeren. 
Ook heb ik de app op verschillende browsers getest en op mijn telefoon.
Alles is goed te bedienen en visueel goed te zien, alleen als je met de colorpicker een donkere kleur kiest en darkmode aanzet dan krijg je niet genoeg contrast verschil om dingen zichtbaar te hebben.

##### Toepassing Usability
De navigatieknoppen zijn duidelijk en hebben dezelfde styling. Knoppen hebben labels/titels voor screenreaders.
Alles is getest op samsung internet op telefoon, safari, firefox en chrome.

##### Sidenotes:
Ik wilde de UI zo maken dat de kleuren allemaal in 1 keer aangepast konden worden. dit is bijna gelukt, maar met de colorpicker in de settings
gingen sommige schaduwen van knoppen niet mee terwijl: als je de kant en klare knoppen gebruikt dan veranderen de knop schaduw kleuren wel en ik weet niet hoe ik dit anders kan doen of hoe ik dit moet oplossen.
Wat ook nog niet werkt is het wachtwoord aanpassen en de notificaties werken ook niet zoals het hoort. Ze simuleren de notificaties en het aanpassen van het wachtwoord, maar om het wachtwoord echt aan te passen moet sowieso nog veel meer opgezet worden, want een wachtwoord mag natuurlijk niet ergens letterlijk in een store staan als deze in het echt ook gebruikt gaat worden. Maar voor dit prototype werkt het voor 1 user wel prima zo.
Hosting heb ik gedaan via netlify. Dit was makkelijk op te zetten.

##### update:
Ik heb de colorpicker toch werkende gekregen en de hele UI verandert mee.
Ben met een online upload server gaan werken -> cloudinary. Hierdoor heb ik wat dingen aan moeten passen om het te laten werken, waaronder:
v-file-upload vervangen voor v-file-input
Klein probleempje waar ik tegen aanliep: ik wilde alle key/value pairs in json met PascalCase doen, maar bij Id ging het mis.
id wordt standaard door json server aangemaakt en ik heb het geprobeerd te veranderen, maar blijkbaar kan dat niet meer.
heb wel zo veel mogelijk geprobeerd op/in de app met Id te werken, maar als je gaat kijken hoe het op de json server opgeslagen staat dan zie je daar toch 'id'.
Ook heb ik de lege objecten uit de data gekregen. Als de formsubmit een 'leeg' object ziet dan stuurt hij deze niet mee naar de server. en maakt hij er een lege lijst van.