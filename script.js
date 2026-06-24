 const monList = ["001 Birb", "002 Feenix", "003 Hawkamere", "004 Axolot", "005 Neptoon", "006 Salamight", "007 Gojiru", "008 Gaiaru", "009 Gaiazard", "010 Pachi", "011 Stitchi", "012 Teddychi", "013 Demidemon", "014 Demidevil", "015 Demigorgon", "016 Flauna", "017 Crystelle", "018 Auricorn", "019 Piglit", "020 Poghog", "021 Gigaboar", "022 Murkjaw", "023 Doomfin", "024 Terrorjaw", "025 Glub", "026 Tadglub", "027 Froglob", "028 Moomoo", "029 Bullwark", "030 Aegitaur", "031 Ecto", "032 Toxlic", "033 Noxecution", "034 Nibblesaur", "035 Rubblesaur", "036 Tyrannox", "037 Gnoblin", "038 Snagglin", "039 Garuogre", "040 Dragini", "041 Luvdra", "042 Dragalia", "043 Poplit", "044 Emberlily", "045 Flamara", "046 Terrabone", "047 Terrahorn", "048 Terraclops", "049 Bloaty", "050 Pinpuffer", "051 Bulbosword", "052 Harebelle", "053 Rowdibelle", "054 Bellarina", "055 Lilitad", "056 Lilipet", "057 Lilifrog", "058 Shellin", "059 Glorpin", "060 Glorpius", "061 Zagon", "062 Zellgon", "063 Zagnarok", "064 Cubskull", "065 Gloomcub", "066 Grislybear", "067 Embpurr", "068 Pyremane", "069 Solareon", "070 Wyrmpool", "071 Wyrmwind", "072 Glaedria", "073 Snok", "074 Lunaconda", "075 Cobraclysm", "076 Poppeep", "077 Faequill", "078 Pocobo", "079 Gardslug", "080 Cadeetle", "081 Bugbastion", "082 Squito", "083 Mossquito", "084 Venomite", "085 Polly", "086 Cluccaneer", "087 Beakbeard", "088 Dracobull", "089 Dracohorn", "090 Bullzerker", "091 Gillywatt", "092 Gulpawatt", "093 Lanterror", "094 Charchunk", "095 Infernace", "096 Hadrion", "097 Dumblo", "098 Driftusk", "099 Lullaphant", "100 Helmkin", "101 Hollowisp", "102 Knightgeist", "103 Nessie", "104 Moxasaur", "105 Coralodon", "106 Wilowisp", "107 Wilowraith", "108 Revreaper", "109 Alligyle", "110 Waddlgator", "111 Crocolossus", "112 Redcap", "113 Sporch", "114 Gloomshroom", "115 Psyclod", "116 Psytongue", "117 Psyrock", "118 Pengu", "119 Pengurai", "120 Raironin", "121 Clammler", "122 Shelltler", "123 Shieldler", "124 Bonpot", "125 Bonsprout", "126 Bonblossom", "127 Bitmant", "128 Metalmant", "129 Adamantis", "130 Corsea", "131 Seapuff", "132 Hippoflare", "133 Gurgle", "134 Gurgoyle", "135 Goregyle", "136 Caterbug", "137 Lavalarva", "138 Monarchfly", "139 Gubble", "140 Gyoshi", "141 Bubblegon", "142 Tanooki", "143 Tanuko", "144 Tanukuma", "145 Smoldodo", "146 Opyryx", "147 Ignychus", "148 Blubbo", "149 Narwelt", "150 Narwallop", "151 Grinnlin", "152 Gobjank", "153 Gobsmurk", "154 Cacoto", "155 Cacotid", "156 Cacoton", "157 Chicky", "158 Silligoose", "159 Doomchicken", "160 Glibat", "161 Hexbat", "162 Blightbat", "163 Pokoroko", "164 Shakasaru", "165 Masukusaru", "166 Ghostkit", "167 Netherlynx", "168 Shimmerclaw", "169 Wimpid", "170 Velvolt", "171 Vespabolt", "172 Weenut", "173 Spriggent", "174 Enchantree", "175 Kraba", "176 Krabaghast", "177 Krabaghoul", "178 Dootle", "179 Dingdung", "180 Astrobug", "181 Cawful", "182 Cultcrow", "183 Covencrow", "184 Goopy", "185 Mitomoeba", "186 Protoslime", "187 Mimlick", "188 Fortresst", "189 Ghoulgalion", "190 Fluffin", "191 Owlsage", "192 Arcanowl", "193 Snoosnail", "194 Magmolten", "195 Warloctopus", "196 Jellyzip", "197 Jellyzap", "198 Jellystorm", "199 Rohoot", "200 Rohawk", "201 Griffiron", "202 Elixapot", "203 Elixabrew", "204 Elixadon", "205 Meowmau", "206 Bastcat", "207 Cleocatra", "208 Millapod", "209 Centascale", "210 Dragapede", "211 Kiplet", "212 Kippurr", "213 Kippycat", "214 Toatoad", "215 Toadjinn", "216 Explotoad"];
    const vibes = ["Playful (MAG+/ATK-)", "Lazy (DEF+/ATK-)", "Humble (RES+/ATK-)", "Suave (SPD+/ATK-)", "Spicy (ATK+/MAG-)", "Somber (DEF+/MAG-)", "Mellow (RES+/MAG-)", "Bouncy (SPD+/MAG-)", "Reckless (ATK+/DEF-)", "Dramatic (MAG+/DEF-)", "Sweet (RES+/DEF-)", "Daring (SPD+/DEF-)", "Wild (ATK+/RES-)", "Goofy (MAG+/RES-)", "Clumsy (DEF+/RES-)", "Anxious (SPD+/RES-)", "Fierce (ATK+/SPD-)", "Zesty (MAG+/SPD-)", "Stalwart (DEF+/SPD-)", "Shy (RES+/SPD-)"];
    
    // Placeholders - replace these arrays with your actual data
    const moveList = ["Move A", "Move B", "Move C"]; 
    const passiveList = ["Passive A", "Passive B", "Passive C"];
    const heldItemList = ["Item A", "Item B", "Item C"];

    function createSlot(num) {
        let monOptions = monList.map(mon => `<option>${mon}</option>`).join('');
        let vibeOptions = vibes.map(v => `<option>${v}</option>`).join('');
        let moveOptions = moveList.map(m => `<option>${m}</option>`).join('');
        let passiveOptions = passiveList.map(p => `<option>${p}</option>`).join('');
        let itemOptions = heldItemList.map(i => `<option>${i}</option>`).join('');
        
        let tierOpts = ['S','A','B','C','D'].map(t => `<option>${t}</option>`).join('');
        let invOpts = ['0','1','2','3'].map(i => `<option>${i}</option>`).join('');
        
        return `<div class="slot"><div class="segment-title tab-slot">SLOT ${num}</div>
        <div style="display: flex; gap: 11px; margin-top: 11px; margin-bottom: 17px; align-items: center;">
            <input type="text" placeholder="NICKNAME" style="flex:1;"> Lv <input type="number" value="50" style="width: 60px;"> 
            <label class="sparkle-label" style="display:flex; align-items:center; gap:4px; color: var(--black);"><input type="checkbox" class="sparkle-checkbox"> SPARKLE</label>
        </div>
        
        <div class="section-box"><div class="segment-title tab-moveset">MOVESET</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 11px;">
                <select id="move1-${num}"><option>Move 1</option>${moveOptions}</select>
                <select id="move2-${num}"><option>Move 2</option>${moveOptions}</select>
                <select id="move3-${num}"><option>Move 3</option>${moveOptions}</select>
                <select id="move4-${num}"><option>Move 4</option>${moveOptions}</select>
            </div>
        </div>

        <div class="section-box passives-box"><div class="segment-title tab-passives">PASSIVES</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 11px;">
                <select id="pass1-${num}"><option>Passive 1</option>${passiveOptions}</select>
                <select id="pass2-${num}"><option>Passive 2</option>${passiveOptions}</select>
                <select id="pass3-${num}"><option>Passive 3</option>${passiveOptions}</select>
                <select id="pass4-${num}"><option>Passive 4</option>${passiveOptions}</select>
            </div>
        </div>
        
        <div class="sprite-section">
            <div class="sprite-box" style="flex:1;"></div>
            <div class="info-col" style="flex:1;">
                <select id="monSelect-${num}" style="margin-bottom: 5px;"><option>Select Mon</option>${monOptions}</select>
                <select id="itemSelect-${num}"><option>Held Item</option>${itemOptions}</select>
            </div>
        </div>

        <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <input type="text" placeholder="House 1" style="flex:1;"> 
            <input type="text" placeholder="House 2" style="flex:1;">
        </div>

        <div class="stats-panel"><div class="segment-title tab-stats">STATS</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${['HP','ATK','MAG','DEF','RES','SPD'].map(s => `<div class="stat-row"><span style="width:30px; font-weight:bold; font-size:11px; color: var(--black);">${s}</span> <select style="width:45px; padding:2px;">${tierOpts}</select><select style="width:40px; padding:2px;">${invOpts}</select><div class="stat-bar"><div class="stat-bar-fill"></div></div><span style="font-size:11px; width:15px; text-align:right; color: var(--black);">40</span></div>`).join('')}
            </div>
            <div style="margin-top:15px; border-top:1px solid var(--black); padding-top:10px;"><label style="font-weight:bold; color: var(--black);">VIBE:</label> <select style="margin-top:5px;">${vibeOptions}</select></div>
        </div></div>`;
    }
    const slotArea = document.getElementById('slot-area');
    for(let i=1; i<=4; i++) slotArea.innerHTML += createSlot(i);
    const types = ["Fireborn","Atlantian","Overgrowth","Whimsical","Nightwatch","Mystic","Dragoon","Ironclad","Brawler","Normal"];
    function fillTable(tableId) {
        const tbody = document.querySelector(`#${tableId} tbody`);
        types.forEach(type => { tbody.innerHTML += `<tr><td class="row-header">${type}</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>0</td></tr>`; });
    }
    fillTable('off-table'); fillTable('def-table');