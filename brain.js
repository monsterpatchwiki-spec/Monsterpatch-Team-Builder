/* @language javascript */
// This file contains the logic and data for Monsterpatch Squad Builder this is also a comment
const effectivenessChart = {
    "Overgrowth": { "Atlantian": 2, "Whimsical": 2, "Fireborn": 0.5, "Nightwatch": 0.5 },
    "Atlantian": { "Fireborn": 2, "Brawler": 2, "Overgrowth": 0.5, "Whimsical": 0.5 },
    "Fireborn": { "Overgrowth": 2, "Ironclad": 2, "Atlantian": 0.5, "Brawler": 0.5 },
    "Whimsical": { "Atlantian": 2, "Nightwatch": 2, "Overgrowth": 0.5, "Dragoon": 0.5 },
    "Nightwatch": { "Overgrowth": 2, "Mystic": 2, "Whimsical": 0.5, "Dragoon": 0.5 },
    "Dragoon": { "Nightwatch": 2, "Whimsical": 2, "Ironclad": 0.5, "Mystic": 0.5 },
    "Ironclad": { "Dragoon": 2, "Mystic": 2, "Fireborn": 0.5, "Brawler": 0.5 },
    "Mystic": { "Dragoon": 2, "Brawler": 2, "Nightwatch": 0.5, "Ironclad": 0.5 },
    "Brawler": { "Fireborn": 2, "Ironclad": 2, "Atlantian": 0.5, "Mystic": 0.5 },
};
 // --- 0. DATA & CONFIG ---
const typeColors = {
    "Fireborn": "#d15c62",
    "Atlantian": "#4b689f",
    "Overgrowth": "#A2BA9C",
    "Whimsical": "#d8bc6a",
    "Nightwatch": "#874185",
    "Mystic": "#DE9996",
    "Dragoon": "#342420",
    "Ironclad": "#808a91",
    "Brawler": "#89514E",
    "Normal": "#eadfc1"
};

// Map types to house_#.png indices (adjust the numbers to match your actual files)
const typeToIcon = {
    "Fireborn": "assets/House_1.png", 
    "Atlantian": "assets/House_2.png", 
    "Overgrowth": "assets/House_3.png",
    "Whimsical": "assets/House_4.png", 
    "Nightwatch": "assets/House_5.png", 
    "Mystic":"assets/House_8.png",
    "Dragoon": "assets/House_7.png", 
    "Ironclad": "assets/House_9.png", 
    "Brawler": "assets/House_6.png"
    };

const moveData = {
    "Normal": {
        "T0": [
            { name: "CLAWS", pm: "P", type: "Damage", power: 20, trigger: 2, scale: "ATK", target: "Single Enemy", tag: null, cd: 0, effect: null },
            { name: "PUNCH", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 0, effect: null },
            { name: "NIBBLE", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 0, effect: null },
            { name: "BONK", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "STAB", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 0, effect: null }
        ],
        "T1": [
            { name: "SLASH", pm: "P", type: "Damage", power: 60, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 0, effect: null },
            { name: "WINGS", pm: "P", type: "Damage", power: 30, trigger: 2, scale: "ATK", target: "Single Enemy", tag: null, cd: 0, effect: null },
            { name: "TAIL SLAM", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "JUMP KICK", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to EVADE 3." }
        ],
        "T2": [
            { name: "HORN", pm: "P", type: "Damage", power: 80, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "BARRAGE", pm: "P", type: "Damage", power: 20, trigger: 3, scale: "ATK", target: "Front Enemies", tag: null, cd: 1, effect: null },
            { name: "TALONS", pm: "P", type: "Damage", power: 30, trigger: 3, scale: "ATK", target: "Single Enemy", tag: "[Talons]", cd: 1, effect: null },
            { name: "NEEDLE LANCE", pm: "P", type: "Damage", power: 20, trigger: 4, scale: "ATK", target: "Random Enemy", tag: "[Lance]", cd: 1, effect: null },
            { name: "LICK", pm: "P", type: "Damage", power: 65, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: "50% Chance to remove all BUFFS. 50% Chance to remove all enemy tokens." }
        ],
        "T3": [
            { name: "CLOBBER", pm: "P", type: "Damage", power: 100, trigger: 1, scale: "ATK", target: "Random Enemy", tag: null, cd: 3, effect: "25% Chance to STUN 1." },
            { name: "EXPLODE", pm: "P", type: "Damage", power: 100, trigger: 1, scale: "ATK", target: "All Enemies", tag: null, cd: 3, effect: "User faints." }
        ]
    },
    "Fireborn": {
        "T0": [
            { name: "METEOR", pm: "M", type: "Damage", power: 15, trigger: 3, scale: "MAG", target: "Random Enemy", tag: null, cd: 1, effect: "25% Chance to BURN 2." },
            { name: "FIREBALL", pm: "M", type: "Damage", power: 30, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: "100% Chance to spawn 1 SUNLIGHT." },
            { name: "SCORCH", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Front Enemies", tag: null, cd: 1, effect: "50% Chance to BURN 2." }
        ],
        "T1": [
            { name: "HEAT SHIELD", pm: "M", type: "Shield", power: 20, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 2, effect: "100% Chance to RES UP 2." },
            { name: "BLAZE BLAST", pm: "P", type: "Damage", power: 60, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to BURN 5." },
            { name: "WILDFIRE", pm: "M", type: "Damage", power: 20, trigger: 4, scale: "MAG", target: "Random Enemy", tag: null, cd: 2, effect: "25% Chance to BURN 2." },
            { name: "FIRE BREATH", pm: "M", type: "Damage", power: 50, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "50% Chance to BURN 2. 50% Chance to RES BREAK 2." }
        ],
        "T2": [
            { name: "ENFLAME", pm: "M", type: "Shield", power: 20, trigger: 2, scale: "MAG", target: "Self", tag: null, cd: 2, effect: "25% Chance to MAG UP 2. 25% Chance to HASTE 2." },
            { name: "WISPS", pm: "M", type: "Heal", power: 40, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 2, effect: "100% Chance to remove 1 DEBUFF." },
            { name: "FIERY HORNS", pm: "P", type: "Damage", power: 60, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: "25% Chance to BURN 2." },
            { name: "FIRE FLOWER", pm: "M", type: "Damage", power: 70, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "50% Chance to BURN 2. 50% Chance to POISON 2." },
            { name: "INFERNO PUNCH", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 2, effect: "100% Chance to BURN 10." },
            { name: "FIRE TOWER", pm: "M", type: "Damage", power: 80, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "50% Chance to BURN 2. 50% Chance to RES BREAK 2." }
        ],
        "T3": [
            { name: "VOLCANO", pm: "P", type: "Damage", power: 120, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: null },
            { name: "FIERY REIGN", pm: "M", type: "Damage", power: 30, trigger: 4, scale: "MAG", target: "Random Enemy", tag: null, cd: 3, effect: "75% Chance to BURN 3." },
            { name: "FIRE BEAM", pm: "M", type: "Damage", power: 110, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Beam]", cd: 3, effect: "CONSUME SUNLIGHT: Increase power by 50." }
        ]
    },
    "Atlantian": {
        "T0": [
            { name: "DEWDROP", pm: "M", type: "Heal", power: 20, trigger: 3, scale: "MAG", target: "Random Ally", tag: null, cd: 1, effect: "25% Chance to REGEN 2." },
            { name: "TORRENT", pm: "P", type: "Damage", power: 30, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: "50% Chance to DEF BREAK 2." },
            { name: "DOUBLE BUBBLE", pm: "M", type: "Damage", power: 20, trigger: 2, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "WAVE SPLASH", pm: "M", type: "Damage", power: 40, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: null }
        ],
        "T1": [
            { name: "WHIRL", pm: "M", type: "Damage", power: 20, trigger: 3, scale: "MAG", target: "Random Enemy", tag: null, cd: 2, effect: "100% Chance to remove 1 BUFF." },
            { name: "AQUALUNG", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "All Enemies", tag: null, cd: 2, effect: null },
            { name: "SKY CANNON", pm: "P", type: "Damage", power: 30, trigger: 2, scale: "ATK", target: "Random Enemy", tag: "[Cannon]", cd: 2, effect: "100% Chance to SHUFFLE." },
            { name: "LIGHT RAIN", pm: "M", type: "Heal", power: 20, trigger: 4, scale: "MAG", target: "Random Ally", tag: null, cd: 2, effect: "50% Chance to REGEN 2." }
        ],
        "T2": [
            { name: "DELUGE", pm: "M", type: "Damage", power: 70, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "CONSUME SHELL: Target ALL ENEMIES." },
            { name: "TIDAL WAVE", pm: "M", type: "Damage", power: 80, trigger: 1, scale: "MAG", target: "Front Enemies", tag: null, cd: 2, effect: "100% Chance to SHUFFLE." },
            { name: "AQUA LANCE", pm: "P", type: "Damage", power: 40, trigger: 2, scale: "ATK", target: "Single Enemy", tag: "[Lance]", cd: 2, effect: "50% Chance to DEF BREAK 2." },
            { name: "FROST PUNCH", pm: "P", type: "Damage", power: 80, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 2, effect: "100% Chance to RES BREAK 2." },
            { name: "GLACIAL ORBS", pm: "M", type: "Shield", power: 30, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "50% Chance to REGEN 3. 50% Chance to RES UP 3." }
        ],
        "T3": [
            { name: "MAELSTROM", pm: "M", type: "Damage", power: 90, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 3, effect: "50% Chance to spawn 1 SHELL." },
            { name: "STEAM SHOOT", pm: "P", type: "Damage", power: 100, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: "CONSUME SUNLIGHT: Increase power by 50." },
            { name: "JUSTICE PUNCH", pm: "P", type: "Damage", power: 120, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 3, effect: null },
            { name: "BLIZZARD LANCE", pm: "P", type: "Damage", power: 60, trigger: 2, scale: "ATK", target: "Single Enemy", tag: "[Lance]", cd: 3, effect: "100% Chance to remove ALL BUFFS." },
            { name: "BLIZZARD BEAM", pm: "M", type: "Damage", power: 120, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Beam]", cd: 3, effect: null }
        ]
    },
    "Overgrowth": {
        "T0": [
            { name: "ROOT", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "PETAL", pm: "M", type: "Damage", power: 20, trigger: 2, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: "50% Chance to spawn 1 LEAF." },
            { name: "BRAMBLE", pm: "P", type: "Damage", power: 30, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 1, effect: null },
            { name: "POISON PUNCH", pm: "P", type: "Damage", power: 30, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 1, effect: "100% Chance to POISON 2." }
        ],
        "T1": [
            { name: "SPORES", pm: "M", type: "Damage", power: 10, trigger: 2, scale: "HP", target: "All Enemies", tag: "[Spores]", cd: 2, effect: "25% Chance to DEF BREAK 2. 25% Chance to RES BREAK 2. 50% Chance to POISON 2." },
            { name: "VINE SLASH", pm: "P", type: "Damage", power: 60, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "BLOSSOM", pm: "M", type: "Heal", power: 10, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 2, effect: "50% Chance to remove 1 DEBUFF." },
            { name: "THWACK", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Random Enemy", tag: null, cd: 1, effect: null }
        ],
        "T2": [
            { name: "ENDLESS VINES", pm: "P", type: "Damage", power: 40, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: "CONSUME LEAF: Increase trigger count by 2." },
            { name: "WOODLAND STEP", pm: "M", type: "Shield", power: 50, trigger: 1, scale: "RES", target: "Single Ally", tag: null, cd: 2, effect: "100% Chance to SWAP." },
            { name: "LEAF STORM", pm: "M", type: "Damage", power: 50, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 2, effect: "25% Chance to spawn 1 LEAF." },
            { name: "WILD WIND", pm: "M", type: "Damage", power: 80, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "50% Chance to SHUFFLE." }
        ],
        "T3": [
            { name: "LEAF BEAM", pm: "M", type: "Damage", power: 110, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Beam]", cd: 3, effect: "CONSUME LEAF: Increase power by 50." },
            { name: "CACTUS BASH", pm: "P", type: "Damage", power: 100, trigger: 1, scale: "DEF", target: "Single Enemy", tag: null, cd: 3, effect: "100% Chance to remove all BUFFS." },
            { name: "HEALING WIND", pm: "M", type: "Heal", power: 30, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "100% Chance to REGEN 3." },
            { name: "WILDGROWTH", pm: "M", type: "Shield", power: 30, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "50% Chance to spawn 2 LEAF." }
        ]
    },
    "Whimsical": {
        "T0": [
            { name: "ZAP", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "DANCE", pm: "M", type: "Shield", power: 30, trigger: 1, scale: "MAG", target: "Single Ally", tag: null, cd: 1, effect: "100% Chance to SWAP." },
            { name: "BOLT", pm: "M", type: "Damage", power: 15, trigger: 1, scale: "MAG", target: "All Enemies", tag: "[Bolt]", cd: 1, effect: null },
            { name: "STAR", pm: "P", type: "Damage", power: 35, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: "50% Chance to STUN 1." }
        ],
        "T1": [
            { name: "GLITTER", pm: "M", type: "Damage", power: 30, trigger: 3, scale: "SPD", target: "Random Enemy", tag: null, cd: 2, effect: "50% Chance to remove 1 BUFF." },
            { name: "DAYDREAM", pm: "M", type: "Heal", power: 50, trigger: 1, scale: "MAG", target: "Single Ally", tag: null, cd: 2, effect: "100% Chance to HASTE 2." },
            { name: "STARBOLT", pm: "M", type: "Damage", power: 40, trigger: 2, scale: "MAG", target: "Random Enemy", tag: null, cd: 2, effect: null },
            { name: "DAZZLE", pm: "P", type: "Damage", power: 60, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "SHOCK PUNCH", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Punch]", cd: 1, effect: "25% Chance to STUN 1." },
            { name: "POCO SONG", pm: "M", type: "Shield", power: 30, trigger: 1, scale: "MAG", target: "All Allies", tag: "[Song]", cd: 2, effect: "100% Chance to ATK UP 3. 100% Chance to MAG UP 3." }
        ],
        "T2": [
            { name: "THUNDERCLAP", pm: "M", type: "Damage", power: 40, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 2, effect: "50% Chance to remove 1 BUFF." },
            { name: "ZAP TACKLE", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "25% Chance to STUN 1." },
            { name: "LIGHT SHIELD", pm: "P", type: "Shield", power: 70, trigger: 1, scale: "MAG", target: "Single Ally", tag: null, cd: 2, effect: "50% Chance to RES UP 2." }
        ],
        "T3": [
            { name: "RADIANCE", pm: "M", type: "Shield", power: 40, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "100% Chance to reduce cooldowns by 1." },
            { name: "STARLIGHT", pm: "M", type: "Damage", power: 120, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 3, effect: null },
            { name: "LIGHT CANNON", pm: "P", type: "Damage", power: 70, trigger: 2, scale: "ATK", target: "Random Enemy", tag: "[Cannon]", cd: 3, effect: "100% Chance to remove all BUFFS." }
        ]
    },
    "Nightwatch": {
        "T0": [
            { name: "SHADE", pm: "M", type: "Damage", power: 40, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "MURK", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "SPD", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "SHADOW", pm: "M", type: "Shield", power: 20, trigger: 1, scale: "SPD", target: "Self", tag: null, cd: 1, effect: "100% Chance to HASTE 2. 100% Chance to ATK UP 2." }
        ],
        "T1": [
            { name: "GHOST BREATH", pm: "M", type: "Damage", power: 30, trigger: 1, scale: "MAG", target: "All Enemies", tag: "[GhostBreath]", cd: 2, effect: null },
            { name: "POISON BITE", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Bite]", cd: 2, effect: "100% Chance to POISON 2." },
            { name: "REND", pm: "P", type: "Damage", power: 30, trigger: 2, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "POISON CLOUD", pm: "P", type: "Damage", power: 10, trigger: 4, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: "100% Chance to POISON 3." }
        ],
        "T2": [
            { name: "NIGHTMARE", pm: "P", type: "Damage", power: 40, trigger: 2, scale: "ATK", target: "Front Enemies", tag: null, cd: 2, effect: "50% Chance to spawn 1 DARKNESS." },
            { name: "SHADOW AXE", pm: "P", type: "Damage", power: 80, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "DARK MATTER", pm: "M", type: "Damage", power: 30, trigger: 2, scale: "MAG", target: "All Enemies", tag: null, cd: 0, effect: "25% Chance to POISON 2. 25% Chance to BLIND 2." }
        ],
        "T3": [
            { name: "OBLIVION", pm: "M", type: "Damage", power: 100, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 3, effect: "CONSUME DARKNESS: Increase power by 50." },
            { name: "DOOMSDAY", pm: "M", type: "Damage", power: 30, trigger: 3, scale: "MAG", target: "All Enemies", tag: null, cd: 5, effect: "100% Chance to remove 1 BUFF." },
            { name: "DARK CHOMP", pm: "P", type: "Damage", power: 80, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: "50% Chance to spawn 1 DARKNESS." }
        ]
    },
    "Brawler": {
        "T0": [
            { name: "UPPERCUT", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "PUMMEL", pm: "P", type: "Damage", power: 20, trigger: 2, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: "25% Chance to DEF BREAK 2." }
        ],
        "T1": [
            { name: "QUAKE", pm: "P", type: "Damage", power: 20, trigger: 2, scale: "ATK", target: "All Enemies", tag: null, cd: 2, effect: null },
            { name: "BERSERK", pm: "P", type: "Shield", power: 50, trigger: 1, scale: "ATK", target: "Self", tag: null, cd: 2, effect: "100% Chance to ATK UP 3. 100% Chance to HASTE 3." },
            { name: "BIG BRAWL", pm: "P", type: "Damage", power: 40, trigger: 2, scale: "ATK", target: "Front Enemies", tag: null, cd: 2, effect: null },
            { name: "TANTRUM", pm: "P", type: "Damage", power: 40, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: null }
        ],
        "T2": [
            { name: "BOULDER BREAK", pm: "P", type: "Damage", power: 80, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to DEF BREAK 2." },
            { name: "SOUL PUNCH", pm: "M", type: "Damage", power: 70, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Punch]", cd: 2, effect: "100% Chance to remove 1 BUFF." },
            { name: "JUGGERNAUT", pm: "P", type: "Shield", power: 50, trigger: 1, scale: "ATK", target: "Self", tag: null, cd: 2, effect: "100% Chance to INVINCIBLE 3." },
            { name: "ROCK SPELL", pm: "M", type: "Damage", power: 60, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 2, effect: "50% Chance to DEF BREAK 2. 50% Chance to RES BREAK 2." }
        ],
        "T3": [
            { name: "SNEAKY STRIKES", pm: "P", type: "Damage", power: 30, trigger: 2, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: "CONSUME DARKNESS: Increase trigger count by 3." },
            { name: "RECKLESS PUNCH", pm: "P", type: "Damage", power: 130, trigger: 1, scale: "ATK", target: "Random Enemy", tag: "[Punch]", cd: 3, effect: "100% Chance to DEF BREAK 2." },
            { name: "TERRA CRUSH", pm: "P", type: "Damage", power: 120, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: null },
            { name: "SEISMIC PULSE", pm: "M", type: "Damage", power: 60, trigger: 2, scale: "MAG", target: "All Enemies", tag: null, cd: 3, effect: null }
        ]
    },
    "Dragoon": {
        "T0": [
            { name: "FLARE", pm: "M", type: "Damage", power: 40, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Flare]", cd: 1, effect: "50% Chance to RES BREAK 2." },
            { name: "BITE", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Bite]", cd: 1, effect: "50% Chance to DEF BREAK 2." }
        ],
        "T1": [
            { name: "CRUSH", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Front Enemies", tag: null, cd: 2, effect: "50% Chance to DEF BREAK 2." },
            { name: "BREATH", pm: "M", type: "Damage", power: 50, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 2, effect: null },
            { name: "CHOMP", pm: "P", type: "Damage", power: 60, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "SCATHE", pm: "M", type: "Damage", power: 50, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to remove 2 enemy tokens." }
        ],
        "T2": [
            { name: "WYVERN ASCENT", pm: "M", type: "Shield", power: 50, trigger: 1, scale: "ATK", target: "Self", tag: null, cd: 2, effect: "100% Chance to ATK UP 2. 100% Chance to MAG UP 2. 100% Chance to HASTE 2." },
            { name: "SKYDIVE", pm: "P", type: "Damage", power: 80, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "WYRMFLARE", pm: "M", type: "Damage", power: 80, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "DRACO BITE", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Single Enemy", tag: "[Bite]", cd: 2, effect: "100% Chance to remove all BUFFS." },
            { name: "SPIKY TAIL", pm: "P", type: "Damage", power: 60, trigger: 2, scale: "ATK", target: "Random Enemy", tag: null, cd: 2, effect: "100% Chance to DEF BREAK 2." }
        ],
        "T3": [
            { name: "DRAGON BEAM", pm: "M", type: "Damage", power: 120, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Beam]", cd: 3, effect: null },
            { name: "CRUSHING JAWS", pm: "P", type: "Damage", power: 40, trigger: 3, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: "100% Chance to remove 1 enemy token." }
        ]
    },
    "Mystic": {
        "T0": [
            { name: "KISS", pm: "M", type: "Damage", power: 40, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "HEAL DANCE", pm: "M", type: "Heal", power: 30, trigger: 1, scale: "MAG", target: "Single Ally", tag: null, cd: 1, effect: "100% Chance to SWAP." },
            { name: "PSIONIC", pm: "M", type: "Damage", power: 30, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: "100% Chance to SHUFFLE." },
            { name: "MAGIC SONG", pm: "M", type: "Heal", power: 20, trigger: 1, scale: "MAG", target: "All Allies", tag: "[Song]", cd: 1, effect: "100% Chance to remove 1 DEBUFF." }
        ],
        "T1": [
            { name: "ENERGY WIPE", pm: "M", type: "Damage", power: 30, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to remove all enemy tokens." },
            { name: "MAGIC BLAST", pm: "M", type: "Damage", power: 60, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: null },
            { name: "FAERIE FIRE", pm: "M", type: "Damage", power: 25, trigger: 3, scale: "MAG", target: "Random Enemy", tag: null, cd: 2, effect: "25% Chance to BURN 2." }
        ],
        "T2": [
            { name: "HEX", pm: "M", type: "Damage", power: 70, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to remove all BUFFS." },
            { name: "HARMONIZE", pm: "M", type: "Heal", power: 40, trigger: 1, scale: "RES", target: "Single Ally", tag: null, cd: 3, effect: "Double all ally tokens." },
            { name: "TIME TRAVEL", pm: "M", type: "Heal", power: 30, trigger: 1, scale: "MAG", target: "Single Ally", tag: null, cd: 3, effect: "Increase target's TURN METER by 50." },
            { name: "TIME BREAK", pm: "M", type: "Damage", power: 60, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 2, effect: "Reduce target's TURN METER by 50." },
            { name: "AETHER HEAL", pm: "M", type: "Heal", power: 40, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "50% Chance to remove 1 DEBUFF." },
            { name: "ARCANA", pm: "M", type: "Damage", power: 60, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 2, effect: "50% Chance to apply RES BREAK 2." }
        ],
        "T3": [
            { name: "LUSTER BEAM", pm: "M", type: "Damage", power: 120, trigger: 1, scale: "MAG", target: "Single Enemy", tag: "[Beam]", cd: 3, effect: null },
            { name: "GRAND AURA", pm: "M", type: "Shield", power: 60, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 3, effect: "100% Chance to gain 1 random BUFF." },
            { name: "LIGHT SONG", pm: "M", type: "Heal", power: 20, trigger: 1, scale: "MAG", target: "All Allies", tag: null, cd: 4, effect: "Reduce target's cooldowns by 1." },
            { name: "DARK SONG", pm: "M", type: "Damage", power: 20, trigger: 1, scale: "MAG", target: "All Enemies", tag: null, cd: 4, effect: "Increase target's cooldowns by 1." }
        ]
    },
    "Ironclad": {
        "T0": [
            { name: "GRIND", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "DEF", target: "Single Enemy", tag: null, cd: 1, effect: null },
            { name: "GUARD UP", pm: "P", type: "Shield", power: 20, trigger: 1, scale: "DEF", target: "Front Allies", tag: null, cd: 1, effect: "50% Chance to DEF UP 2." },
            { name: "SHARDS", pm: "P", type: "Damage", power: 15, trigger: 3, scale: "ATK", target: "Random Enemy", tag: null, cd: 1, effect: null }
        ],
        "T1": [
            { name: "HAMMER", pm: "P", type: "Damage", power: 50, trigger: 2, scale: "ATK", target: "Random Enemy", tag: "[Hammer]", cd: 2, effect: null },
            { name: "FORTIFY", pm: "P", type: "Shield", power: 40, trigger: 1, scale: "DEF", target: "Front Allies", tag: null, cd: 2, effect: "50% Chance to DEF UP 2." },
            { name: "RAZOR", pm: "P", type: "Damage", power: 50, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 1, effect: "100% Chance to remove 1 BUFF." },
            { name: "QUADRA LANCE", pm: "P", type: "Damage", power: 15, trigger: 4, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "25% Chance to DEF BREAK 2. 25% Chance to remove 1 BUFF." }
        ],
        "T2": [
            { name: "BULWARK", pm: "P", type: "Shield", power: 50, trigger: 1, scale: "DEF", target: "Front Allies", tag: null, cd: 2, effect: "50% Chance to RES UP 2." },
            { name: "SKEWER", pm: "P", type: "Damage", power: 70, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 2, effect: "100% Chance to remove 1 enemy token." },
            { name: "METAL BALL", pm: "P", type: "Damage", power: 90, trigger: 1, scale: "DEF", target: "Single Enemy", tag: null, cd: 2, effect: null }
        ],
        "T3": [
            { name: "TITAN BASH", pm: "P", type: "Damage", power: 100, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: "100% Chance to DEF BREAK 5." },
            { name: "STEEL BLADE", pm: "P", type: "Damage", power: 120, trigger: 1, scale: "ATK", target: "Single Enemy", tag: null, cd: 3, effect: null }
        ]
    }
};

const passiveData = {
    "CRITICAL EYE": "Moves that target RANDOM ENEMY gain +25% CRIT CHANCE.",
    "BIG HEART": "BATTLE START: Increase MAXHP by 20%.",
    "ANIMATED": "BATTLE START: Gain HASTE 2.",
    "SHORT REST": "TURN START: If HP is less than 75%, HEAL 10% MAX HP.",
    "LONG REST": "TURN START: If HP is less than 50%, HEAL to full HP. Once per battle.",
    "STALWART": "ON DAMAGED: Gain SHIELD equal to 5% MAX HP.",
    "APOCALYPSE": "TURN START: If HP is less than 25%, refresh all cooldowns.",
    "CHUBBY": "While HP is greater than 50%: Reduce incoming damage by 15%.",
    "WARP SPEED": "While buffed with HASTE: Gain +30% CRIT CHANCE.",
    "STINKY": "BATTLE START: Apply SLOW 2 to FRONT ENEMIES.",
    "WILD HEART": "Moves that target RANDOM ENEMY gain +1 trigger.",
    "BASIC STRIKER": "NORMAL moves gain +20 power.",
    "TACTICIAN": "ON DAMAGED: Gain +15 TURN METER.",
    "FLIGHT": "ON DAMAGED: 25% chance to gain EVADE 1.",
    "VICIOUS": "TURN START: Apply DEF BREAK 2 to FRONT ENEMIES.",
    "LAST STAND": "TURN START: If HP is less than 50%, GAIN INVINCIBLE 2. Once per battle.",
    "GALEFORCE": "BATTLE START: Apply HASTE 2 to ALL ALLIES.",
    "MIGHTY FLUFF": "BATTLE START: Double MAX HP.",
    "MY HERO": "BATTLE START: Gain HASTE 3 and INVINCIBLE 3.",
    "FOREST GUARD": "BATTLE START: All allies gain SHIELD equal to 15% MAX HP.",
    "PROTECTOR": "ON SHIELD ALLY: 50% Chance to apply DEF UP 2.",
    "COUNTER STANCE": "ON SHIELDED: Gain ATK UP 3.",
    "HEALING GROVE": "ON HEALED: 50% Chance to spawn 1 LEAF.",
    "SCOUNDREL": "ON ATTACK: 50% chance to remove 1 BUFF.",
    "LANCER": "LANCE moves gain +1 trigger.",
    "APEX MON": "ON ENEMY FAINT: Gain +50 TURN METER.",
    "LEVIATHAN": "Increase SPD by the % of HP missing.",
    "TAIL THRASHER": "TAIL SLAM targets ALL ENEMIES.",
    "CANNONEER": "CANNON moves gain +1 trigger.",
    "BIG TONGUE": "LICK targets ALL ENEMIES.",
    "LUCKY CHARM": "TURN START: 25% Chance to gain EVADE 2.",
    "COPYCAT": "ON DAMAGED: Copy BUFFS from attacker.",
    "SMOLDER": "TURN START: Apply BURN 2 to RANDOM ENEMY.",
    "FIRE TALONS": "TALONS applies BURN 2 and DEF BREAK 2.",
    "MAX BURN": "BURN damage triggers 1 additional time.",
    "SUNFLARE": "BATTLE START: Spawn 2 SUNLIGHT.",
    "HOT HEAD": "TURN START: Spawn 1 SUNLIGHT.",
    "DRENCH": "ATLANTIAN moves that target ALL ENEMIES deal +15% damage.",
    "SLIMY SCALES": "While buffed with REGEN: Gain +15% EVASION.",
    "BLUBBER": "Reduce incoming damage by 10%.",
    "HOT WATER": "ATLANTIAN moves apply BURN 3.",
    "CALM MIST": "TURN START: All allies HEAL 5% MAX HP.",
    "SEASHORE": "BATTLE START and TURN START: 75% Chance to spawn 1 SHELL.",
    "REGROWTH": "BATTLE START and TURN START: 75% Chance to spawn 1 LEAF.",
    "MORE SPORE": "SPORES gains +2 triggers.",
    "SAPROLING": "ON DAMAGED: 50% chance to spawn 1 LEAF.",
    "REGEN SCALES": "TURN END: Heal 10% MAX HP.",
    "MAX POISON": "POISON damage triggers 1 additional time.",
    "SLUDGE": "ON DAMAGED: 50% chance to apply SLOW 2 to the attacker.",
    "RAINBOW AURA": "TURN START: If HP is less than 75%, gain REGEN 3.",
    "ELECTRIFY": "BOLT gains +30 power.",
    "FLASHBANG": "WHIMSICAL moves have a 10% chance to apply STUN 1.",
    "SUPERCHARGE": "BATTLE START: Gain MAG UP 2.",
    "CLOUD SEED": "BATTLE START: All allies gain REGEN 5.",
    "AUTO BOLT": "BOLT gains +1 trigger.",
    "SONGBIRD": "SONG moves spawn 3 random tokens.",
    "PHANTOM": "While buffed: Gain +15% EVASION.",
    "CURSED": "ON DAMAGED: 50% chance to apply RANDOM DEBUFF 2 to the attacker.",
    "TOXIC BODY": "ON DAMAGED: 50% chance to apply POISON 2 to the attacker.",
    "RANDOM POISON": "TURN START: Apply POISON 2 to RANDOM ENEMY.",
    "CHAOS": "TURN START: Apply 1 random DEBUFF to a RANDOM ENEMY.",
    "DARK HARVEST": "ON DAMAGED: 25% Chance to spawn 1 DARKNESS.",
    "GHOSTLY": "GHOST BREATH gains +2 triggers.",
    "SHADOW GIFT": "TURN START: 50% Chance to spawn 1 DARKNESS.",
    "VENOMOUS": "NIGHTWATCH moves apply POISON 2.",
    "HEAVY PUNCHER": "PUNCH moves deal +20% damage.",
    "BRUISER": "BATTLE START: If in FRONT, gain ATK UP 2 and DEF UP 2.",
    "DEF BREAKER": "PHYSICAL moves have a 50% chance to apply DEF BREAK 2.",
    "SLUGGER": "Moves that target SINGLE ENEMY apply SHUFFLE.",
    "LIMIT BREAK": "DAMAGE moves gain 20 power.",
    "ROCK ARMOR": "ON DAMAGED: Gain DEF UP 2 and RES UP 2.",
    "BERSERKER": "Increase damage by the % of HP missing.",
    "BUSHIDO": "BATTLE START: If in FRONT, gain ATK UP 3 and HASTE 3.",
    "DRAGOON SOUL": "TURN START: If HP is less than 50%, remove all DEBUFFS and heal to full. Once per battle.",
    "KAIJU STANCE": "BEAM moves target ALL ENEMIES.",
    "SHARP TEETH": "BITE moves gain 50 power.",
    "DRAGON EYE": "DRAGOON moves gain +25% CRIT CHANCE.",
    "AUTO FLARE": "FLARE gains +2 triggers.",
    "MANA GIFT": "ON HEAL ALLY: Reduce target's cooldowns by 1.",
    "SPELLSHIELD": "BATTLE START: Gain HEXPROOF 5.",
    "WONDER CHIRP": "BATTLE START: ALL ALLIES gain 1 random BUFF.",
    "ELASTIC": "ON SWAP: Gain INVINCIBLE 1.",
    "SOUL BLASTER": "DAMAGE moves now scale with RES.",
    "RES BREAKER": "MAGICAL moves have a 50% chance to apply RES BREAK 2.",
    "CLERIC": "HEAL moves gain 20 power.",
    "GUARD": "BATTLE START: Gain DEF UP 3.",
    "BARRIER": "BATTLE START: Gain RES UP 3.",
    "TANK": "SHIELD moves gain 20 power.",
    "STEEL SKIN": "Increase SHIELD gained by 15%.",
    "HEAVY PLATE": "TURN END: Gain SHIELD equal to 10% MAX HP.",
    "OVERGUARD": "ON SHIELDED: Gain DEF UP 2 and RES UP 2.",
    "METALSMITH": "HAMMER gains +2 triggers.",
    "QUICK SHIELD": "BATTLE START: Gain SHIELD equal to 10% MAX HP.",
    "EXOSKELETON": "BATTLE START: Gain SHIELD equal to 25% DEF."
};
  
 const monData = {
   "001 Birb": { normal: { houses: ["Fireborn"], moves: ["CLAWS", "METEOR", "FIREBALL", "BOLT", "HEAT SHIELD", "STARBOLT", "WILDFIRE", "WINGS", "TALONS", "WISPS", "THUNDERCLAP", "ENFLAME", "NIGHTMARE", "FIRE TOWER", "WYRMFLARE", "WILD WIND", "VOLCANO", "FIERY REIGN", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], stats: { hp: 104, atk: 51, mag: 56, def: 64, res: 61, spd: 49 }, sprite: "assets/001_n.png" }, sparkly: { houses: ["Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "BOLT", "GHOST BREATH", "STARBOLT", "REND", "WINGS", "TALONS", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "DARK MATTER", "WYRMFLARE", "WILD WIND", "OBLIVION", "DOOMSDAY", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], sprite: "assets/001_s.png" } },
 "002 Feenix": { normal: { houses: ["Fireborn", "Whimsical"], moves: ["CLAWS", "METEOR", "FIREBALL", "BOLT", "HEAT SHIELD", "STARBOLT", "WILDFIRE", "WINGS", "TALONS", "WISPS", "THUNDERCLAP", "ENFLAME", "NIGHTMARE", "FIRE TOWER", "WYRMFLARE", "WILD WIND", "VOLCANO", "FIERY REIGN", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], stats: { hp: 142, atk: 75, mag: 65, def: 81, res: 67, spd: 70 }, sprite: "assets/002_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "BOLT", "GHOST BREATH", "STARBOLT", "REND", "WINGS", "TALONS", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "DARK MATTER", "WYRMFLARE", "WILD WIND", "OBLIVION", "DOOMSDAY", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], sprite: "assets/002_s.png" } },
 "003 Hawkamere": { normal: { houses: ["Fireborn", "Whimsical"], moves: ["CLAWS", "METEOR", "FIREBALL", "BOLT", "HEAT SHIELD", "STARBOLT", "WILDFIRE", "WINGS", "TALONS", "WISPS", "THUNDERCLAP", "ENFLAME", "NIGHTMARE", "FIRE TOWER", "WYRMFLARE", "WILD WIND", "VOLCANO", "FIERY REIGN", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], stats: { hp: 175, atk: 89, mag: 93, def: 102, res: 89, spd: 100 }, sprite: "assets/003_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "BOLT", "GHOST BREATH", "STARBOLT", "REND", "WINGS", "TALONS", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "DARK MATTER", "WYRMFLARE", "WILD WIND", "OBLIVION", "DOOMSDAY", "LUSTER BEAM", "RADIANCE", "LIGHT CANNON"], passives: ["CRITICAL EYE", "ANIMATED", "SMOLDER", "SHORT REST", "SUPERCHARGE", "RAINBOW AURA", "WARP SPEED", "WILD HEART", "SUNFLARE", "FIRE TALONS", "MAX BURN", "HOT HEAD", "SPELLSHIELD", "ELECTRIFY"], sprite: "assets/003_s.png" } },
 "004 Axolot": { normal: { houses: ["Atlantian", "Mystic"], moves: ["PUNCH", "DEWDROP", "DOUBLE BUBBLE", "KISS", "DANCE", "AQUALUNG", "HEAL DANCE", "JUMP KICK", "POISON PUNCH", "TIDAL WAVE", "TIME TRAVEL", "AQUA LANCE", "INFERNO PUNCH", "HEX", "SOUL PUNCH", "MAELSTROM", "RECKLESS PUNCH", "JUSTICE PUNCH", "LIGHT SONG", "LIGHT CANNON", "GRAND AURA"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], stats: { hp: 104, atk: 61, mag: 59, def: 47, res: 58, spd: 56 }, sprite: "assets/004_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["PUNCH", "METEOR", "SCORCH", "FLARE", "DANCE", "BLAZE BLAST", "BITE", "JUMP KICK", "POISON PUNCH", "WISPS", "WYRMFLARE", "FIERY HORNS", "INFERNO PUNCH", "WYVERN ASCENT", "SOUL PUNCH", "VOLCANO", "RECKLESS PUNCH", "FIRE BEAM", "CRUSHING JAWS", "LIGHT CANNON"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], sprite: "assets/004_s.png" } },
 "005 Neptoon": { normal: { houses: ["Atlantian", "Mystic"], moves: ["PUNCH", "DEWDROP", "DOUBLE BUBBLE", "KISS", "DANCE", "AQUALUNG", "HEAL DANCE", "JUMP KICK", "POISON PUNCH", "TIDAL WAVE", "TIME TRAVEL", "AQUA LANCE", "INFERNO PUNCH", "HEX", "SOUL PUNCH", "MAELSTROM", "RECKLESS PUNCH", "JUSTICE PUNCH", "LIGHT SONG", "LIGHT CANNON", "GRAND AURA"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], stats: { hp: 142, atk: 75, mag: 61, def: 74, res: 77, spd: 71 }, sprite: "assets/005_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["PUNCH", "METEOR", "SCORCH", "FLARE", "DANCE", "BLAZE BLAST", "BITE", "JUMP KICK", "POISON PUNCH", "WISPS", "WYRMFLARE", "FIERY HORNS", "INFERNO PUNCH", "WYVERN ASCENT", "SOUL PUNCH", "VOLCANO", "RECKLESS PUNCH", "FIRE BEAM", "CRUSHING JAWS", "LIGHT CANNON"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], sprite: "assets/005_s.png" } },
 "006 Salamight": { normal: { houses: ["Atlantian", "Mystic"], moves: ["PUNCH", "DEWDROP", "DOUBLE BUBBLE", "KISS", "DANCE", "AQUALUNG", "HEAL DANCE", "JUMP KICK", "POISON PUNCH", "TIDAL WAVE", "TIME TRAVEL", "AQUA LANCE", "INFERNO PUNCH", "HEX", "SOUL PUNCH", "MAELSTROM", "RECKLESS PUNCH", "JUSTICE PUNCH", "LIGHT SONG", "LIGHT CANNON", "GRAND AURA"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], stats: { hp: 163, atk: 97, mag: 101, def: 100, res: 100, spd: 87 }, sprite: "assets/006_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["PUNCH", "METEOR", "SCORCH", "FLARE", "DANCE", "BLAZE BLAST", "BITE", "JUMP KICK", "POISON PUNCH", "WISPS", "WYRMFLARE", "FIERY HORNS", "INFERNO PUNCH", "WYVERN ASCENT", "SOUL PUNCH", "VOLCANO", "RECKLESS PUNCH", "FIRE BEAM", "CRUSHING JAWS", "LIGHT CANNON"], passives: ["SLIMY SCALES", "DRENCH", "MANA GIFT", "RAINBOW AURA", "HEAVY PUNCHER", "HEALING GROVE", "BARRIER", "CALM MIST", "GALEFORCE", "MY HERO", "CLERIC", "SPELLSHIELD", "LAST STAND"], sprite: "assets/006_s.png" } },
 "007 Gojiru": { normal: { houses: ["Dragoon", "Overgrowth"], moves: ["BITE", "PETAL", "BRAMBLE", "FIREBALL", "BREATH", "SPORES", "FORTIFY", "CRUSH", "BLOSSOM", "WOODLAND STEP", "WYRMFLARE", "AQUA LANCE", "TALONS", "ENDLESS VINES", "WYVERN ASCENT", "BOULDER BREAK", "DRAGON BEAM", "LEAF BEAM", "OBLIVION", "FIRE BEAM", "HEALING WIND"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], stats: { hp: 120, atk: 55, mag: 55, def: 48, res: 59, spd: 48 }, sprite: "assets/007_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: ["HEAL DANCE", "DANCE", "BOLT", "FIREBALL", "MAGIC BLAST", "GLITTER", "FORTIFY", "ENERGY WIPE", "STARBOLT", "ZAP TACKLE", "TIME TRAVEL", "AQUA LANCE", "TALONS", "THUNDERCLAP", "HEX", "BOULDER BREAK", "LUSTER BEAM", "RADIANCE", "OBLIVION", "FIRE BEAM", "LIGHT CANNON"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], sprite: "assets/007_s.png" } },
 "008 Gaiaru": { normal: { houses: ["Dragoon", "Overgrowth"], moves: ["BITE", "PETAL", "BRAMBLE", "FIREBALL", "BREATH", "SPORES", "FORTIFY", "CRUSH", "BLOSSOM", "WOODLAND STEP", "WYRMFLARE", "AQUA LANCE", "TALONS", "ENDLESS VINES", "WYVERN ASCENT", "BOULDER BREAK", "DRAGON BEAM", "LEAF BEAM", "OBLIVION", "FIRE BEAM", "HEALING WIND"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], stats: { hp: 129, atk: 67, mag: 81, def: 71, res: 80, spd: 72 }, sprite: "assets/008_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: ["HEAL DANCE", "DANCE", "BOLT", "FIREBALL", "MAGIC BLAST", "GLITTER", "FORTIFY", "ENERGY WIPE", "STARBOLT", "ZAP TACKLE", "TIME TRAVEL", "AQUA LANCE", "TALONS", "THUNDERCLAP", "HEX", "BOULDER BREAK", "LUSTER BEAM", "RADIANCE", "OBLIVION", "FIRE BEAM", "LIGHT CANNON"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], sprite: "assets/008_s.png" } },
 "009 Gaiazard": { normal: { houses: ["Dragoon", "Overgrowth"], moves: ["BITE", "PETAL", "BRAMBLE", "FIREBALL", "BREATH", "SPORES", "FORTIFY", "CRUSH", "BLOSSOM", "WOODLAND STEP", "WYRMFLARE", "AQUA LANCE", "TALONS", "ENDLESS VINES", "WYVERN ASCENT", "BOULDER BREAK", "DRAGON BEAM", "LEAF BEAM", "OBLIVION", "FIRE BEAM", "HEALING WIND"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], stats: { hp: 199, atk: 84, mag: 89, def: 94, res: 89, spd: 93 }, sprite: "assets/009_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: ["HEAL DANCE", "DANCE", "BOLT", "FIREBALL", "MAGIC BLAST", "GLITTER", "FORTIFY", "ENERGY WIPE", "STARBOLT", "ZAP TACKLE", "TIME TRAVEL", "AQUA LANCE", "TALONS", "THUNDERCLAP", "HEX", "BOULDER BREAK", "LUSTER BEAM", "RADIANCE", "OBLIVION", "FIRE BEAM", "LIGHT CANNON"], passives: ["ANIMATED", "REGROWTH", "REGEN SCALES", "CHUBBY", "STALWART", "SUNFLARE", "BRUISER", "SLIMY SCALES", "MORE SPORE", "VICIOUS", "MAX POISON", "SHORT REST", "FIRE TALONS"], sprite: "assets/009_s.png" } },
 "010 Pachi": { normal: { houses: ["Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "GUARD UP", "AQUALUNG", "QUAKE", "GLITTER", "MAGIC BLAST", "DAYDREAM", "LEAF STORM", "THUNDERCLAP", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "LIGHT CANNON", "STARLIGHT", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], stats: { hp: 117, atk: 57, mag: 51, def: 51, res: 59, spd: 50 }, sprite: "assets/010_n.png" }, sparkly: { houses: ["Ironclad"], moves: ["PUNCH", "SHARDS", "GUARD UP", "AQUALUNG", "QUAKE", "HAMMER", "MAGIC BLAST", "FORTIFY", "LEAF STORM", "BULWARK", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "STEEL BLADE", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], sprite: "assets/010_s.png" } },
 "011 Stitchi": { normal: { houses: ["Brawler", "Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "GUARD UP", "AQUALUNG", "QUAKE", "GLITTER", "MAGIC BLAST", "DAYDREAM", "LEAF STORM", "THUNDERCLAP", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "LIGHT CANNON", "STARLIGHT", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], stats: { hp: 158, atk: 68, mag: 71, def: 62, res: 66, spd: 75 }, sprite: "assets/011_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: ["PUNCH", "SHARDS", "GUARD UP", "AQUALUNG", "QUAKE", "HAMMER", "MAGIC BLAST", "FORTIFY", "LEAF STORM", "BULWARK", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "STEEL BLADE", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], sprite: "assets/011_s.png" } },
 "012 Teddychi": { normal: { houses: ["Brawler", "Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "GUARD UP", "AQUALUNG", "QUAKE", "GLITTER", "MAGIC BLAST", "DAYDREAM", "LEAF STORM", "THUNDERCLAP", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "LIGHT CANNON", "STARLIGHT", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], stats: { hp: 184, atk: 83, mag: 105, def: 103, res: 84, spd: 89 }, sprite: "assets/012_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: ["PUNCH", "SHARDS", "GUARD UP", "AQUALUNG", "QUAKE", "HAMMER", "MAGIC BLAST", "FORTIFY", "LEAF STORM", "BULWARK", "JUGGERNAUT", "TIME BREAK", "HARMONIZE", "SOUL PUNCH", "WILD WIND", "STEEL BLADE", "GRAND AURA", "LIGHT SONG", "DRAGON BEAM"], passives: ["SHORT REST", "FLASHBANG", "RAINBOW AURA", "CLERIC", "STALWART", "SPELLSHIELD", "CHUBBY", "WARP SPEED", "RES BREAKER", "ELECTRIFY", "GALEFORCE", "MIGHTY FLUFF", "SHADOW GIFT", "SUPERCHARGE"], sprite: "assets/012_s.png" } },
 "013 Demidemon": { normal: { houses: ["Nightwatch"], moves: ["CLAWS", "MURK", "BITE", "SHADE", "GHOST BREATH", "STARBOLT", "POISON BITE", "HORN", "NIGHTMARE", "SKYDIVE", "DARK MATTER", "HEX", "INFERNO PUNCH", "HARMONIZE", "SHADOW AXE", "SOUL PUNCH", "OBLIVION", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], stats: { hp: 115, atk: 50, mag: 53, def: 61, res: 52, spd: 54 }, sprite: "assets/013_n.png" }, sparkly: { houses: ["Mystic"], moves: ["CLAWS", "HEAL DANCE", "BITE", "KISS", "ENERGY WIPE", "STARBOLT", "MAGIC BLAST", "HORN", "HEX", "SKYDIVE", "TIME TRAVEL", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "LUSTER BEAM", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], sprite: "assets/013_s.png" } },
 "014 Demidevil": { normal: { houses: ["Dragoon", "Nightwatch"], moves: ["CLAWS", "MURK", "BITE", "SHADE", "GHOST BREATH", "STARBOLT", "POISON BITE", "HORN", "NIGHTMARE", "SKYDIVE", "DARK MATTER", "HEX", "INFERNO PUNCH", "HARMONIZE", "SHADOW AXE", "SOUL PUNCH", "OBLIVION", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], stats: { hp: 139, atk: 69, mag: 78, def: 71, res: 70, spd: 73 }, sprite: "assets/014_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: ["CLAWS", "HEAL DANCE", "BITE", "KISS", "ENERGY WIPE", "STARBOLT", "MAGIC BLAST", "HORN", "HEX", "SKYDIVE", "TIME TRAVEL", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "LUSTER BEAM", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], sprite: "assets/014_s.png" } },
 "015 Demigorgon": { normal: { houses: ["Dragoon", "Nightwatch"], moves: ["CLAWS", "MURK", "BITE", "SHADE", "GHOST BREATH", "STARBOLT", "POISON BITE", "HORN", "NIGHTMARE", "SKYDIVE", "DARK MATTER", "HEX", "INFERNO PUNCH", "HARMONIZE", "SHADOW AXE", "SOUL PUNCH", "OBLIVION", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], stats: { hp: 196, atk: 89, mag: 101, def: 87, res: 88, spd: 87 }, sprite: "assets/015_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: ["CLAWS", "HEAL DANCE", "BITE", "KISS", "ENERGY WIPE", "STARBOLT", "MAGIC BLAST", "HORN", "HEX", "SKYDIVE", "TIME TRAVEL", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "LUSTER BEAM", "DRAGON BEAM", "EXPLODE", "SNEAKY STRIKES"], passives: ["PHANTOM", "WARP SPEED", "TOXIC BODY", "ANIMATED", "SCOUNDREL", "MAX POISON", "FLIGHT", "DARK HARVEST", "SLUDGE", "ELECTRIFY", "SPELLSHIELD", "SHADOW GIFT", "GHOSTLY"], sprite: "assets/015_s.png" } },
 "016 Flauna": { normal: { houses: ["Brawler", "Ironclad"], moves: ["NIBBLE", "GRIND", "SLASH", "PUMMEL", "BOLT", "HAMMER", "BLOSSOM", "STARBOLT", "BOULDER BREAK", "SKEWER", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "STEEL BLADE", "LUSTER BEAM", "TERRA CRUSH", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], stats: { hp: 109, atk: 59, mag: 48, def: 57, res: 50, spd: 62 }, sprite: "assets/016_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: ["NIBBLE", "FLARE", "SLASH", "DANCE", "BOLT", "CRUSH", "BLOSSOM", "STARBOLT", "THUNDERCLAP", "SKYDIVE", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "CRUSHING JAWS", "LUSTER BEAM", "LIGHT CANNON", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], sprite: "assets/016_s.png" } },
 "017 Crystelle": { normal: { houses: ["Brawler", "Ironclad"], moves: ["NIBBLE", "GRIND", "SLASH", "PUMMEL", "BOLT", "HAMMER", "BLOSSOM", "STARBOLT", "BOULDER BREAK", "SKEWER", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "STEEL BLADE", "LUSTER BEAM", "TERRA CRUSH", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], stats: { hp: 136, atk: 63, mag: 79, def: 79, res: 73, spd: 70 }, sprite: "assets/017_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: ["NIBBLE", "FLARE", "SLASH", "DANCE", "BOLT", "CRUSH", "BLOSSOM", "STARBOLT", "THUNDERCLAP", "SKYDIVE", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "CRUSHING JAWS", "LUSTER BEAM", "LIGHT CANNON", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], sprite: "assets/017_s.png" } },
 "018 Auricorn": { normal: { houses: ["Brawler", "Ironclad"], moves: ["NIBBLE", "GRIND", "SLASH", "PUMMEL", "BOLT", "HAMMER", "BLOSSOM", "STARBOLT", "BOULDER BREAK", "SKEWER", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "STEEL BLADE", "LUSTER BEAM", "TERRA CRUSH", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], stats: { hp: 208, atk: 94, mag: 85, def: 93, res: 80, spd: 88 }, sprite: "assets/018_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: ["NIBBLE", "FLARE", "SLASH", "DANCE", "BOLT", "CRUSH", "BLOSSOM", "STARBOLT", "THUNDERCLAP", "SKYDIVE", "SHADOW AXE", "TIME TRAVEL", "CLOBBER", "ZAP TACKLE", "HORN", "WILDGROWTH", "CRUSHING JAWS", "LUSTER BEAM", "LIGHT CANNON", "LIGHT SONG"], passives: ["BRUISER", "HEAVY PLATE", "QUICK SHIELD", "ANIMATED", "DEF BREAKER", "OVERGUARD", "STALWART", "SOUL BLASTER", "TACTICIAN", "GALEFORCE", "WILD HEART", "FOREST GUARD", "RAINBOW AURA", "BASIC STRIKER"], sprite: "assets/018_s.png" } },
 "019 Piglit": { normal: { houses: ["Brawler", "Fireborn"], moves: ["NIBBLE", "SCORCH", "PUMMEL", "FIREBALL", "QUAKE", "BIG BRAWL", "TANTRUM", "BLAZE BLAST", "JUMP KICK", "BARRAGE", "FIERY HORNS", "BOULDER BREAK", "ZAP TACKLE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "SNEAKY STRIKES", "VOLCANO", "TITAN BASH", "RECKLESS PUNCH", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], stats: { hp: 100, atk: 46, mag: 47, def: 55, res: 49, spd: 53 }, sprite: "assets/019_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: ["NIBBLE", "SHADOW", "GUARD UP", "MURK", "HAMMER", "RAZOR", "QUADRA LANCE", "POISON BITE", "JUMP KICK", "BARRAGE", "DARK MATTER", "BULWARK", "ZAP TACKLE", "WOODLAND STEP", "METAL BALL", "TITAN BASH", "OBLIVION", "STEEL BLADE", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], sprite: "assets/019_s.png" } },
 "020 Poghog": { normal: { houses: ["Brawler", "Fireborn"], moves: ["NIBBLE", "SCORCH", "PUMMEL", "FIREBALL", "QUAKE", "BIG BRAWL", "TANTRUM", "BLAZE BLAST", "JUMP KICK", "BARRAGE", "FIERY HORNS", "BOULDER BREAK", "ZAP TACKLE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "SNEAKY STRIKES", "VOLCANO", "TITAN BASH", "RECKLESS PUNCH", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], stats: { hp: 116, atk: 69, mag: 63, def: 72, res: 60, spd: 75 }, sprite: "assets/020_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: ["NIBBLE", "SHADOW", "GUARD UP", "MURK", "HAMMER", "RAZOR", "QUADRA LANCE", "POISON BITE", "JUMP KICK", "BARRAGE", "DARK MATTER", "BULWARK", "ZAP TACKLE", "WOODLAND STEP", "METAL BALL", "TITAN BASH", "OBLIVION", "STEEL BLADE", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], sprite: "assets/020_s.png" } },
 "021 Gigaboar": { normal: { houses: ["Brawler", "Fireborn"], moves: ["NIBBLE", "SCORCH", "PUMMEL", "FIREBALL", "QUAKE", "BIG BRAWL", "TANTRUM", "BLAZE BLAST", "JUMP KICK", "BARRAGE", "FIERY HORNS", "BOULDER BREAK", "ZAP TACKLE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "SNEAKY STRIKES", "VOLCANO", "TITAN BASH", "RECKLESS PUNCH", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], stats: { hp: 151, atk: 78, mag: 77, def: 94, res: 95, spd: 94 }, sprite: "assets/021_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: ["NIBBLE", "SHADOW", "GUARD UP", "MURK", "HAMMER", "RAZOR", "QUADRA LANCE", "POISON BITE", "JUMP KICK", "BARRAGE", "DARK MATTER", "BULWARK", "ZAP TACKLE", "WOODLAND STEP", "METAL BALL", "TITAN BASH", "OBLIVION", "STEEL BLADE", "CACTUS BASH"], passives: ["SHORT REST", "BRUISER", "PROTECTOR", "HOT HEAD", "SMOLDER", "HEAVY PUNCHER", "DEF BREAKER", "SLUGGER", "QUICK SHIELD", "BUSHIDO", "TACTICIAN", "VICIOUS", "WARP SPEED", "BIG HEART"], sprite: "assets/021_s.png" } },
 "022 Murkjaw": { normal: { houses: ["Atlantian"], moves: ["NIBBLE", "MURK", "SHADOW", "TORRENT", "BITE", "CHOMP", "POISON BITE", "WHIRL", "FORTIFY", "HEX", "NIGHTMARE", "AQUA LANCE", "DELUGE", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "BLIZZARD LANCE", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], stats: { hp: 95, atk: 46, mag: 57, def: 57, res: 50, spd: 45 }, sprite: "assets/022_n.png" }, sparkly: { houses: ["Dragoon"], moves: ["NIBBLE", "MURK", "SHADOW", "BITE", "CHOMP", "POISON BITE", "CRUSH", "FORTIFY", "HEX", "NIGHTMARE", "WYRMFLARE", "WYVERN ASCENT", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], sprite: "assets/022_s.png" } },
 "023 Doomfin": { normal: { houses: ["Atlantian", "Nightwatch"], moves: ["NIBBLE", "MURK", "SHADOW", "TORRENT", "BITE", "CHOMP", "POISON BITE", "WHIRL", "FORTIFY", "HEX", "NIGHTMARE", "AQUA LANCE", "DELUGE", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "BLIZZARD LANCE", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], stats: { hp: 136, atk: 65, mag: 65, def: 63, res: 61, spd: 65 }, sprite: "assets/023_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: ["NIBBLE", "MURK", "SHADOW", "BITE", "CHOMP", "POISON BITE", "CRUSH", "FORTIFY", "HEX", "NIGHTMARE", "WYRMFLARE", "WYVERN ASCENT", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], sprite: "assets/023_s.png" } },
 "024 Terrorjaw": { normal: { houses: ["Atlantian", "Nightwatch"], moves: ["NIBBLE", "MURK", "SHADOW", "TORRENT", "BITE", "CHOMP", "POISON BITE", "WHIRL", "FORTIFY", "HEX", "NIGHTMARE", "AQUA LANCE", "DELUGE", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "BLIZZARD LANCE", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], stats: { hp: 160, atk: 80, mag: 78, def: 92, res: 80, spd: 99 }, sprite: "assets/024_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: ["NIBBLE", "MURK", "SHADOW", "BITE", "CHOMP", "POISON BITE", "CRUSH", "FORTIFY", "HEX", "NIGHTMARE", "WYRMFLARE", "WYVERN ASCENT", "ZAP TACKLE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "TITAN BASH"], passives: ["CRITICAL EYE", "WARP SPEED", "DRENCH", "SLIMY SCALES", "PHANTOM", "CHAOS", "LAST STAND", "SCOUNDREL", "DARK HARVEST", "DEF BREAKER", "RANDOM POISON", "SHADOW GIFT"], sprite: "assets/024_s.png" } },
 "025 Glub": { normal: { houses: ["Overgrowth", "Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "BRAMBLE", "SPORES", "BLOSSOM", "VINE SLASH", "AQUALUNG", "SHOCK PUNCH", "INFERNO PUNCH", "WOODLAND STEP", "ZAP TACKLE", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "LEAF STORM", "CLOBBER", "HEALING WIND", "CACTUS BASH", "LIGHT CANNON", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], stats: { hp: 92, atk: 46, mag: 56, def: 53, res: 49, spd: 54 }, sprite: "assets/025_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["PUNCH", "PUMMEL", "UPPERCUT", "PSIONIC", "ENERGY WIPE", "FAERIE FIRE", "MAGIC BLAST", "AQUALUNG", "TANTRUM", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "CLOBBER", "LIGHT SONG", "GRAND AURA", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], sprite: "assets/025_s.png" } },
 "026 Tadglub": { normal: { houses: ["Overgrowth", "Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "BRAMBLE", "SPORES", "BLOSSOM", "VINE SLASH", "AQUALUNG", "SHOCK PUNCH", "INFERNO PUNCH", "WOODLAND STEP", "ZAP TACKLE", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "LEAF STORM", "CLOBBER", "HEALING WIND", "CACTUS BASH", "LIGHT CANNON", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], stats: { hp: 129, atk: 70, mag: 57, def: 67, res: 62, spd: 70 }, sprite: "assets/026_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["PUNCH", "PUMMEL", "UPPERCUT", "PSIONIC", "ENERGY WIPE", "FAERIE FIRE", "MAGIC BLAST", "AQUALUNG", "TANTRUM", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "CLOBBER", "LIGHT SONG", "GRAND AURA", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], sprite: "assets/026_s.png" } },
 "027 Froglob": { normal: { houses: ["Overgrowth", "Whimsical"], moves: ["PUNCH", "BOLT", "DANCE", "BRAMBLE", "SPORES", "BLOSSOM", "VINE SLASH", "AQUALUNG", "SHOCK PUNCH", "INFERNO PUNCH", "WOODLAND STEP", "ZAP TACKLE", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "LEAF STORM", "CLOBBER", "HEALING WIND", "CACTUS BASH", "LIGHT CANNON", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], stats: { hp: 183, atk: 71, mag: 81, def: 87, res: 90, spd: 77 }, sprite: "assets/027_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["PUNCH", "PUMMEL", "UPPERCUT", "PSIONIC", "ENERGY WIPE", "FAERIE FIRE", "MAGIC BLAST", "AQUALUNG", "TANTRUM", "INFERNO PUNCH", "HARMONIZE", "SOUL PUNCH", "TIME TRAVEL", "BULWARK", "JUGGERNAUT", "CLOBBER", "LIGHT SONG", "GRAND AURA", "TERRA CRUSH"], passives: ["CHUBBY", "FLASHBANG", "LONG REST", "SUPERCHARGE", "BLUBBER", "MAX POISON", "TOXIC BODY", "ELECTRIFY", "MANA GIFT", "RAINBOW AURA", "OVERGUARD", "SAPROLING", "CLOUD SEED"], sprite: "assets/027_s.png" } },
 "028 Moomu": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["BONK", "ZAP", "GRIND", "BOLT", "BITE", "QUAKE", "HAMMER", "DAZZLE", "HEAT SHIELD", "JUGGERNAUT", "THUNDERCLAP", "HORN", "FIERY HORNS", "BULWARK", "SKEWER", "ZAP TACKLE", "RADIANCE", "TITAN BASH", "LIGHT CANNON", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], stats: { hp: 98, atk: 48, mag: 47, def: 57, res: 53, spd: 47 }, sprite: "assets/028_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: ["BONK", "METEOR", "UPPERCUT", "SCORCH", "BITE", "QUAKE", "FIRE BREATH", "HEAT SHIELD", "JUGGERNAUT", "ENFLAME", "HORN", "FIERY HORNS", "BOULDER BREAK", "SOUL PUNCH", "WISPS", "VOLCANO", "SNEAKY STRIKES", "FIRE BEAM", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], sprite: "assets/028_s.png" } },
 "029 Bullwark": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["BONK", "ZAP", "GRIND", "BOLT", "BITE", "QUAKE", "HAMMER", "DAZZLE", "HEAT SHIELD", "JUGGERNAUT", "THUNDERCLAP", "HORN", "FIERY HORNS", "BULWARK", "SKEWER", "ZAP TACKLE", "RADIANCE", "TITAN BASH", "LIGHT CANNON", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], stats: { hp: 131, atk: 69, mag: 67, def: 60, res: 65, spd: 63 }, sprite: "assets/029_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: ["BONK", "METEOR", "UPPERCUT", "SCORCH", "BITE", "QUAKE", "FIRE BREATH", "HEAT SHIELD", "JUGGERNAUT", "ENFLAME", "HORN", "FIERY HORNS", "BOULDER BREAK", "SOUL PUNCH", "WISPS", "VOLCANO", "SNEAKY STRIKES", "FIRE BEAM", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], sprite: "assets/029_s.png" } },
 "030 Aegitaur": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["BONK", "ZAP", "GRIND", "BOLT", "BITE", "QUAKE", "HAMMER", "DAZZLE", "HEAT SHIELD", "JUGGERNAUT", "THUNDERCLAP", "HORN", "FIERY HORNS", "BULWARK", "SKEWER", "ZAP TACKLE", "RADIANCE", "TITAN BASH", "LIGHT CANNON", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], stats: { hp: 174, atk: 88, mag: 78, def: 89, res: 84, spd: 76 }, sprite: "assets/030_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: ["BONK", "METEOR", "UPPERCUT", "SCORCH", "BITE", "QUAKE", "FIRE BREATH", "HEAT SHIELD", "JUGGERNAUT", "ENFLAME", "HORN", "FIERY HORNS", "BOULDER BREAK", "SOUL PUNCH", "WISPS", "VOLCANO", "SNEAKY STRIKES", "FIRE BEAM", "RECKLESS PUNCH", "GRAND AURA"], passives: ["GUARD", "HEAVY PLATE", "STEEL SKIN", "BARRIER", "BRUISER", "RAINBOW AURA", "CURSED", "SOUL BLASTER", "DEF BREAKER", "OVERGUARD", "FLASHBANG", "METALSMITH", "SPELLSHIELD", "COUNTER STANCE"], sprite: "assets/030_s.png" } },
 "031 Ecto": { normal: { houses: ["Nightwatch"], moves: ["SHADE", "BOLT", "GHOST BREATH", "SHADOW", "WISPS", "DAZZLE", "DAYDREAM", "POISON BITE", "BREATH", "SHADOW AXE", "NIGHTMARE", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "SKYDIVE", "DARK CHOMP", "OBLIVION", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], stats: { hp: 97, atk: 52, mag: 52, def: 50, res: 50, spd: 49 }, sprite: "assets/031_n.png" }, sparkly: { houses: ["Dragoon"], moves: ["FLARE", "BOLT", "CRUSH", "BITE", "WISPS", "DAZZLE", "DAYDREAM", "BREATH", "SKYDIVE", "WYVERN ASCENT", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "CRUSHING JAWS", "DRAGON BEAM", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], sprite: "assets/031_s.png" } },
 "032 Toxlic": { normal: { houses: ["Nightwatch", "Whimsical"], moves: ["SHADE", "BOLT", "GHOST BREATH", "SHADOW", "WISPS", "DAZZLE", "DAYDREAM", "POISON BITE", "BREATH", "SHADOW AXE", "NIGHTMARE", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "SKYDIVE", "DARK CHOMP", "OBLIVION", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], stats: { hp: 123, atk: 69, mag: 68, def: 67, res: 71, spd: 57 }, sprite: "assets/032_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: ["FLARE", "BOLT", "CRUSH", "BITE", "WISPS", "DAZZLE", "DAYDREAM", "BREATH", "SKYDIVE", "WYVERN ASCENT", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "CRUSHING JAWS", "DRAGON BEAM", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], sprite: "assets/032_s.png" } },
 "033 Noxecution": { normal: { houses: ["Nightwatch", "Whimsical"], moves: ["SHADE", "BOLT", "GHOST BREATH", "SHADOW", "WISPS", "DAZZLE", "DAYDREAM", "POISON BITE", "BREATH", "SHADOW AXE", "NIGHTMARE", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "SKYDIVE", "DARK CHOMP", "OBLIVION", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], stats: { hp: 177, atk: 86, mag: 87, def: 73, res: 74, spd: 92 }, sprite: "assets/033_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: ["FLARE", "BOLT", "CRUSH", "BITE", "WISPS", "DAZZLE", "DAYDREAM", "BREATH", "SKYDIVE", "WYVERN ASCENT", "ZAP TACKLE", "HARMONIZE", "HEX", "THUNDERCLAP", "CRUSHING JAWS", "DRAGON BEAM", "LIGHT SONG", "STEEL BLADE", "DARK SONG"], passives: ["PHANTOM", "CURSED", "SLUDGE", "MAX POISON", "SHADOW GIFT", "CLERIC", "GHOSTLY", "MANA GIFT", "RANDOM POISON", "GALEFORCE", "VICIOUS", "WARP SPEED", "CRITICAL EYE", "CLOUD SEED"], sprite: "assets/033_s.png" } },
 "034 Nibblesaur": { normal: { houses: ["Brawler", "Dragoon"], moves: ["NIBBLE", "BITE", "UPPERCUT", "FLARE", "PSIONIC", "QUAKE", "POISON BITE", "TANTRUM", "SHOCK PUNCH", "BOULDER BREAK", "WYVERN ASCENT", "ZAP TACKLE", "WOODLAND STEP", "DRACO BITE", "JUGGERNAUT", "BULWARK", "TITAN BASH", "TERRA CRUSH", "CRUSHING JAWS", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], stats: { hp: 95, atk: 49, mag: 46, def: 60, res: 50, spd: 50 }, sprite: "assets/034_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: ["NIBBLE", "HEAL DANCE", "METEOR", "KISS", "PSIONIC", "HEAT SHIELD", "POISON BITE", "FIRE BREATH", "SHOCK PUNCH", "ENFLAME", "HEX", "ZAP TACKLE", "WOODLAND STEP", "TIME BREAK", "FIERY HORNS", "BULWARK", "TITAN BASH", "FIRE BEAM", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], sprite: "assets/034_s.png" } },
 "035 Rubblesaur": { normal: { houses: ["Brawler", "Dragoon"], moves: ["NIBBLE", "BITE", "UPPERCUT", "FLARE", "PSIONIC", "QUAKE", "POISON BITE", "TANTRUM", "SHOCK PUNCH", "BOULDER BREAK", "WYVERN ASCENT", "ZAP TACKLE", "WOODLAND STEP", "DRACO BITE", "JUGGERNAUT", "BULWARK", "TITAN BASH", "TERRA CRUSH", "CRUSHING JAWS", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], stats: { hp: 149, atk: 64, mag: 56, def: 57, res: 59, spd: 70 }, sprite: "assets/035_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: ["NIBBLE", "HEAL DANCE", "METEOR", "KISS", "PSIONIC", "HEAT SHIELD", "POISON BITE", "FIRE BREATH", "SHOCK PUNCH", "ENFLAME", "HEX", "ZAP TACKLE", "WOODLAND STEP", "TIME BREAK", "FIERY HORNS", "BULWARK", "TITAN BASH", "FIRE BEAM", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], sprite: "assets/035_s.png" } },
 "036 Tyrannox": { normal: { houses: ["Brawler", "Dragoon"], moves: ["NIBBLE", "BITE", "UPPERCUT", "FLARE", "PSIONIC", "QUAKE", "POISON BITE", "TANTRUM", "SHOCK PUNCH", "BOULDER BREAK", "WYVERN ASCENT", "ZAP TACKLE", "WOODLAND STEP", "DRACO BITE", "JUGGERNAUT", "BULWARK", "TITAN BASH", "TERRA CRUSH", "CRUSHING JAWS", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], stats: { hp: 164, atk: 82, mag: 80, def: 92, res: 95, spd: 76 }, sprite: "assets/036_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: ["NIBBLE", "HEAL DANCE", "METEOR", "KISS", "PSIONIC", "HEAT SHIELD", "POISON BITE", "FIRE BREATH", "SHOCK PUNCH", "ENFLAME", "HEX", "ZAP TACKLE", "WOODLAND STEP", "TIME BREAK", "FIERY HORNS", "BULWARK", "TITAN BASH", "FIRE BEAM", "GRAND AURA", "DARK CHOMP"], passives: ["VICIOUS", "LIMIT BREAK", "BIG HEART", "SHARP TEETH", "SUNFLARE", "LONG REST", "BRUISER", "QUICK SHIELD", "DEF BREAKER", "HOT HEAD", "SLUGGER", "ROCK ARMOR", "SPELLSHIELD", "DRAGOON SOUL"], sprite: "assets/036_s.png" } },
 "037 Gnoblin": { normal: { houses: ["Brawler", "Overgrowth"], moves: ["STAB", "UPPERCUT", "PUMMEL", "POISON PUNCH", "MURK", "JUMP KICK", "THWACK", "BIG BRAWL", "CRUSH", "BARRAGE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "BOULDER BREAK", "FROST PUNCH", "ZAP TACKLE", "SNEAKY STRIKES", "RECKLESS PUNCH", "CLOBBER", "TITAN BASH", "CACTUS BASH"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], stats: { hp: 100, atk: 53, mag: 51, def: 46, res: 46, spd: 54 }, sprite: "assets/037_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: ["CLAWS", "KISS", "HEAL DANCE", "BITE", "MURK", "JUMP KICK", "SCATHE", "FAERIE FIRE", "CRUSH", "BARRAGE", "INFERNO PUNCH", "SKYDIVE", "TIME TRAVEL", "HEX", "FROST PUNCH", "ZAP TACKLE", "LUSTER BEAM", "GRAND AURA", "CLOBBER", "TITAN BASH", "CRUSHING JAWS"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], sprite: "assets/037_s.png" } },
 "038 Snagglin": { normal: { houses: ["Brawler", "Overgrowth"], moves: ["STAB", "UPPERCUT", "PUMMEL", "POISON PUNCH", "MURK", "JUMP KICK", "THWACK", "BIG BRAWL", "CRUSH", "BARRAGE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "BOULDER BREAK", "FROST PUNCH", "ZAP TACKLE", "SNEAKY STRIKES", "RECKLESS PUNCH", "CLOBBER", "TITAN BASH", "CACTUS BASH"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], stats: { hp: 130, atk: 69, mag: 55, def: 70, res: 66, spd: 65 }, sprite: "assets/038_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: ["CLAWS", "KISS", "HEAL DANCE", "BITE", "MURK", "JUMP KICK", "SCATHE", "FAERIE FIRE", "CRUSH", "BARRAGE", "INFERNO PUNCH", "SKYDIVE", "TIME TRAVEL", "HEX", "FROST PUNCH", "ZAP TACKLE", "LUSTER BEAM", "GRAND AURA", "CLOBBER", "TITAN BASH", "CRUSHING JAWS"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], sprite: "assets/038_s.png" } },
 "039 Garuogre": { normal: { houses: ["Brawler", "Overgrowth"], moves: ["STAB", "UPPERCUT", "PUMMEL", "POISON PUNCH", "MURK", "JUMP KICK", "THWACK", "BIG BRAWL", "CRUSH", "BARRAGE", "INFERNO PUNCH", "WOODLAND STEP", "JUGGERNAUT", "BOULDER BREAK", "FROST PUNCH", "ZAP TACKLE", "SNEAKY STRIKES", "RECKLESS PUNCH", "CLOBBER", "TITAN BASH", "CACTUS BASH"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], stats: { hp: 170, atk: 83, mag: 79, def: 94, res: 89, spd: 74 }, sprite: "assets/039_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: ["CLAWS", "KISS", "HEAL DANCE", "BITE", "MURK", "JUMP KICK", "SCATHE", "FAERIE FIRE", "CRUSH", "BARRAGE", "INFERNO PUNCH", "SKYDIVE", "TIME TRAVEL", "HEX", "FROST PUNCH", "ZAP TACKLE", "LUSTER BEAM", "GRAND AURA", "CLOBBER", "TITAN BASH", "CRUSHING JAWS"], passives: ["SCOUNDREL", "BRUISER", "BIG HEART", "TACTICIAN", "HEAVY PUNCHER", "SLUGGER", "SPELLSHIELD", "REGROWTH", "CHUBBY", "BASIC STRIKER", "WILD HEART", "HOT HEAD", "OVERGUARD", "HEALING GROVE"], sprite: "assets/039_s.png" } },
 "040 Dragini": { normal: { houses: ["Mystic"], moves: ["NIBBLE", "KISS", "PSIONIC", "FLARE", "ENERGY WIPE", "CRUSH", "FAERIE FIRE", "SCATHE", "MAGIC BLAST", "HARMONIZE", "AETHER HEAL", "WYRMFLARE", "DRACO BITE", "ARCANA", "HEX", "FIRE TOWER", "LIGHT SONG", "LUSTER BEAM", "STARLIGHT", "DRAGON BEAM", "GRAND AURA"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], stats: { hp: 97, atk: 47, mag: 53, def: 53, res: 45, spd: 55 }, sprite: "assets/040_n.png" }, sparkly: { houses: ["Fireborn"], moves: ["NIBBLE", "METEOR", "SCORCH", "FLARE", "HEAT SHIELD", "CRUSH", "WILDFIRE", "SCATHE", "BLAZE BLAST", "WISPS", "INFERNO PUNCH", "WYRMFLARE", "DRACO BITE", "FIRE TOWER", "ENFLAME", "FIRE BEAM", "VOLCANO", "STARLIGHT", "DRAGON BEAM", "FIERY REIGN"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], sprite: "assets/040_s.png" } },
 "041 Luvdra": { normal: { houses: ["Dragoon", "Mystic"], moves: ["NIBBLE", "KISS", "PSIONIC", "FLARE", "ENERGY WIPE", "CRUSH", "FAERIE FIRE", "SCATHE", "MAGIC BLAST", "HARMONIZE", "AETHER HEAL", "WYRMFLARE", "DRACO BITE", "ARCANA", "HEX", "FIRE TOWER", "LIGHT SONG", "LUSTER BEAM", "STARLIGHT", "DRAGON BEAM", "GRAND AURA"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], stats: { hp: 134, atk: 68, mag: 69, def: 65, res: 63, spd: 56 }, sprite: "assets/041_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: ["NIBBLE", "METEOR", "SCORCH", "FLARE", "HEAT SHIELD", "CRUSH", "WILDFIRE", "SCATHE", "BLAZE BLAST", "WISPS", "INFERNO PUNCH", "WYRMFLARE", "DRACO BITE", "FIRE TOWER", "ENFLAME", "FIRE BEAM", "VOLCANO", "STARLIGHT", "DRAGON BEAM", "FIERY REIGN"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], sprite: "assets/041_s.png" } },
 "042 Dragalia": { normal: { houses: ["Dragoon", "Mystic"], moves: ["NIBBLE", "KISS", "PSIONIC", "FLARE", "ENERGY WIPE", "CRUSH", "FAERIE FIRE", "SCATHE", "MAGIC BLAST", "HARMONIZE", "AETHER HEAL", "WYRMFLARE", "DRACO BITE", "ARCANA", "HEX", "FIRE TOWER", "LIGHT SONG", "LUSTER BEAM", "STARLIGHT", "DRAGON BEAM", "GRAND AURA"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], stats: { hp: 184, atk: 81, mag: 96, def: 75, res: 79, spd: 74 }, sprite: "assets/042_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: ["NIBBLE", "METEOR", "SCORCH", "FLARE", "HEAT SHIELD", "CRUSH", "WILDFIRE", "SCATHE", "BLAZE BLAST", "WISPS", "INFERNO PUNCH", "WYRMFLARE", "DRACO BITE", "FIRE TOWER", "ENFLAME", "FIRE BEAM", "VOLCANO", "STARLIGHT", "DRAGON BEAM", "FIERY REIGN"], passives: ["GALEFORCE", "MANA GIFT", "ANIMATED", "CLERIC", "RES BREAKER", "SUNFLARE", "SMOLDER", "WARP SPEED", "CALM MIST", "SPELLSHIELD", "FLIGHT", "CLOUD SEED", "LAST STAND", "MAX BURN"], sprite: "assets/042_s.png" } },
 "043 Poplit": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["PUNCH", "FIREBALL", "PETAL", "BRAMBLE", "BLAZE BLAST", "WILDFIRE", "SPORES", "HEAT SHIELD", "LIGHT RAIN", "WISPS", "FIRE FLOWER", "ENDLESS VINES", "THUNDERCLAP", "LEAF STORM", "ARCANA", "ENFLAME", "HEALING WIND", "FIRE BEAM", "LEAF BEAM", "WILDGROWTH", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], stats: { hp: 100, atk: 54, mag: 47, def: 48, res: 52, spd: 49 }, sprite: "assets/043_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: ["PUNCH", "TORRENT", "MURK", "SHADOW", "AQUALUNG", "SKY CANNON", "GHOST BREATH", "WHIRL", "LIGHT RAIN", "TIDAL WAVE", "FROST PUNCH", "NIGHTMARE", "THUNDERCLAP", "DARK MATTER", "ARCANA", "DELUGE", "DARK CHOMP", "JUSTICE PUNCH", "OBLIVION", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], sprite: "assets/043_s.png" } },
 "044 Emberlily": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["PUNCH", "FIREBALL", "PETAL", "BRAMBLE", "BLAZE BLAST", "WILDFIRE", "SPORES", "HEAT SHIELD", "LIGHT RAIN", "WISPS", "FIRE FLOWER", "ENDLESS VINES", "THUNDERCLAP", "LEAF STORM", "ARCANA", "ENFLAME", "HEALING WIND", "FIRE BEAM", "LEAF BEAM", "WILDGROWTH", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], stats: { hp: 132, atk: 72, mag: 69, def: 63, res: 57, spd: 62 }, sprite: "assets/044_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: ["PUNCH", "TORRENT", "MURK", "SHADOW", "AQUALUNG", "SKY CANNON", "GHOST BREATH", "WHIRL", "LIGHT RAIN", "TIDAL WAVE", "FROST PUNCH", "NIGHTMARE", "THUNDERCLAP", "DARK MATTER", "ARCANA", "DELUGE", "DARK CHOMP", "JUSTICE PUNCH", "OBLIVION", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], sprite: "assets/044_s.png" } },
 "045 Flamora": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["PUNCH", "FIREBALL", "PETAL", "BRAMBLE", "BLAZE BLAST", "WILDFIRE", "SPORES", "HEAT SHIELD", "LIGHT RAIN", "WISPS", "FIRE FLOWER", "ENDLESS VINES", "THUNDERCLAP", "LEAF STORM", "ARCANA", "ENFLAME", "HEALING WIND", "FIRE BEAM", "LEAF BEAM", "WILDGROWTH", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], stats: { hp: 185, atk: 81, mag: 76, def: 83, res: 72, spd: 92 }, sprite: "assets/045_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: ["PUNCH", "TORRENT", "MURK", "SHADOW", "AQUALUNG", "SKY CANNON", "GHOST BREATH", "WHIRL", "LIGHT RAIN", "TIDAL WAVE", "FROST PUNCH", "NIGHTMARE", "THUNDERCLAP", "DARK MATTER", "ARCANA", "DELUGE", "DARK CHOMP", "JUSTICE PUNCH", "OBLIVION", "SEISMIC PULSE"], passives: ["REGROWTH", "SAPROLING", "SUNFLARE", "CLERIC", "QUICK SHIELD", "DARK HARVEST", "MORE SPORE", "SOUL BLASTER", "MAX POISON", "MAX BURN", "HOT HEAD", "MANA GIFT"], sprite: "assets/045_s.png" } },
 "046 Terrabone": { normal: { houses: ["Dragoon", "Ironclad"], moves: ["BONK", "GRIND", "GUARD UP", "BITE", "BREATH", "CRUSH", "HAMMER", "POISON BITE", "HORN", "BULWARK", "SPIKY TAIL", "DRACO BITE", "BOULDER BREAK", "WYVERN ASCENT", "SKEWER", "JUGGERNAUT", "CRUSHING JAWS", "TITAN BASH", "DRAGON BEAM", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], stats: { hp: 94, atk: 54, mag: 57, def: 47, res: 55, spd: 43 }, sprite: "assets/046_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: ["BONK", "SHADE", "MURK", "DANCE", "DAYDREAM", "GLITTER", "GHOST BREATH", "POISON BITE", "HORN", "NIGHTMARE", "LIGHT SHIELD", "BOULDER BREAK", "THUNDERCLAP", "SHADOW AXE", "JUGGERNAUT", "STARLIGHT", "OBLIVION", "RADIANCE", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], sprite: "assets/046_s.png" } },
 "047 Terrahorn": { normal: { houses: ["Dragoon", "Ironclad"], moves: ["BONK", "GRIND", "GUARD UP", "BITE", "BREATH", "CRUSH", "HAMMER", "POISON BITE", "HORN", "BULWARK", "SPIKY TAIL", "DRACO BITE", "BOULDER BREAK", "WYVERN ASCENT", "SKEWER", "JUGGERNAUT", "CRUSHING JAWS", "TITAN BASH", "DRAGON BEAM", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], stats: { hp: 125, atk: 72, mag: 67, def: 66, res: 71, spd: 54 }, sprite: "assets/047_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: ["BONK", "SHADE", "MURK", "DANCE", "DAYDREAM", "GLITTER", "GHOST BREATH", "POISON BITE", "HORN", "NIGHTMARE", "LIGHT SHIELD", "BOULDER BREAK", "THUNDERCLAP", "SHADOW AXE", "JUGGERNAUT", "STARLIGHT", "OBLIVION", "RADIANCE", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], sprite: "assets/047_s.png" } },
 "048 Terraclops": { normal: { houses: ["Dragoon", "Ironclad"], moves: ["BONK", "GRIND", "GUARD UP", "BITE", "BREATH", "CRUSH", "HAMMER", "POISON BITE", "HORN", "BULWARK", "SPIKY TAIL", "DRACO BITE", "BOULDER BREAK", "WYVERN ASCENT", "SKEWER", "JUGGERNAUT", "CRUSHING JAWS", "TITAN BASH", "DRAGON BEAM", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], stats: { hp: 175, atk: 88, mag: 77, def: 83, res: 75, spd: 91 }, sprite: "assets/048_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: ["BONK", "SHADE", "MURK", "DANCE", "DAYDREAM", "GLITTER", "GHOST BREATH", "POISON BITE", "HORN", "NIGHTMARE", "LIGHT SHIELD", "BOULDER BREAK", "THUNDERCLAP", "SHADOW AXE", "JUGGERNAUT", "STARLIGHT", "OBLIVION", "RADIANCE", "VOLCANO", "BLIZZARD LANCE"], passives: ["STEEL SKIN", "TANK", "QUICK SHIELD", "GUARD", "DRAGON EYE", "SLUGGER", "HEAVY PLATE", "SHARP TEETH", "METALSMITH", "REGEN SCALES", "OVERGUARD", "ROCK ARMOR", "LIMIT BREAK"], sprite: "assets/048_s.png" } },
 "049 Bloaty": { normal: { houses: ["Atlantian", "Fireborn"], moves: ["DOUBLE BUBBLE", "SCORCH", "FIREBALL", "DEWDROP", "LIGHT RAIN", "WHIRL", "HEAT SHIELD", "AQUALUNG", "TIDAL WAVE", "HORN", "ENFLAME", "NEEDLE LANCE", "AQUA LANCE", "FIRE TOWER", "THUNDERCLAP", "STEAM SHOOT", "EXPLODE", "RADIANCE", "MAELSTROM", "BLIZZARD LANCE"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], stats: { hp: 106, atk: 47, mag: 49, def: 44, res: 50, spd: 54 }, sprite: "assets/049_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["SHARDS", "PSIONIC", "HEAL DANCE", "GRIND", "QUADRA LANCE", "HAMMER", "ENERGY WIPE", "FORTIFY", "SKEWER", "HORN", "HEX", "NEEDLE LANCE", "METAL BALL", "ARCANA", "THUNDERCLAP", "STEEL BLADE", "EXPLODE", "RADIANCE", "TITAN BASH"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], sprite: "assets/049_s.png" } },
 "050 Pinpuffer": { normal: { houses: ["Atlantian", "Fireborn"], moves: ["DOUBLE BUBBLE", "SCORCH", "FIREBALL", "DEWDROP", "LIGHT RAIN", "WHIRL", "HEAT SHIELD", "AQUALUNG", "TIDAL WAVE", "HORN", "ENFLAME", "NEEDLE LANCE", "AQUA LANCE", "FIRE TOWER", "THUNDERCLAP", "STEAM SHOOT", "EXPLODE", "RADIANCE", "MAELSTROM", "BLIZZARD LANCE"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], stats: { hp: 138, atk: 70, mag: 70, def: 62, res: 60, spd: 55 }, sprite: "assets/050_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["SHARDS", "PSIONIC", "HEAL DANCE", "GRIND", "QUADRA LANCE", "HAMMER", "ENERGY WIPE", "FORTIFY", "SKEWER", "HORN", "HEX", "NEEDLE LANCE", "METAL BALL", "ARCANA", "THUNDERCLAP", "STEEL BLADE", "EXPLODE", "RADIANCE", "TITAN BASH"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], sprite: "assets/050_s.png" } },
 "051 Tetramine": { normal: { houses: ["Atlantian", "Fireborn"], moves: ["DOUBLE BUBBLE", "SCORCH", "FIREBALL", "DEWDROP", "LIGHT RAIN", "WHIRL", "HEAT SHIELD", "AQUALUNG", "TIDAL WAVE", "HORN", "ENFLAME", "NEEDLE LANCE", "AQUA LANCE", "FIRE TOWER", "THUNDERCLAP", "STEAM SHOOT", "EXPLODE", "RADIANCE", "MAELSTROM", "BLIZZARD LANCE"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], stats: { hp: 172, atk: 73, mag: 89, def: 87, res: 94, spd: 74 }, sprite: "assets/051_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["SHARDS", "PSIONIC", "HEAL DANCE", "GRIND", "QUADRA LANCE", "HAMMER", "ENERGY WIPE", "FORTIFY", "SKEWER", "HORN", "HEX", "NEEDLE LANCE", "METAL BALL", "ARCANA", "THUNDERCLAP", "STEEL BLADE", "EXPLODE", "RADIANCE", "TITAN BASH"], passives: ["QUICK SHIELD", "MAX BURN", "BLUBBER", "HOT WATER", "SPELLSHIELD", "TOXIC BODY", "REGEN SCALES", "CHUBBY", "FLASHBANG", "HOT HEAD", "HEAVY PLATE", "SUNFLARE", "OVERGUARD"], sprite: "assets/051_s.png" } },
 "052 Harebelle": { normal: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "GUARD UP", "KISS", "HEAL DANCE", "MAGIC BLAST", "FORTIFY", "HAMMER", "TANTRUM", "JUMP KICK", "METAL BALL", "HEX", "HARMONIZE", "AETHER HEAL", "ARCANA", "SKEWER", "SPIKY TAIL", "LUSTER BEAM", "TITAN BASH", "GRAND AURA", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], stats: { hp: 97, atk: 49, mag: 49, def: 50, res: 50, spd: 55 }, sprite: "assets/052_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: ["FLARE", "BITE", "SHADE", "MURK", "POISON BITE", "BREATH", "CRUSH", "TANTRUM", "JUMP KICK", "WYRMFLARE", "NIGHTMARE", "SHADOW AXE", "DARK MATTER", "SKYDIVE", "SPIKY TAIL", "OBLIVION", "DRAGON BEAM", "DOOMSDAY", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], sprite: "assets/052_s.png" } },
 "053 Rowdibelle": { normal: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "GUARD UP", "KISS", "HEAL DANCE", "MAGIC BLAST", "FORTIFY", "HAMMER", "TANTRUM", "JUMP KICK", "METAL BALL", "HEX", "HARMONIZE", "AETHER HEAL", "ARCANA", "SKEWER", "SPIKY TAIL", "LUSTER BEAM", "TITAN BASH", "GRAND AURA", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], stats: { hp: 119, atk: 64, mag: 76, def: 64, res: 68, spd: 64 }, sprite: "assets/053_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: ["FLARE", "BITE", "SHADE", "MURK", "POISON BITE", "BREATH", "CRUSH", "TANTRUM", "JUMP KICK", "WYRMFLARE", "NIGHTMARE", "SHADOW AXE", "DARK MATTER", "SKYDIVE", "SPIKY TAIL", "OBLIVION", "DRAGON BEAM", "DOOMSDAY", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], sprite: "assets/053_s.png" } },
 "054 Bellarina": { normal: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "GUARD UP", "KISS", "HEAL DANCE", "MAGIC BLAST", "FORTIFY", "HAMMER", "TANTRUM", "JUMP KICK", "METAL BALL", "HEX", "HARMONIZE", "AETHER HEAL", "ARCANA", "SKEWER", "SPIKY TAIL", "LUSTER BEAM", "TITAN BASH", "GRAND AURA", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], stats: { hp: 174, atk: 93, mag: 83, def: 79, res: 79, spd: 81 }, sprite: "assets/054_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: ["FLARE", "BITE", "SHADE", "MURK", "POISON BITE", "BREATH", "CRUSH", "TANTRUM", "JUMP KICK", "WYRMFLARE", "NIGHTMARE", "SHADOW AXE", "DARK MATTER", "SKYDIVE", "SPIKY TAIL", "OBLIVION", "DRAGON BEAM", "DOOMSDAY", "TERRA CRUSH", "SEISMIC PULSE"], passives: ["STEEL SKIN", "CRITICAL EYE", "OVERGUARD", "TACTICIAN", "ANIMATED", "SCOUNDREL", "METALSMITH", "LAST STAND", "GUARD", "TANK", "QUICK SHIELD", "STALWART", "MANA GIFT", "WILD HEART"], sprite: "assets/054_s.png" } },
 "055 Lilitad": { normal: { houses: ["Mystic", "Overgrowth"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "PETAL", "SPORES", "MAGIC BLAST", "LIGHT RAIN", "BLOSSOM", "VINE SLASH", "WOODLAND STEP", "TIME TRAVEL", "TIDAL WAVE", "AETHER HEAL", "HARMONIZE", "LEAF STORM", "LICK", "MAELSTROM", "HEALING WIND", "BLIZZARD BEAM", "LUSTER BEAM", "LIGHT SONG"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], stats: { hp: 94, atk: 49, mag: 53, def: 50, res: 52, spd: 52 }, sprite: "assets/055_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "MURK", "GHOST BREATH", "BERSERK", "LIGHT RAIN", "REND", "POISON BITE", "SHADOW AXE", "JUGGERNAUT", "TIDAL WAVE", "ROCK SPELL", "SOUL PUNCH", "DARK MATTER", "LICK", "MAELSTROM", "DARK CHOMP", "BLIZZARD BEAM", "SNEAKY STRIKES", "TERRA CRUSH"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], sprite: "assets/055_s.png" } },
 "056 Lilipet": { normal: { houses: ["Mystic", "Overgrowth"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "PETAL", "SPORES", "MAGIC BLAST", "LIGHT RAIN", "BLOSSOM", "VINE SLASH", "WOODLAND STEP", "TIME TRAVEL", "TIDAL WAVE", "AETHER HEAL", "HARMONIZE", "LEAF STORM", "LICK", "MAELSTROM", "HEALING WIND", "BLIZZARD BEAM", "LUSTER BEAM", "LIGHT SONG"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], stats: { hp: 114, atk: 65, mag: 74, def: 69, res: 76, spd: 57 }, sprite: "assets/056_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "MURK", "GHOST BREATH", "BERSERK", "LIGHT RAIN", "REND", "POISON BITE", "SHADOW AXE", "JUGGERNAUT", "TIDAL WAVE", "ROCK SPELL", "SOUL PUNCH", "DARK MATTER", "LICK", "MAELSTROM", "DARK CHOMP", "BLIZZARD BEAM", "SNEAKY STRIKES", "TERRA CRUSH"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], sprite: "assets/056_s.png" } },
 "057 Lilifrog": { normal: { houses: ["Mystic", "Overgrowth"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "PETAL", "SPORES", "MAGIC BLAST", "LIGHT RAIN", "BLOSSOM", "VINE SLASH", "WOODLAND STEP", "TIME TRAVEL", "TIDAL WAVE", "AETHER HEAL", "HARMONIZE", "LEAF STORM", "LICK", "MAELSTROM", "HEALING WIND", "BLIZZARD BEAM", "LUSTER BEAM", "LIGHT SONG"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], stats: { hp: 186, atk: 72, mag: 76, def: 97, res: 87, spd: 71 }, sprite: "assets/057_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["NIBBLE", "DEWDROP", "DOUBLE BUBBLE", "MURK", "GHOST BREATH", "BERSERK", "LIGHT RAIN", "REND", "POISON BITE", "SHADOW AXE", "JUGGERNAUT", "TIDAL WAVE", "ROCK SPELL", "SOUL PUNCH", "DARK MATTER", "LICK", "MAELSTROM", "DARK CHOMP", "BLIZZARD BEAM", "SNEAKY STRIKES", "TERRA CRUSH"], passives: ["REGROWTH", "CALM MIST", "REGEN SCALES", "RAINBOW AURA", "WARP SPEED", "HEALING GROVE", "CLERIC", "MORE SPORE", "SOUL BLASTER", "SPELLSHIELD", "CHUBBY", "CLOUD SEED", "SLIMY SCALES"], sprite: "assets/057_s.png" } },
 "058 Shellin": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["GRIND", "GUARD UP", "TORRENT", "DEWDROP", "AQUALUNG", "JUMP KICK", "WOODLAND STEP", "FORTIFY", "ENERGY WIPE", "AQUA LANCE", "TIME TRAVEL", "WYRMFLARE", "HEX", "BULWARK", "SKEWER", "TIME BREAK", "NEEDLE LANCE", "STEEL BLADE", "BLIZZARD LANCE", "MAELSTROM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], stats: { hp: 107, atk: 47, mag: 45, def: 51, res: 49, spd: 51 }, sprite: "assets/058_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["KISS", "HEAL DANCE", "PETAL", "ROOT", "VINE SLASH", "JUMP KICK", "WOODLAND STEP", "MAGIC BLAST", "ENERGY WIPE", "LEAF STORM", "TIME TRAVEL", "WYRMFLARE", "HEX", "HARMONIZE", "TIME BREAK", "NEEDLE LANCE", "GRAND AURA", "WILDGROWTH", "LEAF BEAM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], sprite: "assets/058_s.png" } },
 "059 Glorpin": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["GRIND", "GUARD UP", "TORRENT", "DEWDROP", "AQUALUNG", "JUMP KICK", "WOODLAND STEP", "FORTIFY", "ENERGY WIPE", "AQUA LANCE", "TIME TRAVEL", "WYRMFLARE", "HEX", "BULWARK", "SKEWER", "TIME BREAK", "NEEDLE LANCE", "STEEL BLADE", "BLIZZARD LANCE", "MAELSTROM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], stats: { hp: 121, atk: 65, mag: 70, def: 67, res: 61, spd: 71 }, sprite: "assets/059_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["KISS", "HEAL DANCE", "PETAL", "ROOT", "VINE SLASH", "JUMP KICK", "WOODLAND STEP", "MAGIC BLAST", "ENERGY WIPE", "LEAF STORM", "TIME TRAVEL", "WYRMFLARE", "HEX", "HARMONIZE", "TIME BREAK", "NEEDLE LANCE", "GRAND AURA", "WILDGROWTH", "LEAF BEAM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], sprite: "assets/059_s.png" } },
 "060 Glorpius": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["GRIND", "GUARD UP", "TORRENT", "DEWDROP", "AQUALUNG", "JUMP KICK", "WOODLAND STEP", "FORTIFY", "ENERGY WIPE", "AQUA LANCE", "TIME TRAVEL", "WYRMFLARE", "HEX", "BULWARK", "SKEWER", "TIME BREAK", "NEEDLE LANCE", "STEEL BLADE", "BLIZZARD LANCE", "MAELSTROM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], stats: { hp: 174, atk: 93, mag: 73, def: 94, res: 77, spd: 78 }, sprite: "assets/060_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["KISS", "HEAL DANCE", "PETAL", "ROOT", "VINE SLASH", "JUMP KICK", "WOODLAND STEP", "MAGIC BLAST", "ENERGY WIPE", "LEAF STORM", "TIME TRAVEL", "WYRMFLARE", "HEX", "HARMONIZE", "TIME BREAK", "NEEDLE LANCE", "GRAND AURA", "WILDGROWTH", "LEAF BEAM", "SEISMIC PULSE"], passives: ["COUNTER STANCE", "SEASHORE", "LANCER", "GUARD", "STEEL SKIN", "REGEN SCALES", "HEAVY PLATE", "TACTICIAN", "PROTECTOR", "QUICK SHIELD", "BLUBBER", "VICIOUS", "SLUGGER", "GALEFORCE"], sprite: "assets/060_s.png" } },
 "061 Zagon": { normal: { houses: ["Dragoon", "Whimsical"], moves: ["BITE", "BOLT", "FLARE", "STAR", "DAZZLE", "STARBOLT", "SCATHE", "POISON BITE", "WYVERN ASCENT", "WYRMFLARE", "ZAP TACKLE", "HEX", "FIRE BREATH", "DRACO BITE", "ARCANA", "JUGGERNAUT", "DRAGON BEAM", "LUSTER BEAM", "LIGHT CANNON", "STARLIGHT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], stats: { hp: 95, atk: 52, mag: 52, def: 54, res: 46, spd: 51 }, sprite: "assets/061_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: ["GUARD UP", "DOUBLE BUBBLE", "GRIND", "WAVE SPLASH", "LIGHT RAIN", "SKY CANNON", "QUADRA LANCE", "POISON BITE", "BULWARK", "METAL BALL", "TIDAL WAVE", "HEX", "FIRE BREATH", "ARCANA", "JUGGERNAUT", "TITAN BASH", "LUSTER BEAM", "JUSTICE PUNCH", "STEAM SHOOT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], sprite: "assets/061_s.png" } },
 "062 Zellgon": { normal: { houses: ["Dragoon", "Whimsical"], moves: ["BITE", "BOLT", "FLARE", "STAR", "DAZZLE", "STARBOLT", "SCATHE", "POISON BITE", "WYVERN ASCENT", "WYRMFLARE", "ZAP TACKLE", "HEX", "FIRE BREATH", "DRACO BITE", "ARCANA", "JUGGERNAUT", "DRAGON BEAM", "LUSTER BEAM", "LIGHT CANNON", "STARLIGHT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], stats: { hp: 144, atk: 73, mag: 61, def: 62, res: 58, spd: 57 }, sprite: "assets/062_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: ["GUARD UP", "DOUBLE BUBBLE", "GRIND", "WAVE SPLASH", "LIGHT RAIN", "SKY CANNON", "QUADRA LANCE", "POISON BITE", "BULWARK", "METAL BALL", "TIDAL WAVE", "HEX", "FIRE BREATH", "ARCANA", "JUGGERNAUT", "TITAN BASH", "LUSTER BEAM", "JUSTICE PUNCH", "STEAM SHOOT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], sprite: "assets/062_s.png" } },
 "063 Zagnarok": { normal: { houses: ["Dragoon", "Whimsical"], moves: ["BITE", "BOLT", "FLARE", "STAR", "DAZZLE", "STARBOLT", "SCATHE", "POISON BITE", "WYVERN ASCENT", "WYRMFLARE", "ZAP TACKLE", "HEX", "FIRE BREATH", "DRACO BITE", "ARCANA", "JUGGERNAUT", "DRAGON BEAM", "LUSTER BEAM", "LIGHT CANNON", "STARLIGHT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], stats: { hp: 173, atk: 83, mag: 90, def: 78, res: 91, spd: 74 }, sprite: "assets/063_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: ["GUARD UP", "DOUBLE BUBBLE", "GRIND", "WAVE SPLASH", "LIGHT RAIN", "SKY CANNON", "QUADRA LANCE", "POISON BITE", "BULWARK", "METAL BALL", "TIDAL WAVE", "HEX", "FIRE BREATH", "ARCANA", "JUGGERNAUT", "TITAN BASH", "LUSTER BEAM", "JUSTICE PUNCH", "STEAM SHOOT"], passives: ["LAST STAND", "FLASHBANG", "SUPERCHARGE", "SHARP TEETH", "AUTO BOLT", "DRAGOON SOUL", "VICIOUS", "RES BREAKER", "ELECTRIFY", "LIMIT BREAK", "LONG REST", "TACTICIAN", "GALEFORCE"], sprite: "assets/063_s.png" } },
 "064 Cubskull": { normal: { houses: ["Brawler", "Nightwatch"], moves: ["CLAWS", "UPPERCUT", "MURK", "SHADOW", "THWACK", "SLASH", "REND", "TANTRUM", "BOULDER BREAK", "JUGGERNAUT", "CRUSH", "SHADOW AXE", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "NIGHTMARE", "CLOBBER", "TERRA CRUSH", "RECKLESS PUNCH", "CRUSHING JAWS", "SNEAKY STRIKES"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], stats: { hp: 97, atk: 53, mag: 58, def: 46, res: 47, spd: 49 }, sprite: "assets/064_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["CLAWS", "FLARE", "FIREBALL", "SCORCH", "THWACK", "SLASH", "WILDFIRE", "SCATHE", "WYVERN ASCENT", "WYRMFLARE", "CRUSH", "WISPS", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "ENFLAME", "CLOBBER", "CRUSHING JAWS", "DRAGON BEAM"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], sprite: "assets/064_s.png" } },
 "065 Gloomcub": { normal: { houses: ["Brawler", "Nightwatch"], moves: ["CLAWS", "UPPERCUT", "MURK", "SHADOW", "THWACK", "SLASH", "REND", "TANTRUM", "BOULDER BREAK", "JUGGERNAUT", "CRUSH", "SHADOW AXE", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "NIGHTMARE", "CLOBBER", "TERRA CRUSH", "RECKLESS PUNCH", "CRUSHING JAWS", "SNEAKY STRIKES"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], stats: { hp: 145, atk: 54, mag: 60, def: 73, res: 58, spd: 65 }, sprite: "assets/065_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["CLAWS", "FLARE", "FIREBALL", "SCORCH", "THWACK", "SLASH", "WILDFIRE", "SCATHE", "WYVERN ASCENT", "WYRMFLARE", "CRUSH", "WISPS", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "ENFLAME", "CLOBBER", "CRUSHING JAWS", "DRAGON BEAM"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], sprite: "assets/065_s.png" } },
 "066 Grislybear": { normal: { houses: ["Brawler", "Nightwatch"], moves: ["CLAWS", "UPPERCUT", "MURK", "SHADOW", "THWACK", "SLASH", "REND", "TANTRUM", "BOULDER BREAK", "JUGGERNAUT", "CRUSH", "SHADOW AXE", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "NIGHTMARE", "CLOBBER", "TERRA CRUSH", "RECKLESS PUNCH", "CRUSHING JAWS", "SNEAKY STRIKES"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], stats: { hp: 154, atk: 88, mag: 94, def: 90, res: 82, spd: 81 }, sprite: "assets/066_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: ["CLAWS", "FLARE", "FIREBALL", "SCORCH", "THWACK", "SLASH", "WILDFIRE", "SCATHE", "WYVERN ASCENT", "WYRMFLARE", "CRUSH", "WISPS", "ZAP TACKLE", "WILD WIND", "FROST PUNCH", "ENFLAME", "CLOBBER", "CRUSHING JAWS", "DRAGON BEAM"], passives: ["CHUBBY", "BRUISER", "STALWART", "HOT HEAD", "VICIOUS", "BIG HEART", "BASIC STRIKER", "DARK HARVEST", "CHAOS", "DEF BREAKER", "BERSERKER", "SHADOW GIFT", "QUICK SHIELD", "WILD HEART"], sprite: "assets/066_s.png" } },
 "067 Embpurr": { normal: { houses: ["Fireborn", "Mystic"], moves: ["CLAWS", "FIREBALL", "SCORCH", "PSIONIC", "ENERGY WIPE", "HEAT SHIELD", "FAERIE FIRE", "FIRE BREATH", "TANTRUM", "HEX", "ENFLAME", "FIRE TOWER", "WYRMFLARE", "STARBOLT", "HARMONIZE", "ARCANA", "GRAND AURA", "LUSTER BEAM", "FIRE BEAM", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 103, atk: 53, mag: 47, def: 41, res: 51, spd: 55 }, sprite: "assets/067_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "TORRENT", "DOUBLE BUBBLE", "PUMMEL", "QUAKE", "WHIRL", "BIG BRAWL", "LIGHT RAIN", "TANTRUM", "BOULDER BREAK", "DELUGE", "GLACIAL ORBS", "WYRMFLARE", "STARBOLT", "SOUL PUNCH", "ROCK SPELL", "RECKLESS PUNCH", "SNEAKY STRIKES", "JUSTICE PUNCH", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/067_s.png" } },
 "068 Pyremane": { normal: { houses: ["Fireborn", "Mystic"], moves: ["CLAWS", "FIREBALL", "SCORCH", "PSIONIC", "ENERGY WIPE", "HEAT SHIELD", "FAERIE FIRE", "FIRE BREATH", "TANTRUM", "HEX", "ENFLAME", "FIRE TOWER", "WYRMFLARE", "STARBOLT", "HARMONIZE", "ARCANA", "GRAND AURA", "LUSTER BEAM", "FIRE BEAM", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 128, atk: 76, mag: 62, def: 59, res: 70, spd: 60 }, sprite: "assets/068_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "TORRENT", "DOUBLE BUBBLE", "PUMMEL", "QUAKE", "WHIRL", "BIG BRAWL", "LIGHT RAIN", "TANTRUM", "BOULDER BREAK", "DELUGE", "GLACIAL ORBS", "WYRMFLARE", "STARBOLT", "SOUL PUNCH", "ROCK SPELL", "RECKLESS PUNCH", "SNEAKY STRIKES", "JUSTICE PUNCH", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/068_s.png" } },
 "069 Solareon": { normal: { houses: ["Fireborn", "Mystic"], moves: ["CLAWS", "FIREBALL", "SCORCH", "PSIONIC", "ENERGY WIPE", "HEAT SHIELD", "FAERIE FIRE", "FIRE BREATH", "TANTRUM", "HEX", "ENFLAME", "FIRE TOWER", "WYRMFLARE", "STARBOLT", "HARMONIZE", "ARCANA", "GRAND AURA", "LUSTER BEAM", "FIRE BEAM", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 184, atk: 81, mag: 83, def: 87, res: 75, spd: 79 }, sprite: "assets/069_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "TORRENT", "DOUBLE BUBBLE", "PUMMEL", "QUAKE", "WHIRL", "BIG BRAWL", "LIGHT RAIN", "TANTRUM", "BOULDER BREAK", "DELUGE", "GLACIAL ORBS", "WYRMFLARE", "STARBOLT", "SOUL PUNCH", "ROCK SPELL", "RECKLESS PUNCH", "SNEAKY STRIKES", "JUSTICE PUNCH", "STARLIGHT", "OBLIVION"], passives: ["SUNFLARE", "MAX BURN", "SMOLDER", "TACTICIAN", "SHORT REST", "RAINBOW AURA", "MANA GIFT", "SOUL BLASTER", "SUPERCHARGE", "BARRIER", "WARP SPEED", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/069_s.png" } },
 "070 Wyrmpool": { normal: { houses: ["Atlantian", "Dragoon"], moves: ["FLARE", "DEWDROP", "WAVE SPLASH", "BITE", "BLOSSOM", "BREATH", "MAGIC BLAST", "LIGHT RAIN", "TIDAL WAVE", "DELUGE", "THUNDERCLAP", "WYVERN ASCENT", "WYRMFLARE", "TIME TRAVEL", "GLACIAL ORBS", "AETHER HEAL", "HEALING WIND", "BLIZZARD BEAM", "DRAGON BEAM", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], stats: { hp: 109, atk: 40, mag: 49, def: 51, res: 53, spd: 48 }, sprite: "assets/070_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "KISS", "MAGIC SONG", "GUARD UP", "BLOSSOM", "FORTIFY", "MAGIC BLAST", "FAERIE FIRE", "HARMONIZE", "HEX", "THUNDERCLAP", "BULWARK", "METAL BALL", "TIME TRAVEL", "AETHER HEAL", "HEALING WIND", "DARK SONG", "TITAN BASH", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], sprite: "assets/070_s.png" } },
 "071 Wyrmwind": { normal: { houses: ["Atlantian", "Dragoon"], moves: ["FLARE", "DEWDROP", "WAVE SPLASH", "BITE", "BLOSSOM", "BREATH", "MAGIC BLAST", "LIGHT RAIN", "TIDAL WAVE", "DELUGE", "THUNDERCLAP", "WYVERN ASCENT", "WYRMFLARE", "TIME TRAVEL", "GLACIAL ORBS", "AETHER HEAL", "HEALING WIND", "BLIZZARD BEAM", "DRAGON BEAM", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], stats: { hp: 124, atk: 62, mag: 66, def: 78, res: 60, spd: 65 }, sprite: "assets/071_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "KISS", "MAGIC SONG", "GUARD UP", "BLOSSOM", "FORTIFY", "MAGIC BLAST", "FAERIE FIRE", "HARMONIZE", "HEX", "THUNDERCLAP", "BULWARK", "METAL BALL", "TIME TRAVEL", "AETHER HEAL", "HEALING WIND", "DARK SONG", "TITAN BASH", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], sprite: "assets/071_s.png" } },
 "072 Glaedria": { normal: { houses: ["Atlantian", "Dragoon"], moves: ["FLARE", "DEWDROP", "WAVE SPLASH", "BITE", "BLOSSOM", "BREATH", "MAGIC BLAST", "LIGHT RAIN", "TIDAL WAVE", "DELUGE", "THUNDERCLAP", "WYVERN ASCENT", "WYRMFLARE", "TIME TRAVEL", "GLACIAL ORBS", "AETHER HEAL", "HEALING WIND", "BLIZZARD BEAM", "DRAGON BEAM", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], stats: { hp: 153, atk: 87, mag: 90, def: 94, res: 86, spd: 79 }, sprite: "assets/072_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: ["GRIND", "KISS", "MAGIC SONG", "GUARD UP", "BLOSSOM", "FORTIFY", "MAGIC BLAST", "FAERIE FIRE", "HARMONIZE", "HEX", "THUNDERCLAP", "BULWARK", "METAL BALL", "TIME TRAVEL", "AETHER HEAL", "HEALING WIND", "DARK SONG", "TITAN BASH", "LIGHT SONG", "STARLIGHT"], passives: ["WARP SPEED", "LEVIATHAN", "APEX MON", "RAINBOW AURA", "MANA GIFT", "CLERIC", "CALM MIST", "GALEFORCE", "FLIGHT", "AUTO FLARE", "DRAGOON SOUL", "DRAGON EYE", "SPELLSHIELD", "CRITICAL EYE"], sprite: "assets/072_s.png" } },
 "073 Snok": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["NIBBLE", "MURK", "BITE", "KISS", "FIRE BREATH", "TAIL SLAM", "POISON BITE", "CHOMP", "WYVERN ASCENT", "NIGHTMARE", "LICK", "DRACO BITE", "SPIKY TAIL", "HEX", "SHADOW AXE", "AETHER HEAL", "JUGGERNAUT", "OBLIVION", "DARK CHOMP", "DARK SONG", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], stats: { hp: 116, atk: 46, mag: 47, def: 44, res: 46, spd: 51 }, sprite: "assets/073_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: ["NIBBLE", "TORRENT", "BITE", "FLARE", "FIRE BREATH", "TAIL SLAM", "AQUALUNG", "CHOMP", "WYVERN ASCENT", "DELUGE", "LICK", "DRACO BITE", "SPIKY TAIL", "TIDAL WAVE", "JUGGERNAUT", "MAELSTROM", "JUSTICE PUNCH", "CRUSHING JAWS", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], sprite: "assets/073_s.png" } },
 "074 Lunaconda": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["NIBBLE", "MURK", "BITE", "KISS", "FIRE BREATH", "TAIL SLAM", "POISON BITE", "CHOMP", "WYVERN ASCENT", "NIGHTMARE", "LICK", "DRACO BITE", "SPIKY TAIL", "HEX", "SHADOW AXE", "AETHER HEAL", "JUGGERNAUT", "OBLIVION", "DARK CHOMP", "DARK SONG", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], stats: { hp: 134, atk: 71, mag: 66, def: 62, res: 60, spd: 62 }, sprite: "assets/074_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: ["NIBBLE", "TORRENT", "BITE", "FLARE", "FIRE BREATH", "TAIL SLAM", "AQUALUNG", "CHOMP", "WYVERN ASCENT", "DELUGE", "LICK", "DRACO BITE", "SPIKY TAIL", "TIDAL WAVE", "JUGGERNAUT", "MAELSTROM", "JUSTICE PUNCH", "CRUSHING JAWS", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], sprite: "assets/074_s.png" } },
 "075 Cobraclysm": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["NIBBLE", "MURK", "BITE", "KISS", "FIRE BREATH", "TAIL SLAM", "POISON BITE", "CHOMP", "WYVERN ASCENT", "NIGHTMARE", "LICK", "DRACO BITE", "SPIKY TAIL", "HEX", "SHADOW AXE", "AETHER HEAL", "JUGGERNAUT", "OBLIVION", "DARK CHOMP", "DARK SONG", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], stats: { hp: 186, atk: 87, mag: 91, def: 74, res: 80, spd: 71 }, sprite: "assets/075_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: ["NIBBLE", "TORRENT", "BITE", "FLARE", "FIRE BREATH", "TAIL SLAM", "AQUALUNG", "CHOMP", "WYVERN ASCENT", "DELUGE", "LICK", "DRACO BITE", "SPIKY TAIL", "TIDAL WAVE", "JUGGERNAUT", "MAELSTROM", "JUSTICE PUNCH", "CRUSHING JAWS", "WILDGROWTH"], passives: ["TOXIC BODY", "ANIMATED", "BIG HEART", "SLUDGE", "RANDOM POISON", "DARK HARVEST", "MAX POISON", "TAIL THRASHER", "CRITICAL EYE", "REGEN SCALES", "SHORT REST", "PHANTOM", "APEX MON"], sprite: "assets/075_s.png" } },
 "076 Poppeep": { normal: { houses: ["Mystic", "Whimsical"], moves: ["WINGS", "BOLT", "MAGIC SONG", "DANCE", "STARBOLT", "POCO SONG", "GLITTER", "MAGIC BLAST", "BLOSSOM", "THUNDERCLAP", "WYRMFLARE", "ARCANA", "HARMONIZE", "HEX", "TIME TRAVEL", "LIGHT SHIELD", "DARK SONG", "LIGHT SONG", "STARLIGHT", "LUSTER BEAM", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], stats: { hp: 102, atk: 53, mag: 45, def: 52, res: 51, spd: 47 }, sprite: "assets/076_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["WINGS", "SHADOW", "PUMMEL", "MURK", "REND", "POISON CLOUD", "GHOST BREATH", "BERSERK", "BLOSSOM", "NIGHTMARE", "WYRMFLARE", "ROCK SPELL", "SOUL PUNCH", "BOULDER BREAK", "JUGGERNAUT", "DARK MATTER", "SEISMIC PULSE", "TERRA CRUSH", "DOOMSDAY", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], sprite: "assets/076_s.png" } },
 "077 Faequill": { normal: { houses: ["Mystic", "Whimsical"], moves: ["WINGS", "BOLT", "MAGIC SONG", "DANCE", "STARBOLT", "POCO SONG", "GLITTER", "MAGIC BLAST", "BLOSSOM", "THUNDERCLAP", "WYRMFLARE", "ARCANA", "HARMONIZE", "HEX", "TIME TRAVEL", "LIGHT SHIELD", "DARK SONG", "LIGHT SONG", "STARLIGHT", "LUSTER BEAM", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], stats: { hp: 145, atk: 58, mag: 63, def: 63, res: 60, spd: 66 }, sprite: "assets/077_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["WINGS", "SHADOW", "PUMMEL", "MURK", "REND", "POISON CLOUD", "GHOST BREATH", "BERSERK", "BLOSSOM", "NIGHTMARE", "WYRMFLARE", "ROCK SPELL", "SOUL PUNCH", "BOULDER BREAK", "JUGGERNAUT", "DARK MATTER", "SEISMIC PULSE", "TERRA CRUSH", "DOOMSDAY", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], sprite: "assets/077_s.png" } },
 "078 Pocobo": { normal: { houses: ["Mystic", "Whimsical"], moves: ["WINGS", "BOLT", "MAGIC SONG", "DANCE", "STARBOLT", "POCO SONG", "GLITTER", "MAGIC BLAST", "BLOSSOM", "THUNDERCLAP", "WYRMFLARE", "ARCANA", "HARMONIZE", "HEX", "TIME TRAVEL", "LIGHT SHIELD", "DARK SONG", "LIGHT SONG", "STARLIGHT", "LUSTER BEAM", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], stats: { hp: 166, atk: 77, mag: 92, def: 81, res: 81, spd: 92 }, sprite: "assets/078_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: ["WINGS", "SHADOW", "PUMMEL", "MURK", "REND", "POISON CLOUD", "GHOST BREATH", "BERSERK", "BLOSSOM", "NIGHTMARE", "WYRMFLARE", "ROCK SPELL", "SOUL PUNCH", "BOULDER BREAK", "JUGGERNAUT", "DARK MATTER", "SEISMIC PULSE", "TERRA CRUSH", "DOOMSDAY", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["WONDER CHIRP", "SONGBIRD", "SHORT REST", "MANA GIFT", "AUTO BOLT", "TACTICIAN", "FLIGHT", "RAINBOW AURA", "GALEFORCE", "HEALING GROVE", "CRITICAL EYE", "SUPERCHARGE", "SPELLSHIELD"], sprite: "assets/078_s.png" } },
 "079 Gardslug": { normal: { houses: ["Ironclad", "Overgrowth"], moves: ["GRIND", "GUARD UP", "PETAL", "ROOT", "SPORES", "BLOSSOM", "THWACK", "HAMMER", "FORTIFY", "BULWARK", "METAL BALL", "JUGGERNAUT", "ENDLESS VINES", "WOODLAND STEP", "LEAF STORM", "BOULDER BREAK", "RADIANCE", "TERRA CRUSH", "CACTUS BASH", "WILDGROWTH", "TITAN BASH"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], stats: { hp: 109, atk: 47, mag: 43, def: 51, res: 45, spd: 55 }, sprite: "assets/079_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "ZAP", "GLITTER", "STARBOLT", "DAZZLE", "QUAKE", "BERSERK", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "ZAP TACKLE", "LIGHT SHIELD", "RADIANCE", "TERRA CRUSH", "STARLIGHT", "LIGHT CANNON", "SNEAKY STRIKES"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], sprite: "assets/079_s.png" } },
 "080 Cadeetle": { normal: { houses: ["Ironclad", "Overgrowth"], moves: ["GRIND", "GUARD UP", "PETAL", "ROOT", "SPORES", "BLOSSOM", "THWACK", "HAMMER", "FORTIFY", "BULWARK", "METAL BALL", "JUGGERNAUT", "ENDLESS VINES", "WOODLAND STEP", "LEAF STORM", "BOULDER BREAK", "RADIANCE", "TERRA CRUSH", "CACTUS BASH", "WILDGROWTH", "TITAN BASH"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], stats: { hp: 120, atk: 76, mag: 67, def: 67, res: 64, spd: 61 }, sprite: "assets/080_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "ZAP", "GLITTER", "STARBOLT", "DAZZLE", "QUAKE", "BERSERK", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "ZAP TACKLE", "LIGHT SHIELD", "RADIANCE", "TERRA CRUSH", "STARLIGHT", "LIGHT CANNON", "SNEAKY STRIKES"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], sprite: "assets/080_s.png" } },
 "081 Bugbastion": { normal: { houses: ["Ironclad", "Overgrowth"], moves: ["GRIND", "GUARD UP", "PETAL", "ROOT", "SPORES", "BLOSSOM", "THWACK", "HAMMER", "FORTIFY", "BULWARK", "METAL BALL", "JUGGERNAUT", "ENDLESS VINES", "WOODLAND STEP", "LEAF STORM", "BOULDER BREAK", "RADIANCE", "TERRA CRUSH", "CACTUS BASH", "WILDGROWTH", "TITAN BASH"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], stats: { hp: 185, atk: 80, mag: 86, def: 73, res: 90, spd: 75 }, sprite: "assets/081_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "ZAP", "GLITTER", "STARBOLT", "DAZZLE", "QUAKE", "BERSERK", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "ZAP TACKLE", "LIGHT SHIELD", "RADIANCE", "TERRA CRUSH", "STARLIGHT", "LIGHT CANNON", "SNEAKY STRIKES"], passives: ["EXOSKELETON", "SAPROLING", "STALWART", "TANK", "STEEL SKIN", "SLUDGE", "METALSMITH", "OVERGUARD", "HEAVY PLATE", "REGROWTH", "BIG HEART", "WILD HEART", "STINKY", "MORE SPORE"], sprite: "assets/081_s.png" } },
 "082 Squito": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: ["STAB", "BLOSSOM", "SPORES", "MURK", "BOLT", "POISON CLOUD", "SCATHE", "WOODLAND STEP", "LEAF STORM", "SHADOW AXE", "ZAP TACKLE", "HEX", "NIGHTMARE", "WILD WIND", "NEEDLE LANCE", "BLIZZARD LANCE", "WILDGROWTH", "LEAF BEAM", "OBLIVION", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], stats: { hp: 111, atk: 56, mag: 44, def: 44, res: 44, spd: 51 }, sprite: "assets/082_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: ["STAB", "WILDFIRE", "HEAT SHIELD", "TORRENT", "BOLT", "LIGHT RAIN", "SCATHE", "WISPS", "FIERY HORNS", "TIDAL WAVE", "ZAP TACKLE", "HEX", "DELUGE", "FIRE FLOWER", "NEEDLE LANCE", "BLIZZARD LANCE", "FIRE BEAM", "VOLCANO", "MAELSTROM", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], sprite: "assets/082_s.png" } },
 "083 Mossquito": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: ["STAB", "BLOSSOM", "SPORES", "MURK", "BOLT", "POISON CLOUD", "SCATHE", "WOODLAND STEP", "LEAF STORM", "SHADOW AXE", "ZAP TACKLE", "HEX", "NIGHTMARE", "WILD WIND", "NEEDLE LANCE", "BLIZZARD LANCE", "WILDGROWTH", "LEAF BEAM", "OBLIVION", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], stats: { hp: 120, atk: 57, mag: 71, def: 75, res: 67, spd: 65 }, sprite: "assets/083_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: ["STAB", "WILDFIRE", "HEAT SHIELD", "TORRENT", "BOLT", "LIGHT RAIN", "SCATHE", "WISPS", "FIERY HORNS", "TIDAL WAVE", "ZAP TACKLE", "HEX", "DELUGE", "FIRE FLOWER", "NEEDLE LANCE", "BLIZZARD LANCE", "FIRE BEAM", "VOLCANO", "MAELSTROM", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], sprite: "assets/083_s.png" } },
 "084 Venomite": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: ["STAB", "BLOSSOM", "SPORES", "MURK", "BOLT", "POISON CLOUD", "SCATHE", "WOODLAND STEP", "LEAF STORM", "SHADOW AXE", "ZAP TACKLE", "HEX", "NIGHTMARE", "WILD WIND", "NEEDLE LANCE", "BLIZZARD LANCE", "WILDGROWTH", "LEAF BEAM", "OBLIVION", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], stats: { hp: 153, atk: 97, mag: 74, def: 86, res: 86, spd: 93 }, sprite: "assets/084_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: ["STAB", "WILDFIRE", "HEAT SHIELD", "TORRENT", "BOLT", "LIGHT RAIN", "SCATHE", "WISPS", "FIERY HORNS", "TIDAL WAVE", "ZAP TACKLE", "HEX", "DELUGE", "FIRE FLOWER", "NEEDLE LANCE", "BLIZZARD LANCE", "FIRE BEAM", "VOLCANO", "MAELSTROM", "DARK SONG"], passives: ["RANDOM POISON", "REGROWTH", "MORE SPORE", "FLIGHT", "MAX POISON", "EXOSKELETON", "BERSERKER", "FLASHBANG", "ANIMATED", "VENOMOUS", "STINKY"], sprite: "assets/084_s.png" } },
 "085 Polly": { normal: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "DEWDROP", "PUMMEL", "TORRENT", "STAR", "QUAKE", "SKY CANNON", "BIG BRAWL", "THUNDERCLAP", "LIGHT SHIELD", "AQUA LANCE", "GLACIAL ORBS", "METAL BALL", "BOULDER BREAK", "JUGGERNAUT", "WILD WIND", "LIGHT CANNON", "OBLIVION", "TERRA CRUSH", "BLIZZARD LANCE", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], stats: { hp: 109, atk: 50, mag: 52, def: 50, res: 47, spd: 42 }, sprite: "assets/085_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["CLAWS", "ZAP", "GUARD UP", "DANCE", "STAR", "HAMMER", "STARBOLT", "RAZOR", "THUNDERCLAP", "LIGHT SHIELD", "METAL BALL", "BULWARK", "WILD WIND", "LIGHT CANNON", "OBLIVION", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], sprite: "assets/085_s.png" } },
 "086 Cluccaneer": { normal: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "DEWDROP", "PUMMEL", "TORRENT", "STAR", "QUAKE", "SKY CANNON", "BIG BRAWL", "THUNDERCLAP", "LIGHT SHIELD", "AQUA LANCE", "GLACIAL ORBS", "METAL BALL", "BOULDER BREAK", "JUGGERNAUT", "WILD WIND", "LIGHT CANNON", "OBLIVION", "TERRA CRUSH", "BLIZZARD LANCE", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], stats: { hp: 152, atk: 62, mag: 59, def: 66, res: 58, spd: 58 }, sprite: "assets/086_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["CLAWS", "ZAP", "GUARD UP", "DANCE", "STAR", "HAMMER", "STARBOLT", "RAZOR", "THUNDERCLAP", "LIGHT SHIELD", "METAL BALL", "BULWARK", "WILD WIND", "LIGHT CANNON", "OBLIVION", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], sprite: "assets/086_s.png" } },
 "087 Beakbeard": { normal: { houses: ["Atlantian", "Brawler"], moves: ["CLAWS", "DEWDROP", "PUMMEL", "TORRENT", "STAR", "QUAKE", "SKY CANNON", "BIG BRAWL", "THUNDERCLAP", "LIGHT SHIELD", "AQUA LANCE", "GLACIAL ORBS", "METAL BALL", "BOULDER BREAK", "JUGGERNAUT", "WILD WIND", "LIGHT CANNON", "OBLIVION", "TERRA CRUSH", "BLIZZARD LANCE", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], stats: { hp: 190, atk: 72, mag: 76, def: 77, res: 88, spd: 86 }, sprite: "assets/087_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["CLAWS", "ZAP", "GUARD UP", "DANCE", "STAR", "HAMMER", "STARBOLT", "RAZOR", "THUNDERCLAP", "LIGHT SHIELD", "METAL BALL", "BULWARK", "WILD WIND", "LIGHT CANNON", "OBLIVION", "STEEL BLADE"], passives: ["CRITICAL EYE", "TACTICIAN", "WILD HEART", "WARP SPEED", "SCOUNDREL", "RAINBOW AURA", "BRUISER", "SEASHORE", "CANNONEER", "CLOUD SEED", "QUICK SHIELD", "DEF BREAKER", "SHORT REST", "GALEFORCE"], sprite: "assets/087_s.png" } },
 "088 Dracobull": { normal: { houses: ["Dragoon", "Fireborn"], moves: ["BONK", "SCORCH", "BITE", "FLARE", "PUMMEL", "CHOMP", "BLAZE BLAST", "TALONS", "POISON BITE", "HORN", "INFERNO PUNCH", "DRACO BITE", "BOULDER BREAK", "FIERY HORNS", "WYVERN ASCENT", "JUGGERNAUT", "CLOBBER", "CRUSHING JAWS", "TITAN BASH", "VOLCANO", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], stats: { hp: 104, atk: 44, mag: 48, def: 54, res: 48, spd: 52 }, sprite: "assets/088_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["BONK", "BRAMBLE", "HEAL DANCE", "KISS", "PUMMEL", "FAERIE FIRE", "VINE SLASH", "TALONS", "POISON BITE", "HORN", "WILD WIND", "TIME BREAK", "BOULDER BREAK", "LEAF STORM", "HEX", "JUGGERNAUT", "CLOBBER", "GRAND AURA", "TITAN BASH", "LEAF BEAM", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], sprite: "assets/088_s.png" } },
 "089 Dracohorn": { normal: { houses: ["Dragoon", "Fireborn"], moves: ["BONK", "SCORCH", "BITE", "FLARE", "PUMMEL", "CHOMP", "BLAZE BLAST", "TALONS", "POISON BITE", "HORN", "INFERNO PUNCH", "DRACO BITE", "BOULDER BREAK", "FIERY HORNS", "WYVERN ASCENT", "JUGGERNAUT", "CLOBBER", "CRUSHING JAWS", "TITAN BASH", "VOLCANO", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], stats: { hp: 128, atk: 70, mag: 59, def: 74, res: 60, spd: 64 }, sprite: "assets/089_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["BONK", "BRAMBLE", "HEAL DANCE", "KISS", "PUMMEL", "FAERIE FIRE", "VINE SLASH", "TALONS", "POISON BITE", "HORN", "WILD WIND", "TIME BREAK", "BOULDER BREAK", "LEAF STORM", "HEX", "JUGGERNAUT", "CLOBBER", "GRAND AURA", "TITAN BASH", "LEAF BEAM", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], sprite: "assets/089_s.png" } },
 "090 Bullzerker": { normal: { houses: ["Dragoon", "Fireborn"], moves: ["BONK", "SCORCH", "BITE", "FLARE", "PUMMEL", "CHOMP", "BLAZE BLAST", "TALONS", "POISON BITE", "HORN", "INFERNO PUNCH", "DRACO BITE", "BOULDER BREAK", "FIERY HORNS", "WYVERN ASCENT", "JUGGERNAUT", "CLOBBER", "CRUSHING JAWS", "TITAN BASH", "VOLCANO", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], stats: { hp: 162, atk: 92, mag: 75, def: 85, res: 88, spd: 87 }, sprite: "assets/090_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: ["BONK", "BRAMBLE", "HEAL DANCE", "KISS", "PUMMEL", "FAERIE FIRE", "VINE SLASH", "TALONS", "POISON BITE", "HORN", "WILD WIND", "TIME BREAK", "BOULDER BREAK", "LEAF STORM", "HEX", "JUGGERNAUT", "CLOBBER", "GRAND AURA", "TITAN BASH", "LEAF BEAM", "TERRA CRUSH"], passives: ["BERSERKER", "SLUGGER", "SMOLDER", "SUNFLARE", "ANIMATED", "TACTICIAN", "VICIOUS", "WARP SPEED", "HOT HEAD", "FIRE TALONS", "SHARP TEETH", "DRAGON EYE", "QUICK SHIELD", "WILD HEART"], sprite: "assets/090_s.png" } },
 "091 Gillywatt": { normal: { houses: ["Atlantian", "Whimsical"], moves: ["DEWDROP", "BITE", "BOLT", "TORRENT", "WHIRL", "AQUALUNG", "STARBOLT", "DAZZLE", "POISON BITE", "DELUGE", "TIDAL WAVE", "ZAP TACKLE", "AQUA LANCE", "THUNDERCLAP", "DRACO BITE", "BOULDER BREAK", "BLIZZARD LANCE", "CRUSHING JAWS", "MAELSTROM", "RADIANCE", "LIGHT CANNON"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], stats: { hp: 99, atk: 51, mag: 56, def: 52, res: 50, spd: 42 }, sprite: "assets/091_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: ["SHADE", "BITE", "PSIONIC", "MURK", "GHOST BREATH", "POISON BITE", "FAERIE FIRE", "NIGHTMARE", "SHADOW AXE", "HARMONIZE", "DARK MATTER", "HEX", "DRACO BITE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "OBLIVION", "LUSTER BEAM", "LIGHT SONG"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], sprite: "assets/091_s.png" } },
 "092 Gulpawatt": { normal: { houses: ["Atlantian", "Whimsical"], moves: ["DEWDROP", "BITE", "BOLT", "TORRENT", "WHIRL", "AQUALUNG", "STARBOLT", "DAZZLE", "POISON BITE", "DELUGE", "TIDAL WAVE", "ZAP TACKLE", "AQUA LANCE", "THUNDERCLAP", "DRACO BITE", "BOULDER BREAK", "BLIZZARD LANCE", "CRUSHING JAWS", "MAELSTROM", "RADIANCE", "LIGHT CANNON"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], stats: { hp: 128, atk: 62, mag: 72, def: 73, res: 62, spd: 58 }, sprite: "assets/092_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: ["SHADE", "BITE", "PSIONIC", "MURK", "GHOST BREATH", "POISON BITE", "FAERIE FIRE", "NIGHTMARE", "SHADOW AXE", "HARMONIZE", "DARK MATTER", "HEX", "DRACO BITE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "OBLIVION", "LUSTER BEAM", "LIGHT SONG"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], sprite: "assets/092_s.png" } },
 "093 Lanterror": { normal: { houses: ["Atlantian", "Whimsical"], moves: ["DEWDROP", "BITE", "BOLT", "TORRENT", "WHIRL", "AQUALUNG", "STARBOLT", "DAZZLE", "POISON BITE", "DELUGE", "TIDAL WAVE", "ZAP TACKLE", "AQUA LANCE", "THUNDERCLAP", "DRACO BITE", "BOULDER BREAK", "BLIZZARD LANCE", "CRUSHING JAWS", "MAELSTROM", "RADIANCE", "LIGHT CANNON"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], stats: { hp: 176, atk: 91, mag: 76, def: 94, res: 79, spd: 73 }, sprite: "assets/093_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: ["SHADE", "BITE", "PSIONIC", "MURK", "GHOST BREATH", "POISON BITE", "FAERIE FIRE", "NIGHTMARE", "SHADOW AXE", "HARMONIZE", "DARK MATTER", "HEX", "DRACO BITE", "BOULDER BREAK", "DARK CHOMP", "CRUSHING JAWS", "OBLIVION", "LUSTER BEAM", "LIGHT SONG"], passives: ["ELECTRIFY", "SLIMY SCALES", "BLUBBER", "FLASHBANG", "SEASHORE", "SUPERCHARGE", "AUTO BOLT", "BRUISER", "RES BREAKER", "TACTICIAN", "ANIMATED", "CHUBBY", "SHARP TEETH"], sprite: "assets/093_s.png" } },
 "094 Charchunk": { normal: { houses: ["Fireborn", "Ironclad"], moves: ["GRIND", "GUARD UP", "FIREBALL", "SCORCH", "BONK", "HEAT SHIELD", "HAMMER", "FORTIFY", "HARMONIZE", "BULWARK", "METAL BALL", "ENFLAME", "INFERNO PUNCH", "FIRE TOWER", "ZAP TACKLE", "BOULDER BREAK", "JUGGERNAUT", "TERRA CRUSH", "TITAN BASH", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], stats: { hp: 88, atk: 55, mag: 54, def: 47, res: 52, spd: 54 }, sprite: "assets/094_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "BOLT", "BONK", "GLITTER", "QUAKE", "BERSERK", "HARMONIZE", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "LIGHT SHIELD", "ZAP TACKLE", "TERRA CRUSH", "SNEAKY STRIKES", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], sprite: "assets/094_s.png" } },
 "095 Infernace": { normal: { houses: ["Fireborn", "Ironclad"], moves: ["GRIND", "GUARD UP", "FIREBALL", "SCORCH", "BONK", "HEAT SHIELD", "HAMMER", "FORTIFY", "HARMONIZE", "BULWARK", "METAL BALL", "ENFLAME", "INFERNO PUNCH", "FIRE TOWER", "ZAP TACKLE", "BOULDER BREAK", "JUGGERNAUT", "TERRA CRUSH", "TITAN BASH", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], stats: { hp: 136, atk: 70, mag: 53, def: 62, res: 65, spd: 69 }, sprite: "assets/095_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "BOLT", "BONK", "GLITTER", "QUAKE", "BERSERK", "HARMONIZE", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "LIGHT SHIELD", "ZAP TACKLE", "TERRA CRUSH", "SNEAKY STRIKES", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], sprite: "assets/095_s.png" } },
 "096 Hadrion": { normal: { houses: ["Fireborn", "Ironclad"], moves: ["GRIND", "GUARD UP", "FIREBALL", "SCORCH", "BONK", "HEAT SHIELD", "HAMMER", "FORTIFY", "HARMONIZE", "BULWARK", "METAL BALL", "ENFLAME", "INFERNO PUNCH", "FIRE TOWER", "ZAP TACKLE", "BOULDER BREAK", "JUGGERNAUT", "TERRA CRUSH", "TITAN BASH", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], stats: { hp: 187, atk: 71, mag: 71, def: 93, res: 88, spd: 79 }, sprite: "assets/096_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: ["UPPERCUT", "PUMMEL", "DANCE", "BOLT", "BONK", "GLITTER", "QUAKE", "BERSERK", "HARMONIZE", "BOULDER BREAK", "JUGGERNAUT", "THUNDERCLAP", "LIGHT SHIELD", "ZAP TACKLE", "TERRA CRUSH", "SNEAKY STRIKES", "EXPLODE", "SEISMIC PULSE"], passives: ["STEEL SKIN", "TANK", "SMOLDER", "TACTICIAN", "HOT HEAD", "HEAVY PLATE", "EXOSKELETON", "METALSMITH", "MAX BURN", "CRITICAL EYE", "OVERGUARD", "SLUGGER", "WILD HEART"], sprite: "assets/096_s.png" } },
// NOTE: no normal growth file found for "097 Dumblo" (expected pathID 0)
// NOTE: no shiny growth file found for "097 Dumblo" (expected pathID 0)
 "097 Dumblo": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 94, atk: 49, mag: 50, def: 48, res: 55, spd: 54 }, sprite: "assets/097_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/097_s.png" } },
// NOTE: no normal growth file found for "098 Driftusk" (expected pathID 0)
// NOTE: no shiny growth file found for "098 Driftusk" (expected pathID 0)
 "098 Driftusk": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 114, atk: 67, mag: 72, def: 65, res: 68, spd: 69 }, sprite: "assets/098_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/098_s.png" } },
// NOTE: no normal growth file found for "099 Lullaphant" (expected pathID 0)
// NOTE: no shiny growth file found for "099 Lullaphant" (expected pathID 0)
 "099 Lullaphant": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 181, atk: 80, mag: 91, def: 80, res: 71, spd: 86 }, sprite: "assets/099_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/099_s.png" } },
// NOTE: no normal growth file found for "100 Helmkin" (expected pathID 0)
// NOTE: no shiny growth file found for "100 Helmkin" (expected pathID 0)
 "100 Helmkin": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 96, atk: 55, mag: 49, def: 50, res: 44, spd: 56 }, sprite: "assets/100_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/100_s.png" } },
// NOTE: no normal growth file found for "101 Hollowisp" (expected pathID 0)
// NOTE: no shiny growth file found for "101 Hollowisp" (expected pathID 0)
 "101 Hollowisp": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 119, atk: 67, mag: 71, def: 69, res: 61, spd: 68 }, sprite: "assets/101_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/101_s.png" } },
// NOTE: no normal growth file found for "102 Knightgeist" (expected pathID 0)
// NOTE: no shiny growth file found for "102 Knightgeist" (expected pathID 0)
 "102 Knightgeist": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 171, atk: 80, mag: 87, def: 87, res: 90, spd: 74 }, sprite: "assets/102_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/102_s.png" } },
// NOTE: no normal growth file found for "103 Nessie" (expected pathID 0)
// NOTE: no shiny growth file found for "103 Nessie" (expected pathID 0)
 "103 Nessie": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 92, atk: 50, mag: 49, def: 51, res: 54, spd: 54 }, sprite: "assets/103_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/103_s.png" } },
// NOTE: no normal growth file found for "104 Moxasaur" (expected pathID 0)
// NOTE: no shiny growth file found for "104 Moxasaur" (expected pathID 0)
 "104 Moxasaur": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 126, atk: 72, mag: 57, def: 59, res: 67, spd: 74 }, sprite: "assets/104_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/104_s.png" } },
// NOTE: no normal growth file found for "105 Coralodon" (expected pathID 0)
// NOTE: no shiny growth file found for "105 Coralodon" (expected pathID 0)
 "105 Coralodon": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 183, atk: 83, mag: 83, def: 78, res: 88, spd: 74 }, sprite: "assets/105_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/105_s.png" } },
// NOTE: no normal growth file found for "106 Wilowisp" (expected pathID 0)
// NOTE: no shiny growth file found for "106 Wilowisp" (expected pathID 0)
 "106 Wilowisp": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 94, atk: 52, mag: 51, def: 48, res: 57, spd: 48 }, sprite: "assets/106_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], sprite: "assets/106_s.png" } },
// NOTE: no normal growth file found for "107 Wilowraith" (expected pathID 0)
// NOTE: no shiny growth file found for "107 Wilowraith" (expected pathID 0)
 "107 Wilowraith": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 129, atk: 66, mag: 67, def: 60, res: 74, spd: 59 }, sprite: "assets/107_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], sprite: "assets/107_s.png" } },
// NOTE: no normal growth file found for "108 Revreaper" (expected pathID 0)
// NOTE: no shiny growth file found for "108 Revreaper" (expected pathID 0)
 "108 Revreaper": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 171, atk: 81, mag: 96, def: 86, res: 73, spd: 82 }, sprite: "assets/108_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], sprite: "assets/108_s.png" } },
// NOTE: no normal growth file found for "109 Alligyle" (expected pathID 0)
// NOTE: no shiny growth file found for "109 Alligyle" (expected pathID 0)
 "109 Alligyle": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 100, atk: 48, mag: 51, def: 51, res: 57, spd: 43 }, sprite: "assets/109_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], sprite: "assets/109_s.png" } },
// NOTE: no normal growth file found for "110 Waddlgator" (expected pathID 0)
// NOTE: no shiny growth file found for "110 Waddlgator" (expected pathID 0)
 "110 Waddlgator": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 134, atk: 67, mag: 54, def: 69, res: 70, spd: 61 }, sprite: "assets/110_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], sprite: "assets/110_s.png" } },
// NOTE: no normal growth file found for "111 Crocolossus" (expected pathID 0)
// NOTE: no shiny growth file found for "111 Crocolossus" (expected pathID 0)
 "111 Crocolossus": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 163, atk: 87, mag: 83, def: 92, res: 83, spd: 81 }, sprite: "assets/111_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], sprite: "assets/111_s.png" } },
// NOTE: no normal growth file found for "112 Redcap" (expected pathID 0)
// NOTE: no shiny growth file found for "112 Redcap" (expected pathID 0)
 "112 Redcap": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 107, atk: 51, mag: 54, def: 42, res: 43, spd: 53 }, sprite: "assets/112_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/112_s.png" } },
// NOTE: no normal growth file found for "113 Sporch" (expected pathID 0)
// NOTE: no shiny growth file found for "113 Sporch" (expected pathID 0)
 "113 Sporch": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 122, atk: 68, mag: 73, def: 59, res: 60, spd: 73 }, sprite: "assets/113_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/113_s.png" } },
// NOTE: no normal growth file found for "114 Gloomshroom" (expected pathID 0)
// NOTE: no shiny growth file found for "114 Gloomshroom" (expected pathID 0)
 "114 Gloomshroom": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 173, atk: 79, mag: 83, def: 92, res: 79, spd: 83 }, sprite: "assets/114_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/114_s.png" } },
 "115 Psyclod": { normal: { houses: ["Nightwatch"], moves: ["PUNCH", "PUMMEL", "SHADE", "SHADOW", "TANTRUM", "GHOST BREATH", "QUAKE", "MAGIC BLAST", "SOUL PUNCH", "ROCK SPELL", "LICK", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "OBLIVION", "SEISMIC PULSE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], stats: { hp: 103, atk: 49, mag: 47, def: 54, res: 46, spd: 51 }, sprite: "assets/115_n.png" }, sparkly: { houses: ["Dragoon"], moves: ["PUNCH", "GUARD UP", "FLARE", "BITE", "QUADRA LANCE", "CRUSH", "HAMMER", "MAGIC BLAST", "SKEWER", "METAL BALL", "LICK", "SKYDIVE", "THUNDERCLAP", "WYVERN ASCENT", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "DRAGON BEAM", "STEEL BLADE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], sprite: "assets/115_s.png" } },
 "116 Psytongue": { normal: { houses: ["Brawler", "Nightwatch"], moves: ["PUNCH", "PUMMEL", "SHADE", "SHADOW", "TANTRUM", "GHOST BREATH", "QUAKE", "MAGIC BLAST", "SOUL PUNCH", "ROCK SPELL", "LICK", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "OBLIVION", "SEISMIC PULSE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], stats: { hp: 134, atk: 69, mag: 63, def: 67, res: 55, spd: 67 }, sprite: "assets/116_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: ["PUNCH", "GUARD UP", "FLARE", "BITE", "QUADRA LANCE", "CRUSH", "HAMMER", "MAGIC BLAST", "SKEWER", "METAL BALL", "LICK", "SKYDIVE", "THUNDERCLAP", "WYVERN ASCENT", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "DRAGON BEAM", "STEEL BLADE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], sprite: "assets/116_s.png" } },
 "117 Psyrock": { normal: { houses: ["Brawler", "Nightwatch"], moves: ["PUNCH", "PUMMEL", "SHADE", "SHADOW", "TANTRUM", "GHOST BREATH", "QUAKE", "MAGIC BLAST", "SOUL PUNCH", "ROCK SPELL", "LICK", "SHADOW AXE", "THUNDERCLAP", "NIGHTMARE", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "OBLIVION", "SEISMIC PULSE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], stats: { hp: 182, atk: 73, mag: 89, def: 80, res: 90, spd: 75 }, sprite: "assets/117_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: ["PUNCH", "GUARD UP", "FLARE", "BITE", "QUADRA LANCE", "CRUSH", "HAMMER", "MAGIC BLAST", "SKEWER", "METAL BALL", "LICK", "SKYDIVE", "THUNDERCLAP", "WYVERN ASCENT", "FIRE TOWER", "TIDAL WAVE", "MAELSTROM", "DRAGON BEAM", "STEEL BLADE", "LUSTER BEAM", "DARK SONG"], passives: ["STALWART", "SUPERCHARGE", "SHADOW GIFT", "CURSED", "ROCK ARMOR", "RES BREAKER", "SOUL BLASTER", "GHOSTLY", "DARK HARVEST", "PHANTOM", "TACTICIAN", "BIG TONGUE", "LAST STAND", "SPELLSHIELD"], sprite: "assets/117_s.png" } },
// NOTE: no normal growth file found for "118 Pengu" (expected pathID 0)
// NOTE: no shiny growth file found for "118 Pengu" (expected pathID 0)
 "118 Pengu": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 89, atk: 49, mag: 52, def: 53, res: 54, spd: 53 }, sprite: "assets/118_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], sprite: "assets/118_s.png" } },
// NOTE: no normal growth file found for "119 Pengurai" (expected pathID 0)
// NOTE: no shiny growth file found for "119 Pengurai" (expected pathID 0)
 "119 Pengurai": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 137, atk: 59, mag: 60, def: 66, res: 68, spd: 65 }, sprite: "assets/119_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], sprite: "assets/119_s.png" } },
// NOTE: no normal growth file found for "120 Raironin" (expected pathID 0)
// NOTE: no shiny growth file found for "120 Raironin" (expected pathID 0)
 "120 Raironin": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 161, atk: 91, mag: 84, def: 84, res: 85, spd: 84 }, sprite: "assets/120_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], sprite: "assets/120_s.png" } },
 "121 Clammler": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["DEWDROP", "DOUBLE BUBBLE", "GRIND", "GUARD UP", "SCATHE", "RAZOR", "FORTIFY", "WHIRL", "DELUGE", "TIDAL WAVE", "AQUA LANCE", "BULWARK", "TIME BREAK", "SKEWER", "SPIKY TAIL", "GLACIAL ORBS", "MAELSTROM", "BLIZZARD BEAM", "LIGHT CANNON", "TITAN BASH", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], stats: { hp: 107, atk: 49, mag: 41, def: 55, res: 52, spd: 46 }, sprite: "assets/121_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["KISS", "PSIONIC", "UPPERCUT", "PUMMEL", "SCATHE", "BIG BRAWL", "BERSERK", "ENERGY WIPE", "HEX", "HARMONIZE", "TIME TRAVEL", "BOULDER BREAK", "TIME BREAK", "SOUL PUNCH", "SPIKY TAIL", "AETHER HEAL", "LUSTER BEAM", "DARK SONG", "LIGHT CANNON", "SNEAKY STRIKES", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], sprite: "assets/121_s.png" } },
 "122 Shelltler": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["DEWDROP", "DOUBLE BUBBLE", "GRIND", "GUARD UP", "SCATHE", "RAZOR", "FORTIFY", "WHIRL", "DELUGE", "TIDAL WAVE", "AQUA LANCE", "BULWARK", "TIME BREAK", "SKEWER", "SPIKY TAIL", "GLACIAL ORBS", "MAELSTROM", "BLIZZARD BEAM", "LIGHT CANNON", "TITAN BASH", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], stats: { hp: 137, atk: 56, mag: 56, def: 73, res: 60, spd: 73 }, sprite: "assets/122_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["KISS", "PSIONIC", "UPPERCUT", "PUMMEL", "SCATHE", "BIG BRAWL", "BERSERK", "ENERGY WIPE", "HEX", "HARMONIZE", "TIME TRAVEL", "BOULDER BREAK", "TIME BREAK", "SOUL PUNCH", "SPIKY TAIL", "AETHER HEAL", "LUSTER BEAM", "DARK SONG", "LIGHT CANNON", "SNEAKY STRIKES", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], sprite: "assets/122_s.png" } },
 "123 Shieldler": { normal: { houses: ["Atlantian", "Ironclad"], moves: ["DEWDROP", "DOUBLE BUBBLE", "GRIND", "GUARD UP", "SCATHE", "RAZOR", "FORTIFY", "WHIRL", "DELUGE", "TIDAL WAVE", "AQUA LANCE", "BULWARK", "TIME BREAK", "SKEWER", "SPIKY TAIL", "GLACIAL ORBS", "MAELSTROM", "BLIZZARD BEAM", "LIGHT CANNON", "TITAN BASH", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], stats: { hp: 170, atk: 88, mag: 81, def: 82, res: 84, spd: 84 }, sprite: "assets/123_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: ["KISS", "PSIONIC", "UPPERCUT", "PUMMEL", "SCATHE", "BIG BRAWL", "BERSERK", "ENERGY WIPE", "HEX", "HARMONIZE", "TIME TRAVEL", "BOULDER BREAK", "TIME BREAK", "SOUL PUNCH", "SPIKY TAIL", "AETHER HEAL", "LUSTER BEAM", "DARK SONG", "LIGHT CANNON", "SNEAKY STRIKES", "CRUSHING JAWS"], passives: ["SEASHORE", "QUICK SHIELD", "TANK", "STEEL SKIN", "DRENCH", "SLIMY SCALES", "CALM MIST", "OVERGUARD", "HEAVY PLATE", "RAINBOW AURA", "TACTICIAN", "PROTECTOR", "LAST STAND"], sprite: "assets/123_s.png" } },
// NOTE: no normal growth file found for "124 Bonpot" (expected pathID 0)
// NOTE: no shiny growth file found for "124 Bonpot" (expected pathID 0)
 "124 Bonpot": { normal: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 110, atk: 47, mag: 45, def: 54, res: 47, spd: 47 }, sprite: "assets/124_n.png" }, sparkly: { houses: ["Brawler"], moves: [], passives: [], sprite: "assets/124_s.png" } },
// NOTE: no normal growth file found for "125 Bonsprout" (expected pathID 0)
// NOTE: no shiny growth file found for "125 Bonsprout" (expected pathID 0)
 "125 Bonsprout": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 143, atk: 57, mag: 71, def: 65, res: 59, spd: 60 }, sprite: "assets/125_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], sprite: "assets/125_s.png" } },
// NOTE: no normal growth file found for "126 Bonblossom" (expected pathID 0)
// NOTE: no shiny growth file found for "126 Bonblossom" (expected pathID 0)
 "126 Bonblossom": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 161, atk: 89, mag: 91, def: 86, res: 82, spd: 80 }, sprite: "assets/126_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], sprite: "assets/126_s.png" } },
// NOTE: no normal growth file found for "127 Bitmant" (expected pathID 0)
// NOTE: no shiny growth file found for "127 Bitmant" (expected pathID 0)
 "127 Bitmant": { normal: { houses: ["Ironclad"], moves: [], passives: [], stats: { hp: 105, atk: 45, mag: 52, def: 46, res: 49, spd: 53 }, sprite: "assets/127_n.png" }, sparkly: { houses: ["Overgrowth"], moves: [], passives: [], sprite: "assets/127_s.png" } },
// NOTE: no normal growth file found for "128 Metalmant" (expected pathID 0)
// NOTE: no shiny growth file found for "128 Metalmant" (expected pathID 0)
 "128 Metalmant": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 121, atk: 60, mag: 71, def: 67, res: 72, spd: 64 }, sprite: "assets/128_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], sprite: "assets/128_s.png" } },
// NOTE: no normal growth file found for "129 Adamantis" (expected pathID 0)
// NOTE: no shiny growth file found for "129 Adamantis" (expected pathID 0)
 "129 Adamantis": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 152, atk: 96, mag: 89, def: 80, res: 82, spd: 90 }, sprite: "assets/129_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], sprite: "assets/129_s.png" } },
// NOTE: no normal growth file found for "130 Corsea" (expected pathID 0)
// NOTE: no shiny growth file found for "130 Corsea" (expected pathID 0)
 "130 Corsea": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 105, atk: 43, mag: 55, def: 49, res: 47, spd: 51 }, sprite: "assets/130_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], sprite: "assets/130_s.png" } },
// NOTE: no normal growth file found for "131 Seapuff" (expected pathID 0)
// NOTE: no shiny growth file found for "131 Seapuff" (expected pathID 0)
 "131 Seapuff": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 137, atk: 58, mag: 74, def: 63, res: 60, spd: 63 }, sprite: "assets/131_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], sprite: "assets/131_s.png" } },
// NOTE: no normal growth file found for "132 Hippoflare" (expected pathID 0)
// NOTE: no shiny growth file found for "132 Hippoflare" (expected pathID 0)
 "132 Hippoflare": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 155, atk: 83, mag: 84, def: 95, res: 90, spd: 82 }, sprite: "assets/132_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], sprite: "assets/132_s.png" } },
// NOTE: no normal growth file found for "133 Gurgle" (expected pathID 0)
// NOTE: no shiny growth file found for "133 Gurgle" (expected pathID 0)
 "133 Gurgle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 92, atk: 56, mag: 45, def: 54, res: 50, spd: 53 }, sprite: "assets/133_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], sprite: "assets/133_s.png" } },
// NOTE: no normal growth file found for "134 Gurgoyle" (expected pathID 0)
// NOTE: no shiny growth file found for "134 Gurgoyle" (expected pathID 0)
 "134 Gurgoyle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 126, atk: 73, mag: 69, def: 67, res: 58, spd: 62 }, sprite: "assets/134_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], sprite: "assets/134_s.png" } },
// NOTE: no normal growth file found for "135 Goregyle" (expected pathID 0)
// NOTE: no shiny growth file found for "135 Goregyle" (expected pathID 0)
 "135 Goregyle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 161, atk: 83, mag: 75, def: 89, res: 82, spd: 99 }, sprite: "assets/135_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], sprite: "assets/135_s.png" } },
 "136 Caterbug": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "FIREBALL", "SCORCH", "PETAL", "SPORES", "POISON CLOUD", "BLOSSOM", "WILDFIRE", "WISPS", "FIRE TOWER", "LEAF STORM", "HARMONIZE", "THUNDERCLAP", "WILD WIND", "FIRE FLOWER", "FIRE BEAM", "VOLCANO", "LIGHT SONG", "HEALING WIND", "RADIANCE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], stats: { hp: 99, atk: 50, mag: 51, def: 47, res: 51, spd: 52 }, sprite: "assets/136_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "DANCE", "BOLT", "GUARD UP", "HAMMER", "POISON CLOUD", "RAZOR", "STARBOLT", "ZAP TACKLE", "LIGHT SHIELD", "METAL BALL", "HARMONIZE", "THUNDERCLAP", "LIGHT CANNON", "RADIANCE", "LIGHT SONG", "STEEL BLADE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], sprite: "assets/136_s.png" } },
 "137 Lavalarva": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "FIREBALL", "SCORCH", "PETAL", "SPORES", "POISON CLOUD", "BLOSSOM", "WILDFIRE", "WISPS", "FIRE TOWER", "LEAF STORM", "HARMONIZE", "THUNDERCLAP", "WILD WIND", "FIRE FLOWER", "FIRE BEAM", "VOLCANO", "LIGHT SONG", "HEALING WIND", "RADIANCE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], stats: { hp: 135, atk: 64, mag: 59, def: 61, res: 68, spd: 68 }, sprite: "assets/137_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "DANCE", "BOLT", "GUARD UP", "HAMMER", "POISON CLOUD", "RAZOR", "STARBOLT", "ZAP TACKLE", "LIGHT SHIELD", "METAL BALL", "HARMONIZE", "THUNDERCLAP", "LIGHT CANNON", "RADIANCE", "LIGHT SONG", "STEEL BLADE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], sprite: "assets/137_s.png" } },
 "138 Monarchfly": { normal: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "FIREBALL", "SCORCH", "PETAL", "SPORES", "POISON CLOUD", "BLOSSOM", "WILDFIRE", "WISPS", "FIRE TOWER", "LEAF STORM", "HARMONIZE", "THUNDERCLAP", "WILD WIND", "FIRE FLOWER", "FIRE BEAM", "VOLCANO", "LIGHT SONG", "HEALING WIND", "RADIANCE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], stats: { hp: 165, atk: 88, mag: 86, def: 77, res: 86, spd: 87 }, sprite: "assets/138_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "DANCE", "BOLT", "GUARD UP", "HAMMER", "POISON CLOUD", "RAZOR", "STARBOLT", "ZAP TACKLE", "LIGHT SHIELD", "METAL BALL", "HARMONIZE", "THUNDERCLAP", "LIGHT CANNON", "RADIANCE", "LIGHT SONG", "STEEL BLADE"], passives: ["HOT HEAD", "REGROWTH", "SAPROLING", "SMOLDER", "RAINBOW AURA", "MORE SPORE", "MAX BURN", "MAX POISON", "CLERIC", "EXOSKELETON", "MANA GIFT", "HEALING GROVE", "SUNFLARE", "VENOMOUS"], sprite: "assets/138_s.png" } },
 "139 Gubble": { normal: { houses: ["Dragoon", "Mystic"], moves: ["NIBBLE", "FLARE", "MAGIC SONG", "KISS", "BITE", "ENERGY WIPE", "HEAT SHIELD", "MAGIC BLAST", "BLOSSOM", "WYRMFLARE", "ARCANA", "FIRE TOWER", "TIME TRAVEL", "AETHER HEAL", "SPIKY TAIL", "HEX", "TERRA CRUSH", "LUSTER BEAM", "DRAGON BEAM", "GRAND AURA", "CRUSHING JAWS"], passives: ["SOUL BLASTER", "ELASTIC", "DRAGON EYE", "RES BREAKER", "QUICK SHIELD", "RAINBOW AURA", "BLUBBER", "DRAGOON SOUL", "BARRIER", "SUNFLARE", "AUTO FLARE", "HOT HEAD", "TACTICIAN", "MANA GIFT"], stats: { hp: 112, atk: 46, mag: 54, def: 43, res: 44, spd: 51 }, sprite: "assets/139_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: ["NIBBLE", "ROOT", "PUMMEL", "UPPERCUT", "PETAL", "QUAKE", "HEAT SHIELD", "BERSERK", "BLOSSOM", "LEAF STORM", "ROCK SPELL", "FIRE TOWER", "JUGGERNAUT", "WILD WIND", "BOULDER BREAK", "TERRA CRUSH", "SNEAKY STRIKES", "LEAF BEAM", "RECKLESS PUNCH", "CACTUS BASH"], passives: ["SOUL BLASTER", "ELASTIC", "DRAGON EYE", "RES BREAKER", "QUICK SHIELD", "RAINBOW AURA", "BLUBBER", "DRAGOON SOUL", "BARRIER", "SUNFLARE", "AUTO FLARE", "HOT HEAD", "TACTICIAN", "MANA GIFT"], sprite: "assets/139_s.png" } },
// NOTE: no shiny growth file found for "140 Gyoshi" (expected pathID 0)
 "140 Gyoshi": { normal: { houses: ["Dragoon", "Mystic"], moves: ["NIBBLE", "FLARE", "MAGIC SONG", "KISS", "BITE", "ENERGY WIPE", "HEAT SHIELD", "MAGIC BLAST", "BLOSSOM", "WYRMFLARE", "ARCANA", "FIRE TOWER", "TIME TRAVEL", "AETHER HEAL", "SPIKY TAIL", "HEX", "TERRA CRUSH", "LUSTER BEAM", "DRAGON BEAM", "GRAND AURA", "CRUSHING JAWS"], passives: ["SOUL BLASTER", "ELASTIC", "DRAGON EYE", "RES BREAKER", "QUICK SHIELD", "RAINBOW AURA", "BLUBBER", "DRAGOON SOUL", "BARRIER", "SUNFLARE", "AUTO FLARE", "HOT HEAD", "TACTICIAN", "MANA GIFT"], stats: { hp: 142, atk: 68, mag: 69, def: 60, res: 61, spd: 55 }, sprite: "assets/140_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], sprite: "assets/140_s.png" } },
// NOTE: no shiny growth file found for "141 Bubblegon" (expected pathID 0)
 "141 Bubblegon": { normal: { houses: ["Dragoon", "Mystic"], moves: ["NIBBLE", "FLARE", "MAGIC SONG", "KISS", "BITE", "ENERGY WIPE", "HEAT SHIELD", "MAGIC BLAST", "BLOSSOM", "WYRMFLARE", "ARCANA", "FIRE TOWER", "TIME TRAVEL", "AETHER HEAL", "SPIKY TAIL", "HEX", "TERRA CRUSH", "LUSTER BEAM", "DRAGON BEAM", "GRAND AURA", "CRUSHING JAWS"], passives: ["SOUL BLASTER", "ELASTIC", "DRAGON EYE", "RES BREAKER", "QUICK SHIELD", "RAINBOW AURA", "BLUBBER", "DRAGOON SOUL", "BARRIER", "SUNFLARE", "AUTO FLARE", "HOT HEAD", "TACTICIAN", "MANA GIFT"], stats: { hp: 159, atk: 82, mag: 90, def: 80, res: 96, spd: 82 }, sprite: "assets/141_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], sprite: "assets/141_s.png" } },
// NOTE: no normal growth file found for "142 Tanooki" (expected pathID 0)
// NOTE: no shiny growth file found for "142 Tanooki" (expected pathID 0)
 "142 Tanooki": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 103, atk: 49, mag: 45, def: 45, res: 49, spd: 59 }, sprite: "assets/142_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], sprite: "assets/142_s.png" } },
// NOTE: no normal growth file found for "143 Tanuko" (expected pathID 0)
// NOTE: no shiny growth file found for "143 Tanuko" (expected pathID 0)
 "143 Tanuko": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 124, atk: 66, mag: 70, def: 60, res: 62, spd: 73 }, sprite: "assets/143_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], sprite: "assets/143_s.png" } },
// NOTE: no normal growth file found for "144 Tanukuma" (expected pathID 0)
// NOTE: no shiny growth file found for "144 Tanukuma" (expected pathID 0)
 "144 Tanukuma": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 168, atk: 91, mag: 80, def: 77, res: 88, spd: 85 }, sprite: "assets/144_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], sprite: "assets/144_s.png" } },
// NOTE: no normal growth file found for "145 Smoldodo" (expected pathID 0)
// NOTE: no shiny growth file found for "145 Smoldodo" (expected pathID 0)
 "145 Smoldodo": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 93, atk: 49, mag: 45, def: 52, res: 55, spd: 56 }, sprite: "assets/145_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], sprite: "assets/145_s.png" } },
// NOTE: no normal growth file found for "146 Opyryx" (expected pathID 0)
// NOTE: no shiny growth file found for "146 Opyryx" (expected pathID 0)
 "146 Opyryx": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 128, atk: 60, mag: 79, def: 59, res: 64, spd: 65 }, sprite: "assets/146_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], sprite: "assets/146_s.png" } },
// NOTE: no normal growth file found for "147 Ignychus" (expected pathID 0)
// NOTE: no shiny growth file found for "147 Ignychus" (expected pathID 0)
 "147 Ignychus": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 173, atk: 78, mag: 83, def: 94, res: 79, spd: 82 }, sprite: "assets/147_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], sprite: "assets/147_s.png" } },
// NOTE: no normal growth file found for "148 Blubbo" (expected pathID 0)
// NOTE: no shiny growth file found for "148 Blubbo" (expected pathID 0)
 "148 Blubbo": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 106, atk: 51, mag: 47, def: 45, res: 48, spd: 53 }, sprite: "assets/148_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], sprite: "assets/148_s.png" } },
// NOTE: no normal growth file found for "149 Narwelt" (expected pathID 0)
// NOTE: no shiny growth file found for "149 Narwelt" (expected pathID 0)
 "149 Narwelt": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 121, atk: 65, mag: 63, def: 72, res: 70, spd: 64 }, sprite: "assets/149_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], sprite: "assets/149_s.png" } },
// NOTE: no normal growth file found for "150 Narwallop" (expected pathID 0)
// NOTE: no shiny growth file found for "150 Narwallop" (expected pathID 0)
 "150 Narwallop": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 161, atk: 93, mag: 78, def: 78, res: 93, spd: 86 }, sprite: "assets/150_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], sprite: "assets/150_s.png" } },
// NOTE: no normal growth file found for "151 Grinnlin" (expected pathID 0)
// NOTE: no shiny growth file found for "151 Grinnlin" (expected pathID 0)
 "151 Grinnlin": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 101, atk: 44, mag: 51, def: 52, res: 48, spd: 54 }, sprite: "assets/151_n.png" }, sparkly: { houses: ["Dragoon"], moves: [], passives: [], sprite: "assets/151_s.png" } },
// NOTE: no normal growth file found for "152 Gobjank" (expected pathID 0)
// NOTE: no shiny growth file found for "152 Gobjank" (expected pathID 0)
 "152 Gobjank": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 120, atk: 62, mag: 56, def: 70, res: 73, spd: 74 }, sprite: "assets/152_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], sprite: "assets/152_s.png" } },
// NOTE: no normal growth file found for "153 Gobsmurk" (expected pathID 0)
// NOTE: no shiny growth file found for "153 Gobsmurk" (expected pathID 0)
 "153 Gobsmurk": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 158, atk: 84, mag: 90, def: 92, res: 83, spd: 82 }, sprite: "assets/153_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], sprite: "assets/153_s.png" } },
// NOTE: no normal growth file found for "154 Cacoto" (expected pathID 0)
// NOTE: no shiny growth file found for "154 Cacoto" (expected pathID 0)
 "154 Cacoto": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 107, atk: 46, mag: 44, def: 55, res: 49, spd: 49 }, sprite: "assets/154_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], sprite: "assets/154_s.png" } },
// NOTE: no normal growth file found for "155 Cacotid" (expected pathID 0)
// NOTE: no shiny growth file found for "155 Cacotid" (expected pathID 0)
 "155 Cacotid": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 137, atk: 72, mag: 73, def: 58, res: 56, spd: 59 }, sprite: "assets/155_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], sprite: "assets/155_s.png" } },
// NOTE: no normal growth file found for "156 Cacoton" (expected pathID 0)
// NOTE: no shiny growth file found for "156 Cacoton" (expected pathID 0)
 "156 Cacoton": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 160, atk: 85, mag: 87, def: 82, res: 88, spd: 87 }, sprite: "assets/156_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], sprite: "assets/156_s.png" } },
// NOTE: no normal growth file found for "157 Chicky" (expected pathID 0)
// NOTE: no shiny growth file found for "157 Chicky" (expected pathID 0)
 "157 Chicky": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 98, atk: 50, mag: 48, def: 47, res: 54, spd: 53 }, sprite: "assets/157_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], sprite: "assets/157_s.png" } },
// NOTE: no normal growth file found for "158 Silligoose" (expected pathID 0)
// NOTE: no shiny growth file found for "158 Silligoose" (expected pathID 0)
 "158 Silligoose": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 132, atk: 68, mag: 60, def: 65, res: 63, spd: 67 }, sprite: "assets/158_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], sprite: "assets/158_s.png" } },
// NOTE: no normal growth file found for "159 Doomchicken" (expected pathID 0)
// NOTE: no shiny growth file found for "159 Doomchicken" (expected pathID 0)
 "159 Doomchicken": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 173, atk: 91, mag: 90, def: 76, res: 68, spd: 91 }, sprite: "assets/159_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], sprite: "assets/159_s.png" } },
 "160 Glibat": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "PSIONIC", "ENERGY WIPE", "WINGS", "POISON BITE", "MAGIC BLAST", "WILD WIND", "LICK", "NIGHTMARE", "SHADOW AXE", "TIME TRAVEL", "HEX", "TIME BREAK", "ARCANA", "DARK CHOMP", "OBLIVION", "DARK SONG", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], stats: { hp: 96, atk: 52, mag: 48, def: 49, res: 53, spd: 52 }, sprite: "assets/160_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: ["CLAWS", "ROOT", "PETAL", "BOLT", "GLITTER", "WINGS", "VINE SLASH", "DAYDREAM", "WILD WIND", "LICK", "ENDLESS VINES", "WOODLAND STEP", "LIGHT SHIELD", "THUNDERCLAP", "HEALING WIND", "LEAF BEAM", "LIGHT CANNON", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], sprite: "assets/160_s.png" } },
 "161 Hexbat": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "PSIONIC", "ENERGY WIPE", "WINGS", "POISON BITE", "MAGIC BLAST", "WILD WIND", "LICK", "NIGHTMARE", "SHADOW AXE", "TIME TRAVEL", "HEX", "TIME BREAK", "ARCANA", "DARK CHOMP", "OBLIVION", "DARK SONG", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], stats: { hp: 129, atk: 60, mag: 61, def: 65, res: 65, spd: 75 }, sprite: "assets/161_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: ["CLAWS", "ROOT", "PETAL", "BOLT", "GLITTER", "WINGS", "VINE SLASH", "DAYDREAM", "WILD WIND", "LICK", "ENDLESS VINES", "WOODLAND STEP", "LIGHT SHIELD", "THUNDERCLAP", "HEALING WIND", "LEAF BEAM", "LIGHT CANNON", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], sprite: "assets/161_s.png" } },
 "162 Blightbat": { normal: { houses: ["Mystic", "Nightwatch"], moves: ["CLAWS", "SHADE", "MURK", "PSIONIC", "ENERGY WIPE", "WINGS", "POISON BITE", "MAGIC BLAST", "WILD WIND", "LICK", "NIGHTMARE", "SHADOW AXE", "TIME TRAVEL", "HEX", "TIME BREAK", "ARCANA", "DARK CHOMP", "OBLIVION", "DARK SONG", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], stats: { hp: 156, atk: 75, mag: 92, def: 93, res: 94, spd: 79 }, sprite: "assets/162_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: ["CLAWS", "ROOT", "PETAL", "BOLT", "GLITTER", "WINGS", "VINE SLASH", "DAYDREAM", "WILD WIND", "LICK", "ENDLESS VINES", "WOODLAND STEP", "LIGHT SHIELD", "THUNDERCLAP", "HEALING WIND", "LEAF BEAM", "LIGHT CANNON", "DRAGON BEAM", "SEISMIC PULSE"], passives: ["CRITICAL EYE", "RANDOM POISON", "TOXIC BODY", "CURSED", "RES BREAKER", "CLOUD SEED", "TACTICIAN", "DARK HARVEST", "VENOMOUS", "SHARP TEETH", "MAX POISON", "WARP SPEED", "SCOUNDREL", "BIG TONGUE"], sprite: "assets/162_s.png" } },
// NOTE: no normal growth file found for "163 Pokoroko" (expected pathID 0)
// NOTE: no shiny growth file found for "163 Pokoroko" (expected pathID 0)
 "163 Pokoroko": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 103, atk: 49, mag: 51, def: 50, res: 50, spd: 47 }, sprite: "assets/163_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/163_s.png" } },
// NOTE: no normal growth file found for "164 Shakasaru" (expected pathID 0)
// NOTE: no shiny growth file found for "164 Shakasaru" (expected pathID 0)
 "164 Shakasaru": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 127, atk: 73, mag: 58, def: 55, res: 69, spd: 73 }, sprite: "assets/164_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/164_s.png" } },
// NOTE: no normal growth file found for "165 Masukusaru" (expected pathID 0)
// NOTE: no shiny growth file found for "165 Masukusaru" (expected pathID 0)
 "165 Masukusaru": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 167, atk: 84, mag: 96, def: 93, res: 74, spd: 75 }, sprite: "assets/165_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], sprite: "assets/165_s.png" } },
// NOTE: no normal growth file found for "166 Ghostkit" (expected pathID 0)
// NOTE: no shiny growth file found for "166 Ghostkit" (expected pathID 0)
 "166 Ghostkit": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 92, atk: 49, mag: 55, def: 47, res: 49, spd: 58 }, sprite: "assets/166_n.png" }, sparkly: { houses: ["Fireborn"], moves: [], passives: [], sprite: "assets/166_s.png" } },
// NOTE: no normal growth file found for "167 Netherlynx" (expected pathID 0)
// NOTE: no shiny growth file found for "167 Netherlynx" (expected pathID 0)
 "167 Netherlynx": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 128, atk: 76, mag: 70, def: 62, res: 59, spd: 60 }, sprite: "assets/167_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], sprite: "assets/167_s.png" } },
// NOTE: no normal growth file found for "168 Shimmerclaw" (expected pathID 0)
// NOTE: no shiny growth file found for "168 Shimmerclaw" (expected pathID 0)
 "168 Shimmerclaw": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 168, atk: 91, mag: 73, def: 82, res: 84, spd: 91 }, sprite: "assets/168_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], sprite: "assets/168_s.png" } },
 "169 Wimpid": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "STAR", "ZAP", "GRIND", "FORTIFY", "DAZZLE", "QUADRA LANCE", "SPORES", "WILD WIND", "NEEDLE LANCE", "ZAP TACKLE", "LIGHT SHIELD", "HEALING WIND", "THUNDERCLAP", "SKEWER", "BULWARK", "BLIZZARD LANCE", "STEEL BLADE", "DRAGON BEAM", "SNEAKY STRIKES", "LIGHT CANNON"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 94, atk: 58, mag: 48, def: 47, res: 53, spd: 50 }, sprite: "assets/169_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "SCORCH", "METEOR", "ROOT", "VINE SLASH", "FIRE BREATH", "THWACK", "SPORES", "WILD WIND", "NEEDLE LANCE", "WISPS", "FIERY HORNS", "HEALING WIND", "ENFLAME", "WOODLAND STEP", "ENDLESS VINES", "BLIZZARD LANCE", "CACTUS BASH", "DRAGON BEAM", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/169_s.png" } },
 "170 Velvolt": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "STAR", "ZAP", "GRIND", "FORTIFY", "DAZZLE", "QUADRA LANCE", "SPORES", "WILD WIND", "NEEDLE LANCE", "ZAP TACKLE", "LIGHT SHIELD", "HEALING WIND", "THUNDERCLAP", "SKEWER", "BULWARK", "BLIZZARD LANCE", "STEEL BLADE", "DRAGON BEAM", "SNEAKY STRIKES", "LIGHT CANNON"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 137, atk: 69, mag: 58, def: 66, res: 61, spd: 64 }, sprite: "assets/170_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "SCORCH", "METEOR", "ROOT", "VINE SLASH", "FIRE BREATH", "THWACK", "SPORES", "WILD WIND", "NEEDLE LANCE", "WISPS", "FIERY HORNS", "HEALING WIND", "ENFLAME", "WOODLAND STEP", "ENDLESS VINES", "BLIZZARD LANCE", "CACTUS BASH", "DRAGON BEAM", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/170_s.png" } },
 "171 Vespabolt": { normal: { houses: ["Ironclad", "Whimsical"], moves: ["NIBBLE", "STAR", "ZAP", "GRIND", "FORTIFY", "DAZZLE", "QUADRA LANCE", "SPORES", "WILD WIND", "NEEDLE LANCE", "ZAP TACKLE", "LIGHT SHIELD", "HEALING WIND", "THUNDERCLAP", "SKEWER", "BULWARK", "BLIZZARD LANCE", "STEEL BLADE", "DRAGON BEAM", "SNEAKY STRIKES", "LIGHT CANNON"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], stats: { hp: 162, atk: 85, mag: 81, def: 87, res: 86, spd: 88 }, sprite: "assets/171_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: ["NIBBLE", "SCORCH", "METEOR", "ROOT", "VINE SLASH", "FIRE BREATH", "THWACK", "SPORES", "WILD WIND", "NEEDLE LANCE", "WISPS", "FIERY HORNS", "HEALING WIND", "ENFLAME", "WOODLAND STEP", "ENDLESS VINES", "BLIZZARD LANCE", "CACTUS BASH", "DRAGON BEAM", "SNEAKY STRIKES", "FIRE BEAM"], passives: ["QUICK SHIELD", "VICIOUS", "SAPROLING", "DEF BREAKER", "ANIMATED", "BASIC STRIKER", "EXOSKELETON", "FLASHBANG", "FLIGHT", "STEEL SKIN", "CRITICAL EYE", "LANCER", "PROTECTOR", "SPELLSHIELD"], sprite: "assets/171_s.png" } },
// NOTE: no normal growth file found for "172 Weenut" (expected pathID 0)
// NOTE: no shiny growth file found for "172 Weenut" (expected pathID 0)
 "172 Weenut": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 96, atk: 45, mag: 55, def: 52, res: 55, spd: 47 }, sprite: "assets/172_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], sprite: "assets/172_s.png" } },
// NOTE: no normal growth file found for "173 Spriggent" (expected pathID 0)
// NOTE: no shiny growth file found for "173 Spriggent" (expected pathID 0)
 "173 Spriggent": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 125, atk: 70, mag: 68, def: 56, res: 65, spd: 71 }, sprite: "assets/173_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], sprite: "assets/173_s.png" } },
// NOTE: no normal growth file found for "174 Enchantree" (expected pathID 0)
// NOTE: no shiny growth file found for "174 Enchantree" (expected pathID 0)
 "174 Enchantree": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 155, atk: 88, mag: 76, def: 92, res: 95, spd: 83 }, sprite: "assets/174_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], sprite: "assets/174_s.png" } },
// NOTE: no normal growth file found for "175 Kraba" (expected pathID 0)
// NOTE: no shiny growth file found for "175 Kraba" (expected pathID 0)
 "175 Kraba": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 90, atk: 45, mag: 57, def: 49, res: 53, spd: 56 }, sprite: "assets/175_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/175_s.png" } },
// NOTE: no normal growth file found for "176 Krabaghast" (expected pathID 0)
// NOTE: no shiny growth file found for "176 Krabaghast" (expected pathID 0)
 "176 Krabaghast": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 140, atk: 68, mag: 60, def: 58, res: 71, spd: 58 }, sprite: "assets/176_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/176_s.png" } },
// NOTE: no normal growth file found for "177 Krabaghoul" (expected pathID 0)
// NOTE: no shiny growth file found for "177 Krabaghoul" (expected pathID 0)
 "177 Krabaghoul": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 159, atk: 88, mag: 84, def: 78, res: 90, spd: 90 }, sprite: "assets/177_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/177_s.png" } },
// NOTE: no normal growth file found for "178 Dootle" (expected pathID 0)
// NOTE: no shiny growth file found for "178 Dootle" (expected pathID 0)
 "178 Dootle": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 97, atk: 56, mag: 49, def: 45, res: 46, spd: 57 }, sprite: "assets/178_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/178_s.png" } },
// NOTE: no normal growth file found for "179 Dingdung" (expected pathID 0)
// NOTE: no shiny growth file found for "179 Dingdung" (expected pathID 0)
 "179 Dingdung": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 143, atk: 59, mag: 60, def: 66, res: 68, spd: 59 }, sprite: "assets/179_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/179_s.png" } },
// NOTE: no normal growth file found for "180 Astrobug" (expected pathID 0)
// NOTE: no shiny growth file found for "180 Astrobug" (expected pathID 0)
 "180 Astrobug": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 190, atk: 81, mag: 74, def: 76, res: 92, spd: 76 }, sprite: "assets/180_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/180_s.png" } },
// NOTE: no normal growth file found for "181 Cawful" (expected pathID 0)
// NOTE: no shiny growth file found for "181 Cawful" (expected pathID 0)
 "181 Cawful": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 106, atk: 53, mag: 48, def: 44, res: 52, spd: 47 }, sprite: "assets/181_n.png" }, sparkly: { houses: ["Overgrowth"], moves: [], passives: [], sprite: "assets/181_s.png" } },
// NOTE: no normal growth file found for "182 Cultcrow" (expected pathID 0)
// NOTE: no shiny growth file found for "182 Cultcrow" (expected pathID 0)
 "182 Cultcrow": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 123, atk: 67, mag: 68, def: 68, res: 58, spd: 71 }, sprite: "assets/182_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], sprite: "assets/182_s.png" } },
// NOTE: no normal growth file found for "183 Covencrow" (expected pathID 0)
// NOTE: no shiny growth file found for "183 Covencrow" (expected pathID 0)
 "183 Covencrow": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 164, atk: 92, mag: 86, def: 79, res: 81, spd: 87 }, sprite: "assets/183_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], sprite: "assets/183_s.png" } },
// NOTE: no normal growth file found for "184 Goopy" (expected pathID 0)
// NOTE: no shiny growth file found for "184 Goopy" (expected pathID 0)
 "184 Goopy": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 107, atk: 45, mag: 47, def: 48, res: 49, spd: 54 }, sprite: "assets/184_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], sprite: "assets/184_s.png" } },
// NOTE: no normal growth file found for "185 Mitomoeba" (expected pathID 0)
// NOTE: no shiny growth file found for "185 Mitomoeba" (expected pathID 0)
 "185 Mitomoeba": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 146, atk: 59, mag: 56, def: 57, res: 68, spd: 69 }, sprite: "assets/185_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], sprite: "assets/185_s.png" } },
// NOTE: no normal growth file found for "186 Protoslime" (expected pathID 0)
// NOTE: no shiny growth file found for "186 Protoslime" (expected pathID 0)
 "186 Protoslime": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 179, atk: 73, mag: 83, def: 92, res: 92, spd: 70 }, sprite: "assets/186_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], sprite: "assets/186_s.png" } },
// NOTE: no normal growth file found for "187 Mimlick" (expected pathID 0)
// NOTE: no shiny growth file found for "187 Mimlick" (expected pathID 0)
 "187 Mimlick": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 95, atk: 45, mag: 54, def: 55, res: 51, spd: 50 }, sprite: "assets/187_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/187_s.png" } },
// NOTE: no normal growth file found for "188 Fortresst" (expected pathID 0)
// NOTE: no shiny growth file found for "188 Fortresst" (expected pathID 0)
 "188 Fortresst": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 126, atk: 65, mag: 71, def: 69, res: 62, spd: 62 }, sprite: "assets/188_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/188_s.png" } },
// NOTE: no normal growth file found for "189 Ghoulgalion" (expected pathID 0)
// NOTE: no shiny growth file found for "189 Ghoulgalion" (expected pathID 0)
 "189 Ghoulgalion": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 150, atk: 86, mag: 93, def: 93, res: 83, spd: 84 }, sprite: "assets/189_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], sprite: "assets/189_s.png" } },
// NOTE: no normal growth file found for "190 Fluffin" (expected pathID 0)
// NOTE: no shiny growth file found for "190 Fluffin" (expected pathID 0)
 "190 Fluffin": { normal: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 107, atk: 54, mag: 49, def: 46, res: 44, spd: 50 }, sprite: "assets/190_n.png" }, sparkly: { houses: ["Nightwatch"], moves: [], passives: [], sprite: "assets/190_s.png" } },
// NOTE: no normal growth file found for "191 Owlsage" (expected pathID 0)
// NOTE: no shiny growth file found for "191 Owlsage" (expected pathID 0)
 "191 Owlsage": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 123, atk: 72, mag: 64, def: 75, res: 60, spd: 61 }, sprite: "assets/191_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], sprite: "assets/191_s.png" } },
// NOTE: no normal growth file found for "192 Arcanowl" (expected pathID 0)
// NOTE: no shiny growth file found for "192 Arcanowl" (expected pathID 0)
 "192 Arcanowl": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 172, atk: 75, mag: 87, def: 74, res: 93, spd: 88 }, sprite: "assets/192_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], sprite: "assets/192_s.png" } },
// NOTE: no normal growth file found for "193 Snoosnail" (expected pathID 0)
// NOTE: no shiny growth file found for "193 Snoosnail" (expected pathID 0)
 "193 Snoosnail": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 112, atk: 44, mag: 54, def: 51, res: 43, spd: 46 }, sprite: "assets/193_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/193_s.png" } },
// NOTE: no normal growth file found for "194 Magmolten" (expected pathID 0)
// NOTE: no shiny growth file found for "194 Magmolten" (expected pathID 0)
 "194 Magmolten": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 113, atk: 68, mag: 68, def: 66, res: 70, spd: 70 }, sprite: "assets/194_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/194_s.png" } },
// NOTE: no normal growth file found for "195 Warloctopus" (expected pathID 0)
// NOTE: no shiny growth file found for "195 Warloctopus" (expected pathID 0)
 "195 Warloctopus": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 147, atk: 96, mag: 94, def: 76, res: 89, spd: 87 }, sprite: "assets/195_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], sprite: "assets/195_s.png" } },
// NOTE: no normal growth file found for "196 Jellyzip" (expected pathID 0)
// NOTE: no shiny growth file found for "196 Jellyzip" (expected pathID 0)
 "196 Jellyzip": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 99, atk: 50, mag: 48, def: 60, res: 46, spd: 47 }, sprite: "assets/196_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/196_s.png" } },
// NOTE: no normal growth file found for "197 Jellyzap" (expected pathID 0)
// NOTE: no shiny growth file found for "197 Jellyzap" (expected pathID 0)
 "197 Jellyzap": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 144, atk: 69, mag: 66, def: 56, res: 66, spd: 54 }, sprite: "assets/197_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/197_s.png" } },
// NOTE: no normal growth file found for "198 Jellystorm" (expected pathID 0)
// NOTE: no shiny growth file found for "198 Jellystorm" (expected pathID 0)
 "198 Jellystorm": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 147, atk: 75, mag: 96, def: 94, res: 91, spd: 86 }, sprite: "assets/198_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], sprite: "assets/198_s.png" } },
// NOTE: no normal growth file found for "199 Rohoot" (expected pathID 0)
// NOTE: no shiny growth file found for "199 Rohoot" (expected pathID 0)
 "199 Rohoot": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 115, atk: 50, mag: 44, def: 47, res: 44, spd: 50 }, sprite: "assets/199_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], sprite: "assets/199_s.png" } },
// NOTE: no normal growth file found for "200 Rohawk" (expected pathID 0)
// NOTE: no shiny growth file found for "200 Rohawk" (expected pathID 0)
 "200 Rohawk": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 126, atk: 69, mag: 64, def: 65, res: 59, spd: 72 }, sprite: "assets/200_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], sprite: "assets/200_s.png" } },
// NOTE: no normal growth file found for "201 Griffiron" (expected pathID 0)
// NOTE: no shiny growth file found for "201 Griffiron" (expected pathID 0)
 "201 Griffiron": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 188, atk: 73, mag: 81, def: 79, res: 84, spd: 84 }, sprite: "assets/201_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], sprite: "assets/201_s.png" } },
// NOTE: no normal growth file found for "202 Elixapot" (expected pathID 0)
// NOTE: no shiny growth file found for "202 Elixapot" (expected pathID 0)
 "202 Elixapot": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 103, atk: 49, mag: 54, def: 49, res: 48, spd: 47 }, sprite: "assets/202_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/202_s.png" } },
// NOTE: no normal growth file found for "203 Elixabrew" (expected pathID 0)
// NOTE: no shiny growth file found for "203 Elixabrew" (expected pathID 0)
 "203 Elixabrew": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 127, atk: 68, mag: 72, def: 63, res: 66, spd: 59 }, sprite: "assets/203_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/203_s.png" } },
// NOTE: no normal growth file found for "204 Elixadon" (expected pathID 0)
// NOTE: no shiny growth file found for "204 Elixadon" (expected pathID 0)
 "204 Elixadon": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 180, atk: 72, mag: 76, def: 80, res: 96, spd: 85 }, sprite: "assets/204_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], sprite: "assets/204_s.png" } },
// NOTE: no normal growth file found for "205 Meowmau" (expected pathID 0)
// NOTE: no shiny growth file found for "205 Meowmau" (expected pathID 0)
 "205 Meowmau": { normal: { houses: ["Whimsical"], moves: [], passives: [], stats: { hp: 101, atk: 51, mag: 46, def: 55, res: 52, spd: 45 }, sprite: "assets/205_n.png" }, sparkly: { houses: ["Nightwatch"], moves: [], passives: [], sprite: "assets/205_s.png" } },
// NOTE: no normal growth file found for "206 Bastcat" (expected pathID 0)
// NOTE: no shiny growth file found for "206 Bastcat" (expected pathID 0)
 "206 Bastcat": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 133, atk: 64, mag: 70, def: 53, res: 65, spd: 70 }, sprite: "assets/206_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], sprite: "assets/206_s.png" } },
// NOTE: no normal growth file found for "207 Cleocatra" (expected pathID 0)
// NOTE: no shiny growth file found for "207 Cleocatra" (expected pathID 0)
 "207 Cleocatra": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 153, atk: 91, mag: 90, def: 77, res: 86, spd: 92 }, sprite: "assets/207_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], sprite: "assets/207_s.png" } },
// NOTE: no normal growth file found for "208 Millapod" (expected pathID 0)
// NOTE: no shiny growth file found for "208 Millapod" (expected pathID 0)
 "208 Millapod": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 97, atk: 52, mag: 50, def: 50, res: 49, spd: 52 }, sprite: "assets/208_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], sprite: "assets/208_s.png" } },
// NOTE: no normal growth file found for "209 Centascale" (expected pathID 0)
// NOTE: no shiny growth file found for "209 Centascale" (expected pathID 0)
 "209 Centascale": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 125, atk: 66, mag: 68, def: 68, res: 65, spd: 63 }, sprite: "assets/209_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], sprite: "assets/209_s.png" } },
// NOTE: no normal growth file found for "210 Dragapede" (expected pathID 0)
// NOTE: no shiny growth file found for "210 Dragapede" (expected pathID 0)
 "210 Dragapede": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 156, atk: 81, mag: 95, def: 84, res: 78, spd: 95 }, sprite: "assets/210_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], sprite: "assets/210_s.png" } },
 "211 Kiplet": { normal: { houses: ["Atlantian"], moves: ["CLAWS", "DOUBLE BUBBLE", "KISS", "DEWDROP", "BLOSSOM", "MAGIC BLAST", "WHIRL", "ENERGY WIPE", "LIGHT RAIN", "TIDAL WAVE", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "DELUGE", "ARCANA", "BLIZZARD BEAM", "MAELSTROM", "LIGHT SONG", "GRAND AURA", "SNEAKY STRIKES"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], stats: { hp: 104, atk: 50, mag: 53, def: 46, res: 45, spd: 52 }, sprite: "assets/211_n.png" }, sparkly: { houses: ["Brawler"], moves: ["CLAWS", "PUMMEL", "KISS", "UPPERCUT", "BLOSSOM", "MAGIC BLAST", "QUAKE", "ENERGY WIPE", "TANTRUM", "SOUL PUNCH", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "BOULDER BREAK", "ARCANA", "SEISMIC PULSE", "SNEAKY STRIKES", "LIGHT SONG", "GRAND AURA"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], sprite: "assets/211_s.png" } },
 "212 Kippurr": { normal: { houses: ["Atlantian", "Mystic"], moves: ["CLAWS", "DOUBLE BUBBLE", "KISS", "DEWDROP", "BLOSSOM", "MAGIC BLAST", "WHIRL", "ENERGY WIPE", "LIGHT RAIN", "TIDAL WAVE", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "DELUGE", "ARCANA", "BLIZZARD BEAM", "MAELSTROM", "LIGHT SONG", "GRAND AURA", "SNEAKY STRIKES"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], stats: { hp: 125, atk: 68, mag: 55, def: 70, res: 65, spd: 72 }, sprite: "assets/212_n.png" }, sparkly: { houses: ["Ironclad", "Brawler"], moves: ["CLAWS", "PUMMEL", "KISS", "UPPERCUT", "BLOSSOM", "MAGIC BLAST", "QUAKE", "ENERGY WIPE", "TANTRUM", "SOUL PUNCH", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "BOULDER BREAK", "ARCANA", "SEISMIC PULSE", "SNEAKY STRIKES", "LIGHT SONG", "GRAND AURA"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], sprite: "assets/212_s.png" } },
 "213 Kippycat": { normal: { houses: ["Atlantian", "Mystic"], moves: ["CLAWS", "DOUBLE BUBBLE", "KISS", "DEWDROP", "BLOSSOM", "MAGIC BLAST", "WHIRL", "ENERGY WIPE", "LIGHT RAIN", "TIDAL WAVE", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "DELUGE", "ARCANA", "BLIZZARD BEAM", "MAELSTROM", "LIGHT SONG", "GRAND AURA", "SNEAKY STRIKES"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], stats: { hp: 146, atk: 92, mag: 89, def: 92, res: 77, spd: 93 }, sprite: "assets/213_n.png" }, sparkly: { houses: ["Ironclad", "Brawler"], moves: ["CLAWS", "PUMMEL", "KISS", "UPPERCUT", "BLOSSOM", "MAGIC BLAST", "QUAKE", "ENERGY WIPE", "TANTRUM", "SOUL PUNCH", "HARMONIZE", "WYRMFLARE", "STARLIGHT", "AETHER HEAL", "BOULDER BREAK", "ARCANA", "SEISMIC PULSE", "SNEAKY STRIKES", "LIGHT SONG", "GRAND AURA"], passives: ["LUCKY CHARM", "CALM MIST", "SUPERCHARGE", "MANA GIFT", "RES BREAKER", "SPELLSHIELD", "ANIMATED", "CLERIC", "LONG REST", "BIG HEART", "COPYCAT", "SEASHORE", "RAINBOW AURA", "SHADOW GIFT"], sprite: "assets/213_s.png" } },
// NOTE: no normal growth file found for "214 Toatoad" (expected pathID 0)
// NOTE: no shiny growth file found for "214 Toatoad" (expected pathID 0)
 "214 Toatoad": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 98, atk: 50, mag: 46, def: 51, res: 56, spd: 49 }, sprite: "assets/214_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/214_s.png" } },
// NOTE: no normal growth file found for "215 Toadjinn" (expected pathID 0)
// NOTE: no shiny growth file found for "215 Toadjinn" (expected pathID 0)
 "215 Toadjinn": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 125, atk: 56, mag: 66, def: 58, res: 75, spd: 75 }, sprite: "assets/215_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/215_s.png" } },
// NOTE: no normal growth file found for "216 Explotoad" (expected pathID 0)
// NOTE: no shiny growth file found for "216 Explotoad" (expected pathID 0)
 "216 Explotoad": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 165, atk: 91, mag: 88, def: 75, res: 83, spd: 87 }, sprite: "assets/216_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], sprite: "assets/216_s.png" } },
   };

// --- 1. DATA AND DECLARATIONS ---
const vibes = ["Playful (MAG+/ATK-)", "Lazy (DEF+/ATK-)", "Humble (RES+/ATK-)", "Suave (SPD+/ATK-)", "Spicy (ATK+/MAG-)", "Somber (DEF+/MAG-)", "Mellow (RES+/MAG-)", "Bouncy (SPD+/MAG-)", "Reckless (ATK+/DEF-)", "Dramatic (MAG+/DEF-)", "Sweet (RES+/DEF-)", "Daring (SPD+/DEF-)", "Wild (ATK+/RES-)", "Goofy (MAG+/RES-)", "Clumsy (DEF+/RES-)", "Anxious (SPD+/RES-)", "Fierce (ATK+/SPD-)", "Zesty (MAG+/SPD-)", "Stalwart (DEF+/SPD-)", "Shy (RES+/SPD-)"];
const heldItemList = ["Item A", "Item B", "Item C"];
const types = ["Fireborn","Atlantian","Overgrowth","Whimsical","Nightwatch","Mystic","Dragoon","Ironclad","Brawler","Normal"];
const gradeMap = {'S': 1.0, 'A': 0.9, 'B': 0.85, 'C': 0.8, 'D': 0.75};

// --- 2. LOGIC FUNCTIONS ---

function findMoveObject(moveName) {
    for (const type in moveData) {
        for (const tier in moveData[type]) {
            const found = moveData[type][tier].find(m => m.name === moveName);
            if (found) return found;
        }
    }
    return null;
}

// Helper: Scans moveData to find which Type category a move belongs to
function findMoveType(moveName) {
    for (const typeKey in moveData) {
        for (const tier in moveData[typeKey]) {
            if (moveData[typeKey][tier].some(m => m.name === moveName)) {
                return typeKey; // Returns "Normal", "Fireborn", etc.
            }
        }
    }
    return null;
}

function toggleDropdown(i, num) {
    const list = document.getElementById(`dropdown-list-${i}-${num}`);
    // Close all other dropdowns first (optional but recommended)
    document.querySelectorAll('.custom-dropdown-list').forEach(d => {
        if (d.id !== `dropdown-list-${i}-${num}`) d.style.display = "none";
    });
    list.style.display = (list.style.display === "block") ? "none" : "block";
}

function selectMove(i, num, moveName) {
    // 1. Sync the hidden <select> so its value is the source of truth
    // for anything that reads move selections (e.g. the offensive matchup table).
    const sel = document.getElementById(`move${i}-${num}`);
    if (sel) sel.value = moveName;

    // 2. Hide the list
    toggleDropdown(i, num);
    
    // 3. Update the styling (handles icon visibility and background colors)
    updateMoveStyle(i, num, moveName); 
    
    // 4. Update the description text
    updateMoveDisplay(moveName, `${i}-${num}`);

    // 5. Recalculate the offensive matchup table now that a move changed
    updateTeamEfficiencies();
}

function updateMoveStyle(i, num, moveName) {
    const wrap = document.getElementById(`move-wrap-${i}-${num}`);
    const textDiv = document.getElementById(`move-display-${i}-${num}`); 
    const icon = document.getElementById(`move-icon-${i}-${num}`);
    
    if (!wrap || !textDiv || !icon) return;

    // Safely update the span text without destroying the div's children
    const textSpan = textDiv.querySelector('span');
    if (textSpan) {
        textSpan.innerText = moveName || `Move ${i}`;
    }

    const moveType = findMoveType(moveName); 
    const darkTypes = ["Fireborn", "Nightwatch", "Atlantian", "Dragoon", "Brawler", "Ironclad"];
    const isDark = darkTypes.includes(moveType);

    if (moveType && moveType !== "Normal") {
        wrap.style.backgroundColor = typeColors[moveType] || "#eadfc1";
        icon.src = typeToIcon[moveType] || 'assets/house_default.png';
        icon.style.display = "block";
        textSpan.style.color = isDark ? "#eadfc1" : "#342420";
    } else {
        wrap.style.backgroundColor = "var(--white)";
        textSpan.style.color = "var(--black)";
        icon.style.display = "none";
    }
}

function populateSlotDropdowns(num) {
    const monSelect = document.getElementById(`monSelect-${num}`);
    const sparkleCheck = document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`);
    
    if (!monSelect || !sparkleCheck) return;

    const monName = monSelect.value;
    const isSparkly = sparkleCheck.checked;
    
    const mon = monData[monName];
    const data = mon ? (isSparkly ? mon.sparkly : mon.normal) : { moves: [], passives: [] };

    // Update the hidden <select> elements. A mon change always resets
    // moves/passives to blank rather than preserving the prior selection.
    for(let i = 1; i <= 4; i++) {
        const sel = document.getElementById(`move${i}-${num}`);
        if (!sel) continue;
        sel.innerHTML = `<option value="">Move ${i}</option>` + 
            (data.moves || []).map(m => `<option value="${m}">${m}</option>`).join('');
        sel.value = "";
        updateMoveStyle(i, num, "");
        updateMoveDisplay("", `${i}-${num}`);
    }

    for(let i = 1; i <= 4; i++) {
        const sel = document.getElementById(`pass${i}-${num}`);
        if (!sel) continue; 
        sel.innerHTML = `<option value="">Passive ${i}</option>` + 
            (data.passives || []).map(p => `<option value="${p}">${p}</option>`).join('');
        sel.value = "";
        updatePassiveDisplay("", `${i}-${num}`);
    }

    // Build the custom div-based dropdown lists
const darkTypes = ["Fireborn", "Nightwatch", "Atlantian", "Dragoon", "Brawler", "Ironclad"];

for(let i = 1; i <= 4; i++) {
    const list = document.getElementById(`dropdown-list-${i}-${num}`);
    if (!list) continue;
    
    const moves = data.moves || [];
    
    let html = `<div onclick="selectMove(${i}, ${num}, '')" style="padding: 5px; cursor: pointer; background: var(--white); color: var(--black); border-bottom: 1px solid #342420;">Clear</div>`;
    
    moves.forEach(m => {
        const type = findMoveType(m);
        const color = typeColors[type] || "#eadfc1";
        const icon = typeToIcon[type] || 'assets/house_default.png';
        const textColor = darkTypes.includes(type) ? "#eadfc1" : "#342420";
        
        // --- NEW LOGIC: Only show icon if type is NOT Normal ---
        const iconHtml = (type !== "Normal") 
            ? `<img src="${icon}" style="width:16px; height:16px; pointer-events: none;">` 
            : ""; 
        
        html += `<div onclick="selectMove(${i}, ${num}, '${m}')" 
                      style="background-color: ${color}; 
                             color: ${textColor}; 
                             padding: 5px; 
                             cursor: pointer; 
                             display: flex; 
                             align-items: center; 
                             gap: 5px; 
                             border-bottom: 1px solid #342420;">
                      ${iconHtml}
                      <span>${m}</span>
                  </div>`;
    });
    list.innerHTML = html;
}
    
    for(let i = 1; i <= 4; i++) {
    const sel = document.getElementById(`pass${i}-${num}`);
    if (!sel) continue; 
    
    const currentSelection = sel.value;
    const availablePassives = data.passives || [];
    
    sel.innerHTML = `<option value="">Passive ${i}</option>` + 
        availablePassives.map(p => `<option value="${p}">${p}</option>`).join('');
    
    // SYNC: If the old passive isn't in the new list, clear the selection AND the description
    if (availablePassives.includes(currentSelection)) {
        sel.value = currentSelection;
    } else {
        sel.value = "";
        document.getElementById(`passive-desc-${i}-${num}`).innerHTML = ""; // <--- THIS IS CRITICAL
    }
}
}

function getMultiplier(attackType, defTypes) {
    if (!defTypes || defTypes.length === 0 || defTypes[0] === "") return 1;
    let multiplier = 1;
    defTypes.forEach(defType => {
        if (!defType) return;
        let base = (effectivenessChart[attackType] && effectivenessChart[attackType][defType] !== undefined)
            ? effectivenessChart[attackType][defType] : 1;
        if (base === 2 && defTypes.includes(attackType)) base = 1;
        multiplier *= base;
    });
    return multiplier;
}

// Returns an inline style attribute string for a matchup cell based on its score.
// >1 = green (super effective), <1 = red (not very effective), ==1 = default (no color).
function getScoreCellStyle(score) {
    if (score > 1) return ' style="background-color: #A2BA9C;"';
    if (score < 1) return ' style="background-color: #d15c62;"';
    return '';
}

function getScoreCellStyle2(score) {
    if (score > 1) return ' style="background-color: #d15c62;"';
    if (score < 1) return ' style="background-color: #A2BA9C;"';
    return '';
}
function updateStats(num) {
    const level = parseInt(document.getElementById(`level-${num}`).value) || 50;
    const monName = document.getElementById(`monSelect-${num}`).value;
    const isSparkly = document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`).checked;
    const vibe = document.getElementById(`vibe-${num}`).value;

    let baseStats = { hp: 100, atk: 100, mag: 100, def: 100, res: 100, spd: 100 };
if (monName && monData[monName]) {
    baseStats = monData[monName].normal.stats;
}

    const statKeys = { 'HP':'hp', 'ATK':'atk', 'MAG':'mag', 'DEF':'def', 'RES':'res', 'SPD':'spd' };

    ['HP','ATK','MAG','DEF','RES','SPD'].forEach(s => {
        const base = baseStats[statKeys[s]] || 100;
        const grade = document.getElementById(`${s}-grade-${num}`).value;
        const growth = parseInt(document.getElementById(`${s}-growth-${num}`).value);
        
        let vibeMod = 1.0;
        if (vibe.includes(s + "+")) vibeMod = 1.1;
        else if (vibe.includes(s + "-")) vibeMod = 0.9;

        const levelM = Math.pow((level / 50.0), 0.7);
        const gradeMod = gradeMap[grade] || 1.0;
        const growthMod = 1.0 + (growth * 0.05);
        
        const final = Math.round(base * levelM * gradeMod * growthMod * vibeMod);
        document.getElementById(`${s}-result-${num}`).innerText = final;

        // Scale the stat bar fill on a 0-255 range and expose it via the
        // --fill CSS custom property (see .stat-bar-fill in the stylesheet).
        const barFill = document.getElementById(`${s}-bar-${num}`);
        if (barFill) {
            const pct = Math.max(0, Math.min(100, (final / 255) * 100));
            barFill.style.setProperty('--fill', pct + '%');
        }
    });
}

function updateSprite(num) {
    const selectedName = document.getElementById(`monSelect-${num}`).value;
    const isSparkly = document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`).checked;
    const spriteBox = document.getElementById(`sprite-${num}`);
    
    const h1Wrap = document.getElementById(`house1-wrap-${num}`);
    const h2Wrap = document.getElementById(`house2-wrap-${num}`);
    const h1In = document.getElementById(`house1-${num}`);
    const h2In = document.getElementById(`house2-${num}`);
    const icon1 = document.getElementById(`icon1-${num}`);
    const icon2 = document.getElementById(`icon2-${num}`);
    
    const darkTypes = ["Fireborn", "Nightwatch", "Atlantian", "Dragoon", "Brawler", "Ironclad"];

    if (selectedName && monData[selectedName]) {
        const data = isSparkly ? monData[selectedName].sparkly : monData[selectedName].normal;
        spriteBox.style.backgroundImage = `url('${data.sprite}')`;
        spriteBox.style.backgroundSize = 'contain';
        spriteBox.style.backgroundRepeat = 'no-repeat';
        spriteBox.style.backgroundPosition = 'center';

        const setHouse = (val, wrap, input, icon) => {
            if (val) {
                wrap.style.display = "flex";
                input.value = val;
                input.style.backgroundColor = typeColors[val] || "#eadfc1";
                input.style.color = darkTypes.includes(val) ? "#eadfc1" : "#342420";
                icon.src = typeToIcon[val] || 'assets/house_default.png';
            } else { wrap.style.display = "none"; }
        };

        setHouse(data.houses[0], h1Wrap, h1In, icon1);
        setHouse(data.houses[1], h2Wrap, h2In, icon2);
        
        populateSlotDropdowns(num); 
        updateStats(num);
        updateTeamEfficiencies();
    } else {
        spriteBox.style.backgroundImage = 'none';
        h1Wrap.style.display = "none";
        h2Wrap.style.display = "none";
        populateSlotDropdowns(num);
        updateTeamEfficiencies();
    }
}

function createSlot(num) {
    let monOptions = Object.keys(monData).map(name => `<option value="${name}">${name}</option>`).join('');
    let vibeOptions = vibes.map(v => `<option>${v}</option>`).join('');
    let itemOptions = heldItemList.map(i => `<option>${i}</option>`).join('');
    let tierOpts = ['S','A','B','C','D'].map(t => `<option value="${t}">${t}</option>`).join('');
    let invOpts = ['0','1','2','3'].map(i => `<option value="${i}">${i}</option>`).join('');
    
    return `<div class="slot"><div class="segment-title tab-slot">SLOT ${num}</div>
        <div style="display: flex; gap: 11px; margin-top: 11px; margin-bottom: 17px; align-items: center;">
            <input type="text" placeholder="NICKNAME" style="flex:1;"> Lv <input type="number" id="level-${num}" value="50" onchange="updateStats(${num})" style="width: 60px;"> 
            <label class="sparkle-label" style="display:flex; align-items:center; gap:4px; color: var(--black);">
                <input type="checkbox" class="sparkle-checkbox" onchange="updateSprite(${num})"> SPARKLE
            </label>
        </div>
        
   <div class="section-box moveset-box">
    <div class="segment-title tab-moveset">MOVESET</div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 11px;">
        ${[1,2,3,4].map(i => `
    <div>
        <div class="move-wrapper" id="move-wrap-${i}-${num}" style="position: relative; height: 35px; overflow: visible; border: 1px solid var(--black); background-color: var(--white); display: flex; flex-direction: column;">

            <div id="move-display-${i}-${num}" 
                 onclick="toggleDropdown(${i}, ${num})" 
                 style="height: 35px; display: flex; align-items: center; justify-content: space-between; padding: 0 8px; cursor: pointer; font-weight: bold; color: var(--black);">
                 <span>Move ${i}</span>
                 <img id="move-icon-${i}-${num}" class="move-type-icon" style="display:none; width: 20px; height: 20px; pointer-events: none;">
            </div>

            <div id="dropdown-list-${i}-${num}" class="custom-dropdown-list" style="display: none; position: absolute; top: 35px; left: 0; width: 100%; z-index: 999; border: 1px solid var(--black); background: var(--white); max-height: 200px; overflow-y: auto;">
            </div>

            <select id="move${i}-${num}" onchange="updateMoveDisplay(this.value, '${i}-${num}')" style="display: none;">
                <option value="">Move ${i}</option>
            </select>
        </div>
        <div id="move-desc-${i}-${num}"></div>
    </div>
`).join('')}
    </div>
</div>

        <div class="section-box passives-box">
            <div class="segment-title tab-passives">PASSIVES</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 11px;">
                ${[1,2,3,4].map(i => `
                    <div>
                        <select id="pass${i}-${num}" onchange="updatePassiveDisplay(this.value, '${i}-${num}')">
                            <option value="">Passive ${i}</option>
                        </select>
                        <div id="passive-desc-${i}-${num}"></div> 
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="sprite-section">
            <div class="sprite-box" id="sprite-${num}" style="flex:1;"></div>
            <div class="info-col" style="flex:1;">
                <select id="monSelect-${num}" onchange="updateSprite(${num})" style="margin-bottom: 5px;">
                    <option value="">Select Mon</option>${monOptions}
                </select>
                <select id="itemSelect-${num}"><option value="">Held Item</option>${itemOptions}</select>
            </div>
        </div>
        
        <div style="display: flex; gap: 6px; margin-bottom: 10px;">
            <div id="house1-wrap-${num}" style="flex:1; display:none; align-items:center; gap:5px;"><img id="icon1-${num}" style="width:20px; height:20px;"><input type="text" id="house1-${num}" style="flex:1;" readonly></div>
            <div id="house2-wrap-${num}" style="flex:1; display:none; align-items:center; gap:5px;"><img id="icon2-${num}" style="width:20px; height:20px;"><input type="text" id="house2-${num}" style="flex:1;" readonly></div>
        </div>

        <div class="stats-panel"><div class="segment-title tab-stats">STATS</div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
                ${['HP','ATK','MAG','DEF','RES','SPD'].map(s => `
                    <div class="stat-row">
                        <span style="width:30px; font-weight:bold; font-size:11px; color: var(--black);">${s}</span> 
                        <select id="${s}-grade-${num}" onchange="updateStats(${num})" style="width:45px; padding:2px;">${tierOpts}</select>
                        <select id="${s}-growth-${num}" onchange="updateStats(${num})" style="width:40px; padding:2px;">${invOpts}</select>
                        <div class="stat-bar"><div class="stat-bar-fill" id="${s}-bar-${num}"></div></div>
                        <span id="${s}-result-${num}" style="font-size:11px; width:30px; text-align:right; color: var(--black);">40</span>
                    </div>`).join('')}
            </div>
            <div style="margin-top:15px; border-top:1px solid var(--black); padding-top:10px;">
                <label style="font-weight:bold; color: var(--black);">VIBE:</label> <select id="vibe-${num}" onchange="updateStats(${num})" style="margin-top:5px;">${vibeOptions}</select>
            </div>
        </div></div>`;
}

function updatePassiveDisplay(passiveName, slotId) {
    const descDiv = document.getElementById(`passive-desc-${slotId}`);
    if (!descDiv) return;

    const description = passiveData[passiveName]; // Ensure passiveData is globally accessible
    if (description) {
        descDiv.innerHTML = `<div style="font-size: 0.8em; padding: 6px; background: rgba(0,0,0,0.05); margin-top: 5px; border-left: 3px solid #874185;">${description}</div>`;
    } else {
        descDiv.innerHTML = "";
    }
}

function updateMoveDisplay(moveName, slotId) {
    const descDiv = document.getElementById(`move-desc-${slotId}`);
    if (!descDiv) return;

    const moveObj = findMoveObject(moveName); // Your existing function
    const moveTypeFromData = findMoveType(moveName); // Using your new function

    if (moveObj) {
        // 1. Determine the house type (Use your helper, default to "Dragoon" if null or "Normal")
        let moveType = (moveTypeFromData === "Normal" || !moveTypeFromData) ? "Dragoon" : moveTypeFromData;
        
        // 2. Fetch the color from your typeColors dictionary
        const borderColor = typeColors[moveType] || "#342420";

        descDiv.innerHTML = `
            <div style="font-size: 0.8em; padding: 6px; background: rgba(0,0,0,0.05); margin-top: 5px; border-left: 3px solid ${borderColor};">
                ${moveObj.power} power | 
                ${moveObj.trigger} trigger(s) | 
                ${moveObj.target} |
                ${moveObj.scale} scaling | 
                ${moveTypeFromData || 'Unknown'} ${moveObj.pm} 
                ${moveObj.tag ? `| ${moveObj.tag.replace(/[\[\]]/g, '')}` : ''}
                <br>
                ${moveObj.cd} CD | ${moveObj.effect || 'none'}
            </div>`;
    } else {
        descDiv.innerHTML = "";
    }
}

// --- IMPORT / EXPORT SQUAD ---

function exportSquad() {
    const squad = [];
    for (let num = 1; num <= 4; num++) {
        const monSelect = document.getElementById(`monSelect-${num}`);
        if (!monSelect) continue;

        const slot = {
            nickname: document.querySelector(`.slot:nth-child(${num}) input[placeholder="NICKNAME"]`).value,
            level: document.getElementById(`level-${num}`).value,
            sparkle: document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`).checked,
            mon: monSelect.value,
            item: document.getElementById(`itemSelect-${num}`).value,
            vibe: document.getElementById(`vibe-${num}`).value,
            moves: [1,2,3,4].map(i => document.getElementById(`move${i}-${num}`).value),
            passives: [1,2,3,4].map(i => document.getElementById(`pass${i}-${num}`).value),
            stats: {}
        };

        ['HP','ATK','MAG','DEF','RES','SPD'].forEach(s => {
            slot.stats[s] = {
                grade: document.getElementById(`${s}-grade-${num}`).value,
                growth: document.getElementById(`${s}-growth-${num}`).value
            };
        });

        squad.push(slot);
    }

    const blob = new Blob([JSON.stringify(squad, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monsterpatch-squad.json";
    a.click();
    URL.revokeObjectURL(url);
}

function importSquad() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = () => {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            let squad;
            try {
                squad = JSON.parse(reader.result);
            } catch (e) {
                alert("Invalid squad file.");
                return;
            }

            squad.forEach((slot, idx) => {
                const num = idx + 1;
                const monSelect = document.getElementById(`monSelect-${num}`);
                if (!monSelect) return;

                document.querySelector(`.slot:nth-child(${num}) input[placeholder="NICKNAME"]`).value = slot.nickname || "";
                document.getElementById(`level-${num}`).value = slot.level || 50;
                document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`).checked = !!slot.sparkle;
                monSelect.value = slot.mon || "";
                document.getElementById(`itemSelect-${num}`).value = slot.item || "";

                // Repopulate move/passive dropdowns for this mon before setting values
                updateSprite(num);

                (slot.moves || []).forEach((m, i) => {
                    const sel = document.getElementById(`move${i+1}-${num}`);
                    if (sel) { sel.value = m; updateMoveStyle(i+1, num, m); updateMoveDisplay(m, `${i+1}-${num}`); }
                });
                (slot.passives || []).forEach((p, i) => {
                    const sel = document.getElementById(`pass${i+1}-${num}`);
                    if (sel) { sel.value = p; updatePassiveDisplay(p, `${i+1}-${num}`); }
                });

                if (slot.stats) {
                    Object.entries(slot.stats).forEach(([s, v]) => {
                        document.getElementById(`${s}-grade-${num}`).value = v.grade || 'S';
                        document.getElementById(`${s}-growth-${num}`).value = v.growth || '0';
                    });
                }
                document.getElementById(`vibe-${num}`).value = slot.vibe || vibes[0];

                updateStats(num);
            });

            updateTeamEfficiencies();
        };
        reader.readAsText(file);
    };
    input.click();
}

function updateTeamEfficiencies() {
    // --- OFFENSIVE MATCHUPS ---
    // Rows = threat/defending type. Columns = each mon's 4 moves (16 total) + NET.
    // Only DAMAGE moves contribute a real score; everything else defaults to 1 (uncolored).
    const offTbody = document.querySelector('#off-table tbody');
    if (offTbody) {
        offTbody.innerHTML = "";
        types.forEach(rowType => {
            let netMultiplier = 1;
            let rowHTML = `<tr><td class="row-header">${rowType}</td>`;
            for (let i = 1; i <= 4; i++) {
                for (let m = 1; m <= 4; m++) {
                    const moveSel = document.getElementById(`move${m}-${i}`);
                    const moveName = moveSel ? moveSel.value : "";
                    let score = 1;
                    if (moveName) {
                        const moveObj = findMoveObject(moveName);
                        const moveType = findMoveType(moveName);
                        if (moveObj && moveObj.type === "Damage" && moveType) {
                            score = getMultiplier(moveType, [rowType]);
                        }
                    }
                    netMultiplier *= score;
                    rowHTML += `<td${getScoreCellStyle(score)}>${score}</td>`;
                }
            }
            rowHTML += `<td${getScoreCellStyle(netMultiplier)}>${netMultiplier}</td></tr>`;
            offTbody.innerHTML += rowHTML;
        });
    }

    // --- DEFENSIVE MATCHUPS ---
    const defTbody = document.querySelector('#def-table tbody');
    if (defTbody) {
        defTbody.innerHTML = "";
        types.forEach(threatType => {
            let netMultiplier = 1;
            let rowHTML = `<tr><td class="row-header">${threatType}</td>`;
            for (let i = 1; i <= 4; i++) {
                const name = document.getElementById(`monSelect-${i}`).value;
                let score = 1;
                if (name && monData[name]) {
                    const isSparkly = document.querySelector(`.slot:nth-child(${i}) .sparkle-checkbox`).checked;
                    const data = isSparkly ? monData[name].sparkly : monData[name].normal;
                    score = getMultiplier(threatType, data.houses);
                }
                netMultiplier *= score;
                rowHTML += `<td${getScoreCellStyle2(score)}>${score}</td>`;
            }
            rowHTML += `<td${getScoreCellStyle2(netMultiplier)}>${netMultiplier}</td></tr>`;
            defTbody.innerHTML += rowHTML;
        });
    }
}

// --- 3. INITIALIZATION ---
const slotArea = document.getElementById('slot-area');
for(let i=1; i<=4; i++) slotArea.innerHTML += createSlot(i);
updateTeamEfficiencies();