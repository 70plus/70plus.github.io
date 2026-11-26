/* 
  Struttura dei test:
     separatore ([---])
     argomento (es.: Italiano)
     titolo del test (es.: Scrivi il nome degli oggetti!)
     modalità di esecuzione ([mono | bi])
     	mono: la domanda ha dei campi in cui digitare la risposta
     	bi: con probabilità 50-50 la domanda viene proposta:
     	    come nel caso mono, con chiave da riempire, oppure
     	    viene mostrato la chiave, che va esposta a voce
     tipo di input ([alfa | num])
     lista di domande
Nei test a risposta, una lista racchiusa tra due caratteri §, con "||" come separatore,
definisce le risposte accettate. Es.:
     Il cielo oggi §è§ azzurro §e§ sereno.
     La gallina è un quadrupede. §Falso || F || no || n§
La risposta non è case sensitive e gli spazi contenuti non vengono considerati.
*/
const DATI_TEST = `
---
Geografia
gli ambienti dei climi freddi
mono
alfa
Nei territori ricoperti di nevi e ghiacci §perenni||perenne§ le temperature sono molto basse.
I merluzzi e le aringhe sono pesci grandi che mangiano il krill. §Vero||V||si||s§
I ghiacci si estendono oltre il Circolo Polare Artico, nell'emisfero §boreale§, e in Antartide, nell'emisfero §australe§.
Le temperature dei territori ricoperti di ghiacci perenni restano quasi sempre sopra lo zero. §Falso||F||no||n§
I cormorani e i gabbiani sono §uccelli marini||uccello marino||uccelli§ che mangiano pesci grandi.
Tra i cetacei dei mari freddi ci sono molte specie di §balene||balena§.
L'acqua del mare vicino alla costa congela e forma la §banchisa§, una massa di ghiaccio alta fino a §tre metri||3 metri||3 m§.
Gli iceberg sono enormi masse galleggianti di ghiaccio formato da acqua §dolce§, staccate dai §ghiacciai||ghiacciaio§.
Sui ghiacci perenni crescono solo muschi e licheni. §Vero||V||si||s§
Dove finiscono i ghiacci comincia la §tundra§, che si trova nelle regioni §settentrionali||settentrionale||del nord§ di America, Europa e Asia.
Nella tundra il terreno si disgela solo per poche §settimane||settimana§ durante l'estate.
Anche dopo il disgelo estivo, il terreno della tundra resta §ghiacciato in profondit&agrave;||ghiacciato in profondita||ghiacciato§.
Nella tundra non crescono §alberi||albero§ perch&eacute; non si sviluppano §radici profonde||radici§.
Tra i pochi arbusti della tundra c'&egrave; il §mirtillo§.
D'inverno i piccoli roditori della tundra stanno al riparo §sottoterra||sotto terra§.
Le renne arrivano nella tundra durante l'inverno. §Falso||F||no||n§
Gli uccelli migratori della tundra si nutrono di moscerini e §zanzare||zanzara§, che trovano negli §acquitrini||acquitrino§ che si formano al disgelo.
Tra i grandi erbivori della tundra, oltre alle renne, c'&egrave; il §bue muschiato||buoi muschiati§.
I grandi erbivori migrano verso §nord§ alla ricerca di §pascoli||pascolo§.
Le foche e i §trichechi||tricheco§ lasciano il mare e affollano le coste per la §riproduzione§.
La foresta di conifere &egrave; conosciuta soprattutto con il nome di §taiga§.
Il paese in cui si estende la pi&ugrave; vasta foresta del mondo &egrave; la §Russia§.
Nella taiga gli inverni sono §lunghi e rigidi||lunghi||rigidi§ e le estati sono §brevi e fresche||brevi||fresche§.
Durante l'estate nella taiga arrivano stormi di uccelli migratori. §Vero||V||si||s§
Gli alberi della taiga possono raggiungere i §60 metri||sessanta metri||60 m§ di altezza.
Dove riescono a penetrare i raggi del Sole, nella taiga crescono i §cespugli||cespuglio§ con §bacche||bacca§ e piccoli frutti.
Il castoro e l'alce sono predatori della taiga. §Falso||F||no||n§
La lepre e lo scoiattolo sono erbivori della taiga. §Vero||V||si||s§
Nella taiga, durante l'estate, proliferano moltissimi §insetti||insetto§, come formiche, coleotteri e mosche.
Gli iceberg si formano quando l'acqua del mare vicino alla costa congela. §Falso||F||no||n§
---
Geografia
Gli ambienti dei climi temperati
mono
alfa
La foresta temperata è chiamata anche foresta di §latifoglie||latifoglia§.
Gli alberi della foresta temperata perdono le foglie in §autunno§ e per questo si definiscono a foglie §caduche||caduca§.
Il cervo e il capriolo vivono nella foresta temperata. §Vero||V||si||s§
Le §querce||le querce§, a differenza di faggi e betulle, preferiscono temperature più miti.
Il §fogliame||il fogliame§ nutre il terreno e permette lo sviluppo di un ricco §sottobosco||il sottobosco§ formato da erbe, arbusti e §funghi||i funghi§.
La prateria è un ambiente caratteristico delle zone più §interne§ dei continenti.
Nella prateria non arriva l'umidità del §mare||il mare§, perciò non crescono molti §alberi||gli alberi§.
La lepre è un roditore che vive nella prateria. §Vero||V||si||s§
Con l'arrivo delle piogge la prateria si ricopre d'erba alta fino a §due metri||2 metri||2 m||2m§.
La foresta temperata è abitata da grandi §erbivori§, come il cervo, e da animali più piccoli come i roditori e gli §uccelli§.
Nelle zone ancora più aride la prateria lascia il posto alla §steppa||la steppa§.
Gli alberi della foresta temperata sono sempreverdi. §Falso||F||no||n§
Intorno al Mar Mediterraneo, nelle zone §costiere§, un tempo erano diffusi molti alberi §sempreverdi||sempreverde§.
Le §graminacee§ resistono alla mancanza d'acqua grazie alle loro radici molto §lunghe e ramificate||lunghe||ramificate§.
Il pino marittimo e il §cedro§ erano alberi molto diffusi un tempo lungo le coste.
Volpe, lince, lupo e orso sono §predatori||i predatori§ in aumento nella foresta temperata.
Il lupo è un roditore che vive nella prateria. §Falso||F||no||n§
Dopo secoli di §diboscamenti||diboscamento||il diboscamento§, questi alberi sono rimasti in poche aree e in molte zone sono stati sostituiti dalla macchia mediterranea.
Alberi e arbusti crescono solo nelle zone §innevate§ d'inverno, e perciò più §umide§.
Prima dello sviluppo dell'§agricoltura§ la foresta temperata occupava buona parte dei continenti, ma oggi è §ridotta||ridotto||limitata||limitato§ a estensioni più §piccole||più piccole§.
La macchia mediterranea è formata da §arbusti§ come il ginepro e il mirto, alternati a §piante aromatiche||le piante aromatiche§ come il rosmarino e la lavanda.
In estate la prateria è abbastanza arida. §Vero||V||si||s§
Cavallette, coleotteri e farfalle sono §insetti||gli insetti§ che vivono nascosti tra l'erba.
Nella macchia le foglie sono §perenni||perenne§ perché le piante non devono difendersi dal §freddo||il freddo§.
Lo scoiattolo vive sugli alberi, dove costruisce la sua §tana||la tana§.
Le piante della macchia mediterranea perdono le foglie in inverno. §Falso||F||no||n§
Lucertole, serpenti e tartarughe sono §rettili||i rettili§ che trovano riparo nella macchia.
La macchia mediterranea cresce lungo le coste dell'Oceano Atlantico. §Falso||F||no||n§
Il cinghiale è attivo soprattutto nelle ore §crepuscolari||crepuscolare§ e notturne e vive anche in zone §boscose||boscosa§ alternate a prati o pascoli.
Le lucertole e le tartarughe trovano riparo nella macchia mediterranea. §Vero||V||si||s§
---
Geografia
Gli ambienti dei climi caldi
mono
alfa
I deserti sono le aree più §aride||arida§ della Terra.
Il §Sahara§ è il deserto più vasto del Pianeta e si trova nel nord dell’§Africa||africano||continente africano§.
I deserti caldi si trovano in corrispondenza dei due Tropici. §Vero||V||si||s§
La sabbia spostata dal vento forma degli accumuli chiamati §dune||duna§.
I deserti §freddi||freddo§ si trovano nelle zone interne dei continenti, dove non arriva l’umidità del §mare§.
Solo dove affiora l’acqua del sottosuolo nascono le §oasi||le oasi§.
Il fennec vive nell’America settentrionale. §Falso||F||no||n§
Il fennec è la volpe del §deserto§ e ha orecchie lunghe che servono a disperdere il §calore§.
Nei deserti, per la mancanza di §piogge||pioggia||le piogge§, cresce pochissima §vegetazione||la vegetazione§.
Nel deserto vivono molti rettili e anche mammiferi, come la gazzella e il coyote. §Vero||V||si||s§
La savana è un ambiente di §pianura§ che si estende principalmente fra i due Tropici e l’§Equatore§.
La stagione §secca§ della savana è molto arida.
Nella savana si alternano tre stagioni con una diversa piovosità. §Falso||F||no||n§
Nella stagione §umida||delle piogge||stagione umida||stagione delle piogge§ la savana diventa una grande distesa d’§erba||l’erba§.
Nella savana compaiono alberi isolati, come le acacie e i grandi §baobab§.
Antilopi, zebre e giraffe vivono in §branchi||branco§ e si spostano a seconda delle §stagioni||stagione§ alla ricerca di cibo e acqua.
Gli avvoltoi si nutrono di ciò che resta degli animali cacciati dai leoni. §Vero||V||si||s§
I §predatori||predatore§, come leoni e ghepardi, seguono gli erbivori nei loro spostamenti per catturarli.
Nella savana §australiana§ vivono varie specie di §canguri||canguro§.
Il leone oggi sopravvive soprattutto nelle savane asiatiche. §Falso||F||no||n§
La foresta equatoriale è chiamata anche foresta §pluviale§ perché è l’ambiente più §piovoso||più piovoso§.
Il Rio delle §Amazzoni||amazzoni§ scorre in America §meridionale||del sud||sud§.
Il §Congo||fiume Congo§ è un fiume lungo e ricco di acque che scorre nella foresta equatoriale.
Il serpente e l’iguana sono uccelli della foresta equatoriale. §Falso||F||no||n§
Il clima equatoriale ha abbondanti §precipitazioni||piogge||precipitazione§ e temperature §alte||elevate§ tutto l’anno.
La vegetazione della foresta equatoriale è molto fitta e §sempreverde||sempreverdi§.
Nella foresta equatoriale gli §alberi altissimi||alberi||alberi alti§ catturano i raggi del §Sole||sole§.
Nella foresta equatoriale vivono milioni di insetti, come diverse specie di farfalle. §Vero||V||si||s§
Nella foresta equatoriale gli arbusti riescono a crescere nelle zone d’§ombra§.
Nella foresta equatoriale vivono mammiferi come diversi tipi di §scimmie||scimmia§, giaguari e leopardi.
---
Storia
I sumeri
mono
alfa
Tra il §4000||4000 a.C.§ e il §3500||3500 a.C.§ a.C. i Sumeri occuparono la zona a sud della Mesopotamia.
Prima di stabilirsi in quella zona, i Sumeri erano un popolo §nomade||nomadi||di nomadi§.
Il nome Sumer significa &laquo;terra §coltivata||coltivato§&raquo;.
I due grandi fiumi della Mesopotamia sono il §Tigri||il Tigri§ e l'Eufrate.
Le acque dei fiumi e la fertilit&agrave; del terreno permisero un'agricoltura fiorente. §Vero||V||si||s§
Dopo le piene, i fiumi lasciavano sul terreno il §limo||il limo§, che permetteva raccolti §abbondanti||abbondante||ricchi§.
Quando le acque uscivano dagli argini naturali, allagavano il terreno e formavano §paludi||le paludi||palude§.
I Sumeri difesero le coltivazioni dalle piene con argini di legno lungo le sponde dei fiumi. §Falso||F||no||n§
I Sumeri iniziarono quindi a §bonificare||bonificare il terreno§ il terreno.
Le §chiuse||chiusa||le chiuse§ servivano per irrigare i campi.
I Sumeri costruirono canali per regolare lo scorrere delle acque. §Vero||V||si||s§
I Sumeri raccolsero l'acqua in §vasche||le vasche||vasca§ per usarla nei periodi di §siccit&agrave;||siccita||la siccit&agrave;||la siccita§.
I Sumeri coltivavano §cereali||i cereali||cereale§, ortaggi, legumi e alberi da frutta.
Tra gli alberi da frutta, i Sumeri coltivavano soprattutto mele, pere e ciliegie. §Falso||F||no||n§
Dal lino e dalla canapa i Sumeri ricavavano i §filati||filato§ per fare §corde||corda§ e tessuti.
L'§allevamento||allevamenti§ era molto praticato: le capre e i buoi fornivano latte, carne e §lana||la lana§.
I Sumeri erano abili §artigiani||artigiano||gli artigiani§.
Lavoravano l'§argilla||argilla§, di cui era ricco il territorio, per fare ceramiche e §mattoni||i mattoni||mattone§.
I Sumeri realizzavano magnifici gioielli con pietre preziose. §Vero||V||si||s§
Con la pelle i Sumeri realizzavano abiti e §bisacce||bisaccia||le bisacce§.
La Mesopotamia era povera di §legno||il legno§ e metalli.
I Sumeri realizzavano carri, aratri e attrezzi da lavoro, soprattutto asce e §scalpelli||scalpello||gli scalpelli§.
Intorno al 2000 a.C. molte citt&agrave; sumere furono conquistate dagli Egizi. §Falso||F||no||n§
Quando i prodotti superavano il bisogno immediato delle persone, erano in §eccesso||in eccesso§.
I prodotti in pi&ugrave; venivano conservati nei §granai||i granai||granaio§ oppure §scambiati||scambiato§ con altri prodotti.
Il commercio veniva praticato attraverso il §baratto||il baratto§, cio&egrave; lo scambio di un prodotto con un altro senza usare §monete||le monete||moneta§.
I Sumeri trasportavano le merci con le barche, su canali e fiumi. §Vero||V||si||s§
I mercanti viaggiavano con i carri lungo le §piste carovaniere||piste||le piste carovaniere§.
I mercanti erano difesi dai banditi grazie ai §soldati||i soldati§ che scortavano i carri.
I Sumeri erano soprattutto cacciatori e pescatori. §Falso||F||no||n§
---
Italiano
Inserisci <b><em>a</em></b>, oppure <b><em>ha</em><b>
mono
alfa
Vado §a§ casa.
Mi aiuti §a§ sollevare questa scatola?
La mamma §ha§ acceso il tv.
La nonna §ha§ i capelli ricci.
Mando un saluto §a§ tutti.
Il nonno §ha§ rotto.
Il topo §ha§ fatto ritorno §a§ casa.
Il gatto §ha§ mangiato tutto.
Marco va §a§ scuola a piedi.
La mamma §ha§ una borsa nera.
Ho regalato un disegno §a§ mia nonna.
Sofia §ha§ mal di pancia.
Luca §ha§ visto un bel film.
Vado §a§ giocare nel parco.
Il cane §ha§ paura del temporale.
Scrivi §a§ matita, per favore.
Sara §ha§ guardato un film §a§ casa.
---   
Italiano
Inserisci <b><em>e</em></b>, oppure <b><em>è</em><b>
mono
alfa
Il cane §è§ marrone §e§ mangia un osso.
La mamma §è§ andata al supermercato §e§ ha comprato la frutta.
Il libro §è§ sul tavolo §e§ parla di pirati.
La prugna §è§ un frutto dolce §e§ cresce sull'albero.
Il cielo oggi §è§ azzurro §e§ sereno.
La mia amica §è§ molto simpatica.
Ho comprato quaderni §e§ matite.
Il sole §è§ caldo §e§ luminoso.
Il gatto §è§ sul tetto.
Il cane §e§ il gatto giocano.
La penna §è§ rossa §e§ blu.
---
Inglese
Presente del verbo <em>to be</em>
mono
alfa
I §am§ a child.
§Is§ she your sister? — Yes, she is.
We §are§ at school.
The flowers §are§ yellow.
He §isn't§ tall, he is short.
§Are§ you tired? — No, I §am not§.
The sky §is§ blue.
My cat §is§ small and it §is§ white.
They aren't bad, they §are§ good!
She §is§ my mum.
The cat §is§ black.
We §are§ at home.
He isn't sad, he §is§ happy.
Are you hungry? — Yes, I §am§.
The dog §is§ big.
They §are§ my friends.
My teacher §is§ nice.
They §are§ at school today.
My name §is§ Luna and I §am§ from Italy.
§Are§ you a student? Yes! §I am§.
She §is§ happy.
§Is§ it cold outside? — Yes, it §is§.
§Is§ it monday? — No, it §is§ tuesday.
I §am§ a teacher.
Are they from Spain? — No, they §aren't§.
The cats §are§ in the garden, but the dog is not there.
Is this your bag? — Yes, it §is§ mine.
`;
