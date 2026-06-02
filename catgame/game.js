// ============================================================
// KITTY KINGDOMS — game.js
// ============================================================

// ── BREED DATABASE ────────────────────────────────────────────
const CAT_BREEDS = [
// ─── COMMON (0-59) ───
{id:0,name:"Domestic Shorthair",rarity:"common",baseColor:"#C8A882",stripeType:"tabby",eyeColor:"#7AB648",bodyShape:"normal"},
{id:1,name:"Domestic Longhair",rarity:"common",baseColor:"#D4B896",stripeType:"none",eyeColor:"#4A90D9",bodyShape:"fluffy"},
{id:2,name:"Tuxedo Cat",rarity:"common",baseColor:"#2C2C2C",stripeType:"tuxedo",eyeColor:"#27AE60",bodyShape:"normal"},
{id:3,name:"Siamese",rarity:"common",baseColor:"#F5DEB3",stripeType:"colorpoint",eyeColor:"#1E90FF",bodyShape:"slim"},
{id:4,name:"Calico",rarity:"common",baseColor:"#E8C99A",stripeType:"calico",eyeColor:"#F4A460",bodyShape:"normal"},
{id:5,name:"Tabby Orange",rarity:"common",baseColor:"#E07B39",stripeType:"tabby",eyeColor:"#7AB648",bodyShape:"normal"},
{id:6,name:"Tabby Grey",rarity:"common",baseColor:"#9E9E9E",stripeType:"tabby",eyeColor:"#FFD700",bodyShape:"normal"},
{id:7,name:"Black Cat",rarity:"common",baseColor:"#1A1A1A",stripeType:"none",eyeColor:"#FFD700",bodyShape:"normal"},
{id:8,name:"White Cat",rarity:"common",baseColor:"#F5F5F5",stripeType:"none",eyeColor:"#87CEEB",bodyShape:"normal"},
{id:9,name:"Ginger Tabby",rarity:"common",baseColor:"#FF8C42",stripeType:"tabby",eyeColor:"#32CD32",bodyShape:"chubby"},
{id:10,name:"Blue Russian Mix",rarity:"common",baseColor:"#A8B8C8",stripeType:"none",eyeColor:"#3CB371",bodyShape:"slim"},
{id:11,name:"Tortoiseshell",rarity:"common",baseColor:"#8B4513",stripeType:"tortie",eyeColor:"#DAA520",bodyShape:"normal"},
{id:12,name:"Bombay",rarity:"common",baseColor:"#1C1C1C",stripeType:"none",eyeColor:"#FF6347",bodyShape:"athletic"},
{id:13,name:"Cream Shorthair",rarity:"common",baseColor:"#FAEBD7",stripeType:"none",eyeColor:"#4682B4",bodyShape:"normal"},
{id:14,name:"Silver Tabby",rarity:"common",baseColor:"#C0C0C0",stripeType:"tabby",eyeColor:"#00CED1",bodyShape:"normal"},
{id:15,name:"Brown Tabby",rarity:"common",baseColor:"#8B6914",stripeType:"tabby",eyeColor:"#8FBC8F",bodyShape:"chubby"},
{id:16,name:"Bicolor B&W",rarity:"common",baseColor:"#F5F5F5",stripeType:"bicolor",eyeColor:"#FFD700",bodyShape:"normal"},
{id:17,name:"Lilac Point",rarity:"common",baseColor:"#EDE8E4",stripeType:"colorpoint",eyeColor:"#9370DB",bodyShape:"slim"},
{id:18,name:"Flame Point",rarity:"common",baseColor:"#FFF8F0",stripeType:"flamepoint",eyeColor:"#1E90FF",bodyShape:"slim"},
{id:19,name:"Chocolate Solid",rarity:"common",baseColor:"#5C3317",stripeType:"none",eyeColor:"#DAA520",bodyShape:"normal"},
{id:20,name:"Cinnamon Tabby",rarity:"common",baseColor:"#D2691E",stripeType:"tabby",eyeColor:"#6B8E23",bodyShape:"normal"},
{id:21,name:"Fawn Solid",rarity:"common",baseColor:"#E8C8A0",stripeType:"none",eyeColor:"#DDA0DD",bodyShape:"slim"},
{id:22,name:"Blue Solid",rarity:"common",baseColor:"#7B9BB5",stripeType:"none",eyeColor:"#3CB371",bodyShape:"normal"},
{id:23,name:"Spotted Mix",rarity:"common",baseColor:"#C8A882",stripeType:"spotted",eyeColor:"#FF8C00",bodyShape:"normal"},
{id:24,name:"Mackerel Tabby",rarity:"common",baseColor:"#B8A070",stripeType:"mackerel",eyeColor:"#7AB648",bodyShape:"normal"},
{id:25,name:"Patched Tabby",rarity:"common",baseColor:"#CC8844",stripeType:"tabby",eyeColor:"#FF6347",bodyShape:"chubby"},
{id:26,name:"Van Pattern",rarity:"common",baseColor:"#FAEBD7",stripeType:"van",eyeColor:"#1E90FF",bodyShape:"normal"},
{id:27,name:"Smoke Longhair",rarity:"common",baseColor:"#6E6E6E",stripeType:"smoke",eyeColor:"#4682B4",bodyShape:"fluffy"},
{id:28,name:"Snowshoe Mix",rarity:"common",baseColor:"#E8E4E0",stripeType:"colorpoint",eyeColor:"#1E90FF",bodyShape:"normal"},
{id:29,name:"Dilute Calico",rarity:"common",baseColor:"#D4C4B0",stripeType:"dilutecalico",eyeColor:"#9370DB",bodyShape:"normal"},
{id:30,name:"Sepia Tabby",rarity:"common",baseColor:"#A0806A",stripeType:"tabby",eyeColor:"#DAA520",bodyShape:"normal"},
{id:31,name:"Red Solid",rarity:"common",baseColor:"#CC4444",stripeType:"none",eyeColor:"#FFD700",bodyShape:"athletic"},
{id:32,name:"Lavender Solid",rarity:"common",baseColor:"#B8A8C8",stripeType:"none",eyeColor:"#4682B4",bodyShape:"fluffy"},
{id:33,name:"Sand Tabby",rarity:"common",baseColor:"#D4C080",stripeType:"tabby",eyeColor:"#8FBC8F",bodyShape:"normal"},
{id:34,name:"Charcoal Mix",rarity:"common",baseColor:"#444444",stripeType:"tabby",eyeColor:"#FFD700",bodyShape:"normal"},
{id:35,name:"Apricot Solid",rarity:"common",baseColor:"#FFB07C",stripeType:"none",eyeColor:"#3CB371",bodyShape:"chubby"},
{id:36,name:"Lynx Point",rarity:"common",baseColor:"#F0E8D8",stripeType:"tabbypoint",eyeColor:"#1E90FF",bodyShape:"slim"},
{id:37,name:"Patched Tortie",rarity:"common",baseColor:"#B06040",stripeType:"tortie",eyeColor:"#8FBC8F",bodyShape:"normal"},
{id:38,name:"Pewter Solid",rarity:"common",baseColor:"#8A8A8A",stripeType:"none",eyeColor:"#DAA520",bodyShape:"athletic"},
{id:39,name:"Cream Tabby",rarity:"common",baseColor:"#F0D8B4",stripeType:"tabby",eyeColor:"#6B8E23",bodyShape:"normal"},
{id:40,name:"Classic Tabby",rarity:"common",baseColor:"#AA8855",stripeType:"classic",eyeColor:"#FF8C00",bodyShape:"normal"},
{id:41,name:"Odd-Eyed White",rarity:"common",baseColor:"#F8F8F8",stripeType:"none",eyeColor:"#4169E1",bodyShape:"normal"},
{id:42,name:"Mitted Mix",rarity:"common",baseColor:"#808080",stripeType:"mitted",eyeColor:"#1E90FF",bodyShape:"normal"},
{id:43,name:"Marble Tabby",rarity:"common",baseColor:"#9B7040",stripeType:"marbled",eyeColor:"#7AB648",bodyShape:"normal"},
{id:44,name:"Smokey Tabby",rarity:"common",baseColor:"#5A5A6A",stripeType:"tabby",eyeColor:"#9370DB",bodyShape:"fluffy"},
{id:45,name:"Chestnut Solid",rarity:"common",baseColor:"#954535",stripeType:"none",eyeColor:"#DAA520",bodyShape:"normal"},
{id:46,name:"Cameo Tabby",rarity:"common",baseColor:"#F0C8B0",stripeType:"tabby",eyeColor:"#FF69B4",bodyShape:"normal"},
{id:47,name:"Ticked Tabby",rarity:"common",baseColor:"#B89060",stripeType:"ticked",eyeColor:"#8FBC8F",bodyShape:"slim"},
{id:48,name:"Rufous Solid",rarity:"common",baseColor:"#B84820",stripeType:"none",eyeColor:"#32CD32",bodyShape:"athletic"},
{id:49,name:"Ivory Longhair",rarity:"common",baseColor:"#FFFAF0",stripeType:"none",eyeColor:"#87CEEB",bodyShape:"fluffy"},
{id:50,name:"Dusty Blue Mix",rarity:"common",baseColor:"#90A8B8",stripeType:"tabby",eyeColor:"#4682B4",bodyShape:"normal"},
{id:51,name:"Hazel Tabby",rarity:"common",baseColor:"#C4A060",stripeType:"tabby",eyeColor:"#8B4513",bodyShape:"chubby"},
{id:52,name:"Piebald Mix",rarity:"common",baseColor:"#D0C0A0",stripeType:"piebald",eyeColor:"#27AE60",bodyShape:"normal"},
{id:53,name:"Rosette Mix",rarity:"common",baseColor:"#C09050",stripeType:"rosette",eyeColor:"#E6A817",bodyShape:"athletic"},
{id:54,name:"Plum Solid",rarity:"common",baseColor:"#7B4080",stripeType:"none",eyeColor:"#DAA520",bodyShape:"normal"},
{id:55,name:"Steel Solid",rarity:"common",baseColor:"#708090",stripeType:"none",eyeColor:"#00CED1",bodyShape:"normal"},
{id:56,name:"Wheat Tabby",rarity:"common",baseColor:"#E8D090",stripeType:"tabby",eyeColor:"#FF8C00",bodyShape:"normal"},
{id:57,name:"Pumpkin Tabby",rarity:"common",baseColor:"#D96020",stripeType:"tabby",eyeColor:"#7AB648",bodyShape:"chubby"},
{id:58,name:"Misty Solid",rarity:"common",baseColor:"#B0C8D4",stripeType:"none",eyeColor:"#9370DB",bodyShape:"fluffy"},
{id:59,name:"Russet Tabby",rarity:"common",baseColor:"#8B3A3A",stripeType:"tabby",eyeColor:"#DAA520",bodyShape:"normal"},

// ─── SPECIAL (60-89) ───
{id:60,name:"Bengal",rarity:"special",baseColor:"#C8862A",stripeType:"rosette",eyeColor:"#2ECC71",bodyShape:"athletic"},
{id:61,name:"Savannah",rarity:"special",baseColor:"#D4B060",stripeType:"spotted",eyeColor:"#27AE60",bodyShape:"athletic"},
{id:62,name:"Sphynx",rarity:"special",baseColor:"#E8C4A0",stripeType:"none",eyeColor:"#E74C3C",bodyShape:"slim"},
{id:63,name:"Devon Rex",rarity:"special",baseColor:"#D0A880",stripeType:"waves",eyeColor:"#9B59B6",bodyShape:"slim"},
{id:64,name:"Scottish Fold",rarity:"special",baseColor:"#C0B090",stripeType:"tabby",eyeColor:"#F39C12",bodyShape:"chubby"},
{id:65,name:"Ragdoll",rarity:"special",baseColor:"#F5EDE0",stripeType:"colorpoint",eyeColor:"#1E90FF",bodyShape:"fluffy"},
{id:66,name:"Maine Coon",rarity:"special",baseColor:"#8B5E3C",stripeType:"mackerel",eyeColor:"#DAA520",bodyShape:"large"},
{id:67,name:"Norwegian Forest",rarity:"special",baseColor:"#A0784A",stripeType:"tabby",eyeColor:"#27AE60",bodyShape:"large"},
{id:68,name:"Birman",rarity:"special",baseColor:"#F0EAD6",stripeType:"colorpoint",eyeColor:"#1E90FF",bodyShape:"fluffy"},
{id:69,name:"Tonkinese",rarity:"special",baseColor:"#C8A870",stripeType:"none",eyeColor:"#00CED1",bodyShape:"athletic"},
{id:70,name:"Ocicat",rarity:"special",baseColor:"#C09050",stripeType:"spotted",eyeColor:"#E6A817",bodyShape:"athletic"},
{id:71,name:"Egyptian Mau",rarity:"special",baseColor:"#B8A478",stripeType:"spotted",eyeColor:"#32CD32",bodyShape:"slim"},
{id:72,name:"Abyssinian",rarity:"special",baseColor:"#C47A3A",stripeType:"ticked",eyeColor:"#27AE60",bodyShape:"slim"},
{id:73,name:"Cornish Rex",rarity:"special",baseColor:"#E0C090",stripeType:"waves",eyeColor:"#E74C3C",bodyShape:"slim"},
{id:74,name:"Burmese",rarity:"special",baseColor:"#7A4828",stripeType:"none",eyeColor:"#DAA520",bodyShape:"chubby"},
{id:75,name:"Mocha Dream",rarity:"special",baseColor:"#7B4B2A",stripeType:"marbled",eyeColor:"#D4AC0D",bodyShape:"fluffy"},
{id:76,name:"Silver Shadow",rarity:"special",baseColor:"#C0C8D0",stripeType:"tabby",eyeColor:"#4682B4",bodyShape:"normal"},
{id:77,name:"Sunset Tabby",rarity:"special",baseColor:"#E8702A",stripeType:"tabby",eyeColor:"#FF6347",bodyShape:"normal"},
{id:78,name:"Moonbeam",rarity:"special",baseColor:"#E8E4F8",stripeType:"none",eyeColor:"#9370DB",bodyShape:"fluffy"},
{id:79,name:"Ember Coat",rarity:"special",baseColor:"#CC4422",stripeType:"flame",eyeColor:"#FF6347",bodyShape:"athletic"},
{id:80,name:"Midnight Blue",rarity:"special",baseColor:"#2C3E6A",stripeType:"none",eyeColor:"#FFD700",bodyShape:"normal"},
{id:81,name:"Candy Stripe",rarity:"special",baseColor:"#F8A0C0",stripeType:"tabby",eyeColor:"#FF69B4",bodyShape:"slim"},
{id:82,name:"Jade Coat",rarity:"special",baseColor:"#5A9A70",stripeType:"none",eyeColor:"#2ECC71",bodyShape:"normal"},
{id:83,name:"Caramel Swirl",rarity:"special",baseColor:"#C48048",stripeType:"marbled",eyeColor:"#8B4513",bodyShape:"chubby"},
{id:84,name:"Arctic Fox Cat",rarity:"special",baseColor:"#ECF0F1",stripeType:"none",eyeColor:"#1E90FF",bodyShape:"fluffy"},
{id:85,name:"Copper Glow",rarity:"special",baseColor:"#B85A20",stripeType:"none",eyeColor:"#DAA520",bodyShape:"athletic"},
{id:86,name:"Violet Mist",rarity:"special",baseColor:"#9B7AB5",stripeType:"none",eyeColor:"#9370DB",bodyShape:"fluffy"},
{id:87,name:"Seafoam",rarity:"special",baseColor:"#78C8B8",stripeType:"none",eyeColor:"#1ABC9C",bodyShape:"slim"},
{id:88,name:"Golden Lace",rarity:"special",baseColor:"#D4A836",stripeType:"spotted",eyeColor:"#E6A817",bodyShape:"normal"},
{id:89,name:"Rose Petal",rarity:"special",baseColor:"#E8A8B8",stripeType:"none",eyeColor:"#FF69B4",bodyShape:"fluffy"},

// ─── RARE (90-109) ───
{id:90,name:"Opal Specter",rarity:"rare",baseColor:"#B8D0E0",stripeType:"aurora",eyeColor:"#9370DB",bodyShape:"ethereal"},
{id:91,name:"Storm Chaser",rarity:"rare",baseColor:"#6080A0",stripeType:"lightning",eyeColor:"#00CED1",bodyShape:"athletic"},
{id:92,name:"Ember Fox",rarity:"rare",baseColor:"#CC4422",stripeType:"flame",eyeColor:"#FF6347",bodyShape:"athletic"},
{id:93,name:"Crystal Veil",rarity:"rare",baseColor:"#D0E8F0",stripeType:"iridescent",eyeColor:"#87CEEB",bodyShape:"slim"},
{id:94,name:"Midnight Phantom",rarity:"rare",baseColor:"#18182A",stripeType:"galaxy",eyeColor:"#9370DB",bodyShape:"ethereal"},
{id:95,name:"Gilded Mane",rarity:"rare",baseColor:"#D4A836",stripeType:"marbled",eyeColor:"#FFD700",bodyShape:"large"},
{id:96,name:"Shadow Lynx",rarity:"rare",baseColor:"#303040",stripeType:"mackerel",eyeColor:"#00CED1",bodyShape:"slim"},
{id:97,name:"Pearl Drift",rarity:"rare",baseColor:"#F0EDF8",stripeType:"iridescent",eyeColor:"#FF69B4",bodyShape:"fluffy"},
{id:98,name:"Crimson Tide",rarity:"rare",baseColor:"#8B0000",stripeType:"marbled",eyeColor:"#E74C3C",bodyShape:"large"},
{id:99,name:"Azure Spirit",rarity:"rare",baseColor:"#2060C0",stripeType:"none",eyeColor:"#00CED1",bodyShape:"ethereal"},
{id:100,name:"Nebula Weave",rarity:"rare",baseColor:"#483D70",stripeType:"galaxy",eyeColor:"#9370DB",bodyShape:"normal"},
{id:101,name:"Jade Empress",rarity:"rare",baseColor:"#2E8B57",stripeType:"none",eyeColor:"#00FF7F",bodyShape:"fluffy"},
{id:102,name:"Frost Wraith",rarity:"rare",baseColor:"#D0E8F8",stripeType:"aurora",eyeColor:"#87CEEB",bodyShape:"ethereal"},
{id:103,name:"Solar Flare",rarity:"rare",baseColor:"#FF8C00",stripeType:"flame",eyeColor:"#FFD700",bodyShape:"athletic"},
{id:104,name:"Amethyst Dusk",rarity:"rare",baseColor:"#7B4CA0",stripeType:"none",eyeColor:"#9370DB",bodyShape:"fluffy"},
{id:105,name:"Iron Sentinel",rarity:"rare",baseColor:"#5A5A70",stripeType:"mackerel",eyeColor:"#C0C0C0",bodyShape:"large"},
{id:106,name:"Sakura Veil",rarity:"rare",baseColor:"#F8D0DC",stripeType:"none",eyeColor:"#FF69B4",bodyShape:"fluffy"},
{id:107,name:"Void Seeker",rarity:"rare",baseColor:"#101020",stripeType:"galaxy",eyeColor:"#9370DB",bodyShape:"slim"},
{id:108,name:"Copper Sage",rarity:"rare",baseColor:"#A05830",stripeType:"spotted",eyeColor:"#8B4513",bodyShape:"normal"},
{id:109,name:"Typhoon",rarity:"rare",baseColor:"#2C4870",stripeType:"lightning",eyeColor:"#00CED1",bodyShape:"athletic"},

// ─── ULTRA RARE (110-119) ───
{id:110,name:"Galaxy Whisper",rarity:"ultra",baseColor:"#1A0A2A",stripeType:"galaxy",eyeColor:"#9370DB",bodyShape:"ethereal"},
{id:111,name:"Phoenix Crest",rarity:"ultra",baseColor:"#CC2200",stripeType:"flame",eyeColor:"#FF4500",bodyShape:"large"},
{id:112,name:"Aurora Mane",rarity:"ultra",baseColor:"#102030",stripeType:"aurora",eyeColor:"#00FF7F",bodyShape:"large"},
{id:113,name:"Celestial Lord",rarity:"ultra",baseColor:"#0A0A20",stripeType:"galaxy",eyeColor:"#FFD700",bodyShape:"large"},
{id:114,name:"Diamond Wraith",rarity:"ultra",baseColor:"#E8F0F8",stripeType:"iridescent",eyeColor:"#87CEEB",bodyShape:"ethereal"},
{id:115,name:"Obsidian Oracle",rarity:"ultra",baseColor:"#0A0A0A",stripeType:"none",eyeColor:"#9370DB",bodyShape:"ethereal"},
{id:116,name:"Sunforge Elder",rarity:"ultra",baseColor:"#8B5000",stripeType:"flame",eyeColor:"#FFD700",bodyShape:"large"},
{id:117,name:"Abyssal Tide",rarity:"ultra",baseColor:"#041828",stripeType:"galaxy",eyeColor:"#00CED1",bodyShape:"ethereal"},
{id:118,name:"Prism Sovereign",rarity:"ultra",baseColor:"#F0E8FF",stripeType:"iridescent",eyeColor:"#FF69B4",bodyShape:"large"},
{id:119,name:"Void Walker",rarity:"ultra",baseColor:"#000008",stripeType:"lightning",eyeColor:"#9370DB",bodyShape:"ethereal"},
];

// ── CUSTOMIZATION ARRAYS ──────────────────────────────────────
const BODY_COLORS=["#C8A882","#F5DEB3","#2C2C2C","#F5F5F5","#1A1A1A","#E07B39","#9E9E9E","#FF8C42","#A8B8C8","#8B4513","#7B9BB5","#D4B060","#C8862A","#E8C99A","#F0EAD6","#B8A478","#E0C090","#F8A0C0","#78C8B8","#5A9A70","#9B7AB5","#D0E8F0","#B8D0E0","#E8D090","#C47A3A"];
const EYE_COLORS=["#7AB648","#1E90FF","#FFD700","#32CD32","#9370DB","#FF6347","#DAA520","#4682B4","#FF69B4","#00CED1","#87CEEB","#E74C3C","#2ECC71","#F39C12","#C0C0C0"];
const STRIPE_OPTIONS=["none","tabby","mackerel","classic","spotted","marbled","ticked","colorpoint","flame","aurora","galaxy","lightning","iridescent","rosette","tortie","waves"];
const HATS=[
{id:"none",icon:"🚫",name:"None"},{id:"tophat",icon:"🎩",name:"Top Hat"},{id:"crown",icon:"👑",name:"Crown"},
{id:"witch",icon:"🧙",name:"Witch Hat"},{id:"cap",icon:"🧢",name:"Cap"},{id:"bow",icon:"🎀",name:"Bow"},
{id:"party",icon:"🎉",name:"Party Hat"},{id:"santa",icon:"🎅",name:"Santa Hat"},{id:"chef",icon:"👨‍🍳",name:"Chef Hat"},
{id:"cowboy",icon:"🤠",name:"Cowboy"},{id:"viking",icon:"⚔️",name:"Viking"},{id:"wizard",icon:"🪄",name:"Wizard"},
{id:"flower",icon:"🌸",name:"Flower Crown"},{id:"beanie",icon:"🌊",name:"Beanie"},{id:"halo",icon:"😇",name:"Halo"},
{id:"horns",icon:"😈",name:"Horns"},{id:"headphones",icon:"🎧",name:"Headphones"},{id:"glasses",icon:"🕶️",name:"Shades"},
{id:"tiara",icon:"💎",name:"Tiara"},{id:"pirate",icon:"🏴‍☠️",name:"Pirate"}
];
const OUTFITS=[
{id:"none",icon:"🚫",name:"None"},{id:"sweater",icon:"🧥",name:"Sweater"},{id:"tux",icon:"🤵",name:"Tuxedo"},
{id:"princess",icon:"👸",name:"Princess"},{id:"knight",icon:"⚔️",name:"Knight"},{id:"astronaut",icon:"🚀",name:"Astronaut"},
{id:"ninja",icon:"🥷",name:"Ninja"},{id:"vampire",icon:"🧛",name:"Vampire"},{id:"angel",icon:"😇",name:"Angel"},
{id:"pirate",icon:"🏴‍☠️",name:"Pirate"},{id:"doctor",icon:"👨‍⚕️",name:"Doctor"},{id:"chef",icon:"👨‍🍳",name:"Chef"},
{id:"disco",icon:"🕺",name:"Disco"},{id:"superhero",icon:"🦸",name:"Superhero"},{id:"wizard",icon:"🧙",name:"Wizard"},
{id:"bunny",icon:"🐰",name:"Bunny Suit"},{id:"pumpkin",icon:"🎃",name:"Pumpkin"},{id:"elf",icon:"🧝",name:"Elf"},
{id:"maid",icon:"🎀",name:"Maid"},{id:"samurai",icon:"🗡️",name:"Samurai"}
];
const ACCESSORIES=[
{id:"none",icon:"🚫",name:"None"},{id:"necklace",icon:"📿",name:"Necklace"},{id:"ribbon",icon:"🎀",name:"Ribbon"},
{id:"monocle",icon:"🧐",name:"Monocle"},{id:"bowtie",icon:"🎗️",name:"Bow Tie"},{id:"scarf",icon:"🧣",name:"Scarf"},
{id:"wings",icon:"🦋",name:"Fairy Wings"},{id:"cape",icon:"🦸",name:"Cape"},{id:"badge",icon:"🏅",name:"Badge"},
{id:"bracelet",icon:"💎",name:"Bracelet"},{id:"tail_bow",icon:"🌸",name:"Tail Bow"},
{id:"earring",icon:"💎",name:"Earring"},{id:"star",icon:"⭐",name:"Star Wand"},{id:"mask",icon:"🎭",name:"Mask"},
{id:"lantern",icon:"🏮",name:"Lantern"}
];
const SHOP_ITEMS=[
{id:"food5",icon:"🍣",name:"5 Fish Meals",desc:"Restore 5 hunger",price:30,action:()=>{G.food+=5;showToast("🍣 +5 food!");}},
{id:"food15",icon:"🎣",name:"15 Fish Meals",desc:"Great value pack!",price:80,action:()=>{G.food+=15;showToast("🍣 +15 food!");}},
{id:"treat",icon:"🍬",name:"Happiness Treat",desc:"+20 happiness",price:25,action:()=>{if(G.myCats.length){let c=G.myCats[0];c.happiness=Math.min(100,c.happiness+20);buildCatteryGrid();showToast("😺 Happy cat!");}else showToast("No cats yet!");}},
{id:"meds3",icon:"💊",name:"3 Medicines",desc:"Heal sick cats",price:40,action:()=>{G.meds+=3;showToast("💊 +3 meds!");}},
{id:"meds10",icon:"🏥",name:"10 Medicines",desc:"Big med pack",price:110,action:()=>{G.meds+=10;showToast("💊 +10 meds!");}},
{id:"toy",icon:"🧶",name:"Toy Bundle",desc:"+30 energy to all",price:50,action:()=>{G.myCats.forEach(c=>c.energy=Math.min(100,c.energy+30));buildCatteryGrid();showToast("🧶 Cats energized!");}},
{id:"groom",icon:"✂️",name:"Grooming Kit",desc:"+25 happiness all",price:60,action:()=>{G.myCats.forEach(c=>c.happiness=Math.min(100,c.happiness+25));buildCatteryGrid();showToast("✨ All groomed!");}},
{id:"catnip",icon:"🌿",name:"Catnip Pouch",desc:"Max happiness 1 cat",price:35,action:()=>{if(G.myCats.length){G.myCats[0].happiness=100;buildCatteryGrid();showToast("🌿 Catnip frenzy!");}else showToast("No cats!");}},
{id:"superfood",icon:"⭐",name:"Super Food",desc:"Max hunger 1 cat",price:40,action:()=>{if(G.myCats.length){G.myCats[0].hunger=100;buildCatteryGrid();showToast("⭐ Well fed!");}else showToast("No cats!");}},
{id:"vitamins",icon:"💉",name:"Vitamins",desc:"+20 health all",price:75,action:()=>{G.myCats.forEach(c=>c.health=Math.min(100,c.health+20));buildCatteryGrid();showToast("💉 Healthy cats!");}},
{id:"food30",icon:"🐟",name:"30 Fish Feast",desc:"Premium pack",price:150,action:()=>{G.food+=30;showToast("🐟 +30 food!");}},
{id:"golden",icon:"🌟",name:"Golden Meal",desc:"Max all stats! (1 cat)",price:200,action:()=>{if(G.myCats.length){let c=G.myCats[0];c.hunger=c.happiness=c.health=c.energy=100;buildCatteryGrid();showToast("🌟 Perfect cat!");}else showToast("No cats!");}},
];
const VET_CONDITIONS=["Hairball","Sneezes","Tired Paws","Sad Mood","Tummy Ache","Dizzy Spell","Scraped Ear","Sore Paw"];
const KITTEN_NAMES=["Mochi","Luna","Mango","Bubbles","Cleo","Oreo","Pepper","Maple","Sushi","Pumpkin","Biscuit","Mittens","Noodle","Wasabi","Cosmo","Pixel","Ziggy","Cheddar","Pebble","Latte","Marshmallow","Pickles","Tater","Pretzel","Caramel","Muffin","Jellybean","Snicker","Pudding","Velvet","Starlight","Cobalt","Fable","Echo","Storm","Frost","Blaze","Shadow","Twix","Kit Kat"];
let _nameIdx=0;
function randomKittenName(){let n=KITTEN_NAMES[_nameIdx%KITTEN_NAMES.length];_nameIdx++;return n;}

// ── GAME STATE ────────────────────────────────────────────────
let G={
  coins:500,food:20,meds:5,day:1,
  myCats:[],activeWorld:"cafe",
  customizingCat:null,breedSlotA:null,breedSlotB:null,
  breedSelectTarget:null,pendingOffspring:null,
  selectedFilter:"all",time:0,particles:[],vetCases:[],
  worldCatsInScene:[]
};

// ── COLOR UTILITIES ───────────────────────────────────────────
function hexToRgb(h){const r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return{r,g,b};}
function rgbToHex(r,g,b){return"#"+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");}
function adjustColor(hex,amount,pinkTint=0){const c=hexToRgb(hex);return rgbToHex(c.r+amount+pinkTint*0.3,c.g+amount,c.b+amount+pinkTint*0.5);}
function mixColors(h1,h2,t=0.5){const a=hexToRgb(h1),b=hexToRgb(h2);return rgbToHex(a.r+(b.r-a.r)*t,a.g+(b.g-a.g)*t,a.b+(b.b-a.b)*t);}

// ── CAT DRAWING ENGINE ────────────────────────────────────────
function drawCat(ctx,cat,x,y,size,animated=false){
  const t=animated?Date.now()/700:0;
  const bob=animated?Math.sin(t)*2.5:0;
  const phase=cat._phase||0;
  const col=cat.customColor||cat.baseColor||"#C8A882";
  const eye=cat.customEyeColor||cat.eyeColor||"#7AB648";
  const stripe=cat.customStripe||cat.stripeType||"none";
  const shape=cat.bodyShape||"normal";

  // size multipliers
  const SM={normal:1,fluffy:1.1,large:1.3,slim:0.85,tiny:0.6,chubby:1.15,athletic:0.95,ethereal:1.0};
  const sm=SM[shape]||1;
  const bw=size*0.65*sm, bh=size*0.45*sm;
  const bx=x, by=y+bob;
  const headR=size*0.32*sm;
  const hx=bx, hy=by-bh*0.35-headR*0.7;

  ctx.save();

  // fluffy glow
  if(shape==="fluffy"||shape==="ethereal"){
    ctx.save();
    const g2=ctx.createRadialGradient(bx,by,bh*0.3,bx,by,bh*1.1);
    g2.addColorStop(0,col+"44");g2.addColorStop(1,"transparent");
    ctx.fillStyle=g2;ctx.beginPath();ctx.ellipse(bx,by,bw*1.3,bh*1.4,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }

  // body
  ctx.beginPath();ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2);
  const bg=ctx.createRadialGradient(bx-bw*0.2,by-bh*0.2,bh*0.1,bx,by,bh*1.1);
  bg.addColorStop(0,adjustColor(col,30));bg.addColorStop(1,adjustColor(col,-20));
  ctx.fillStyle=bg;ctx.fill();
  drawBodyPattern(ctx,col,stripe,bw,bh,size,bx,by);
  ctx.strokeStyle=adjustColor(col,-40);ctx.lineWidth=size*0.018;ctx.stroke();

  // tail
  ctx.beginPath();ctx.moveTo(bx+bw*0.85,by+bh*0.2);
  ctx.bezierCurveTo(bx+bw*1.5,by-bh*0.4,bx+bw*1.7,by-bh*1.0,bx+bw*1.1,by-bh*1.1);
  ctx.strokeStyle=adjustColor(col,-20);ctx.lineWidth=size*0.07*sm;ctx.lineCap="round";ctx.stroke();

  // legs
  const legY=by+bh*0.8, legLen=size*0.22;
  [[-0.45,-0.15,0.15,0.45]].flat().forEach((ox,i)=>{
    const lx=bx+bw*ox;
    ctx.beginPath();ctx.moveTo(lx,by+bh*0.75);ctx.lineTo(lx,legY+legLen);
    ctx.strokeStyle=adjustColor(col,-30);ctx.lineWidth=size*0.07*sm;ctx.stroke();
    ctx.beginPath();ctx.moveTo(lx-size*0.07,legY+legLen);ctx.lineTo(lx+size*0.07,legY+legLen);
    ctx.strokeStyle=adjustColor(col,-30);ctx.lineWidth=size*0.04;ctx.stroke();
  });

  // head
  ctx.beginPath();ctx.arc(hx,hy,headR,0,Math.PI*2);
  const hg=ctx.createRadialGradient(hx-headR*0.25,hy-headR*0.25,headR*0.1,hx,hy,headR);
  hg.addColorStop(0,adjustColor(col,25));hg.addColorStop(1,adjustColor(col,-15));
  ctx.fillStyle=hg;ctx.fill();
  drawBodyPattern(ctx,col,stripe,headR*0.9,headR*0.9,size*0.6,hx,hy);
  ctx.strokeStyle=adjustColor(col,-40);ctx.lineWidth=size*0.018;ctx.stroke();

  // ears
  const earW=headR*0.45,earH=headR*0.6;
  [[-1,1]].flat().forEach(side=>{
    const ex=hx+side*headR*0.55,ey=hy-headR*0.65;
    ctx.beginPath();
    ctx.moveTo(ex,ey+earH*0.1);
    ctx.lineTo(ex+side*earW,ey-earH);
    ctx.lineTo(ex+side*earW*0.1,ey-earH*0.05);
    ctx.closePath();
    ctx.fillStyle=adjustColor(col,-10);ctx.fill();
    ctx.strokeStyle=adjustColor(col,-50);ctx.lineWidth=size*0.015;ctx.stroke();
    // inner ear
    ctx.beginPath();
    ctx.moveTo(ex+side*earW*0.15,ey+earH*0.0);
    ctx.lineTo(ex+side*earW*0.85,ey-earH*0.75);
    ctx.lineTo(ex+side*earW*0.25,ey-earH*0.1);
    ctx.closePath();
    ctx.fillStyle=adjustColor(col,15,50);ctx.fill();
  });

  // eyes
  [[-0.32,0.32]].flat().forEach(ox=>{
    const ex2=hx+headR*ox,ey2=hy-headR*0.05;
    const ew=headR*0.22,eh=headR*0.2;
    // white
    ctx.beginPath();ctx.ellipse(ex2,ey2,ew,eh,0,0,Math.PI*2);
    ctx.fillStyle="white";ctx.fill();
    // iris
    ctx.beginPath();ctx.ellipse(ex2,ey2,ew*0.72,eh*0.85,0,0,Math.PI*2);
    ctx.fillStyle=eye;ctx.fill();
    // pupil
    ctx.beginPath();ctx.ellipse(ex2,ey2,ew*0.32,eh*0.55,0,0,Math.PI*2);
    ctx.fillStyle="#111";ctx.fill();
    // shine
    ctx.beginPath();ctx.arc(ex2-ew*0.18,ey2-eh*0.22,ew*0.15,0,Math.PI*2);
    ctx.fillStyle="rgba(255,255,255,0.85)";ctx.fill();
  });

  // heart nose
  const nx=hx,ny=hy+headR*0.28,ns=headR*0.12;
  ctx.beginPath();
  ctx.moveTo(nx,ny+ns*0.5);
  ctx.bezierCurveTo(nx-ns*1.2,ny-ns*0.5,nx-ns*2,ny+ns*0.5,nx,ny+ns*1.5);
  ctx.bezierCurveTo(nx+ns*2,ny+ns*0.5,nx+ns*1.2,ny-ns*0.5,nx,ny+ns*0.5);
  ctx.fillStyle="#FF6B9D";ctx.fill();

  // whiskers
  const wy=ny+ns*0.3;
  for(let i=-1;i<=1;i+=2){
    for(let j=0;j<3;j++){
      const wx=nx+i*(headR*0.15);
      const wy2=wy+j*headR*0.09-headR*0.09;
      ctx.beginPath();ctx.moveTo(wx,wy2);ctx.lineTo(wx+i*headR*0.75,wy2+j*headR*0.05-headR*0.05);
      ctx.strokeStyle="rgba(255,255,255,0.7)";ctx.lineWidth=size*0.012;ctx.lineCap="round";ctx.stroke();
    }
  }

  // teeth / mouth
  const mny=ny+ns*1.7;
  const twL=hx-headR*0.13,twR=hx+headR*0.13;
  ctx.beginPath();
  ctx.moveTo(twL-headR*0.04,mny);ctx.lineTo(twL,mny+headR*0.13);ctx.lineTo(twR,mny+headR*0.13);ctx.lineTo(twR+headR*0.04,mny);
  ctx.fillStyle="white";ctx.fill();
  ctx.beginPath();
  ctx.moveTo(hx-headR*0.25,mny-headR*0.02);ctx.lineTo(hx-headR*0.18,mny-headR*0.16);ctx.lineTo(hx-headR*0.05,mny-headR*0.02);
  ctx.lineTo(hx+headR*0.05,mny-headR*0.02);ctx.lineTo(hx+headR*0.18,mny-headR*0.16);ctx.lineTo(hx+headR*0.25,mny-headR*0.02);
  ctx.fillStyle="white";ctx.fill();

  // outfit/hat/accessory
  drawOutfit(ctx,cat,hy,headR,bw,bh,size);

  // hunger bar
  const barW=size*0.85,barH=size*0.07;
  const barX=bx-barW/2,barY=hy-headR-size*0.2;
  const _rr=(x,y,w,h,r)=>{ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();};
  ctx.fillStyle="rgba(0,0,0,0.25)";ctx.beginPath();_rr(barX,barY,barW,barH,3);ctx.fill();
  const hunger=Math.max(0,Math.min(1,(cat.hunger||80)/100));
  const hcol=hunger>0.5?"#2ECC71":hunger>0.25?"#F39C12":"#E74C3C";
  const _fw=Math.max(4,(barW-2)*hunger);
  ctx.fillStyle=hcol;ctx.beginPath();_rr(barX+1,barY+1,_fw,barH-2,2);ctx.fill();

  ctx.restore();
}

function drawBodyPattern(ctx,baseCol,stripe,bw,bh,size,cx,cy){
  if(!stripe||stripe==="none")return;
  ctx.save();ctx.globalAlpha=0.35;
  const dark=adjustColor(baseCol,-45);
  const light=adjustColor(baseCol,35);
  ctx.strokeStyle=dark;ctx.lineCap="round";
  switch(stripe){
    case"tabby":case"mackerel":
      ctx.lineWidth=size*0.055;
      for(let i=-2;i<=2;i++){
        ctx.beginPath();ctx.moveTo(cx+i*bw*0.28,cy-bh);ctx.lineTo(cx+i*bw*0.32,cy+bh);ctx.stroke();
      }
      break;
    case"classic":
      ctx.lineWidth=size*0.06;
      ctx.beginPath();ctx.ellipse(cx,cy,bw*0.5,bh*0.4,0,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx-bw*0.5,cy);ctx.lineTo(cx+bw*0.5,cy);ctx.stroke();
      break;
    case"spotted":case"rosette":
      ctx.fillStyle=dark;ctx.globalAlpha=0.3;
      for(let i=0;i<5;i++){
        const sx=cx+(Math.cos(i*1.3)*bw*0.55),sy=cy+(Math.sin(i*2.1)*bh*0.5);
        ctx.beginPath();ctx.ellipse(sx,sy,bw*0.1,bh*0.1,i,0,Math.PI*2);ctx.fill();
      }
      break;
    case"marbled":
      ctx.lineWidth=size*0.05;
      for(let i=0;i<3;i++){
        ctx.beginPath();ctx.moveTo(cx-bw,cy+bh*(i-1)*0.4);
        ctx.bezierCurveTo(cx-bw*0.3,cy-bh*(i%2?0.3:-0.3),cx+bw*0.3,cy+bh*(i%2?0.3:-0.3),cx+bw,cy-bh*(i-1)*0.4);
        ctx.stroke();
      }
      break;
    case"flame":
      ctx.fillStyle="#FF6600";ctx.globalAlpha=0.3;
      for(let i=0;i<4;i++){
        const fx=cx+bw*(i/3-0.5)*0.8;
        ctx.beginPath();ctx.moveTo(fx,cy+bh*0.5);ctx.bezierCurveTo(fx-bw*0.08,cy,fx+bw*0.08,cy-bh*0.3,fx,cy-bh*0.6);ctx.closePath();ctx.fill();
      }
      break;
    case"galaxy":
      ctx.globalAlpha=0.4;
      for(let i=0;i<12;i++){
        const ang=i/12*Math.PI*2,r=bw*0.35*(0.5+Math.random()*0.5);
        ctx.fillStyle=i%3===0?"#9370DB":i%3===1?"#4169E1":"#FF69B4";
        ctx.beginPath();ctx.arc(cx+Math.cos(ang)*r,cy+Math.sin(ang)*r*0.6,bw*0.045,0,Math.PI*2);ctx.fill();
      }
      break;
    case"aurora":
      for(let i=0;i<3;i++){
        const ag=ctx.createLinearGradient(cx-bw,cy-bh*0.3+i*bh*0.3,cx+bw,cy-bh*0.1+i*bh*0.3);
        ag.addColorStop(0,["#00FF7F","#4169E1","#9370DB"][i]+"88");ag.addColorStop(1,"transparent");
        ctx.fillStyle=ag;ctx.fillRect(cx-bw,cy-bh*0.4+i*bh*0.3,bw*2,bh*0.28);
      }
      break;
    case"lightning":
      ctx.strokeStyle="#FFD700";ctx.lineWidth=size*0.04;ctx.globalAlpha=0.5;
      for(let i=0;i<3;i++){
        const lx=cx+bw*(i/2-0.5)*0.7;
        ctx.beginPath();ctx.moveTo(lx,cy-bh*0.8);ctx.lineTo(lx-bw*0.07,cy);ctx.lineTo(lx+bw*0.07,cy);ctx.lineTo(lx-bw*0.04,cy+bh*0.8);ctx.stroke();
      }
      break;
    case"iridescent":
      const ig=ctx.createLinearGradient(cx-bw,cy-bh,cx+bw,cy+bh);
      ig.addColorStop(0,"#FF69B488");ig.addColorStop(0.33,"#9370DB88");ig.addColorStop(0.66,"#4169E188");ig.addColorStop(1,"#00CED188");
      ctx.fillStyle=ig;ctx.globalAlpha=0.45;ctx.beginPath();ctx.ellipse(cx,cy,bw,bh,0,0,Math.PI*2);ctx.fill();
      break;
    case"colorpoint":case"flamepoint":case"tabbypoint":
      ctx.fillStyle=adjustColor(baseCol,-60);ctx.globalAlpha=0.4;
      ctx.beginPath();ctx.ellipse(cx,cy-bh*0.7,bw*0.25,bh*0.25,0,0,Math.PI*2);ctx.fill();
      break;
    case"tortie":
      ctx.globalAlpha=0.35;
      [adjustColor(baseCol,-50),"#D06000","#1A1A1A"].forEach((c,i)=>{
        ctx.fillStyle=c;
        ctx.beginPath();ctx.ellipse(cx+bw*(i-1)*0.35,cy+bh*(i%2-0.5)*0.4,bw*0.28,bh*0.28,i,0,Math.PI*2);ctx.fill();
      });
      break;
    case"ticked":
      ctx.fillStyle=adjustColor(baseCol,-30);ctx.globalAlpha=0.2;
      ctx.beginPath();ctx.ellipse(cx,cy,bw*0.95,bh*0.95,0,0,Math.PI*2);ctx.fill();
      break;
    case"waves":
      ctx.lineWidth=size*0.04;
      for(let i=0;i<3;i++){
        ctx.beginPath();const wy=cy-bh*0.35+i*bh*0.35;
        ctx.moveTo(cx-bw,wy);ctx.bezierCurveTo(cx-bw/2,wy-bh*0.1,cx+bw/2,wy+bh*0.1,cx+bw,wy);ctx.stroke();
      }
      break;
    default:break;
  }
  ctx.restore();
}

function drawOutfit(ctx,cat,headY,headR,bw,bh,size){
  const hat=cat.hat||"none";
  const outfit=cat.outfit||"none";
  const acc=cat.accessory||"none";
  ctx.save();ctx.font=size*0.38+"px serif";ctx.textAlign="center";ctx.textBaseline="middle";
  // hat
  if(hat!=="none"){
    const hi=HATS.find(h=>h.id===hat);
    if(hi)ctx.fillText(hi.icon,0,headY-headR*1.25);
  }
  // outfit
  if(outfit!=="none"){
    const oi=OUTFITS.find(o=>o.id===outfit);
    if(oi){ctx.font=size*0.32+"px serif";ctx.fillText(oi.icon,0,0);}
  }
  // accessory
  if(acc!=="none"){
    const ai=ACCESSORIES.find(a=>a.id===acc);
    if(ai){ctx.font=size*0.28+"px serif";ctx.fillText(ai.icon,bw*0.85,headY+headR*0.2);}
  }
  ctx.restore();
}

// ── WORLD BACKGROUNDS ─────────────────────────────────────────
function drawWorldBackground(ctx,w,h,world){
  switch(world){
    case"cafe":{
      const g=ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,"#FFF4E6");g.addColorStop(1,"#F5DEB3");
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      // floor
      ctx.fillStyle="#8B5A2B";ctx.fillRect(0,h*0.55,w,h*0.45);
      for(let i=0;i<10;i++){ctx.fillStyle=i%2?"#7A4F24":"#9B6A35";ctx.fillRect(i*w/5,h*0.55,(w/5)-2,h*0.45);}
      // windows
      ctx.fillStyle="#B8DCF0";ctx.fillRect(w*0.05,h*0.08,w*0.2,h*0.25);ctx.strokeStyle="#8B5A2B";ctx.lineWidth=4;ctx.strokeRect(w*0.05,h*0.08,w*0.2,h*0.25);
      ctx.beginPath();ctx.moveTo(w*0.15,h*0.08);ctx.lineTo(w*0.15,h*0.33);ctx.moveTo(w*0.05,h*0.205);ctx.lineTo(w*0.25,h*0.205);ctx.stroke();
      // cat trees
      drawCatTree(ctx,w*0.75,h*0.55,h*0.45);
      drawCatTree(ctx,w*0.9,h*0.55,h*0.45);
      // cups
      ctx.font="28px serif";ctx.fillText("☕",w*0.35,h*0.45);ctx.fillText("🫖",w*0.45,h*0.45);
      break;
    }
    case"garden":{
      const g=ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,"#87CEEB");g.addColorStop(0.6,"#98FB98");g.addColorStop(1,"#2E7D32");
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      // grass
      ctx.fillStyle="#4CAF50";ctx.fillRect(0,h*0.6,w,h*0.4);
      // trees
      [[w*0.15,h*0.5],[w*0.8,h*0.45]].forEach(([tx,ty])=>{
        ctx.fillStyle="#4A2800";ctx.fillRect(tx-8,ty,16,h*0.3);
        ctx.fillStyle="#2E7D32";ctx.beginPath();ctx.arc(tx,ty,45,0,Math.PI*2);ctx.fill();
        ctx.fillStyle="#388E3C";ctx.beginPath();ctx.arc(tx,ty-15,35,0,Math.PI*2);ctx.fill();
      });
      // flowers
      const flowers=["🌸","🌺","🌼","🌻","💐"];
      ctx.font="24px serif";
      for(let i=0;i<8;i++){ctx.fillText(flowers[i%flowers.length],w*(0.05+i*0.12),h*0.63);}
      ctx.font="22px serif";ctx.fillText("🦋",w*0.4,h*0.3);ctx.fillText("🐝",w*0.6,h*0.25);ctx.fillText("☀️",w*0.88,h*0.08);
      break;
    }
    case"space":{
      ctx.fillStyle="#05050F";ctx.fillRect(0,0,w,h);
      // stars
      const rng=(s)=>{let v=Math.sin(s*127.1+s*311.7)*43758.5453;return v-Math.floor(v);};
      for(let i=0;i<80;i++){
        const sx=rng(i)*w,sy=rng(i+100)*h*0.9;
        const sz=rng(i+200)*2+0.5;
        ctx.fillStyle=`rgba(255,255,255,${0.4+rng(i+300)*0.6})`;
        ctx.beginPath();ctx.arc(sx,sy,sz,0,Math.PI*2);ctx.fill();
      }
      // planets
      const pg=ctx.createRadialGradient(w*0.2,h*0.18,5,w*0.2,h*0.18,45);
      pg.addColorStop(0,"#E67E22");pg.addColorStop(1,"#8B4513");
      ctx.fillStyle=pg;ctx.beginPath();ctx.arc(w*0.2,h*0.18,45,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle="rgba(200,150,100,0.4)";ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(w*0.2,h*0.18,72,18,0.3,0,Math.PI*2);ctx.stroke();
      const pg2=ctx.createRadialGradient(w*0.78,h*0.22,4,w*0.78,h*0.22,30);
      pg2.addColorStop(0,"#9B59B6");pg2.addColorStop(1,"#4A235A");
      ctx.fillStyle=pg2;ctx.beginPath();ctx.arc(w*0.78,h*0.22,30,0,Math.PI*2);ctx.fill();
      // asteroid floor
      ctx.fillStyle="#1A1A2E";ctx.fillRect(0,h*0.75,w,h*0.25);
      for(let i=0;i<12;i++){
        ctx.fillStyle="#2A2A3E";ctx.beginPath();
        ctx.ellipse(w*i/11,h*0.78,w*0.04,h*0.03,0,0,Math.PI*2);ctx.fill();
      }
      ctx.font="22px serif";ctx.fillText("🚀",w*0.5,h*0.5);ctx.fillText("⭐",w*0.35,h*0.15);
      break;
    }
    case"winter":{
      const g=ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,"#CCE5FF");g.addColorStop(1,"#E8F4FF");
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      // snow ground
      ctx.fillStyle="#E8F4FF";
      ctx.beginPath();ctx.moveTo(0,h*0.6);
      for(let i=0;i<=w;i+=40)ctx.quadraticCurveTo(i+20,h*0.6+Math.sin(i*0.05)*10,i+40,h*0.6);
      ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fill();
      // tree
      ctx.fillStyle="#2E7D32";
      [[0,0],[1,-1],[2,-2]].forEach(([s,o])=>{
        ctx.beginPath();ctx.moveTo(w*0.15,h*(0.55-s*0.08));
        ctx.lineTo(w*0.15-40+o*10,h*(0.65-s*0.08));ctx.lineTo(w*0.15+40-o*10,h*(0.65-s*0.08));
        ctx.closePath();ctx.fill();
      });
      // snowflakes
      ctx.font="16px serif";
      for(let i=0;i<8;i++)ctx.fillText("❄️",w*(0.05+i*0.12),h*(0.1+((i*7)%5)*0.08));
      ctx.font="28px serif";ctx.fillText("⛄",w*0.45,h*0.65);ctx.fillText("🎄",w*0.7,h*0.58);
      break;
    }
    case"halloween":{
      const g=ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,"#0A0010");g.addColorStop(1,"#2D0A3A");
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      // moon
      ctx.fillStyle="#FFE0A0";ctx.beginPath();ctx.arc(w*0.8,h*0.12,35,0,Math.PI*2);ctx.fill();
      ctx.fillStyle="#1A0020";ctx.beginPath();ctx.arc(w*0.87,h*0.1,30,0,Math.PI*2);ctx.fill();
      // ground
      ctx.fillStyle="#1A0A20";ctx.fillRect(0,h*0.7,w,h*0.3);
      // gravestones
      [[0.15,0.7],[0.35,0.68],[0.55,0.72]].forEach(([gx,gy])=>{
        ctx.fillStyle="#3A3A4A";ctx.fillRect(w*gx-15,h*gy-35,30,40);
        ctx.beginPath();ctx.arc(w*gx,h*gy-35,15,Math.PI,0);ctx.fill();
        ctx.fillStyle="#2A2A3A";ctx.font="10px serif";ctx.fillText("RIP",w*gx-10,h*gy-22);
      });
      ctx.font="28px serif";
      ctx.fillText("🎃",w*0.25,h*0.72);ctx.fillText("🎃",w*0.65,h*0.74);
      ctx.fillText("🦇",w*0.4,h*0.3);ctx.fillText("🦇",w*0.6,h*0.2);ctx.fillText("🕷️",w*0.05,h*0.15);
      // spiderweb
      ctx.strokeStyle="rgba(200,200,200,0.3)";ctx.lineWidth=1;
      for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(w*0.05,h*0.1);ctx.lineTo(w*0.05+Math.cos(i/6*Math.PI)*60,h*0.1+Math.sin(i/6*Math.PI)*60);ctx.stroke();}
      for(let r=15;r<=55;r+=15){ctx.beginPath();ctx.arc(w*0.05,h*0.1,r,0,Math.PI);ctx.stroke();}
      break;
    }
    case"palace":{
      const g=ctx.createLinearGradient(0,0,0,h);
      g.addColorStop(0,"#FFF8DC");g.addColorStop(1,"#FFD700");
      ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
      // marble floor
      ctx.fillStyle="#F5F0E8";ctx.fillRect(0,h*0.6,w,h*0.4);
      for(let i=0;i<8;i++){
        for(let j=0;j<2;j++){
          ctx.strokeStyle="rgba(180,160,120,0.3)";ctx.lineWidth=1;
          ctx.strokeRect(i*w/7,h*0.6+j*h*0.2,w/7,h*0.2);
        }
      }
      // pillars
      [[0.08,0.6],[0.92,0.6]].forEach(([px,py])=>{
        const pg3=ctx.createLinearGradient(w*px-20,0,w*px+20,0);
        pg3.addColorStop(0,"#D4A836");pg3.addColorStop(0.5,"#F5E070");pg3.addColorStop(1,"#D4A836");
        ctx.fillStyle=pg3;ctx.fillRect(w*px-18,h*0.1,36,h*0.5);
        ctx.fillStyle="#C49820";ctx.fillRect(w*px-24,h*0.1,48,18);ctx.fillRect(w*px-24,h*0.6,48,18);
      });
      // chandelier
      ctx.font="36px serif";ctx.textAlign="center";ctx.fillText("🏮",w*0.5,h*0.1);
      ctx.font="28px serif";ctx.fillText("👑",w*0.5,h*0.45);
      // curtains
      [[0,0.28],[0.72,0.28]].forEach(([cx2,cw2])=>{
        const cg=ctx.createLinearGradient(w*cx2,0,w*(cx2+cw2),0);
        cg.addColorStop(0,"#8B0000CC");cg.addColorStop(1,"transparent");
        if(cx2>0){cg.addColorStop(0,"transparent");cg.addColorStop(1,"#8B0000CC");}
        ctx.fillStyle=cg;ctx.fillRect(w*cx2,0,w*cw2,h*0.65);
      });
      break;
    }
  }
}

function drawCatTree(ctx,x,floorY,floorH){
  // post
  ctx.fillStyle="#8B6914";ctx.fillRect(x-6,floorY-floorH*0.8,12,floorH*0.8);
  // platforms
  [[floorY-floorH*0.3,70,18],[floorY-floorH*0.55,55,15],[floorY-floorH*0.75,45,13]].forEach(([py,pw,ph])=>{
    ctx.fillStyle="#C8A060";ctx.beginPath();
    ctx.moveTo(x-pw/2+4,py-ph);ctx.lineTo(x+pw/2-4,py-ph);ctx.quadraticCurveTo(x+pw/2,py-ph,x+pw/2,py-ph+4);ctx.lineTo(x+pw/2,py);ctx.lineTo(x-pw/2,py);ctx.lineTo(x-pw/2,py-ph+4);ctx.quadraticCurveTo(x-pw/2,py-ph,x-pw/2+4,py-ph);ctx.closePath();ctx.fill();
  });
  // top ball
  ctx.fillStyle="#DEB887";ctx.beginPath();ctx.arc(x,floorY-floorH*0.82,12,0,Math.PI*2);ctx.fill();
}

// ── WORLD ANIMATION LOOP ─────────────────────────────────────
let _worldRaf=null;
function worldLoop(){
  const canvas=document.getElementById("world-canvas");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  const w=canvas.width,h=canvas.height;
  ctx.clearRect(0,0,w,h);
  drawWorldBackground(ctx,w,h,G.activeWorld);
  const floorY=h*0.55;
  // move and draw world cats
  G.worldCatsInScene.forEach(wc=>{
    wc.actionTimer--;
    if(wc.actionTimer<=0){
      const r=Math.random();
      if(r<0.4){wc.action="walk";wc.vx=(Math.random()-0.5)*1.5;wc.vy=0;wc.actionTimer=80+Math.random()*120;}
      else if(r<0.65){wc.action="play";wc.vy=-3;wc.actionTimer=60+Math.random()*80;}
      else{wc.action="sit";wc.actionTimer=100+Math.random()*150;}
    }
    if(wc.action==="walk"){
      wc.x+=wc.vx;
      if(wc.x<40||wc.x>w-40){wc.vx*=-1;wc.facing=wc.vx>0?1:-1;}
      wc.y=floorY;
    }
    if(wc.action==="play"){
      wc.vy+=0.2;wc.y+=wc.vy;
      if(wc.y>=floorY){wc.y=floorY;wc.vy=wc.vy<-0.5?-wc.vy*0.55:0;if(Math.abs(wc.vy)<0.3)wc.action="sit";}
    }
    // draw
    ctx.save();
    if(wc.facing<0){ctx.translate(wc.x*2,0);ctx.scale(-1,1);}
    drawCat(ctx,wc.cat,wc.x,wc.y-28,45,true);
    ctx.restore();
  });
  // particles
  G.particles=G.particles.filter(p=>p.life>0);
  G.particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=0.08;p.life--;p.vx*=0.98;
    ctx.globalAlpha=p.life/p.maxLife;ctx.font="20px serif";
    ctx.fillText(p.emoji,p.x,p.y);ctx.globalAlpha=1;
  });
  _worldRaf=requestAnimationFrame(worldLoop);
}

function initWorldCats(){
  G.worldCatsInScene=[];
  const canvas=document.getElementById("world-canvas");
  const w=canvas?canvas.offsetWidth:600;
  const h=canvas?canvas.offsetHeight:400;
  const cats=G.myCats.slice(0,15);
  cats.forEach((cat,i)=>{
    G.worldCatsInScene.push({
      cat,x:80+(i%(Math.ceil(cats.length/2)))*Math.min(80,(w-160)/Math.max(1,cats.length-1)),
      y:h*0.55,vx:(Math.random()-0.5)*1.2,vy:0,
      facing:1,action:"sit",actionTimer:Math.floor(Math.random()*80)+20,
      _phase:Math.random()*Math.PI*2
    });
  });
}

function resizeWorldCanvas(){
  const wrap=document.getElementById("world-canvas-wrapper");
  const canvas=document.getElementById("world-canvas");
  if(!wrap||!canvas)return;
  canvas.width=wrap.offsetWidth;
  canvas.height=wrap.offsetHeight;
}

function spawnParticles(emojis){
  const canvas=document.getElementById("world-canvas");
  const cx=(canvas?canvas.width:300)/2,cy=(canvas?canvas.height:200)/2;
  for(let i=0;i<8;i++){
    G.particles.push({emoji:emojis[i%emojis.length],x:cx,y:cy,
      vx:(Math.random()-0.5)*5,vy:-3-Math.random()*3,life:60,maxLife:60});
  }
}

// ── RENDER CAT CARD CANVAS ────────────────────────────────────
function renderCatCard(cat,size=60){
  const cv=document.createElement("canvas");
  cv.width=size;cv.height=size+10;
  const ctx=cv.getContext("2d");
  drawCat(ctx,cat,size/2,size/2+5,size*0.85);
  return cv;
}

// ── CATTERY ───────────────────────────────────────────────────
function buildCatteryGrid(){
  const grid=document.getElementById("cat-grid");
  if(!grid)return;
  grid.innerHTML="";
  const filter=G.selectedFilter;
  const cats=G.myCats.filter(c=>filter==="all"||c.rarity===filter);
  if(cats.length===0){
    grid.innerHTML=`<div style="grid-column:1/-1;text-align:center;padding:40px;color:#999;font-size:0.9rem;">No cats yet!<br>Visit the Shop to get started 🐱</div>`;
    return;
  }
  cats.forEach(cat=>{
    const card=document.createElement("div");
    card.className=`cat-card rarity-${cat.rarity}`;
    const cv=renderCatCard(cat,80);
    card.appendChild(cv);
    const hungerPct=Math.round(cat.hunger||0);
    card.innerHTML+=`
      <div class="cat-name">${cat.name}</div>
      <div class="cat-breed-name">${cat.breedName}</div>
      <div class="cat-rarity-badge">${cat.rarity.toUpperCase()}</div>
    `;
    card.onclick=()=>showCatModal(cat);
    grid.appendChild(card);
  });
}

// ── BREEDING ─────────────────────────────────────────────────
function buildBreedingList(){
  const list=document.getElementById("breeding-cats-list");
  if(!list)return;
  list.innerHTML="";
  G.myCats.forEach(cat=>{
    const card=document.createElement("div");
    card.className="breed-select-card";
    const cv=renderCatCard(cat,55);
    card.appendChild(cv);
    card.innerHTML+=`<p>${cat.name}</p>`;
    card.onclick=()=>selectBreedCat(cat,card);
    list.appendChild(card);
  });
}

function openBreedSelect(slot){
  G.breedSelectTarget=slot;
  // highlight
  document.querySelectorAll(".breed-select-card").forEach(c=>{
    const isSelected=(slot==="a"&&G.breedSlotA&&c.children[1].textContent===G.breedSlotA.name)||
                     (slot==="b"&&G.breedSlotB&&c.children[1].textContent===G.breedSlotB.name);
    c.classList.toggle("selected",isSelected);
  });
  showToast(`Choose Parent ${slot.toUpperCase()}!`);
}

function selectBreedCat(cat,cardEl){
  if(!G.breedSelectTarget)G.breedSelectTarget="a";
  document.querySelectorAll(".breed-select-card").forEach(c=>c.classList.remove("selected"));
  cardEl.classList.add("selected");
  if(G.breedSelectTarget==="a")G.breedSlotA=cat;
  else G.breedSlotB=cat;
  renderBreedSlot(G.breedSelectTarget,cat);
  // enable button if both filled
  const btn=document.getElementById("breed-btn");
  if(btn)btn.disabled=!(G.breedSlotA&&G.breedSlotB);
  G.breedSelectTarget=G.breedSelectTarget==="a"?"b":"a";
}

function renderBreedSlot(slot,cat){
  const el=document.getElementById(`breed-slot-${slot}`);
  if(!el)return;
  if(!cat){
    el.innerHTML=`<span style="font-size:1.8rem">🐱</span><p>Tap to select<br>Parent ${slot.toUpperCase()}</p>`;
    el.classList.remove("filled");return;
  }
  el.innerHTML="";
  el.classList.add("filled");
  const cv=renderCatCard(cat,80);
  el.appendChild(cv);
  const p=document.createElement("p");
  p.textContent=cat.name+" ("+cat.rarity+")";
  el.appendChild(p);
}

function doBreed(){
  if(!G.breedSlotA||!G.breedSlotB){showToast("Select two cats first!");return;}
  if(G.food<2){showToast("Need 2 food to breed!");return;}
  G.food-=2;updateHUD();
  const ra=G.breedSlotA.rarity,rb=G.breedSlotB.rarity;
  // same breed?
  let offspring;
  if(G.breedSlotA.breedId===G.breedSlotB.breedId){
    offspring=addCatFromBreed(CAT_BREEDS[G.breedSlotA.breedId]);
  } else {
    const roll=Math.random();
    const tiers=["common","special","rare","ultra"];
    const ta=tiers.indexOf(ra),tb=tiers.indexOf(rb);
    const top=Math.max(ta,tb);
    let pick;
    if(top<=0){pick=roll<0.9?"common":"special";}
    else if(top===1){pick=roll<0.3?"common":roll<0.8?"special":"rare";}
    else if(top===2){pick=roll<0.1?"special":roll<0.7?"rare":"ultra";}
    else{pick=roll<0.4?"rare":"ultra";}
    const pool=CAT_BREEDS.filter(b=>b.rarity===pick);
    const base=pool[Math.floor(Math.random()*pool.length)];
    offspring=addCatFromBreed(base);
    // mix colors
    offspring.baseColor=mixColors(G.breedSlotA.baseColor,G.breedSlotB.baseColor,0.5);
    offspring.eyeColor=Math.random()<0.5?G.breedSlotA.eyeColor:G.breedSlotB.eyeColor;
  }
  G.pendingOffspring=offspring;
  // show result
  const rc=document.getElementById("result-canvas");
  if(rc){const ctx=rc.getContext("2d");ctx.clearRect(0,0,rc.width,rc.height);drawCat(ctx,offspring,42,48,70);}
  const rn=document.getElementById("result-name");if(rn)rn.textContent=offspring.name;
  const rr=document.getElementById("result-rarity");
  if(rr){
    const colors={common:"#7FB069",special:"#4A90D9",rare:"#9B59B6",ultra:"#F39C12"};
    rr.textContent="⭐ "+offspring.rarity.toUpperCase();rr.style.color=colors[offspring.rarity];
  }
  const res=document.getElementById("breed-result-card");if(res)res.style.display="block";
  spawnParticles(["💕","✨","🐱","⭐"]);
  showToast("New kitten born! 🎉");
}

function addOffspring(){
  if(!G.pendingOffspring)return;
  G.myCats.push(G.pendingOffspring);
  G.pendingOffspring=null;
  const res=document.getElementById("breed-result-card");if(res)res.style.display="none";
  initWorldCats();updateHUD();buildCatteryGrid();
  showToast("🐱 Added to your cattery!");
}

function addCatFromBreed(breed){
  return{
    ...breed,
    id:"cat_"+Date.now()+"_"+Math.random(),
    breedId:breed.id,breedName:breed.name,
    name:randomKittenName(),
    hunger:80,happiness:70,health:90,energy:80,
    customColor:undefined,customEyeColor:undefined,customStripe:undefined,
    hat:"none",outfit:"none",accessory:"none",
    _treated:false,_phase:Math.random()*Math.PI*2
  };
}

// ── CUSTOMIZE ────────────────────────────────────────────────
function buildCustomizePanel(){
  buildCustomizeCatSelector();
  // body colors
  const bcg=document.getElementById("body-color-grid");
  if(bcg){bcg.innerHTML="";BODY_COLORS.forEach(col=>{const sw=document.createElement("div");sw.className="color-swatch";sw.style.background=col;sw.title=col;sw.onclick=()=>{document.querySelectorAll("#body-color-grid .color-swatch").forEach(s=>s.classList.remove("selected"));sw.classList.add("selected");if(G.customizingCat){G.customizingCat.customColor=col;renderCustomizePreview();}};bcg.appendChild(sw);});}
  // eye colors
  const ecg=document.getElementById("eye-color-grid");
  if(ecg){ecg.innerHTML="";EYE_COLORS.forEach(col=>{const sw=document.createElement("div");sw.className="color-swatch";sw.style.background=col;sw.onclick=()=>{document.querySelectorAll("#eye-color-grid .color-swatch").forEach(s=>s.classList.remove("selected"));sw.classList.add("selected");if(G.customizingCat){G.customizingCat.customEyeColor=col;renderCustomizePreview();}};ecg.appendChild(sw);});}
  // stripes
  const sg=document.getElementById("stripe-grid");
  if(sg){sg.innerHTML="";STRIPE_OPTIONS.forEach(s=>{const btn=document.createElement("button");btn.className="option-btn";btn.textContent=s==="none"?"No Stripe":s.charAt(0).toUpperCase()+s.slice(1);btn.onclick=()=>{document.querySelectorAll("#stripe-grid .option-btn").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");if(G.customizingCat){G.customizingCat.customStripe=s;renderCustomizePreview();}};sg.appendChild(btn);});}
  // hats
  const hg=document.getElementById("hat-grid");
  if(hg){hg.innerHTML="";HATS.forEach(h=>{const item=document.createElement("div");item.className="outfit-item";item.innerHTML=`<span class="outfit-icon">${h.icon}</span>${h.name}`;item.onclick=()=>{document.querySelectorAll("#hat-grid .outfit-item").forEach(i=>i.classList.remove("selected"));item.classList.add("selected");if(G.customizingCat){G.customizingCat.hat=h.id;renderCustomizePreview();}};hg.appendChild(item);});}
  // outfits
  const og=document.getElementById("outfit-grid-items");
  if(og){og.innerHTML="";OUTFITS.forEach(o=>{const item=document.createElement("div");item.className="outfit-item";item.innerHTML=`<span class="outfit-icon">${o.icon}</span>${o.name}`;item.onclick=()=>{document.querySelectorAll("#outfit-grid-items .outfit-item").forEach(i=>i.classList.remove("selected"));item.classList.add("selected");if(G.customizingCat){G.customizingCat.outfit=o.id;renderCustomizePreview();}};og.appendChild(item);});}
  // accessories
  const ag=document.getElementById("accessory-grid");
  if(ag){ag.innerHTML="";ACCESSORIES.forEach(a=>{const item=document.createElement("div");item.className="outfit-item";item.innerHTML=`<span class="outfit-icon">${a.icon}</span>${a.name}`;item.onclick=()=>{document.querySelectorAll("#accessory-grid .outfit-item").forEach(i=>i.classList.remove("selected"));item.classList.add("selected");if(G.customizingCat){G.customizingCat.accessory=a.id;renderCustomizePreview();}};ag.appendChild(item);});}
}

function buildCustomizeCatSelector(){
  const sel=document.getElementById("customize-cat-select");
  if(!sel)return;
  sel.innerHTML="";
  G.myCats.forEach(cat=>{
    const btn=document.createElement("button");btn.className="option-btn";btn.textContent=cat.name;
    btn.onclick=()=>{
      document.querySelectorAll("#customize-cat-select .option-btn").forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");G.customizingCat=cat;
      const cn=document.getElementById("customize-cat-name");if(cn)cn.textContent=cat.name+" – "+cat.breedName;
      renderCustomizePreview();
    };
    sel.appendChild(btn);
  });
}

function renderCustomizePreview(){
  const cv=document.getElementById("customize-canvas");
  if(!cv||!G.customizingCat)return;
  const ctx=cv.getContext("2d");
  ctx.clearRect(0,0,cv.width,cv.height);
  ctx.fillStyle="rgba(255,255,255,0.05)";ctx.fillRect(0,0,cv.width,cv.height);
  drawCat(ctx,G.customizingCat,cv.width/2,cv.height/2+10,cv.width*0.72,true);
}

function saveCustomize(){
  if(!G.customizingCat){showToast("Select a cat first!");return;}
  initWorldCats();buildCatteryGrid();
  showToast("✨ Look saved!");
  spawnParticles(["✨","🌟","💅"]);
}

// ── SHOP ────────────────────────────────────────────────────
function buildShop(){
  const grid=document.getElementById("shop-grid");
  if(!grid)return;
  grid.innerHTML="";
  SHOP_ITEMS.forEach(item=>{
    const card=document.createElement("div");card.className="shop-item";
    card.innerHTML=`
      <div class="shop-item-icon">${item.icon}</div>
      <h4>${item.name}</h4>
      <p>${item.desc}</p>
      <button class="shop-buy-btn" onclick="buyItem('${item.id}')">🪙 ${item.price}</button>
    `;
    grid.appendChild(card);
  });
}

function buyItem(id){
  const item=SHOP_ITEMS.find(i=>i.id===id);
  if(!item)return;
  if(G.coins<item.price){showToast("Not enough coins! 🪙");return;}
  G.coins-=item.price;item.action();updateHUD();
}

// ── VET ─────────────────────────────────────────────────────
function buildVetPanel(){
  const vc=document.getElementById("vet-content");
  if(!vc)return;
  const sick=G.myCats.filter(c=>c.health<70&&!c._treated);
  if(sick.length===0){
    vc.innerHTML=`<div style="text-align:center;padding:50px;color:#27AE60;font-size:1rem;">🎉 All cats are healthy!<br><span style="font-size:0.8rem;color:#888;">Keep feeding and playing with them.</span></div>`;
    return;
  }
  vc.innerHTML="";
  sick.forEach(cat=>{
    const cond=VET_CONDITIONS[Math.floor(Math.random()*VET_CONDITIONS.length)];
    const reward=cat.rarity==="ultra"?300:cat.rarity==="rare"?150:cat.rarity==="special"?75:35;
    const card=document.createElement("div");card.className="vet-card";
    const cv=renderCatCard(cat,60);
    card.appendChild(cv);
    card.innerHTML+=`
      <div class="vet-info">
        <strong>${cat.name}</strong> has <em>${cond}</em>
        <span style="color:#E74C3C;font-size:0.8rem;display:block;">Health: ${Math.round(cat.health)}%</span>
        <button onclick="treatCat('${cat.id}',${reward})" style="margin-top:6px;padding:5px 14px;border-radius:18px;border:none;background:var(--green);color:white;cursor:pointer;font-weight:bold;font-size:0.75rem;">
          💊 Treat (+🪙${reward})
        </button>
      </div>
    `;
    vc.appendChild(card);
  });
}

function treatCat(id,reward){
  if(G.meds<1){showToast("No meds! Buy some in the shop.");return;}
  const cat=G.myCats.find(c=>c.id===id);
  if(!cat)return;
  G.meds--;cat.health=Math.min(100,cat.health+35);cat._treated=true;
  G.coins+=reward;updateHUD();buildVetPanel();
  showToast(`🏥 Treated ${cat.name}! +🪙${reward}`);
  spawnParticles(["❤️","💊","✨"]);
}

// ── CAT MODAL ────────────────────────────────────────────────
function showCatModal(cat){
  const overlay=document.getElementById("modal-overlay");
  const content=document.getElementById("modal-content");
  if(!overlay||!content)return;
  const adoptVal=getAdoptValue(cat);
  content.innerHTML=`
    <h2 style="margin-bottom:6px;color:var(--dark);">${cat.name}</h2>
    <p style="color:var(--gray);font-size:0.8rem;margin-bottom:12px;">${cat.breedName} · ${cat.rarity.toUpperCase()}</p>
    <canvas id="modal-cat-canvas" width="130" height="140" style="display:block;margin:0 auto 14px;"></canvas>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
      ${["hunger","happiness","health","energy"].map(stat=>{
        const v=Math.round(cat[stat]||0);
        const colors={hunger:"#E67E22",happiness:"#FF69B4",health:"#2ECC71",energy:"#3498DB"};
        const icons={hunger:"🍣",happiness:"😺",health:"❤️",energy:"⚡"};
        return `<div style="background:#f8f8f8;border-radius:10px;padding:8px;">
          <div style="font-size:0.7rem;color:#888;margin-bottom:4px;">${icons[stat]} ${stat.charAt(0).toUpperCase()+stat.slice(1)}</div>
          <div style="background:#eee;border-radius:4px;height:7px;overflow:hidden;">
            <div style="background:${colors[stat]};height:100%;width:${v}%;border-radius:4px;transition:width 0.3s;"></div>
          </div>
          <div style="font-size:0.7rem;font-weight:bold;color:var(--dark);margin-top:3px;">${v}%</div>
        </div>`;
      }).join("")}
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">
      <button onclick="feedCat('${cat.id}')" style="padding:7px 14px;border-radius:18px;border:none;background:#E67E22;color:white;cursor:pointer;font-size:0.8rem;font-weight:bold;">🍣 Feed</button>
      <button onclick="playCat('${cat.id}')" style="padding:7px 14px;border-radius:18px;border:none;background:#FF69B4;color:white;cursor:pointer;font-size:0.8rem;font-weight:bold;">🧶 Play</button>
      <button onclick="groomCat('${cat.id}')" style="padding:7px 14px;border-radius:18px;border:none;background:#9B59B6;color:white;cursor:pointer;font-size:0.8rem;font-weight:bold;">✂️ Groom</button>
      <button onclick="adoptCat('${cat.id}')" style="padding:7px 14px;border-radius:18px;border:none;background:#27AE60;color:white;cursor:pointer;font-size:0.8rem;font-weight:bold;">🏠 Adopt Out (+🪙${adoptVal})</button>
    </div>
  `;
  overlay.style.display="flex";
  // draw animated cat
  const mc=document.getElementById("modal-cat-canvas");
  if(mc){
    let mraf;
    function animateModal(){
      const ctx=mc.getContext("2d");ctx.clearRect(0,0,mc.width,mc.height);
      drawCat(ctx,cat,mc.width/2,mc.height/2+5,mc.width*0.72,true);
      mraf=requestAnimationFrame(animateModal);
    }
    animateModal();
    overlay._modalRaf=mraf;
  }
}

function closeModal(){
  const overlay=document.getElementById("modal-overlay");
  if(overlay){overlay.style.display="none";if(overlay._modalRaf)cancelAnimationFrame(overlay._modalRaf);}
}
function closeModalOverlay(e){if(e.target===document.getElementById("modal-overlay"))closeModal();}

function getAdoptValue(cat){return{common:50,special:150,rare:400,ultra:1000}[cat.rarity]||50;}

function feedCat(id){
  const cat=G.myCats.find(c=>c.id===id);if(!cat)return;
  if(G.food<1){showToast("No food! Buy some in the shop.");return;}
  G.food--;cat.hunger=Math.min(100,cat.hunger+25);updateHUD();buildCatteryGrid();
  showCatModal(cat);showToast("😋 "+cat.name+" enjoyed the meal!");
}
function playCat(id){
  const cat=G.myCats.find(c=>c.id===id);if(!cat)return;
  cat.happiness=Math.min(100,cat.happiness+20);cat.energy=Math.max(0,cat.energy-10);
  buildCatteryGrid();showCatModal(cat);showToast("🧶 "+cat.name+" had fun!");
  spawnParticles(["🧶","😸","⭐"]);
}
function groomCat(id){
  const cat=G.myCats.find(c=>c.id===id);if(!cat)return;
  cat.happiness=Math.min(100,cat.happiness+15);cat.health=Math.min(100,cat.health+10);
  buildCatteryGrid();showCatModal(cat);showToast("✨ "+cat.name+" is sparkling clean!");
}
function adoptCat(id){
  const cat=G.myCats.find(c=>c.id===id);if(!cat)return;
  const val=getAdoptValue(cat);
  G.myCats=G.myCats.filter(c=>c.id!==id);G.coins+=val;
  if(G.customizingCat&&G.customizingCat.id===id)G.customizingCat=null;
  if(G.breedSlotA&&G.breedSlotA.id===id)G.breedSlotA=null;
  if(G.breedSlotB&&G.breedSlotB.id===id)G.breedSlotB=null;
  closeModal();updateHUD();buildCatteryGrid();initWorldCats();
  showToast("🏠 "+cat.name+" found a new home! +🪙"+val);
}

// ── HUD ──────────────────────────────────────────────────────
function updateHUD(){
  const s=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  s("hud-coins",G.coins);s("hud-cats",G.myCats.length);s("hud-food",G.food);s("hud-meds",G.meds);s("day-count",G.day);
}

// ── TOAST ─────────────────────────────────────────────────────
let _toastTimer=null;
function showToast(msg){
  const t=document.getElementById("toast");if(!t)return;
  t.textContent=msg;t.classList.add("show");
  if(_toastTimer)clearTimeout(_toastTimer);
  _toastTimer=setTimeout(()=>t.classList.remove("show"),2500);
}

// ── GAME LOOP ─────────────────────────────────────────────────
let _frame=0;
function gameLoop(){
  _frame++;
  if(_frame%600===0){
    G.day++;
    G.myCats.forEach(cat=>{
      cat.hunger=Math.max(0,cat.hunger-8);
      cat.happiness=Math.max(0,cat.happiness-5);
      cat.energy=Math.min(100,cat.energy+3);
      if(cat.hunger<15)cat.health=Math.max(0,cat.health-5);
      cat._treated=false;
    });
    updateHUD();buildCatteryGrid();
    if(_frame%3000===0)buildVetPanel();
  }
  requestAnimationFrame(gameLoop);
}

// ── INIT ─────────────────────────────────────────────────────
function startGame(){
  resizeWorldCanvas();
  // Add starter cats
  [0,3,12].forEach(bid=>{G.myCats.push(addCatFromBreed(CAT_BREEDS[bid]));});
  // Build all panels
  buildCatteryGrid();buildBreedingList();buildCustomizePanel();buildShop();buildVetPanel();
  updateHUD();
  // Start loops
  initWorldCats();worldLoop();gameLoop();
  // Hide loading, show game
  const ls=document.getElementById("loading-screen");
  const gc=document.getElementById("game-container");
  if(ls){ls.style.opacity="0";setTimeout(()=>ls.style.display="none",500);}
  if(gc)gc.style.display="flex";
}

function init(){
  const bar=document.getElementById("loading-bar");
  let p=0;
  const tick=setInterval(()=>{
    p+=Math.random()*15+5;if(p>=100){p=100;clearInterval(tick);setTimeout(startGame,300);}
    if(bar)bar.style.width=p+"%";
  },80);
}

// ── EVENT LISTENERS ───────────────────────────────────────────
window.addEventListener("load",()=>{
  // Nav tabs
  document.querySelectorAll(".nav-tab").forEach(tab=>{
    tab.addEventListener("click",()=>{
      const panel=tab.dataset.panel;
      document.querySelectorAll(".nav-tab").forEach(t=>t.classList.remove("active"));
      document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));
      tab.classList.add("active");
      const pe=document.getElementById("panel-"+panel);
      if(pe)pe.classList.add("active");
      // rebuild relevant panels
      if(panel==="cattery")buildCatteryGrid();
      if(panel==="breeding"){buildBreedingList();renderBreedSlot("a",G.breedSlotA||null);renderBreedSlot("b",G.breedSlotB||null);}
      if(panel==="customize")buildCustomizePanel();
      if(panel==="vet")buildVetPanel();
      if(panel==="shop")buildShop();
      if(panel==="world"){resizeWorldCanvas();initWorldCats();}
    });
  });
  // Filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");G.selectedFilter=btn.dataset.filter;buildCatteryGrid();
    });
  });
  // World buttons
  document.querySelectorAll(".world-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".world-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");G.activeWorld=btn.dataset.world;initWorldCats();
    });
  });
  // Resize
  window.addEventListener("resize",()=>{resizeWorldCanvas();initWorldCats();});
  init();
});

// extra CSS for vet panel and modal (injected dynamically)
const style=document.createElement("style");
style.textContent=`
#toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%) translateY(20px);background:rgba(44,24,16,0.92);color:white;padding:9px 20px;border-radius:22px;font-size:0.85rem;opacity:0;transition:all 0.3s;z-index:9999;pointer-events:none;white-space:nowrap;}
#toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
#modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:1000;align-items:center;justify-content:center;}
#modal-box{background:white;border-radius:22px;padding:22px;max-width:340px;width:90%;max-height:85vh;overflow-y:auto;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.4);}
#modal-close{position:absolute;top:10px;right:14px;background:none;border:none;font-size:1.3rem;cursor:pointer;color:var(--gray);}
#breed-result-card{display:none;background:linear-gradient(135deg,#FFF5F8,#F3E5F5);border:3px solid var(--purple);border-radius:18px;padding:14px;margin:0 14px 10px;text-align:center;}
#breed-result-card h3{color:var(--purple);margin-bottom:8px;font-size:1rem;}
#result-name{font-weight:bold;color:var(--dark);margin:6px 0 3px;font-size:0.9rem;}
#add-offspring-btn{margin-top:8px;padding:8px 20px;border-radius:18px;border:none;background:var(--purple);color:white;cursor:pointer;font-weight:bold;font-size:0.85rem;}
.vet-card{display:flex;align-items:center;gap:12px;background:white;border-radius:14px;padding:12px;margin:8px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);}
.vet-info{flex:1;}
#vet-content{overflow-y:auto;flex:1;padding-bottom:20px;}
`;
document.head.appendChild(style);
