#!/usr/bin/env python3
"""
Monster Data Extractor
======================
A small desktop app (Tkinter) for turning Unity asset-dump .txt exports
into ready-to-paste `monData` JS entries.

It understands TWO kinds of exports and auto-detects which is which:

  1. "Base info" files  (e.g. 0_Birb..., 1_Feenix..., 2_Hawkamere...)
     -> id, monName, baseHP/ATK/MAG/DEF/RES/SPD, houses, housesShiny,
        evolutionStage, monLineName

  2. "Growth row" files  (e.g. 9_Pachi..., 9_PACHI_Shiny...)
     -> startingMove/commonPassive/rarePassive + every lvXMove / lvXPassive
        option, i.e. the full learnable movepool

You can drop in any mix of both types at once. All "growth row" files
get merged into one shared, deduped moves/passives pool (since evolution
lines / related mons typically share a movepool). Every "base info" file
becomes its own monData entry, using its own real stats and houses, but
tagged with that shared moves/passives pool.

Drag-and-drop works if the optional `tkinterdnd2` package is installed
(`pip install tkinterdnd2`). Without it, the app still works fully via
the "Browse Files..." button.

USAGE:
    python3 monster_data_extractor.py
"""

import re
import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox

# Index -> house/type name, based on the game's `types` array. This is a
# GUESS used only as a fallback for mons not yet covered by
# MON_TYPE_REFERENCE below -- cross-checking against known-correct data
# has shown at least one slot in this array is wrong (see note below), so
# treat entries derived from it as unverified until confirmed.
HOUSE_NAMES = [
    "Fireborn", "Atlantian", "Overgrowth", "Whimsical", "Nightwatch",
    "Mystic", "Dragoon", "Ironclad", "Brawler", "Normal",
]

# Authoritative dex-number -> houses/housesShiny lookup, supplied directly
# by the user from known-correct game data (covers dex #1-216). Whenever a
# base-info mon's dex number (id+1) appears here, these houses are used
# INSTEAD of the index-derived guess above, since this table is ground
# truth and the index guess is known to be wrong in at least one slot
# (e.g. index 7 was assumed to be "Ironclad" but should be "Mystic" --
# confirmed by cross-referencing Feenix/Hawkamere's shiny houses).
MON_TYPE_REFERENCE = {
    1: {"name": "Birb", "houses": ['Fireborn'], "housesShiny": ['Nightwatch']},
    2: {"name": "Feenix", "houses": ['Fireborn', 'Whimsical'], "housesShiny": ['Mystic', 'Nightwatch']},
    3: {"name": "Hawkamere", "houses": ['Fireborn', 'Whimsical'], "housesShiny": ['Mystic', 'Nightwatch']},
    4: {"name": "Axolot", "houses": ['Atlantian', 'Mystic'], "housesShiny": ['Dragoon', 'Fireborn']},
    5: {"name": "Neptoon", "houses": ['Atlantian', 'Mystic'], "housesShiny": ['Dragoon', 'Fireborn']},
    6: {"name": "Salamight", "houses": ['Atlantian', 'Mystic'], "housesShiny": ['Dragoon', 'Fireborn']},
    7: {"name": "Gojiru", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    8: {"name": "Gaiaru", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    9: {"name": "Gaiazard", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    10: {"name": "Pachi", "houses": ['Whimsical'], "housesShiny": ['Ironclad']},
    11: {"name": "Stitchi", "houses": ['Brawler', 'Whimsical'], "housesShiny": ['Ironclad', 'Overgrowth']},
    12: {"name": "Teddychi", "houses": ['Brawler', 'Whimsical'], "housesShiny": ['Ironclad', 'Overgrowth']},
    13: {"name": "Demidemon", "houses": ['Nightwatch'], "housesShiny": ['Mystic']},
    14: {"name": "Demidevil", "houses": ['Dragoon', 'Nightwatch'], "housesShiny": ['Atlantian', 'Mystic']},
    15: {"name": "Demigorgon", "houses": ['Dragoon', 'Nightwatch'], "housesShiny": ['Atlantian', 'Mystic']},
    16: {"name": "Flauna", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Whimsical']},
    17: {"name": "Crystelle", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Whimsical']},
    18: {"name": "Auricorn", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Whimsical']},
    19: {"name": "Piglit", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Ironclad', 'Nightwatch']},
    20: {"name": "Poghog", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Ironclad', 'Nightwatch']},
    21: {"name": "Gigaboar", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Ironclad', 'Nightwatch']},
    22: {"name": "Murkjaw", "houses": ['Atlantian'], "housesShiny": ['Dragoon']},
    23: {"name": "Doomfin", "houses": ['Atlantian', 'Nightwatch'], "housesShiny": ['Brawler', 'Dragoon']},
    24: {"name": "Terrorjaw", "houses": ['Atlantian', 'Nightwatch'], "housesShiny": ['Brawler', 'Dragoon']},
    25: {"name": "Glub", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Mystic']},
    26: {"name": "Tadglub", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Mystic']},
    27: {"name": "Froglob", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Mystic']},
    28: {"name": "Moomu", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    29: {"name": "Bullwark", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    30: {"name": "Aegitaur", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    31: {"name": "Ecto", "houses": ['Nightwatch'], "housesShiny": ['Dragoon']},
    32: {"name": "Toxlic", "houses": ['Nightwatch', 'Whimsical'], "housesShiny": ['Dragoon', 'Overgrowth']},
    33: {"name": "Noxecution", "houses": ['Nightwatch', 'Whimsical'], "housesShiny": ['Dragoon', 'Overgrowth']},
    34: {"name": "Nibblesaur", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Fireborn', 'Mystic']},
    35: {"name": "Rubblesaur", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Fireborn', 'Mystic']},
    36: {"name": "Tyrannox", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Fireborn', 'Mystic']},
    37: {"name": "Gnoblin", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Dragoon', 'Mystic']},
    38: {"name": "Snagglin", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Dragoon', 'Mystic']},
    39: {"name": "Garuogre", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Dragoon', 'Mystic']},
    40: {"name": "Dragini", "houses": ['Mystic'], "housesShiny": ['Fireborn']},
    41: {"name": "Luvdra", "houses": ['Dragoon', 'Mystic'], "housesShiny": ['Atlantian', 'Fireborn']},
    42: {"name": "Dragalia", "houses": ['Dragoon', 'Mystic'], "housesShiny": ['Atlantian', 'Fireborn']},
    43: {"name": "Poplit", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    44: {"name": "Emberlily", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    45: {"name": "Flamora", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    46: {"name": "Terrabone", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    47: {"name": "Terrahorn", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    48: {"name": "Terraclops", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    49: {"name": "Bloaty", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Ironclad', 'Mystic']},
    50: {"name": "Pinpuffer", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Ironclad', 'Mystic']},
    51: {"name": "Tetramine", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Ironclad', 'Mystic']},
    52: {"name": "Harebelle", "houses": ['Ironclad', 'Mystic'], "housesShiny": ['Dragoon', 'Nightwatch']},
    53: {"name": "Rowdibelle", "houses": ['Ironclad', 'Mystic'], "housesShiny": ['Dragoon', 'Nightwatch']},
    54: {"name": "Bellarina", "houses": ['Ironclad', 'Mystic'], "housesShiny": ['Dragoon', 'Nightwatch']},
    55: {"name": "Lilitad", "houses": ['Mystic', 'Overgrowth'], "housesShiny": ['Brawler', 'Nightwatch']},
    56: {"name": "Lilipet", "houses": ['Mystic', 'Overgrowth'], "housesShiny": ['Brawler', 'Nightwatch']},
    57: {"name": "Lilifrog", "houses": ['Mystic', 'Overgrowth'], "housesShiny": ['Brawler', 'Nightwatch']},
    58: {"name": "Shellin", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Mystic', 'Overgrowth']},
    59: {"name": "Glorpin", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Mystic', 'Overgrowth']},
    60: {"name": "Glorpius", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Mystic', 'Overgrowth']},
    61: {"name": "Zagon", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Atlantian', 'Ironclad']},
    62: {"name": "Zellgon", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Atlantian', 'Ironclad']},
    63: {"name": "Zagnarok", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Atlantian', 'Ironclad']},
    64: {"name": "Cubskull", "houses": ['Brawler', 'Nightwatch'], "housesShiny": ['Dragoon', 'Fireborn']},
    65: {"name": "Gloomcub", "houses": ['Brawler', 'Nightwatch'], "housesShiny": ['Dragoon', 'Fireborn']},
    66: {"name": "Grislybear", "houses": ['Brawler', 'Nightwatch'], "housesShiny": ['Dragoon', 'Fireborn']},
    67: {"name": "Embpurr", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Atlantian', 'Brawler']},
    68: {"name": "Pyremane", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Atlantian', 'Brawler']},
    69: {"name": "Solareon", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Atlantian', 'Brawler']},
    70: {"name": "Wyrmpool", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Ironclad', 'Mystic']},
    71: {"name": "Wyrmwind", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Ironclad', 'Mystic']},
    72: {"name": "Glaedria", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Ironclad', 'Mystic']},
    73: {"name": "Snok", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Atlantian', 'Dragoon']},
    74: {"name": "Lunaconda", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Atlantian', 'Dragoon']},
    75: {"name": "Cobraclysm", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Atlantian', 'Dragoon']},
    76: {"name": "Poppeep", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Nightwatch']},
    77: {"name": "Faequill", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Nightwatch']},
    78: {"name": "Pocobo", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Nightwatch']},
    79: {"name": "Gardslug", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Brawler', 'Whimsical']},
    80: {"name": "Cadeetle", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Brawler', 'Whimsical']},
    81: {"name": "Bugbastion", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Brawler', 'Whimsical']},
    82: {"name": "Squito", "houses": ['Nightwatch', 'Overgrowth'], "housesShiny": ['Atlantian', 'Fireborn']},
    83: {"name": "Mossquito", "houses": ['Nightwatch', 'Overgrowth'], "housesShiny": ['Atlantian', 'Fireborn']},
    84: {"name": "Venomite", "houses": ['Nightwatch', 'Overgrowth'], "housesShiny": ['Atlantian', 'Fireborn']},
    85: {"name": "Polly", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Whimsical']},
    86: {"name": "Cluccaneer", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Whimsical']},
    87: {"name": "Beakbeard", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Whimsical']},
    88: {"name": "Dracobull", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Mystic', 'Overgrowth']},
    89: {"name": "Dracohorn", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Mystic', 'Overgrowth']},
    90: {"name": "Bullzerker", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Mystic', 'Overgrowth']},
    91: {"name": "Gillywatt", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Mystic', 'Nightwatch']},
    92: {"name": "Gulpawatt", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Mystic', 'Nightwatch']},
    93: {"name": "Lanterror", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Mystic', 'Nightwatch']},
    94: {"name": "Charchunk", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Brawler', 'Whimsical']},
    95: {"name": "Infernace", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Brawler', 'Whimsical']},
    96: {"name": "Hadrion", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Brawler', 'Whimsical']},
    97: {"name": "Dumblo", "houses": ['Brawler', 'Mystic'], "housesShiny": ['Atlantian', 'Ironclad']},
    98: {"name": "Driftusk", "houses": ['Brawler', 'Mystic'], "housesShiny": ['Atlantian', 'Ironclad']},
    99: {"name": "Lullaphant", "houses": ['Brawler', 'Mystic'], "housesShiny": ['Atlantian', 'Ironclad']},
    100: {"name": "Helmkin", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    101: {"name": "Hollowisp", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    102: {"name": "Knightgeist", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    103: {"name": "Nessie", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Fireborn', 'Ironclad']},
    104: {"name": "Moxasaur", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Fireborn', 'Ironclad']},
    105: {"name": "Coralodon", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Fireborn', 'Ironclad']},
    106: {"name": "Wilowisp", "houses": ['Fireborn', 'Nightwatch'], "housesShiny": ['Dragoon', 'Overgrowth']},
    107: {"name": "Wilowraith", "houses": ['Fireborn', 'Nightwatch'], "housesShiny": ['Dragoon', 'Overgrowth']},
    108: {"name": "Revreaper", "houses": ['Fireborn', 'Nightwatch'], "housesShiny": ['Dragoon', 'Overgrowth']},
    109: {"name": "Alligyle", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Fireborn', 'Overgrowth']},
    110: {"name": "Waddlgator", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Fireborn', 'Overgrowth']},
    111: {"name": "Crocolossus", "houses": ['Atlantian', 'Dragoon'], "housesShiny": ['Fireborn', 'Overgrowth']},
    112: {"name": "Redcap", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    113: {"name": "Sporch", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    114: {"name": "Gloomshroom", "houses": ['Fireborn', 'Mystic'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    115: {"name": "Psyclod", "houses": ['Nightwatch'], "housesShiny": ['Dragoon']},
    116: {"name": "Psytongue", "houses": ['Brawler', 'Nightwatch'], "housesShiny": ['Dragoon', 'Ironclad']},
    117: {"name": "Psyrock", "houses": ['Brawler', 'Nightwatch'], "housesShiny": ['Dragoon', 'Ironclad']},
    118: {"name": "Pengu", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Brawler', 'Overgrowth']},
    119: {"name": "Pengurai", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Brawler', 'Overgrowth']},
    120: {"name": "Raironin", "houses": ['Dragoon', 'Whimsical'], "housesShiny": ['Brawler', 'Overgrowth']},
    121: {"name": "Clammler", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Brawler', 'Mystic']},
    122: {"name": "Shelltler", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Brawler', 'Mystic']},
    123: {"name": "Shieldler", "houses": ['Atlantian', 'Ironclad'], "housesShiny": ['Brawler', 'Mystic']},
    124: {"name": "Bonpot", "houses": ['Mystic'], "housesShiny": ['Brawler']},
    125: {"name": "Bonsprout", "houses": ['Mystic', 'Overgrowth'], "housesShiny": ['Atlantian', 'Brawler']},
    126: {"name": "Bonblossom", "houses": ['Mystic', 'Overgrowth'], "housesShiny": ['Atlantian', 'Brawler']},
    127: {"name": "Bitmant", "houses": ['Ironclad'], "housesShiny": ['Overgrowth']},
    128: {"name": "Metalmant", "houses": ['Ironclad', 'Mystic'], "housesShiny": ['Overgrowth', 'Whimsical']},
    129: {"name": "Adamantis", "houses": ['Ironclad', 'Mystic'], "housesShiny": ['Overgrowth', 'Whimsical']},
    130: {"name": "Corsea", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Dragoon', 'Whimsical']},
    131: {"name": "Seapuff", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Dragoon', 'Whimsical']},
    132: {"name": "Hippoflare", "houses": ['Atlantian', 'Fireborn'], "housesShiny": ['Dragoon', 'Whimsical']},
    133: {"name": "Gurgle", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    134: {"name": "Gurgoyle", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    135: {"name": "Goregyle", "houses": ['Dragoon', 'Ironclad'], "housesShiny": ['Nightwatch', 'Whimsical']},
    136: {"name": "Caterbug", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Ironclad', 'Whimsical']},
    137: {"name": "Lavalarva", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Ironclad', 'Whimsical']},
    138: {"name": "Monarchfly", "houses": ['Fireborn', 'Overgrowth'], "housesShiny": ['Ironclad', 'Whimsical']},
    139: {"name": "Gubble", "houses": ['Dragoon', 'Mystic'], "housesShiny": ['Brawler', 'Overgrowth']},
    140: {"name": "Gyoshi", "houses": ['Dragoon', 'Mystic'], "housesShiny": ['Brawler', 'Overgrowth']},
    141: {"name": "Bubblegon", "houses": ['Dragoon', 'Mystic'], "housesShiny": ['Brawler', 'Overgrowth']},
    142: {"name": "Tanooki", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    143: {"name": "Tanuko", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    144: {"name": "Tanukuma", "houses": ['Brawler', 'Overgrowth'], "housesShiny": ['Atlantian', 'Nightwatch']},
    145: {"name": "Smoldodo", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Atlantian', 'Mystic']},
    146: {"name": "Opyryx", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Atlantian', 'Mystic']},
    147: {"name": "Ignychus", "houses": ['Dragoon', 'Fireborn'], "housesShiny": ['Atlantian', 'Mystic']},
    148: {"name": "Blubbo", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Nightwatch']},
    149: {"name": "Narwelt", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Nightwatch']},
    150: {"name": "Narwallop", "houses": ['Atlantian', 'Brawler'], "housesShiny": ['Ironclad', 'Nightwatch']},
    151: {"name": "Grinnlin", "houses": ['Nightwatch'], "housesShiny": ['Dragoon']},
    152: {"name": "Gobjank", "houses": ['Nightwatch', 'Overgrowth'], "housesShiny": ['Brawler', 'Dragoon']},
    153: {"name": "Gobsmurk", "houses": ['Nightwatch', 'Overgrowth'], "housesShiny": ['Brawler', 'Dragoon']},
    154: {"name": "Cacoto", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    155: {"name": "Cacotid", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    156: {"name": "Cacoton", "houses": ['Ironclad', 'Overgrowth'], "housesShiny": ['Mystic', 'Whimsical']},
    157: {"name": "Chicky", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Ironclad']},
    158: {"name": "Silligoose", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Ironclad']},
    159: {"name": "Doomchicken", "houses": ['Mystic', 'Whimsical'], "housesShiny": ['Brawler', 'Ironclad']},
    160: {"name": "Glibat", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Overgrowth', 'Whimsical']},
    161: {"name": "Hexbat", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Overgrowth', 'Whimsical']},
    162: {"name": "Blightbat", "houses": ['Mystic', 'Nightwatch'], "housesShiny": ['Overgrowth', 'Whimsical']},
    163: {"name": "Pokoroko", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    164: {"name": "Shakasaru", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    165: {"name": "Masukusaru", "houses": ['Brawler', 'Dragoon'], "housesShiny": ['Nightwatch', 'Overgrowth']},
    166: {"name": "Ghostkit", "houses": ['Nightwatch'], "housesShiny": ['Fireborn']},
    167: {"name": "Netherlynx", "houses": ['Nightwatch', 'Whimsical'], "housesShiny": ['Fireborn', 'Mystic']},
    168: {"name": "Shimmerclaw", "houses": ['Nightwatch', 'Whimsical'], "housesShiny": ['Fireborn', 'Mystic']},
    169: {"name": "Wimpid", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Fireborn', 'Overgrowth']},
    170: {"name": "Velvolt", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Fireborn', 'Overgrowth']},
    171: {"name": "Vespabolt", "houses": ['Ironclad', 'Whimsical'], "housesShiny": ['Fireborn', 'Overgrowth']},
    172: {"name": "Weenut", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    173: {"name": "Spriggent", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    174: {"name": "Enchantree", "houses": ['Overgrowth', 'Whimsical'], "housesShiny": ['Brawler', 'Fireborn']},
    175: {"name": "Kraba", "houses": ['Atlantian', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    176: {"name": "Krabaghast", "houses": ['Atlantian', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    177: {"name": "Krabaghoul", "houses": ['Atlantian', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    178: {"name": "Dootle", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Atlantian', 'Overgrowth']},
    179: {"name": "Dingdung", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Atlantian', 'Overgrowth']},
    180: {"name": "Astrobug", "houses": ['Brawler', 'Fireborn'], "housesShiny": ['Atlantian', 'Overgrowth']},
    181: {"name": "Cawful", "houses": ['Nightwatch'], "housesShiny": ['Overgrowth']},
    182: {"name": "Cultcrow", "houses": ['Fireborn', 'Nightwatch'], "housesShiny": ['Ironclad', 'Overgrowth']},
    183: {"name": "Covencrow", "houses": ['Fireborn', 'Nightwatch'], "housesShiny": ['Ironclad', 'Overgrowth']},
    184: {"name": "Goopy", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Dragoon', 'Ironclad']},
    185: {"name": "Mitomoeba", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Dragoon', 'Ironclad']},
    186: {"name": "Protoslime", "houses": ['Atlantian', 'Overgrowth'], "housesShiny": ['Dragoon', 'Ironclad']},
    187: {"name": "Mimlick", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    188: {"name": "Fortresst", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    189: {"name": "Ghoulgalion", "houses": ['Ironclad', 'Nightwatch'], "housesShiny": ['Atlantian', 'Whimsical']},
    190: {"name": "Fluffin", "houses": ['Mystic'], "housesShiny": ['Nightwatch']},
    191: {"name": "Owlsage", "houses": ['Brawler', 'Mystic'], "housesShiny": ['Dragoon', 'Nightwatch']},
    192: {"name": "Arcanowl", "houses": ['Brawler', 'Mystic'], "housesShiny": ['Dragoon', 'Nightwatch']},
    193: {"name": "Snoosnail", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Atlantian', 'Ironclad']},
    194: {"name": "Magmolten", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Atlantian', 'Ironclad']},
    195: {"name": "Warloctopus", "houses": ['Fireborn', 'Ironclad'], "housesShiny": ['Atlantian', 'Ironclad']},
    196: {"name": "Jellyzip", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Fireborn', 'Ironclad']},
    197: {"name": "Jellyzap", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Fireborn', 'Ironclad']},
    198: {"name": "Jellystorm", "houses": ['Atlantian', 'Whimsical'], "housesShiny": ['Fireborn', 'Ironclad']},
    199: {"name": "Rohoot", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Mystic']},
    200: {"name": "Rohawk", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Mystic']},
    201: {"name": "Griffiron", "houses": ['Brawler', 'Ironclad'], "housesShiny": ['Dragoon', 'Mystic']},
    202: {"name": "Elixapot", "houses": ['Dragoon', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    203: {"name": "Elixabrew", "houses": ['Dragoon', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    204: {"name": "Elixadon", "houses": ['Dragoon', 'Nightwatch'], "housesShiny": ['Fireborn', 'Whimsical']},
    205: {"name": "Meowmau", "houses": ['Whimsical'], "housesShiny": ['Nightwatch']},
    206: {"name": "Bastcat", "houses": ['Brawler', 'Whimsical'], "housesShiny": ['Fireborn', 'Nightwatch']},
    207: {"name": "Cleocatra", "houses": ['Brawler', 'Whimsical'], "housesShiny": ['Fireborn', 'Nightwatch']},
    208: {"name": "Millapod", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Fireborn', 'Nightwatch']},
    209: {"name": "Centascale", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Fireborn', 'Nightwatch']},
    210: {"name": "Dragapede", "houses": ['Dragoon', 'Overgrowth'], "housesShiny": ['Fireborn', 'Nightwatch']},
    211: {"name": "Kiplet", "houses": ['Atlantian'], "housesShiny": ['Brawler']},
    212: {"name": "Kippurr", "houses": ['Atlantian', 'Mystic'], "housesShiny": ['Ironclad', 'Brawler']},
    213: {"name": "Kippycat", "houses": ['Atlantian', 'Mystic'], "housesShiny": ['Ironclad', 'Brawler']},
    214: {"name": "Toatoad", "houses": ['Fireborn', 'Whimsical'], "housesShiny": ['Atlantian', 'Overgrowth']},
    215: {"name": "Toadjinn", "houses": ['Fireborn', 'Whimsical'], "housesShiny": ['Atlantian', 'Overgrowth']},
    216: {"name": "Explotoad", "houses": ['Fireborn', 'Whimsical'], "housesShiny": ['Atlantian', 'Overgrowth']},
}


# ---------------------------------------------------------------------------
# Parsing: growth-row files (moves & passives)
# ---------------------------------------------------------------------------

def parse_growth_text(text):
    """Extract (moves, passives) lists from one growth-row export's text."""
    moves = []
    passives = []
    current_block = None

    block_re = re.compile(
        r'^\s*\d+\s+(GrowthMoveRow|GrowthPassiveRow|GrowthStatRow|GrowthStartRow)\s+\w+'
    )
    kv_re = re.compile(r'^\s*\d+\s+string\s+(\w+)\s*=\s*"([^"]*)"')

    for line in text.splitlines():
        block_match = block_re.match(line)
        if block_match:
            current_block = block_match.group(1)
            continue

        kv_match = kv_re.match(line)
        if not kv_match:
            continue
        field, value = kv_match.group(1), kv_match.group(2)
        if not value:
            continue

        if current_block == "GrowthStartRow":
            if field == "startingMove":
                moves.append(value)
            elif field in ("commonPassive", "rarePassive"):
                passives.append(value)
        elif current_block == "GrowthMoveRow":
            moves.append(value)
        elif current_block == "GrowthPassiveRow":
            passives.append(value)

    return moves, passives


# ---------------------------------------------------------------------------
# Parsing: base-info files (stats, houses, name, id)
# ---------------------------------------------------------------------------

def _extract_from(text, start_marker, end_marker=None):
    start_idx = text.index(start_marker)
    if end_marker:
        end_idx = text.index(end_marker, start_idx)
        return text[start_idx:end_idx]
    return text[start_idx:]


def extract_pathid_from_filename(filename):
    """Growth-row export filenames end in the asset's own path ID, e.g.
    '...assets-12154.txt' -> 12154. This is how we match a base-info mon's
    growthForm/growthFormShiny pointer to the actual growth-row file."""
    m = re.search(r'(\d+)(?=\.\w+$)', filename)
    return int(m.group(1)) if m else None


def parse_base_info_text(text):
    """Extract a dict of base-info fields from one base-info export's text."""

    def find_int(field_name, default=0):
        m = re.search(rf'^\s0 int {field_name} = (-?\d+)', text, re.MULTILINE)
        return int(m.group(1)) if m else default

    def find_string(field_name, default=""):
        m = re.search(rf'^\s1 string {field_name} = "([^"]*)"', text, re.MULTILINE)
        return m.group(1) if m else default

    mon_id = find_int("id")
    mon_name = find_string("monName")
    evolution_stage = find_int("evolutionStage")
    mon_line_name = find_string("monLineName")

    base_hp = find_int("baseHP")
    base_atk = find_int("baseATK")
    base_mag = find_int("baseMAG")
    base_def = find_int("baseDEF")
    base_res = find_int("baseRES")
    base_spd = find_int("baseSPD")

    # houses / housesShiny come as a nested "vector" block of int indices.
    try:
        houses_section = _extract_from(text, "vector houses\n", "vector housesShiny")
        house_ids = [int(n) for n in re.findall(r'int data = (\d+)', houses_section)]
    except ValueError:
        house_ids = []

    try:
        housesShiny_section = _extract_from(text, "vector housesShiny", "int baseHP")
        houseShiny_ids = [int(n) for n in re.findall(r'int data = (\d+)', housesShiny_section)]
    except ValueError:
        houseShiny_ids = []

    def names_for(ids):
        out = []
        for i in ids:
            out.append(HOUSE_NAMES[i] if 0 <= i < len(HOUSE_NAMES) else f"Unknown({i})")
        return out

    # growthForm / growthFormShiny pointers -- these m_PathID values are how
    # we identify exactly which growth-row file belongs to this mon.
    growth_form_pathid = None
    growth_form_shiny_pathid = None
    try:
        gf_section = _extract_from(text, "growthForm\n", "growthFormShiny")
        m = re.search(r'SInt64 m_PathID = (\d+)', gf_section)
        growth_form_pathid = int(m.group(1)) if m else None
    except ValueError:
        pass
    try:
        gfs_section = _extract_from(text, "growthFormShiny")
        m = re.search(r'SInt64 m_PathID = (\d+)', gfs_section)
        growth_form_shiny_pathid = int(m.group(1)) if m else None
    except ValueError:
        pass

    return {
        "id": mon_id,
        "monName": mon_name,
        "evolutionStage": evolution_stage,
        "monLineName": mon_line_name,
        "stats": {
            "hp": base_hp, "atk": base_atk, "mag": base_mag,
            "def": base_def, "res": base_res, "spd": base_spd,
        },
        "houses": names_for(house_ids),
        "housesShiny": names_for(houseShiny_ids),
        "growthFormPathId": growth_form_pathid,
        "growthFormShinyPathId": growth_form_shiny_pathid,
    }


# ---------------------------------------------------------------------------
# File type detection
# ---------------------------------------------------------------------------

def detect_file_type(text):
    if "GrowthMoveRow" in text or "GrowthStartRow" in text or "GrowthPassiveRow" in text:
        return "growth"
    if "monName" in text and "baseHP" in text:
        return "base"
    if re.search(r'\bmoves\s*:\s*\[', text) and re.search(r'\bpassives\s*:\s*\[', text):
        return "compiled"
    return "unknown"


def clean_compiled_monData_text(text):
    """
    Given already-built monData JS text (one or more entries, in any
    formatting), dedupe every `moves: [...]` and `passives: [...]` array
    in place -- order-preserving, first occurrence wins -- without
    touching houses, stats, sprite paths, or anything else.
    """

    def split_array_items(raw_items):
        # raw_items is the text between [ and ], e.g.: "A", "B", "C"
        return re.findall(r'"([^"]*)"', raw_items)

    def dedupe_array_match(match):
        key = match.group(1)          # "moves" or "passives"
        raw_items = match.group(2)    # contents between [ ]
        items = split_array_items(raw_items)
        deduped = dedupe(items)
        return f'{key}: [' + ", ".join(f'"{i}"' for i in deduped) + ']'

    pattern = re.compile(r'\b(moves|passives)\s*:\s*\[([^\]]*)\]')
    return pattern.sub(dedupe_array_match, text)


# ---------------------------------------------------------------------------
# Output building
# ---------------------------------------------------------------------------

def dedupe(items):
    seen = set()
    out = []
    for item in items:
        if item not in seen:
            seen.add(item)
            out.append(item)
    return out


def to_js_array(items):
    return "[" + ", ".join(f'"{i}"' for i in items) + "]"


def title_case_name(raw_name):
    # "HAWKAMERE" -> "Hawkamere", "BIRB" -> "Birb"
    return raw_name.strip().title() if raw_name else raw_name


def build_entry(info, normal_moves_js, normal_passives_js, shiny_moves_js, shiny_passives_js):
    # Display/dex numbering is id+1 (1-indexed), zero-padded to 3 digits.
    dex_num = info['id'] + 1
    num = f"{dex_num:03d}"

    ref = MON_TYPE_REFERENCE.get(dex_num)
    if ref:
        # Ground-truth reference wins over the index-derived guess.
        houses = ref["houses"]
        houses_shiny = ref["housesShiny"]
        display_name = f"{num} {ref['name']}"
    else:
        houses = info["houses"]
        houses_shiny = info["housesShiny"]
        display_name = f"{num} {title_case_name(info['monName'])}"

    normal_houses_js = to_js_array(houses) if houses else "[]"
    sparkly_houses_js = to_js_array(houses_shiny) if houses_shiny else "[]"
    s = info["stats"]

    return (
        f' "{display_name}": {{ '
        f'normal: {{ houses: {normal_houses_js}, moves: {normal_moves_js}, passives: {normal_passives_js}, '
        f"stats: {{ hp: {s['hp']}, atk: {s['atk']}, mag: {s['mag']}, def: {s['def']}, res: {s['res']}, spd: {s['spd']} }}, "
        f'sprite: "assets/{num}_n.png" }}, '
        f'sparkly: {{ houses: {sparkly_houses_js}, moves: {shiny_moves_js}, passives: {shiny_passives_js}, '
        f'sprite: "assets/{num}_s.png" }} }},'
    )


def generate_output(file_texts):
    """
    file_texts: list of (filename, text)
    Growth-row files are matched to base-info mons by exact path ID: each
    base-info file's growthForm/growthFormShiny pointer names a path ID,
    and each growth-row filename ends in that same path ID (e.g.
    '...assets-12154.txt'). This means multiple unrelated mon lines can be
    uploaded together in one batch without their movepools bleeding into
    each other -- each mon only pulls its own matching growth-row file(s).
    Returns the full output string (one compact-format entry per base file).
    """
    growth_by_pathid = {}   # pathid -> raw growth text (last one wins if dup)
    base_infos = []
    compiled_texts = []
    unknown_files = []

    for filename, text in file_texts:
        ftype = detect_file_type(text)
        if ftype == "growth":
            pathid = extract_pathid_from_filename(filename)
            if pathid is not None:
                growth_by_pathid[pathid] = text
        elif ftype == "base":
            base_infos.append(parse_base_info_text(text))
        elif ftype == "compiled":
            compiled_texts.append(text)
        else:
            unknown_files.append(filename)

    lines = []
    if unknown_files:
        lines.append("// NOTE: could not identify file type for: " + ", ".join(unknown_files))

    if not base_infos and not compiled_texts:
        lines.append("// No base-info files detected — drop in files like 0_Birb / 1_Feenix / 2_Hawkamere to generate entries.")
    elif base_infos:
        base_infos.sort(key=lambda d: d["id"])
        for info in base_infos:
            normal_text = growth_by_pathid.get(info["growthFormPathId"])
            shiny_text = growth_by_pathid.get(info["growthFormShinyPathId"])

            normal_moves, normal_passives = parse_growth_text(normal_text) if normal_text else ([], [])
            shiny_moves, shiny_passives = parse_growth_text(shiny_text) if shiny_text else ([], [])
            normal_moves, normal_passives = dedupe(normal_moves), dedupe(normal_passives)
            shiny_moves, shiny_passives = dedupe(shiny_moves), dedupe(shiny_passives)

            num = f"{info['id'] + 1:03d}"
            if normal_text is None:
                lines.append(f"// NOTE: no normal growth file found for \"{num} {title_case_name(info['monName'])}\" (expected pathID {info['growthFormPathId']})")
            if shiny_text is None:
                lines.append(f"// NOTE: no shiny growth file found for \"{num} {title_case_name(info['monName'])}\" (expected pathID {info['growthFormShinyPathId']})")

            dex_num = info["id"] + 1
            ref = MON_TYPE_REFERENCE.get(dex_num)
                

            lines.append(build_entry(
                info,
                to_js_array(normal_moves), to_js_array(normal_passives),
                to_js_array(shiny_moves), to_js_array(shiny_passives),
            ))

    if compiled_texts:
        lines.append("")
        lines.append("// --- CLEANED (deduped) monData BLOCK(S) BELOW ---")
        for text in compiled_texts:
            lines.append(clean_compiled_monData_text(text).strip())

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# GUI
# ---------------------------------------------------------------------------

# Try to enable drag-and-drop; fall back gracefully if tkinterdnd2 isn't installed.
try:
    from tkinterdnd2 import DND_FILES, TkinterDnD
    _DND_AVAILABLE = True
    _BASE_TK_CLASS = TkinterDnD.Tk
except ImportError:
    _DND_AVAILABLE = False
    _BASE_TK_CLASS = tk.Tk


class MonsterDataExtractorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Monster Data Extractor")
        self.root.geometry("820x680")
        self.root.configure(bg="#f6f2e9")

        self.loaded_files = {}  # filename -> text

        self._build_widgets()

    def _build_widgets(self):
        pad = {"padx": 12, "pady": 6}

        header = tk.Label(
            self.root, text="Monster Data Extractor", font=("Courier New", 16, "bold"),
            bg="#f6f2e9", fg="#2b2620", anchor="w",
        )
        header.pack(fill="x", **pad)

        subtitle_text = (
            "Drop base-info + growth-row .txt files below (or Browse)."
            if _DND_AVAILABLE else
            "Click Browse to load base-info + growth-row .txt files "
            "(install 'tkinterdnd2' via pip for drag-and-drop)."
        )
        subtitle = tk.Label(
            self.root, text=subtitle_text, font=("Courier New", 10),
            bg="#f6f2e9", fg="#5a5248", anchor="w", justify="left",
        )
        subtitle.pack(fill="x", padx=12)

        # Drop zone / file list
        drop_frame = tk.Frame(self.root, bg="#e8dcc8", highlightbackground="#2b2620",
                               highlightthickness=2, bd=0)
        drop_frame.pack(fill="both", expand=False, **pad)

        self.file_listbox = tk.Listbox(
            drop_frame, height=6, font=("Courier New", 10),
            bg="#ffffff", fg="#2b2620", selectbackground="#9a5b3d",
        )
        self.file_listbox.pack(fill="both", expand=True, padx=8, pady=8)

        if _DND_AVAILABLE:
            drop_frame.drop_target_register(DND_FILES)
            drop_frame.dnd_bind("<<Drop>>", self._on_drop)
            self.file_listbox.drop_target_register(DND_FILES)
            self.file_listbox.dnd_bind("<<Drop>>", self._on_drop)

        # Buttons row
        btn_frame = tk.Frame(self.root, bg="#f6f2e9")
        btn_frame.pack(fill="x", **pad)

        browse_btn = tk.Button(
            btn_frame, text="Browse Files...", font=("Courier New", 10, "bold"),
            command=self._browse_files, bg="#9a5b3d", fg="#ffffff",
            activebackground="#7d4830", relief="flat", padx=12, pady=6,
        )
        browse_btn.pack(side="left")

        clear_btn = tk.Button(
            btn_frame, text="Clear Files", font=("Courier New", 10),
            command=self._clear_files, bg="#ffffff", fg="#2b2620",
            relief="flat", padx=12, pady=6, highlightbackground="#2b2620",
            highlightthickness=1,
        )
        clear_btn.pack(side="left", padx=8)

        generate_btn = tk.Button(
            btn_frame, text="Generate monData", font=("Courier New", 10, "bold"),
            command=self._generate, bg="#2b2620", fg="#ffffff",
            activebackground="#443c30", relief="flat", padx=12, pady=6,
        )
        generate_btn.pack(side="right")

        self.status_label = tk.Label(
            self.root, text="", font=("Courier New", 9), bg="#f6f2e9", fg="#5a5248", anchor="w",
        )
        self.status_label.pack(fill="x", padx=12)

        # Output
        output_header = tk.Frame(self.root, bg="#f6f2e9")
        output_header.pack(fill="x", padx=12, pady=(10, 0))
        tk.Label(
            output_header, text="OUTPUT", font=("Courier New", 10, "bold"),
            bg="#f6f2e9", fg="#2b2620",
        ).pack(side="left")
        copy_btn = tk.Button(
            output_header, text="Copy", font=("Courier New", 9),
            command=self._copy_output, bg="#ffffff", fg="#2b2620",
            relief="flat", padx=10, pady=3, highlightbackground="#2b2620",
            highlightthickness=1,
        )
        copy_btn.pack(side="right")

        self.output_box = scrolledtext.ScrolledText(
            self.root, font=("Courier New", 10), bg="#ffffff", fg="#2b2620",
            wrap="none", height=20,
        )
        self.output_box.pack(fill="both", expand=True, padx=12, pady=8)

    # -- file loading -----------------------------------------------------

    def _add_file(self, path):
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                text = f.read()
        except Exception as e:
            messagebox.showerror("Error reading file", f"{path}\n\n{e}")
            return
        ftype = detect_file_type(text)
        self.loaded_files[path] = text
        label = f"[{ftype}]  {path.split('/')[-1].split(chr(92))[-1]}"
        self.file_listbox.insert("end", label)

    def _browse_files(self):
        paths = filedialog.askopenfilenames(
            title="Select growth-row and/or base-info .txt files",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
        )
        for p in paths:
            if p not in self.loaded_files:
                self._add_file(p)
        self.status_label.config(text=f"{len(self.loaded_files)} file(s) loaded.")

    def _on_drop(self, event):
        # tkinterdnd2 wraps paths with spaces in {}; this splits correctly.
        raw = event.data
        paths = self.root.tk.splitlist(raw)
        for p in paths:
            if p not in self.loaded_files:
                self._add_file(p)
        self.status_label.config(text=f"{len(self.loaded_files)} file(s) loaded.")

    def _clear_files(self):
        self.loaded_files.clear()
        self.file_listbox.delete(0, "end")
        self.status_label.config(text="Cleared.")

    # -- generation ---------------------------------------------------------

    def _generate(self):
        if not self.loaded_files:
            self.status_label.config(text="Load at least one file first.")
            return
        file_texts = list(self.loaded_files.items())
        output = generate_output(file_texts)
        self.output_box.delete("1.0", "end")
        self.output_box.insert("1.0", output)
        self.status_label.config(text="Generated.")

    def _copy_output(self):
        content = self.output_box.get("1.0", "end").strip()
        if not content:
            return
        self.root.clipboard_clear()
        self.root.clipboard_append(content)
        self.status_label.config(text="Copied to clipboard.")


def main():
    root = _BASE_TK_CLASS()
    app = MonsterDataExtractorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()