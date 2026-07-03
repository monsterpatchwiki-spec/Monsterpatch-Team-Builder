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
        ]
    },
    "Fireborn": {
        "T0": [
            { name: "METEOR", pm: "M", type: "Damage", power: 15, trigger: 3, scale: "MAG", target: "Random Enemy", tag: null, cd: 1, effect: "25% Chance to BURN 2." },
            { name: "FIREBALL", pm: "M", type: "Damage", power: 30, trigger: 1, scale: "MAG", target: "Single Enemy", tag: null, cd: 1, effect: "100% Chance to spawn 1 SUNLIGHT." },
            { name: "SCORCH", pm: "P", type: "Damage", power: 40, trigger: 1, scale: "ATK", target: "Front Enemies", tag: null, cd: 1, effect: "50% Chance to BURN 2." }
        ]
    }
    // Continue this pattern for all tiers and types in "MoN_Moves.txt"
};

const passiveData = {
    "CRITICAL EYE": "Moves that target RANDOM ENEMY gain +25% CRIT CHANCE.",
    "BIG HEART": "BATTLE START: Increase MAXHP by 20%.",
    "ANIMATED": "BATTLE START: Gain HASTE 2.",
    "SHORT REST": "TURN START: If HP is less than 75%, HEAL 10% MAX HP.",
    "LONG REST": "TURN START: If HP is less than 50%, HEAL to full HP. [cite: 36] Once per battle. [cite: 37]",
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
   "001 Birb": { normal: { houses: ["Fireborn"], moves: ["METEOR", "CLAWS", "PUNCH"], passives: ["CRITICAL EYE"], stats: { hp: 104, atk: 51, mag: 56, def: 64, res: 61, spd: 49 }, sprite: "assets/001_n.png" }, sparkly: { houses: ["Nightwatch"], moves: ["CLAWS"], passives: ["CRITICAL EYE"], stats: { hp: 104, atk: 51, mag: 56, def: 64, res: 61, spd: 49 }, sprite: "assets/001_s.png" } },
   "002 Feenix": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 7, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/002_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/002_s.png" } },
   "003 Hawkamere": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/003_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/003_s.png" } },
   "004 Axolot": { normal: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/004_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/004_s.png" } },
   "005 Neptoon": { normal: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/005_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/005_s.png" } },
   "006 Salamight": { normal: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/006_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/006_s.png" } },
   "007 Gojiru": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/007_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/007_s.png" } },
   "008 Gaiaru": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/008_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/008_s.png" } },
   "009 Gaiazard": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/009_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/009_s.png" } },
   "010 Pachi": { normal: { houses: ["Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/010_n.png" }, sparkly: { houses: ["Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/010_s.png" } },
   "011 Stitchi": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/011_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/011_s.png" } },
   "012 Teddychi": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/012_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/012_s.png" } },
   "013 Demidemon": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/013_n.png" }, sparkly: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/013_s.png" } },
   "014 Demidevil": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/014_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/014_s.png" } },
   "015 Demigorgon": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/015_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/015_s.png" } },
   "016 Flauna": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/016_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/016_s.png" } },
   "017 Crystelle": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/017_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/017_s.png" } },
   "018 Auricorn": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/018_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/018_s.png" } },
   "019 Piglit": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/019_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/019_s.png" } },
   "020 Poghog": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/020_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/020_s.png" } },
   "021 Gigaboar": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/021_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/021_s.png" } },
   "022 Murkjaw": { normal: { houses: ["Atlantian"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/022_n.png" }, sparkly: { houses: ["Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/022_s.png" } },
   "023 Doomfin": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/023_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/023_s.png" } },
   "024 Terrorjaw": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/024_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/024_s.png" } },
   "025 Glub": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/025_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/025_s.png" } },
   "026 Tadglub": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/026_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/026_s.png" } },
   "027 Froglob": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/027_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/027_s.png" } },
   "028 Moomu": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/028_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/028_s.png" } },
   "029 Bullwark": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/029_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/029_s.png" } },
   "030 Aegitaur": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/030_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/030_s.png" } },
   "031 Ecto": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/031_n.png" }, sparkly: { houses: ["Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/031_s.png" } },
   "032 Toxlic": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/032_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/032_s.png" } },
   "033 Noxecution": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/033_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/033_s.png" } },
   "034 Nibblesaur": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/034_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/034_s.png" } },
   "035 Rubblesaur": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/035_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/035_s.png" } },
   "036 Tyrannox": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/036_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/036_s.png" } },
   "037 Gnoblin": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/037_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/037_s.png" } },
   "038 Snagglin": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/038_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/038_s.png" } },
   "039 Garuogre": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/039_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/039_s.png" } },
   "040 Dragini": { normal: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/040_n.png" }, sparkly: { houses: ["Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/040_s.png" } },
   "041 Luvdra": { normal: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/041_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/041_s.png" } },
   "042 Dragalia": { normal: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/042_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/042_s.png" } },
   "043 Poplit": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/043_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/043_s.png" } },
   "044 Emberlily": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/044_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/044_s.png" } },
   "045 Flamora": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/045_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/045_s.png" } },
   "046 Terrabone": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/046_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/046_s.png" } },
   "047 Terrahorn": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/047_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/047_s.png" } },
   "048 Terraclops": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/048_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/048_s.png" } },
   "049 Bloaty": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/049_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/049_s.png" } },
   "050 Pinpuffer": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/050_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/050_s.png" } },
   "051 Tetramine": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/051_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/051_s.png" } },
   "052 Harebelle": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/052_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/052_s.png" } },
   "053 Rowdibelle": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/053_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/053_s.png" } },
   "054 Bellarina": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/054_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/054_s.png" } },
   "055 Lilitad": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/055_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/055_s.png" } },
   "056 Lilipet": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/056_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/056_s.png" } },
   "057 Lilifrog": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/057_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/057_s.png" } },
   "058 Shellin": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/058_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/058_s.png" } },
   "059 Glorpin": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/059_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/059_s.png" } },
   "060 Glorpius": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/060_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/060_s.png" } },
   "061 Zagon": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/061_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/061_s.png" } },
   "062 Zellgon": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/062_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/062_s.png" } },
   "063 Zagnarok": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/063_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/063_s.png" } },
   "064 Cubskull": { normal: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/064_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/064_s.png" } },
   "065 Gloomcub": { normal: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/065_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/065_s.png" } },
   "066 Grislybear": { normal: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/066_n.png" }, sparkly: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/066_s.png" } },
   "067 Embpurr": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/067_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/067_s.png" } },
   "068 Pyremane": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/068_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/068_s.png" } },
   "069 Solareon": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/069_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/069_s.png" } },
   "070 Wyrmpool": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/070_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/070_s.png" } },
   "071 Wyrmwind": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/071_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/071_s.png" } },
   "072 Glaedria": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/072_n.png" }, sparkly: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/072_s.png" } },
   "073 Snok": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/073_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/073_s.png" } },
   "074 Lunaconda": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/074_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/074_s.png" } },
   "075 Cobraclysm": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/075_n.png" }, sparkly: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/075_s.png" } },
   "076 Poppeep": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/076_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/076_s.png" } },
   "077 Faequill": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/077_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/077_s.png" } },
   "078 Pocobo": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/078_n.png" }, sparkly: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/078_s.png" } },
   "079 Gardslug": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/079_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/079_s.png" } },
   "080 Cadeetle": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/080_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/080_s.png" } },
   "081 Bugbastion": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/081_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/081_s.png" } },
   "082 Squito": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/082_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/082_s.png" } },
   "083 Mossquito": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/083_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/083_s.png" } },
   "084 Venomite": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/084_n.png" }, sparkly: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/084_s.png" } },
   "085 Polly": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/085_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/085_s.png" } },
   "086 Cluccaneer": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/086_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/086_s.png" } },
   "087 Beakbeard": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/087_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/087_s.png" } },
   "088 Dracobull": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/088_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/088_s.png" } },
   "089 Dracohorn": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/089_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/089_s.png" } },
   "090 Bullzerker": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/090_n.png" }, sparkly: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/090_s.png" } },
   "091 Gillywatt": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/091_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/091_s.png" } },
   "092 Gulpawatt": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/092_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/092_s.png" } },
   "093 Lanterror": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/093_n.png" }, sparkly: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/093_s.png" } },
   "094 Charchunk": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/094_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/094_s.png" } },
   "095 Infernace": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/095_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/095_s.png" } },
   "096 Hadrion": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/096_n.png" }, sparkly: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/096_s.png" } },
   "097 Dumblo": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/097_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/097_s.png" } },
   "098 Driftusk": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/098_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/098_s.png" } },
   "099 Lullaphant": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/099_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/099_s.png" } },
   "100 Helmkin": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/100_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/100_s.png" } },
   "101 Hollowisp": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/101_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/101_s.png" } },
   "102 Knightgeist": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/102_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/102_s.png" } },
   "103 Nessie": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/103_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/103_s.png" } },
   "104 Moxasaur": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/104_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/104_s.png" } },
   "105 Coralodon": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/105_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/105_s.png" } },
   "106 Wilowisp": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/106_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/106_s.png" } },
   "107 Wilowraith": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/107_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/107_s.png" } },
   "108 Revreaper": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/108_n.png" }, sparkly: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/108_s.png" } },
   "109 Alligyle": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/109_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/109_s.png" } },
   "110 Waddlgator": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/110_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/110_s.png" } },
   "111 Crocolossus": { normal: { houses: ["Atlantian", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/111_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/111_s.png" } },
   "112 Redcap": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/112_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/112_s.png" } },
   "113 Sporch": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/113_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/113_s.png" } },
   "114 Gloomshroom": { normal: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/114_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/114_s.png" } },
   "115 Psyclod": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/115_n.png" }, sparkly: { houses: ["Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/115_s.png" } },
   "116 Psytongue": { normal: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/116_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/116_s.png" } },
   "117 Psyrock": { normal: { houses: ["Brawler", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/117_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/117_s.png" } },
   "118 Pengu": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/118_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/118_s.png" } },
   "119 Pengurai": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/119_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/119_s.png" } },
   "120 Raironin": { normal: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/120_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/120_s.png" } },
   "121 Clammler": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/121_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/121_s.png" } },
   "122 Shelltler": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/122_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/122_s.png" } },
   "123 Shieldler": { normal: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/123_n.png" }, sparkly: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/123_s.png" } },
   "124 Bonpot": { normal: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/124_n.png" }, sparkly: { houses: ["Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/124_s.png" } },
   "125 Bonsprout": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/125_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/125_s.png" } },
   "126 Bonblossom": { normal: { houses: ["Mystic", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/126_n.png" }, sparkly: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/126_s.png" } },
   "127 Bitmant": { normal: { houses: ["Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/127_n.png" }, sparkly: { houses: ["Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/127_s.png" } },
   "128 Metalmant": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/128_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/128_s.png" } },
   "129 Adamantis": { normal: { houses: ["Ironclad", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/129_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/129_s.png" } },
   "130 Corsea": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/130_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/130_s.png" } },
   "131 Seapuff": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/131_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/131_s.png" } },
   "132 Hippoflare": { normal: { houses: ["Atlantian", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/132_n.png" }, sparkly: { houses: ["Dragoon", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/132_s.png" } },
   "133 Gurgle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/133_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/133_s.png" } },
   "134 Gurgoyle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/134_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/134_s.png" } },
   "135 Goregyle": { normal: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/135_n.png" }, sparkly: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/135_s.png" } },
   "136 Caterbug": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/136_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/136_s.png" } },
   "137 Lavalarva": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/137_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/137_s.png" } },
   "138 Monarchfly": { normal: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/138_n.png" }, sparkly: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/138_s.png" } },
   "139 Gubble": { normal: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/139_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/139_s.png" } },
   "140 Gyoshi": { normal: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/140_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/140_s.png" } },
   "141 Bubblegon": { normal: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/141_n.png" }, sparkly: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/141_s.png" } },
   "142 Tanooki": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/142_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/142_s.png" } },
   "143 Tanuko": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/143_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/143_s.png" } },
   "144 Tanukuma": { normal: { houses: ["Brawler", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/144_n.png" }, sparkly: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/144_s.png" } },
   "145 Smoldodo": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/145_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/145_s.png" } },
   "146 Opyryx": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/146_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/146_s.png" } },
   "147 Ignychus": { normal: { houses: ["Dragoon", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/147_n.png" }, sparkly: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/147_s.png" } },
   "148 Blubbo": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/148_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/148_s.png" } },
   "149 Narwelt": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/149_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/149_s.png" } },
   "150 Narwallop": { normal: { houses: ["Atlantian", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/150_n.png" }, sparkly: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/150_s.png" } },
   "151 Grinnlin": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/151_n.png" }, sparkly: { houses: ["Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/151_s.png" } },
   "152 Gobjank": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/152_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/152_s.png" } },
   "153 Gobsmurk": { normal: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/153_n.png" }, sparkly: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/153_s.png" } },
   "154 Cacoto": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/154_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/154_s.png" } },
   "155 Cacotid": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/155_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/155_s.png" } },
   "156 Cacoton": { normal: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/156_n.png" }, sparkly: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/156_s.png" } },
   "157 Chicky": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/157_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/157_s.png" } },
   "158 Silligoose": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/158_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/158_s.png" } },
   "159 Doomchicken": { normal: { houses: ["Mystic", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/159_n.png" }, sparkly: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/159_s.png" } },
   "160 Glibat": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/160_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/160_s.png" } },
   "161 Hexbat": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/161_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/161_s.png" } },
   "162 Blightbat": { normal: { houses: ["Mystic", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/162_n.png" }, sparkly: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/162_s.png" } },
   "163 Pokoroko": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/163_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/163_s.png" } },
   "164 Shakasaru": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/164_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/164_s.png" } },
   "165 Masukusaru": { normal: { houses: ["Brawler", "Dragoon"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/165_n.png" }, sparkly: { houses: ["Nightwatch", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/165_s.png" } },
   "166 Ghostkit": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/166_n.png" }, sparkly: { houses: ["Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/166_s.png" } },
   "167 Netherlynx": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/167_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/167_s.png" } },
   "168 Shimmerclaw": { normal: { houses: ["Nightwatch", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/168_n.png" }, sparkly: { houses: ["Fireborn", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/168_s.png" } },
   "169 Wimpid": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/169_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/169_s.png" } },
   "170 Velvolt": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/170_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/170_s.png" } },
   "171 Vespabolt": { normal: { houses: ["Ironclad", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/171_n.png" }, sparkly: { houses: ["Fireborn", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/171_s.png" } },
   "172 Weenut": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/172_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/172_s.png" } },
   "173 Spriggent": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/173_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/173_s.png" } },
   "174 Enchantree": { normal: { houses: ["Overgrowth", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/174_n.png" }, sparkly: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/174_s.png" } },
   "175 Kraba": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/175_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/175_s.png" } },
   "176 Krabaghast": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/176_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/176_s.png" } },
   "177 Krabaghoul": { normal: { houses: ["Atlantian", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/177_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/177_s.png" } },
   "178 Dootle": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/178_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/178_s.png" } },
   "179 Dingdung": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/179_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/179_s.png" } },
   "180 Astrobug": { normal: { houses: ["Brawler", "Fireborn"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/180_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/180_s.png" } },
   "181 Cawful": { normal: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/181_n.png" }, sparkly: { houses: ["Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/181_s.png" } },
   "182 Cultcrow": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/182_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/182_s.png" } },
   "183 Covencrow": { normal: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/183_n.png" }, sparkly: { houses: ["Ironclad", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/183_s.png" } },
   "184 Goopy": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/184_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/184_s.png" } },
   "185 Mitomoeba": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/185_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/185_s.png" } },
   "186 Protoslime": { normal: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/186_n.png" }, sparkly: { houses: ["Dragoon", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/186_s.png" } },
   "187 Mimlick": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/187_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/187_s.png" } },
   "188 Fortresst": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/188_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/188_s.png" } },
   "189 Ghoulgalion": { normal: { houses: ["Ironclad", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/189_n.png" }, sparkly: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/189_s.png" } },
   "190 Fluffin": { normal: { houses: ["Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/190_n.png" }, sparkly: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/190_s.png" } },
   "191 Owlsage": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/191_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/191_s.png" } },
   "192 Arcanowl": { normal: { houses: ["Brawler", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/192_n.png" }, sparkly: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/192_s.png" } },
   "193 Snoosnail": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/193_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/193_s.png" } },
   "194 Magmolten": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/194_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/194_s.png" } },
   "195 Warloctopus": { normal: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/195_n.png" }, sparkly: { houses: ["Atlantian", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/195_s.png" } },
   "196 Jellyzip": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/196_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/196_s.png" } },
   "197 Jellyzap": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/197_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/197_s.png" } },
   "198 Jellystorm": { normal: { houses: ["Atlantian", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/198_n.png" }, sparkly: { houses: ["Fireborn", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/198_s.png" } },
   "199 Rohoot": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/199_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/199_s.png" } },
   "200 Rohawk": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/200_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/200_s.png" } },
   "201 Griffiron": { normal: { houses: ["Brawler", "Ironclad"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/201_n.png" }, sparkly: { houses: ["Dragoon", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/201_s.png" } },
   "202 Elixapot": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/202_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/202_s.png" } },
   "203 Elixabrew": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/203_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/203_s.png" } },
   "204 Elixadon": { normal: { houses: ["Dragoon", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/204_n.png" }, sparkly: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/204_s.png" } },
   "205 Meowmau": { normal: { houses: ["Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/205_n.png" }, sparkly: { houses: ["Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/205_s.png" } },
   "206 Bastcat": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/206_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/206_s.png" } },
   "207 Cleocatra": { normal: { houses: ["Brawler", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/207_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/207_s.png" } },
   "208 Millapod": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/208_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/208_s.png" } },
   "209 Centascale": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/209_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/209_s.png" } },
   "210 Dragapede": { normal: { houses: ["Dragoon", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/210_n.png" }, sparkly: { houses: ["Fireborn", "Nightwatch"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/210_s.png" } },
   "211 Kiplet": { normal: { houses: ["Atlantian"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/211_n.png" }, sparkly: { houses: ["Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/211_s.png" } },
   "212 Kippurr": { normal: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/212_n.png" }, sparkly: { houses: ["Ironclad", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/212_s.png" } },
   "213 Kippycat": { normal: { houses: ["Atlantian", "Mystic"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/213_n.png" }, sparkly: { houses: ["Ironclad", "Brawler"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/213_s.png" } },
   "214 Toatoad": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/214_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/214_s.png" } },
   "215 Toadjinn": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/215_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/215_s.png" } },
   "216 Explotoad": { normal: { houses: ["Fireborn", "Whimsical"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/216_n.png" }, sparkly: { houses: ["Atlantian", "Overgrowth"], moves: [], passives: [], stats: { hp: 0, atk: 0, mag: 0, def: 0, res: 0, spd: 0 }, sprite: "assets/216_s.png" } },
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
    // 1. We NO LONGER use display.innerText = ... 
    // because that deletes the span and the icon.
    // Instead, we let updateMoveStyle handle the update.
    
    // 2. Hide the list
    toggleDropdown(i, num);
    
    // 3. Update the styling (handles icon visibility and background colors)
    updateMoveStyle(i, num, moveName); 
    
    // 4. Update the description text
    updateMoveDisplay(moveName, `${i}-${num}`);
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

    // Update the hidden <select> elements for legacy compatibility (if needed)
    for(let i = 1; i <= 4; i++) {
        const sel = document.getElementById(`move${i}-${num}`);
        if (!sel) continue;
        const currentSelection = sel.value;
        sel.innerHTML = `<option value="">Move ${i}</option>` + 
            (data.moves || []).map(m => `<option value="${m}">${m}</option>`).join('');
        sel.value = currentSelection;
        updateMoveStyle(i, num, currentSelection);
    }

    for(let i = 1; i <= 4; i++) {
        const sel = document.getElementById(`pass${i}-${num}`);
        if (!sel) continue; 
        const currentSelection = sel.value;
        sel.innerHTML = `<option value="">Passive ${i}</option>` + 
            (data.passives || []).map(p => `<option value="${p}">${p}</option>`).join('');
        sel.value = currentSelection;
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
            
            html += `<div onclick="selectMove(${i}, ${num}, '${m}')" 
                          style="background-color: ${color}; 
                                 color: ${textColor}; 
                                 padding: 5px; 
                                 cursor: pointer; 
                                 display: flex; 
                                 align-items: center; 
                                 gap: 5px; 
                                 border-bottom: 1px solid #342420;">
                          <img src="${icon}" style="width:16px; height:16px; pointer-events: none;">
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

function updateStats(num) {
    const level = parseInt(document.getElementById(`level-${num}`).value) || 50;
    const monName = document.getElementById(`monSelect-${num}`).value;
    const isSparkly = document.querySelector(`.slot:nth-child(${num}) .sparkle-checkbox`).checked;
    const vibe = document.getElementById(`vibe-${num}`).value;

    let baseStats = { hp: 100, atk: 100, mag: 100, def: 100, res: 100, spd: 100 };
    if (monName && monData[monName]) {
        const data = isSparkly ? monData[monName].sparkly : monData[monName].normal;
        baseStats = data.stats;
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
                        <div class="stat-bar"><div class="stat-bar-fill"></div></div>
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

    const moveObj = findMoveObject(moveName);

    if (moveObj) {
        // Logic to get the color, defaulting to Dragoon if Normal or undefined
        let moveType = moveObj.type;
        if (moveType === "Normal") moveType = "Dragoon";
        
        const borderColor = typeColors[moveType] || "#342420";

        descDiv.innerHTML = `
            <div style="font-size: 0.8em; padding: 6px; background: rgba(0,0,0,0.05); margin-top: 5px; border-left: 3px solid ${borderColor};">
                ${moveObj.power} power | 
                ${moveObj.trigger} trigger | 
                ${moveObj.scale} scaling | 
                ${moveObj.type} ${moveObj.pm} 
                ${moveObj.tag ? `| ${moveObj.tag.replace(/[\[\]]/g, '')}` : ''}
                <br>
                ${moveObj.cd} CD | ${moveObj.effect || 'none'}
            </div>`;
    } else {
        descDiv.innerHTML = "";
    }
}

function updateTeamEfficiencies() {
    const offTbody = document.querySelector('#off-table tbody');
    if (offTbody) {
        offTbody.innerHTML = "";
        types.forEach(rowType => {
            offTbody.innerHTML += `<tr><td class="row-header">${rowType}</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>`;
        });
    }

    const defTbody = document.querySelector('#def-table tbody');
    if (defTbody) {
        defTbody.innerHTML = "";
        types.forEach(threatType => {
            let netMultiplier = 1;
            let rowHTML = `<tr><td class="row-header">${threatType}</td>`;
            for (let i = 1; i <= 4; i++) {
                const name = document.getElementById(`monSelect-${i}`).value;
                if (name && monData[name]) {
                    const isSparkly = document.querySelector(`.slot:nth-child(${i}) .sparkle-checkbox`).checked;
                    const data = isSparkly ? monData[name].sparkly : monData[name].normal;
                    let score = getMultiplier(threatType, data.houses);
                    netMultiplier *= score;
                    rowHTML += `<td>${score}</td>`;
                } else { rowHTML += `<td>1</td>`; }
            }
            rowHTML += `<td>${netMultiplier}</td></tr>`;
            defTbody.innerHTML += rowHTML;
        });
    }
}

// --- 3. INITIALIZATION ---
const slotArea = document.getElementById('slot-area');
for(let i=1; i<=4; i++) slotArea.innerHTML += createSlot(i);
updateTeamEfficiencies();