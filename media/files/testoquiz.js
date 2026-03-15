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
*/
const DATI_TEST = `
---
Italiano
Sistema le sillabe!
mono
alfa
sa &#x2014 ca &#x279E §casa§<br>
bro &#x2014 li &#x279E §libro§<br>
la &#x2014 scuo &#x279E §scuola§<br>
to &#x2014 gat &#x279E §gatto§<br>
ne &#x2014 ca &#x279E §cane§<br>
sce &#x2014 pe &#x279E §pesce§<br>
re &#x2014 fio &#x279E §fiore§<br>
da &#x2014 stra &#x279E §strada§<br>
lo &#x2014 cie &#x279E §cielo§<br>
no &#x2014 ma &#x279E §mano§<br>
qua &#x2014 ac &#x279E §acqua§<br>
ne &#x2014 pa &#x279E §pane§<br>
ce &#x2014 lu &#x279E §luce§<br>
chio &#x2014 spec &#x279E §specchio§<br>
be &#x2014 al &#x2014 ro &#x279E §albero§<br>
lo &#x2014 ta &#x2014 vo &#x279E §tavolo§<br>
ne &#x2014 fi &#x2014 stra &#x279E §finestra§<br>
no &#x2014 bam &#x2014 bi &#x279E §bambino§<br>
rdi &#x2014 gia &#x2014 no &#x279E §giardino§<br>
ta &#x2014 ma &#x2014 ti &#x279E §matita§<br>
far &#x2014 la &#x2014 fal &#x279E §farfalla§<br>
ta &#x2014 mon &#x2014 gna &#x279E §montagna§<br>
brel &#x2014 om &#x2014 lo &#x279E §ombrello§<br>
na &#x2014 ba &#x2014 na &#x279E §banana§<br>
che &#x2014 ro &#x2014 zuc &#x279E §zucchero§<br>
mi &#x2014 for &#x2014 ca &#x279E §formica§<br>
li &#x2014 gal &#x2014 na &#x279E §gallina§<br>
lo &#x2014 me &#x2014 ne &#x279E §melone§<br>
lo &#x2014 pal &#x2014 ne &#x279E §pallone§<br>
sci &#x2014 cu &#x2014 no &#x279E §cuscino§<br>
o &#x2014 le &#x2014 ne &#x279E §leone§<br>
chie &#x2014 bic &#x2014 re &#x279E §bicchiere§<br>
raf &#x2014 gi &#x2014 fa &#x279E §giraffa§<br>
o &#x2014 ro &#x2014 gio &#x2014 lo &#x279E §orologio§<br>
ta &#x2014 vo &#x2014 no &#x2014 li &#x279E §tavolino§<br>
e &#x2014 le &#x2014 te &#x2014 fan &#x279E §elefante§<br>
to &#x2014 au &#x2014 mo &#x2014 bi &#x2014 le &#x279E §automobile§<br>
te &#x2014 le &#x2014 pio &#x2014 sco &#x279E §telescopio§<br>
coc &#x2014 co &#x2014 lo &#x2014 dril &#x279E §coccodrillo§<br>
---
Italiano
Scrivi il nome degli oggetti!
mono
alfa
<span style="font-size: 400%;">&#x1F6A9;</span> §bandiera§
<span style="font-size: 400%;">&#x231B;</span> §clessidra§
<span style="font-size: 400%;">&#x1F525;</span> §fuoco§
<span style="font-size: 400%;">&#x1F4BB;</span> §computer§
<span style="font-size: 400%;">&#x1F5A8;</span> §stampante§
<span style="font-size: 400%;">&#x1F42D;</span> §topo§
<span style="font-size: 400%;">&#x1F437;</span> §maiale§
<span style="font-size: 400%;">&#x1F42F;</span> §tigre§
<span style="font-size: 400%;">&#x1F412;</span> §scimmia§
<span style="font-size: 400%;">&#x1F994;</span> §riccio§
<span style="font-size: 400%;">&#x1F989;</span> §gufo§
<span style="font-size: 400%;">&#x1F99C;</span> §pappagallo§
<span style="font-size: 400%;">&#x1F427;</span> §pinguino§
<span style="font-size: 400%;">&#x1f528;</span> §martello§
<span style="font-size: 400%;">&#x1f407;</span> §coniglio§
<span style="font-size: 400%;">&#x1f392;</span> §zaino§
<span style="font-size: 400%;">&#x1f550;</span> §orologio§
<span style="font-size: 400%;">&#x1f4a7;</span> §goccia§
<span style="font-size: 400%;">&#x1f941;</span> §tamburo§
<span style="font-size: 400%;">&#x1f578;</span> §ragnatela§
<span style="font-size: 400%;">&#x2602;</span> §ombrello§
<span style="font-size: 400%;">&#x1F42C;</span> §delfino§
<span style="font-size: 400%;">&#x1f40d;</span> §serpente§
<span style="font-size: 400%;">&#x1f9a2;</span> §cigno§
<span style="font-size: 400%;">&#x1f48d;</span> §anello§
<span style="font-size: 400%;">&#x1f992;</span> §giraffa§
<span style="font-size: 400%;">&#x1f3f0;</span> §castello§
<span style="font-size: 400%;">&#x1f9fd;</span> §spugna§
<span style="font-size: 400%;">&#x1f37e;</span> §bottiglia§
<span style="font-size: 400%;">&#x1f341;</span> §foglia§
<span style="font-size: 400%;">&#x1f9c4;</span> §aglio§
<span style="font-size: 400%;">&#x2606;</span> §stella§
<span style="font-size: 400%;">&#x2764;&#xFE0F;</span> §cuore§
<span style="font-size: 400%;">&#x2702;</span> §forbici§
<span style="font-size: 400%;">&#x1F52C;</span> §microscopio§
<span style="font-size: 400%;">&#x2328;</span> §tastiera§

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
Matematica
Tabelline!
mono
num
6 × 5 fa §30§.
7 × 1 fa §7§.
2 × 3 fa §6§.
3 × 6 fa §18§.
4 × 2 fa §8§.
4 × 6 fa §24§.
3 × 7 fa §21§.
5 × 10 fa §50§.
2 × 5 fa §10§.
5 × 1 fa §5§.
5 × 6 fa §30§.
3 × 8 fa §24§.
7 × 3 fa §21§.
2 × 10 fa §20§.
7 × 6 fa §42§.
6 × 9 fa §54§.
2 × 8 fa §16§.
4 × 4 fa §16§.
3 × 3 fa §9§.
3 × 4 fa §12§.
6 × 2 fa §12§.
3 × 2 fa §6§.
7 × 7 fa §49§.
4 × 9 fa §36§.
4 × 8 fa §32§.
7 × 4 fa §28§.
2 × 4 fa §8§.
7 × 2 fa §14§.
6 × 8 fa §48§.
5 × 4 fa §20§.
5 × 8 fa §40§.
5 × 9 fa §45§.
--- 
Scienze
Gli esseri viventi
bi
alfa
Il §ciclo vitale§ è la caratteristica principale che definisce un essere vivente, e comprende: nascita, crescita, riproduzione e morte.
Del ciclo vitale fanno parte: nascita, §crescita§, riproduzione e morte
La §respirazione§ è lo scambio di gas degli esseri viventi con l'ambiente esterno.
Le §funzioni vitali§ degli esseri viventi sono: respirazione, nutrizione, movimento, riproduzione e reazione agli stimoli.
La §nutrizione§ fa parte delle funzioni vitali, insieme a respirazione, movimento, riproduzione e reazione agli stimoli.
La §reazione agli stimoli§ consente agli esseri viventi di sopravvivere, accorgendosi di eventuali pericoli.

---    
Matematica
Calcolo mentale!
mono
num
8 + 5 fa §13§.
9 + 4 fa §13§.
3 + 9 fa §12§.
7 + 7 fa §14§.
19 + 3 fa §22§.
8 + 6 fa §14§.
11 + 8 fa §19§.
7 + 14 fa §21§.
13 + 9 fa §22§.
2 + 19 fa §21§.
---
Storia
Le ere geologiche
bi
alfa
Gli storici hanno suddiviso la storia della Terra in 5 periodi, chiamati §ere§: era arcaica, era primaria, era secondaria, era terziaria e era quaternaria.

L'§era arcaica§ è il periodo che va da 5 miliardi di anni fa fino a 600 milioni di anni fa.

Nell'era arcaica la Terra si raffreddò e si formò la §crosta terrestre§.<br>Dai gas sprigionati dai vulcani si formò una prima atmosfera.<br>Si formarono delle nuvole, da cui caddero piogge che durarono milioni di anni e fecero formare i mari.

Nell'era arcaica nacquero le prime forme di vita, organismi formati da una sola cellula (§unicellulari§), organismi consumatori, che non producevano cibo per altri esseri viventi.

Circa 1 miliardo di anni fa, alcuni di questi organismi semplici si unirono formando organismi più complessi, §pluricellulari§ (formati da più cellule). Verso la fine di questa era nei mari cominciarono a svilupparsi esseri vivenți differenti fra loro.

Verso la fine dell'era arcaica, si svilupparono i primi §invertebrati§, piccoli animali senza lo scheletro, come le meduse e le spugne e i vermi. Nacquero anche alghe pluricellulari vegetali che produssero ossigeno, tanto ossigeno nell'acqua.

L'§era primaria§ è il periodo che va da 600 a 230 milioni di anni fa.

Nell'era Primaria nacquero i §trilobiti§, piccoli animali con numerose paia di zampe e rivestiti di una corazza.

I §pesci§, dotati di un primo scheletro interno al corpo, nacquero nell'acqua, durante l'era Primaria.<br>Alcuni erano lunghi fino a 10 metri.

Le prime foreste cominciarono a popolare la Terra nell'era Primaria.<br>L'§ossigeno§ sviluppato dalle foreste permise lo sviluppo della vita fuori dalle acque.

Nell'era Primaria alcuni pesci si trasformarono in §anfibi§, animali come rane e rospi, che vivevano fuori dall'acqua.<br>Dagli anfibi si svilupparono poi i rettili, simili a lucertole e serpenti.

L'era Secondaria, o §era Mesozoica§ è il periodo che va da 230 a 65 milioni di anni fa.

Nell'era Mesozoica si svilupparono tante piante e animali come §ragni, insetti e millepiedi§.

Nell'era Mesozoica nacquero anche i primi §dinosauri§, nome che significa "terribile lucertola".<br>Alcuni erano <b>erbivori</b>, altri <b>carnivori</b>.<br>Si estinsero circa 65 milioni anni fa.

L'era Terziaria, o §era Cenozoica§, è il periodo che va da 65 milioni a 2 milioni di anni fa.

Nell'era Terziaria i grandi dinosauri non c'erano più, e si svilupparono velocemente i §mammiferi§, animali provvisti di mammelle, che allattavano i propri cuccioli.

Nell'era Terziaria si svilupparono mammiferi come il <b>rinoceronote lanoso</b>, i primi <b>elefanti</b>, i <b>cavalli</b>, gli <b>ippopotami</b> e i §mammut§.

Nell'era Terziaria si svilupparono, oltre ai mammiferi, anche animali marini come §balene§ e delfini.

I §Primati§ si svilupparono nell'era Terziaria. Erano mammiferi simili alle scimmie di oggi, che vivevano sugli alberi.<br>Erano gli unici ad avere il <b>pollice opponibile</b>.

Nell'era Terziaria, alcuni <b>primati</b> smisero di vivere sugli alberi e cominciarono ad assumere la posizione eretta, simile agli uomini. Per questo sono chiamati §ominidi§.

---
`;
