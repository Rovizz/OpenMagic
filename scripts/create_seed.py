import json
import os

tsv_data = """
# TECNICHE
# id | titolo | categoria | livello | tags | prerequisiti | query | descrizione
slip-cut|Slip Cut|tecnica|1|tagli,controllo|mechanics-grip|slip cut tutorial card magic 52Kards|Un taglio rapido che mantiene in cima la prima carta del mazzo.
false-cut-1|False Cut Semplice|tecnica|1|tagli,falso|swing-cut|simple false cut card magic tutorial|Un falso taglio da tavolo o in mano che inganna il pubblico mantenendo il mazzo intatto.
braid-cut|Braid Cut|tecnica|1|tagli,flourish|swing-cut|braid cut cardistry tutorial|Un taglio a tre mazzetti molto fluido ed elegante per arricchire una routine.
charlier-shuffle|Charlier Shuffle|tecnica|1|miscugli,falso|mechanics-grip|charlier shuffle tutorial false shuffle|Un falso miscuglio in mano, dall'apparenza casuale, utilissimo per mantenere tutto il mazzo in ordine.
stripper-deck-basics|Mazzo Stripper (Basi)|tecnica|1|gimmick,base||stripper deck tutorial card magic|Le basi per utilizzare il mazzo conico (stripper deck) e trovare le carte al tatto.
invisible-deck-basics|Invisible Deck (Basi)|tecnica|1|gimmick,base||invisible deck presentation tutorial|Come gestire e memorizzare le logiche base del famoso mazzo invisibile.
svengali-basics|Mazzo Svengali (Basi)|tecnica|1|gimmick,base||svengali deck tutorial card magic|Le mosse base e la gestione delle carte corte nel classico mazzo Svengali.
key-card-placement|Piazzamento Key Card|tecnica|1|controllo,key-card|key-card|key card placement control tutorial|Metodi più puliti e invisibili per posizionare e rintracciare la carta chiave.
peek-bottom|Bottom Peek|tecnica|1|peek,controllo|mechanics-grip|bottom peek card magic tutorial|Come sbirciare segretamente la carta in fondo al mazzo.
peek-top|Top Peek|tecnica|1|peek,controllo|mechanics-grip|top peek card magic tutorial|Metodi per sbirciare in modo invisibile la carta in cima.
thumb-count|Thumb Count|tecnica|2|conteggio,break|thumb-break|thumb count card magic tutorial|Contare le carte col pollice dal fondo o dalla cima per prendere un break.
biddle-steal|Biddle Steal|tecnica|2|steal,controllo|biddle-grip|biddle steal card magic tutorial|Rubare segretamente una o più carte mentre si passano le carte in biddle grip.
kelly-bottom-placement|Kelly Bottom Placement|tecnica|2|controllo,bottom|pinky-break|kelly bottom placement Oram tutorial|Un controllo ingegnoso per portare segretamente una carta scelta sul fondo del mazzo.
braue-reversal|Braue Reversal|tecnica|2|reversal,controllo|pinky-break|braue reversal card magic tutorial|Girare a faccia in su mezza metà mazzo in maniera nascosta, utilissimo per i sandwich e trionfi.
half-pass|Half Pass|tecnica|2|pass,reversal|pinky-break|half pass card magic tutorial|Girare segretamente metà mazzo, fondamentale in molti effetti.
slip-force|Slip Force|tecnica|2|forzatura|slip-cut|slip force tutorial card magic|Forzare la carta in cima facendola scivolare nel mezzo durante un taglio.
hindu-force|Hindu Force|tecnica|2|forzatura|hindu-shuffle|hindu shuffle force tutorial|Forzare la carta sul fondo fermandosi al comando dello spettatore durante l'hindu shuffle.
dribble-force|Dribble Force|tecnica|2|forzatura|dribble|dribble force tutorial card magic|Forzatura fluida e apparentemente equa durante una caduta (dribble) di carte.
spread-cull-force|Spread Cull Force|tecnica|2|forzatura|cull|spread cull force tutorial|Usare il cull per posizionare segretamente una carta sotto le dita per una forzatura perfetta.
classic-force|Classic Force|tecnica|3|forzatura,psicologia|ribbon-spread|classic force card magic tutorial|La forzatura psicologica più iconica, difficile ma devastante. Sembra una scelta al 100% libera.
erickase-change|Erickase Change|tecnica|3|cambio,visivo|double-lift|erickase change color change tutorial|Un cambio di colore estremamente visivo e ingannevole.
snap-change|Snap Change|tecnica|2|cambio,visivo|double-lift|snap change tutorial card magic|Il cambio istantaneo di Ed Marlo, utilissimo per YouTube o TikTok.
houdini-color-change|Houdini Color Change|tecnica|2|cambio,visivo|mechanics-grip|houdini color change tutorial|Un cambio di colore sfregando il mazzo, noto anche come Erdnase Change.
twirl-change|Twirl Change|tecnica|2|cambio,visivo|double-lift|twirl change card magic tutorial|Cambio elegante effettuato facendo ruotare (twirl) la carta tra le dita.
shape-shifter|Shape Shifter Change|tecnica|2|cambio,visivo|double-lift|shape shifter color change tutorial|Piegare la carta leggermente e farla scattare per un cambio colore immediato.
cardini-change|Cardini Change|tecnica|3|cambio,visivo|double-lift|cardini change tutorial card magic|Un cambio superbo in cui la carta sparisce o cambia, proiettata dal mazzo.
mexican-turnover|Mexican Turnover|tecnica|3|cambio,switch|double-lift|mexican turnover card switch tutorial|Scambiare due carte girandone una con l'altra sul tavolo.
km-move|K.M. Move|tecnica|3|switch,reversal|biddle-grip|K M move card magic tutorial|Kardyro-Marlo move, utilissima per nascondere facce invertite durante le routine di packet tricks.
asperse-change|Asperse Change|tecnica|3|cambio,visivo|mechanics-grip|asperse change color change tutorial|Cambio visivo simile allo snap change, molto pulito.
bottom-palm|Bottom Palm|tecnica|3|palming|mechanics-grip|bottom palm tutorial card magic|Impalmare la carta in fondo al mazzo con la mano sinistra o destra.
diagonal-palm-shift|Diagonal Palm Shift|tecnica|3|palming,steal|pinky-break|diagonal palm shift DPS tutorial|DPS (Erdnase), rubare la carta direttamente in posizione di palm mentre viene inserita nel mazzo.
top-palm-multiple|Multiple Top Palm|tecnica|3|palming|classic-palm|multiple top palm tutorial card magic|Impalmare simultaneamente diverse carte dalla cima.
one-hand-top-palm|One Hand Top Palm|tecnica|3|palming|classic-palm|one hand top palm tutorial card magic|Un'impamaggio a una mano sola, rapidissimo e invisibile se coperto dal movimento del corpo.
center-deal|Center Deal|tecnica|3|deal,avanzato|dealing-position|center deal card magic tutorial|Distribuire carte direttamente dal centro del mazzo (livello super avanzato).
greek-deal|Greek Deal|tecnica|3|deal,avanzato|bottom-deal|greek deal card magic tutorial|Simile al bottom deal ma prendendo la penultima carta.
pushoff-double|Push-Off Double Lift|tecnica|3|cambio,avanzato|double-lift|push off double lift tutorial|Un double lift eseguito senza break preventivo, spingendo due carte come una sola.
strike-double|Strike Double Lift|tecnica|2|cambio,avanzato|double-lift|strike double lift tutorial|Altra variante di double lift, si sente lo scalino con le dita. Ottimo da mazzo poggiato.
stuard-gordon-double|Stuart Gordon Double|tecnica|3|cambio,avanzato|double-lift|stuart gordon double turnover tutorial|Un turnover elegantissimo e floreale che nasconde perfettamente il fatto che le carte siano due.
vernon-addition|Vernon Addition|tecnica|3|switch,biddle|biddle-grip|vernon addition card switch tutorial|Scambio elegante di un mazzetto mentre lo si appoggia al mazzo.
atfus|A.T.F.U.S.|tecnica|3|switch,avanzato|biddle-grip|ATFUS move tutorial card magic|Any Time Face Up Switch, tecnica avanzata per scambiare carte in packet tricks.
tent-vanish|Tent Vanish|tecnica|2|vanish,cambio|mechanics-grip|tent vanish card magic tutorial|Una carta viene coperta momentaneamente "a tenda" e sparisce nel nulla.
rub-a-dub-vanish|Rub-a-Dub Vanish|tecnica|2|vanish|mechanics-grip|rub a dub vanish tutorial card magic|Appoggiare la carta sul tavolo o tappetino sfregandola, facendola svanire.
false-riffle-triumph|False Riffle (Triumph)|tecnica|3|miscugli,falso|riffle-shuffle|false tabled riffle shuffle triumph tutorial|Il miscuglio falso da tavolo usato comunemente nella versione classica di Triumph.
faro-false-shuffle|Faro False Shuffle|tecnica|3|miscugli,falso|faro-shuffle|full deck faro false shuffle tutorial|Un falso miscuglio usando i principi del faro.
rhythm-count|Rhythm Count|tecnica|3|conteggio,falso|elmsley-count|rhythm count card magic tutorial|Un falso conteggio fluido per mostrare packet di 4 o 5 carte in vari stati.
gemini-count|Gemini Count|tecnica|3|conteggio,falso|elmsley-count|gemini count tutorial card magic|Variante avanzata per packet trick usata in effetti come B-Wave o Twisted Sisters.
# TRUCCHI
invisible-deck-routine|Routine Invisible Deck|trucco|1|routine,gimmick|invisible-deck-basics|invisible deck full routine performance tutorial|Una routine pazzesca dove una carta pensata risulta l'unica capovolta in un mazzo tenuto fermo.
svengali-routine|Routine Svengali Completa|trucco|1|routine,gimmick|svengali-basics|svengali deck magic trick tutorial routine|Come strabiliare col mazzo Svengali dalla forzatura al cambio totale del mazzo.
stripper-find-four|Trova i 4 Assi (Stripper)|trucco|1|routine,gimmick|stripper-deck-basics|stripper deck four aces trick tutorial|Ritrovare istantaneamente i quattro assi mescolati nel mazzo.
biddle-trick|The Biddle Trick|trucco|2|classico,vanish|biddle-steal|biddle trick card magic tutorial|5 carte, lo spettatore ne pensa una. Sparisce dalle 5 e si ritrova nel mazzo.
design-for-laughter|Design for Laughter|trucco|1|royal-road,classico|glide|design for laughter card trick tutorial|Dalla Royal Road to Card Magic: si scambia la carta con un Glide lasciando lo spettatore confuso.
designated-hitter|Designated Hitter|trucco|2|impromptu,sorpresa|double-lift|designated hitter card trick tutorial|Una bellissima routine dove una carta predetta aiuta a trovare la selezione.
french-kiss|French Kiss|trucco|3|street,sorpresa|mercury-fold|french kiss wayne houchin tutorial|Le carte piegate e firmate finiscono per scambiarsi direttamente nella bocca dello spettatore (Wayne Houchin).
mercury-card-fold|Mercury Card Fold|tecnica|3|piegatura,street|pinky-break|mercury card fold tutorial|Piegare segretamente e in quarti una carta in una frazione di secondo.
here-then-there|Here Then There|trucco|2|street,scambio|double-lift|here then there card trick tutorial|La carta in mano del mago si scambia incredibilmente con quella nella mano dello spettatore.
b-wave|B-Wave (Basi)|trucco|2|packet,mentalismo|elmsley-count|b-wave card trick tutorial max maven|Il celebre effetto packet di Max Maven: una regina scelta liberamente è l'unica faccia in su e l'unica con dorso diverso.
twisting-the-aces|Twisting the Aces|trucco|3|packet,classico|elmsley-count|twisting the aces dai vernon tutorial|I 4 assi girano a faccia in su uno ad uno con una semplice torsione, capolavoro di Vernon.
cannibal-cards|Cannibal Cards|trucco|3|packet,storytelling|atfus|cannibal cards trick tutorial|Quattro re "cannibali" mangiano uno alla volta le altre carte.
oil-and-water|Oil and Water (Acqua e Olio)|trucco|3|packet,classico|elmsley-count|oil and water card trick tutorial|Carte rosse e nere mescolate si separano sempre da sole.
dr-daleys-last-trick|Dr. Daley's Last Trick|trucco|2|packet,classico|double-lift|dr daleys last trick tutorial|Due assi rossi e due neri si scambiano di posto nelle mani degli spettatori, impatto enorme.
macdonalds-aces|MacDonald's Aces|trucco|3|gimmick,assi|double-lift|macdonalds aces card trick tutorial|La scomparsa più pulita e visiva degli assi da 3 mazzetti per riunirsi nel mazzetto master.
haunted-deck|Haunted Deck (Loop)|trucco|2|loop,street||haunted deck tutorial loop yigal mesika|Il mazzo si taglia da solo e spinge fuori la carta, animato magicamente (usando loops).
color-monte|Color Monte|trucco|2|packet,street|glide|color monte card trick tutorial|Routine da strada in cui uno spettatore cerca di seguire il diamante rosso, finendo con un dollaro di sorpresa.
jazz-aces|Jazz Aces|trucco|3|packet,assi|elmsley-count|jazz aces peter kane tutorial|Gli assi spariscono per raggiungere l'asso leader. Effetto simile ai MacDonalds ma impromptu.
card-warp|Card Warp|trucco|2|street,illusione||card warp tutorial roy walton|Una carta si rivolta dentro un'altra usata come tunnel. Illusione visiva fantastica creata da Roy Walton.
anniversary-waltz|Anniversary Waltz|trucco|3|romantico,firme|double-lift|anniversary waltz card trick tutorial|Due carte firmate da due innamorati si fondono in un'unica carta. Ottimo per coppie.
invisible-palm|Invisible Palm|trucco|3|palming,assi|tent-vanish|invisible palm aces paul harris tutorial|Gli assi diventano invisibili e viaggiano sul tavolo, routine famosa di Paul Harris.
collector|The Collectors|trucco|3|assi,cull|cull|collectors card trick tutorial|I quattro assi "catturano" le tre carte selezionate precedentemente disperse nel mazzo.
spectator-cuts-to-aces|Spectator Cuts to the Aces|trucco|2|impromptu,assi|slip-cut|spectator cuts to the aces tutorial|Lo spettatore taglia il mazzo in 4 mazzetti e miracolosamente trova i 4 assi.
play-it-straight|Play It Straight Triumph|trucco|3|triumph,sorpresa|faro-shuffle|play it straight triumph john bannon|Triumph letale in cui il mazzo si riordina tranne l'intero seme della carta scelta (John Bannon).
las-vegas-leaper|Las Vegas Leaper|trucco|2|cards-across,paul-harris|biddle-grip|las vegas leaper paul harris tutorial|Classica routine "Cards Across", le carte viaggiano dalle mani del mago alle mani dello spettatore.
lazy-mans-card-trick|Lazy Man's Card Trick|trucco|1|impromptu,matematico|key-card|lazy mans card trick tutorial|Il mago non fa nulla, è lo spettatore a mescolare e trovare la carta usando il suo valore.
four-ace-production|Four Ace Production (varie)|trucco|2|flourish,produzione|swing-cut|four ace production tutorial card magic|Vari modi eleganti e veloci per produrre 4 assi da un mazzo mescolato per iniziare una routine.
brainwave|Brainwave Deck|trucco|1|gimmick,mentalismo|invisible-deck-basics|brainwave deck magic trick tutorial|Variante dell'invisible deck in cui la carta pensata non solo è l'unica a faccia in su ma ha pure il dorso di colore diverso.
multiple-selection|Multiple Selection Routine|trucco|3|routine,spettacolo|cull|multiple selection routine tutorial card magic|Vengono fatte scegliere e poi perse 5+ carte e ritrovate tutte in modi scenici e uno diverso dall'altro.
# CARDISTRY
werm-variations|Werm Variations|cardistry|2|flourish,multi-packet|werm|werm variations cardistry tutorial|Varianti creative e complesse del classico Werm di Dan e Dave.
genesis-cut|Genesis Cut|cardistry|2|taglio,multi-packet|sybil-cut|genesis cut cardistry tutorial|Evoluzione del sybil con un ritmo differente e aperture molto squadrate.
squall-cut|Squall Cut|cardistry|2|taglio,dinamico|revolution-cut|squall cut cardistry tutorial|Un taglio a due mani molto dinamico, pieno di flip e rotazioni.
mantis|Mantis|cardistry|3|taglio,avanzato|straddle-grip|mantis cardistry tutorial|Un florish intricato inventato dai cardist di Singapore. Esteticamente incredibile.
squoze|Squoze|cardistry|3|taglio,multi-packet|phaced|squoze cardistry tutorial|Un taglio a due mani di Dimitri Arleri molto compresso ma esplosivo.
kryptonite|Kryptonite|cardistry|2|taglio,dinamico|sybil-cut|kryptonite cardistry cut tutorial|Un buon intermedio a due mani che introduce display asimmetrici.
hot-shot-cut|Hot Shot Cut|cardistry|2|produzione,volo|swing-cut|hot shot cut daryl tutorial|Produzione inventata da Daryl in cui una carta schizza fuori dal mazzo ruotando come un boomerang.
flicker|Flicker|cardistry|1|twirl,una mano|mechanics-grip|flicker shot cardistry tutorial|Far volteggiare una singola carta sul pollice, base per molti shot (Huron Low).
flicker-shot|Flicker Shot|cardistry|2|shot,volo|flicker|flicker shot cardistry tutorial|Volteggio seguito dal tiro istantaneo della carta verso l'altra mano.
backdrop|Backdrop|cardistry|2|shot,volo|flicker|backdrop cardistry tutorial|Sparare una carta da dietro la spalla per farla finire nel mazzo.
bullet|Bullet|cardistry|2|twirl,una mano|mechanics-grip|bullet twirl cardistry tutorial|Un elegante twirl di una carta sul dorso della mano, ideato da Andrei Jikh.
carnahan-fan|Carnahan Fan|cardistry|2|ventaglio,una mano|thumb-fan|carnahan fan cardistry tutorial|Ventaglio stupendo eseguito con una mano dopo una specifica rotazione.
smear-fan|Smear Fan|cardistry|1|ventaglio,una mano|thumb-fan|smear fan cardistry tutorial|Il ventaglio a una mano più comune e versatile, si strofina il pollice contro il mazzo.
rifle-fan|Riffle Fan|cardistry|3|ventaglio,circolare|mechanics-grip|riffle fan tutorial cardistry|Ventaglio mozzafiato a 360 gradi, tenuto su una base piccolissima (Dimitri Arleri).
curly-q|Curly Q|cardistry|3|cascata,ventaglio|spring|curly Q cardistry fan tutorial|Creare un nastro tridimensionale arricciato in aria con tutto il mazzo.
pandora|Pandora|cardistry|3|taglio,dinamico|sybil-cut|pandora cardistry tutorial dan dave|Il leggendario taglio esplosivo di Dan & Dave, capolavoro di coordinazione.
madonna|Madonna|cardistry|3|taglio,dinamico|sybil-cut|madonna 1 cardistry tutorial dan dave|Taglio avanzato, pieno di fioriture e packet in rotazione.
jackson-five|Jackson Five|cardistry|3|taglio,display|sybil-cut|jackson five cardistry tutorial dan dave|Display a cinque pacchetti famosissimo ideato da Dan e Dave.
legolove|Legolove|cardistry|2|twirl,singola|mechanics-grip|legolove cardistry twirl tutorial|Un twirl pazzesco attorno al dito, con una singola carta.
retractor|Retractor|cardistry|2|singola,dinamico|legolove|retractor cardistry tutorial|Una manovra di isolamento su una singola carta che sembra sfidare la fisica.
isoceles|Isoceles|cardistry|3|display,geometrico|straddle-grip|isoceles cardistry tutorial|Display geometrico a triangoli usando i mazzetti del mazzo.
"""

def generate_json_seed():
    items = []
    lines = [l.strip() for l in tsv_data.split('\n') if l.strip() and not l.startswith('#')]
    for line in lines:
        parts = line.split('|')
        if len(parts) == 8:
            id_, titolo, categoria, livello, tags_str, prereq_str, query, desc = parts
            item = {
                "id": id_,
                "titolo": titolo,
                "categoria": categoria,
                "livello": int(livello),
                "tags": [t for t in tags_str.split(',') if t],
                "descrizione": desc,
                "prerequisiti": [p for p in prereq_str.split(',') if p],
                "search_query": query
            }
            items.append(item)
    
    os.makedirs('data', exist_ok=True)
    with open('data/new_items_seed.json', 'w', encoding='utf8') as f:
        json.dump(items, f, indent=2, ensure_ascii=False)
    print(f"Generated {len(items)} items in data/new_items_seed.json")

if __name__ == '__main__':
    generate_json_seed()
