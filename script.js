// 1. Load your monster keys directly from the data object
const monList = Object.keys(monData);

// Keep these as they are (or update to pull from data.js later)
const vibes = ["Playful (MAG+/ATK-)", "Lazy (DEF+/ATK-)", "Humble (RES+/ATK-)", "Suave (SPD+/ATK-)", "Spicy (ATK+/MAG-)", "Somber (DEF+/MAG-)", "Mellow (RES+/MAG-)", "Bouncy (SPD+/MAG-)", "Reckless (ATK+/DEF-)", "Dramatic (MAG+/DEF-)", "Sweet (RES+/DEF-)", "Daring (SPD+/DEF-)", "Wild (ATK+/RES-)", "Goofy (MAG+/RES-)", "Clumsy (DEF+/RES-)", "Anxious (SPD+/RES-)", "Fierce (ATK+/SPD-)", "Zesty (MAG+/SPD-)", "Stalwart (DEF+/SPD-)", "Shy (RES+/SPD-)"];
const moveList = ["Move A", "Move B", "Move C"]; 
const passiveList = ["Passive A", "Passive B", "Passive C"];
const heldItemList = ["Item A", "Item B", "Item C"];

function createSlot(num) {
    let monOptions = monList.map(mon => `<option value="${mon}">${mon}</option>`).join('');
    let vibeOptions = vibes.map(v => `<option>${v}</option>`).join('');
    let moveOptions = moveList.map(m => `<option>${m}</option>`).join('');
    let passiveOptions = passiveList.map(p => `<option>${p}</option>`).join('');
    let itemOptions = heldItemList.map(i => `<option>${i}</option>`).join('');
    
    let tierOpts = ['S','A','B','C','D'].map(t => `<option>${t}</option>`).join('');
    let invOpts = ['0','1','2','3'].map(i => `<option>${i}</option>`).join('');
    
    return `<div class="slot" id="slot-${num}">
        <div class="segment-title tab-slot">SLOT ${num}</div>
        <div style="display: flex; gap: 11px; margin-top: 11px; margin-bottom: 17px; align-items: center;">
            <input type="text" placeholder="NICKNAME" style="flex:1;"> Lv <input type="number" value="50" style="width: 60px;"> 
            <label class="sparkle-label" style="display:flex; align-items:center; gap:4px; color: var(--black);">
                <input type="checkbox" class="sparkle-checkbox" onchange="updateSlot(${num})"> SPARKLE
            </label>
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
            <div class="sprite-box" style="flex:1; background-size: contain; background-repeat: no-repeat;"></div>
            <div class="info-col" style="flex:1;">
                <select id="monSelect-${num}" style="margin-bottom: 5px;" onchange="updateSlot(${num})">
                    <option value="">Select Mon</option>${monOptions}
                </select>
                <select id="itemSelect-${num}"><option>Held Item</option>${itemOptions}</select>
            </div>
        </div>

        <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <input type="text" id="house1-${num}" placeholder="House 1" style="flex:1;"> 
            <input type="text" id="house2-${num}" placeholder="House 2" style="flex:1;">
        </div>

        <div class="stats-panel"><div class="segment-title tab-stats">STATS</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${['HP','ATK','MAG','DEF','RES','SPD'].map(s => `
                    <div class="stat-row">
                        <span style="width:30px; font-weight:bold; font-size:11px; color: var(--black);">${s}</span> 
                        <select style="width:45px; padding:2px;">${tierOpts}</select>
                        <select style="width:40px; padding:2px;">${invOpts}</select>
                        <div class="stat-bar"><div class="stat-bar-fill"></div></div>
                        <span style="font-size:11px; width:15px; text-align:right; color: var(--black);">40</span>
                    </div>`).join('')}
            </div>
            <div style="margin-top:15px; border-top:1px solid var(--black); padding-top:10px;">
                <label style="font-weight:bold; color: var(--black);">VIBE:</label> <select style="margin-top:5px;">${vibeOptions}</select>
            </div>
        </div>
    </div>`;
}

// 2. The update function that links UI to data.js
function updateSlot(num) {
    const monKey = document.getElementById(`monSelect-${num}`).value;
    if (!monKey) return;

    const isSparkly = document.querySelector(`#slot-${num} .sparkle-checkbox`).checked;
    const variant = isSparkly ? "sparkly" : "normal";
    const data = monData[monKey][variant];

    // Update Houses
    document.getElementById(`house1-${num}`).value = data.houses[0] || "";
    document.getElementById(`house2-${num}`).value = data.houses[1] || "";

    // Update Sprite
    const spriteBox = document.querySelector(`#slot-${num} .sprite-box`);
    spriteBox.style.backgroundImage = `url('${data.sprite}')`;
}

// 3. Initialize Slots
const slotArea = document.getElementById('slot-area');
for(let i=1; i<=4; i++) slotArea.innerHTML += createSlot(i);

// 4. Fill Tables
const types = ["Fireborn","Atlantian","Overgrowth","Whimsical","Nightwatch","Mystic","Dragoon","Ironclad","Brawler","Normal"];
function fillTable(tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    if (!tbody) return;
    types.forEach(type => { 
        tbody.innerHTML += `<tr><td class="row-header">${type}</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>-</td><td>0</td></tr>`; 
    });
}
fillTable('off-table'); fillTable('def-table');