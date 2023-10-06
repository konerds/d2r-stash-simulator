import './app.css';

import imgFont16 from './assets/images/font16.png';
import imgHand from './assets/images/hand.png';
import imgGemSocket from './assets/images/gemsocket.png';
import imgBgnd1 from './assets/images/bgnd1.png';
import imgBgnd2 from './assets/images/bgnd2.png';
import imgBgnd3 from './assets/images/bgnd3.png';
import imgBgnd4 from './assets/images/bgnd4.png';

import txtMagicPrefix from './assets/mpq/MagicPrefix.txt';

import { ARR_NAME_STAT } from './data/index.js';
import { CHandlerBinary } from './utils/CHandlerBinary.js';

var lang = 'eng';
var affixGroups = [['p1', 'p2', 'p3'], ['s1', 's2', 's3'], ['smod1', 'smod2', 'smod3'], ['autoaffix'], ['craft']];
var avoidGroups = [[[], [], []], [[], [], []], [[], [], []], [[]], [[]]];
var classes = ['Amazon', 'Sorceress', 'Necromancer', 'Paladin', 'Barbarian', 'Druid', 'Assassin'];
var classCodes = ['ama', 'sor', 'nec', 'pal', 'bar', 'dru', 'ass'];
var colorTable = {},
    locales = {},
    stats = {},
    dstats = {},
    ostats = {},
    tval = {},
    ival = {},
    implicits = [],
    explicits = [],
    firstLoad = true,
    defaults,
    pobj,
    sobj;

var item = {
    //User selected
    namepre: 2, // "Raven"
    namesuf: 79, // "Guard"
    quality: 6, // Rare
    classid: 448, // Aegis
    ethereal: 0,
    expansion: 1,
    level: 99,
    charlvl: 99,
    charclassid: 0, // Amazon default
    autoaffix: -1,
    p1: -1,
    p2: -1,
    p3: -1,
    s1: -1,
    s2: -1,
    s3: -1,
    smod1: -1,
    smod2: -1,
    smod3: -1,

    //Calculated
    invfile: 'invtow',
    minlevel: 0, //minimum item level to get all affixes on this item
    alvl: 0, //minimum affix level
    crafts: [], //Craft rows
    craft: -1,
    type: 'shie',
    types: [],
    class: '',
    staffmods: '',
    autogroup: 0,
    amax: 6,
    pmax: 3,
    smax: 3,
    pnum: 0,
    snum: 0,
    anum: 0,
    pickit: '',
    title: 'item',
    icolor: { name: 'none', id: 21 }, // Item color id (inventory)
    ecolor: { name: 'none', id: 21 }, // Item color id (when worn)
};

var skillTabs = [
    'StrSklTabItem3', // 0 Bow			0
    'StrSklTabItem2', // 1 P&M
    'StrSklTabItem1', // 2 Jav

    'StrSklTabItem15', // 3 Fire			1
    'StrSklTabItem14', // 4 Light
    'StrSklTabItem13', // 5 Cold

    'StrSklTabItem8', // 6 Curse			2
    'StrSklTabItem7', // 7 P&B
    'StrSklTabItem6', // 8 NSum

    'StrSklTabItem11', // 9 PComb			3
    'StrSklTabItem5', // 10 Off
    'StrSklTabItem4', // 11 Def

    'StrSklTabItem11', // 12 BComb			4
    'StrSklTabItem12', // 13 Mast
    'StrSklTabItem10', // 14 WC

    'StrSklTabItem16', // 15 DSum			5
    'StrSklTabItem17', // 16 SS
    'StrSklTabItem18', // 17 Ele

    'StrSklTabItem19', // 18 Trap			6
    'StrSklTabItem20', // 19 Shadow
    'StrSklTabItem21', // 20 MA
];

var Font16 = {
    kerning: [
        10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12,
        10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12,
        10, 12, 10, 12, 10, 12, 10, 12, 10, 8, 10, 8, 10, 7, 10, 8, 10, 8, 10, 13, 10, 12, 10, 4, 10, 5, 10, 5, 10, 6,
        10, 8, 10, 5, 10, 5, 10, 5, 10, 9, 10, 12, 10, 5, 10, 9, 10, 8, 10, 9, 10, 9, 10, 8, 10, 8, 10, 7, 10, 8, 10, 5,
        10, 5, 10, 6, 10, 7, 10, 6, 10, 8, 10, 11, 10, 12, 10, 7, 10, 9, 10, 10, 10, 8, 10, 8, 10, 10, 10, 9, 10, 5, 10,
        5, 10, 9, 10, 8, 10, 12, 10, 10, 10, 11, 10, 9, 10, 12, 10, 10, 10, 7, 10, 11, 10, 12, 10, 13, 10, 16, 10, 12,
        10, 12, 10, 10, 10, 5, 10, 9, 10, 5, 10, 5, 10, 9, 10, 5, 10, 10, 10, 7, 10, 8, 10, 8, 10, 7, 10, 7, 10, 9, 10,
        7, 10, 4, 10, 4, 10, 8, 10, 7, 10, 10, 10, 9, 10, 10, 10, 7, 10, 10, 10, 9, 10, 7, 10, 9, 10, 10, 10, 10, 10,
        13, 10, 10, 10, 10, 10, 7, 10, 6, 10, 3, 10, 6, 10, 6, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12,
        10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 5, 10, 6, 10, 12,
        10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 8, 10, 8,
        10, 7, 10, 8, 10, 7, 10, 12, 10, 3, 10, 6, 10, 6, 10, 11, 10, 9, 10, 7, 10, 10, 10, 4, 10, 11, 10, 9, 10, 7, 10,
        9, 10, 7, 10, 7, 10, 5, 10, 13, 10, 9, 10, 7, 10, 7, 10, 3, 10, 8, 10, 8, 10, 11, 10, 13, 10, 12, 10, 8, 10, 12,
        10, 12, 10, 12, 10, 12, 10, 12, 10, 12, 10, 11, 10, 10, 10, 8, 10, 7, 10, 8, 10, 8, 10, 5, 10, 5, 10, 5, 10, 7,
        10, 11, 10, 11, 10, 11, 10, 11, 10, 11, 10, 12, 10, 11, 10, 10, 10, 11, 10, 13, 10, 13, 10, 13, 10, 12, 10, 12,
        10, 8, 10, 9, 10, 11, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 8, 10, 7, 10, 6, 10, 7, 10, 7, 10, 4,
        10, 5, 10, 4, 10, 5, 10, 8, 10, 9, 10, 10, 10, 9, 10, 9, 10, 10, 10, 10, 10, 8, 10, 10, 10, 10, 10, 10, 10, 10,
        10, 10, 10, 10, 10, 7, 10, 10,
    ],
    font: [],

    load: function () {
        return new Promise((resolve, reject) => {
            var cStart = Date.now();
            var img = new Image();

            img.onload = () => {
                var fonts = [];
                var cWidth = 14;
                var cHeight = 16;

                for (var color = 0; color < 14; color++) {
                    fonts[color] = [];

                    for (var ch = 0; ch < 256; ch++) {
                        var newChar = document.createElement('canvas');
                        newChar.width = cWidth;
                        newChar.height = cHeight;
                        var ctx = newChar.getContext('2d');
                        ctx.drawImage(
                            img,
                            ch * cWidth,
                            (color > 0 ? color + 1 : 0) * cHeight,
                            cWidth,
                            cHeight,
                            0,
                            0,
                            newChar.width,
                            newChar.height
                        );
                        fonts[color].push(newChar);
                    }
                }

                console.log('Loading font took ' + (Date.now() - cStart) + 'ms');
                resolve(fonts);
            };

            img.src = imgFont16;
        }).then((result) => (Font16.font = result));
    },

    measureText: function (text) {
        var lines = Array.isArray(text) ? text : text.split('\n');
        var width = 0;
        var height = 0;

        lines.forEach((line) => {
            var tmpw = 0;
            var tmph = 0;

            for (let i = 0; i < line.length; i++) {
                let ch = line.charCodeAt(i);
                if (ch < 256) {
                    tmpw += this.kerning[ch * 2 + 1];
                    tmph += this.kerning[ch * 2];
                }
            }

            width = tmpw > width ? tmpw : width;
            height = tmph > height ? tmph : height;
        });

        return { width: width, height: height };
    },

    drawText(graphics, x, y, text, color) {
        var x_pos = Math.round(x);
        var y_pos = Math.round(y);
        var lines = Array.isArray(text) ? text : text.split('\n');

        lines.forEach((line) => {
            for (let i = 0; i < line.length; i++) {
                let ch = line.charCodeAt(i);
                if (ch < 256) {
                    graphics.drawImage(this.font[color][ch], x_pos, y_pos);
                    x_pos += this.kerning[ch * 2 + 1];
                }
            }
            x_pos = x;
            y_pos += 16;
        });
    },
};

//Async file gets
Promise.all([
    Font16.load(),
    getFile(txtMagicPrefix).then((str) => (window.magicPrefix = parseTable(str))),
    getFile('./assets/mpq/MagicSuffix.txt').then((str) => (window.magicSuffix = parseTable(str))),
    getFile('./assets/mpq/automagic.txt').then((str) => (window.autoMagic = parseTable(str))),
    getFile('./assets/mpq/skills.txt').then((str) => (window.skills = parseTable(str))),
    getFile('./assets/mpq/weapons.txt').then((str) => (window.weapons = parseTable(str))),
    getFile('./assets/mpq/armor.txt').then((str) => (window.armor = parseTable(str))),
    getFile('./assets/mpq/misc.txt').then((str) => (window.misc = parseTable(str))),
    getFile('./assets/mpq/ItemTypes.txt').then((str) => (window.itemTypes = parseTable(str))),
    getFile('./assets/mpq/cubemain.txt').then((str) => (window.cubeMain = parseTable(str))),
    getFile('./assets/mpq/colors.txt').then((str) => (window.colors = parseTable(str))),
    getFile('./assets/mpq/gamble.txt').then((str) => (window.gamble = parseTable(str))),
    getFile('./assets/mpq/RarePrefix.txt').then((str) => (window.rarePrefix = parseTable(str))),
    getFile('./assets/mpq/RareSuffix.txt').then((str) => (window.rareSuffix = parseTable(str))),
    getFile('./assets/mpq/ItemStatCost.txt').then((str) => (window.itemStatCost = parseTable(str, true))),
    getFile('./assets/mpq/Properties.txt').then((str) => (window.properties = parseTable(str, true))),
    getFile('./assets/lang/' + lang + '/string.tbl', true).then((str) => (window.stringtbl = str)), // 390,570 bytes
    getFile('./assets/lang/' + lang + '/expansionstring.tbl', true).then((str) => (window.expansionstringtbl = str)), // 173,234 bytes
    getFile('./assets/lang/' + lang + '/patchstring.tbl', true).then((str) => (window.patchstringtbl = str)), // 35,678 bytes
])
    .then(() => parseLocales())
    .then(() => build());

function saveD2i() {
    var br = new CHandlerBinary(),
        base = baseTypes[item.classid],
        code = base.code,
        sock = Math.min(item.maxsockets, stats['sock'] || 0),
        a,
        val;

    br.write16(0x4d4a); // Header 'JM'
    br.bits(0, 4); // ?
    br.bits(1, 1); // Identified
    br.bits(0, 6); // ?
    br.bits(sock > 0 ? 1 : 0, 1); // Socketed
    br.bits(0, 1); // ?
    br.bits(0, 1); // Picked since last save
    br.bits(0, 2); // ?
    br.bits(0, 1); // Ear
    br.bits(0, 1); // Starter item
    br.bits(0, 3); // ?
    br.bits(0, 1); // Simple
    br.bits(item.ethereal, 1); // Ethereal
    br.bits(0, 1); // ?
    br.bits(0, 1); // Personalized
    br.bits(0, 1); // ?
    br.bits(0, 1); // Runeword
    br.bits(0x0ca0, 15); // ?
    br.bits(0, 3); // Location (0 = Stored)
    br.bits(0, 4); // Bodylocation
    br.bits(0, 4); // Column index
    br.bits(0, 3); // Row index
    br.bits(0, 1); // ?
    br.bits(1, 3); // Container
    br.bits(code.charCodeAt(0), 8); // Code[0]
    br.bits(code.charCodeAt(1), 8); // Code[1]
    br.bits(code.charCodeAt(2), 8); // Code[2]
    br.bits(32, 8); // Code[3]
    br.bits(0, 3); // Socketed item #
    br.bits(0, 32); // ?
    br.bits(item.level, 7); // ilvl
    br.bits(item.quality, 4); // Quality
    br.bits(0, 1); // Custom gfx?

    if (item.autoaffix + 1) {
        br.bits(1, 1); // Autoaffix?
        br.bits(item.autoaffix + 1, 11); // Autoaffix index
    } else {
        br.bits(0, 1);
    }

    switch (item.quality) {
        case 4:
            br.bits(item.p1 + 1 ? item.p1 + 1 : 0, 11); // ? name prefix??
            br.bits(item.s1 + 1 ? item.s1 + 1 : 0, 11); // ? name suffix??
            break;
        case 6:
        case 8:
            br.bits(item.namepre + 1 ? item.namepre + 156 : 0, 8);
            br.bits(item.namesuf + 1 ? item.namesuf + 1 : 0, 8);
            if (item.p1 + 1) {
                br.bits(1, 1);
                br.bits(item.p1 + 1, 11);
            } else br.bits(0, 1);
            if (item.s1 + 1) {
                br.bits(1, 1);
                br.bits(item.s1 + 1, 11);
            } else br.bits(0, 1);
            if (item.p2 + 1) {
                br.bits(1, 1);
                br.bits(item.p2 + 1, 11);
            } else br.bits(0, 1);
            if (item.s2 + 1) {
                br.bits(1, 1);
                br.bits(item.s2 + 1, 11);
            } else br.bits(0, 1);
            if (item.p3 + 1) {
                br.bits(1, 1);
                br.bits(item.p3 + 1, 11);
            } else br.bits(0, 1);
            if (item.s3 + 1) {
                br.bits(1, 1);
                br.bits(item.s3 + 1, 11);
            } else br.bits(0, 1);
            break;
    }

    //br.bits(0, 5); // Only applies to tp and id tomes
    br.bits(0, 1);

    if (item.classid > 305 && item.classid < 508) {
        // Is from armor table
        val = stats['ac%'] || stats['ac%/lvl'] ? base.maxac + 1 : base.maxac;
        if (val && [91, 92, 93, 94].indexOf(item.craft) !== -1 && dstats['ac%'].affix.hasOwnProperty('name')) val += 1; // Thanks @Kaylin
        if (val && item.ethereal) val = Math.floor(val * 1.5);
        br.bits((val || 0) + 10, 11); // Defense
    }

    if (item.classid < 508) {
        // Is from wep/armor table
        val = tval.durability || 0;
        br.bits(val, 8); // Dura
        if (val) br.bits(val, 9); // Maxdura
    }

    if (base.stackable) {
        br.bits(base.maxstack || 0, 9); // Quantity
    }

    if (sock > 0) br.bits(sock, 4);

    var bstats = {},
        cstats = {};
    for (a in dstats) bstats[a] = dstats[a];
    if (bstats.hasOwnProperty('res-all')) {
        let composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (let i = 0; i < composite.length; i++) {
            bstats[composite[i]] = {};
            bstats[composite[i]].value = dstats['res-all'].value;
            bstats[composite[i]].modcode = composite[i];
            bstats[composite[i]].properties = properties[composite[i]];
            bstats[composite[i]].itemstat = itemStatCost[modcodeToItemStat(composite[i])];
        }

        delete bstats['res-all'];
    }
    for (a in bstats) {
        var stat = bstats[a].itemstat.stat;

        if (a === 'smod1' || a === 'smod2' || a === 'smod3') {
            stat = a;
        }

        cstats[stat] = {};
        cstats[stat]['value'] = bstats[a]['value'];
        cstats[stat]['modmin'] = bstats[a]['modmin'];
        cstats[stat]['modmax'] = bstats[a]['modmax'];
        cstats[stat]['modparam'] = bstats[a]['modparam'];
        cstats[stat]['val1'] = bstats[a].properties['val1'];

        cstats[stat]['stat'] = stat;
        cstats[stat]['id'] = bstats[a].itemstat['id'];
        cstats[stat]['save add'] = bstats[a].itemstat['save add'];
        cstats[stat]['save bits'] = bstats[a].itemstat['save bits'];
        cstats[stat]['save param bits'] = bstats[a].itemstat['save param bits'];

        if (a === 'smod1' || a === 'smod2' || a === 'smod3') {
            cstats[stat]['val1'] = bstats[a].skill.id;
        }
    }

    for (a in cstats) {
        if (!cstats.hasOwnProperty(a)) continue;

        var stat = cstats[a];

        switch (a) {
            case 'firemaxdam':
            case 'lightmaxdam':
            case 'magicmaxdam':
                if (cstats.hasOwnProperty(a.replace('max', 'min'))) break;
                br.bits(cost.id, 9);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                break;

            case 'firemindam':
            case 'lightmindam':
            case 'magicmindam':
                var b = a.replace('min', 'max');
                var stat2 = cstats[b];
                br.bits(stat.id, 9);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                br.bits(stat2.value + stat2['save add'], stat2['save bits']);
                delete cstats[b];
                break;

            case 'coldmindam':
            case 'poisonmindam':
                var stat2 = itemStatCost[a.replace('min', 'max')];
                var stat3 = itemStatCost[a.replace('mindam', 'length')];
                br.bits(stat.id, 9);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                br.bits(stat.value + stat2['save add'], stat2['save bits']);
                br.bits(stat.modparam + stat3['save add'], stat3['save bits']);
                break;

            case 'itemaddskilltab':
                br.bits(stat.id, 9);
                br.bits(stat.modparam % 3, 3); // Tab 0-2
                br.bits(Math.floor(stat.modparam / 3), 13); // Class 0-6
                br.bits(stat.value + stat['save add'], stat['save bits']);
                break;

            case 'itemskillonhit':
            case 'itemskillonattack':
            case 'itemskillongethit':
                br.bits(stat.id, 9);
                br.bits(stat.modmax, 6);
                br.bits(stat.modparam, 10);
                br.bits(stat.modmin, stat['save bits']);
                break;

            case 'itemchargedskill':
                br.bits(stat.id, 9);
                val = Math.max(
                    1,
                    Math.floor(
                        (item.level - skills[stat.value].reqlevel) /
                            Math.floor((99 - skills[stat.value].reqlevel) / Math.abs(stat.modmax))
                    )
                );
                br.bits(val, 6); // Level
                br.bits(stat.modparam, 10); // Skill
                val = Math.floor((Math.abs(stat.modmin) * val) / 8) + Math.abs(stat.modmin);
                br.bits(val, 8); // Charges
                br.bits(val, 8); // Maxcharges
                break;

            case 'itemnumsockets':
                break;

            case 'itemindesctructible':
                br.bits(stat.id, 9);
                br.bits(1, stat['save bits']);
                break;

            case 'smod1':
            case 'smod2':
            case 'smod3':
                br.bits(stat.id, 9);
                br.bits(stat.val1, stat['save param bits']);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                break;

            case 'damagepercent':
                var min = itemStatCost['itemmindamagepercent'];
                var max = itemStatCost['itemmaxdamagepercent'];
                br.bits(max.id, 9);
                br.bits(stat.value + max['save add'], max['save bits']);
                br.bits(stat.value + min['save add'], min['save bits']);
                break;

            case 'maxdamage':
                if (item.types.indexOf('char') !== -1 || item.types.indexOf('jewl') !== -1) {
                    br.bits(22, 9); // 1h max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    br.bits(24, 9); // 2h max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    br.bits(160, 9); // Throw max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    break;
                }
                if (base['2handed']) {
                    br.bits(24, 9); // 2h max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                } else {
                    br.bits(22, 9); // 1h max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                }
                if (base.stackable) {
                    br.bits(160, 9); // Throw max
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                }
                break;

            case 'mindamage':
                if (item.types.indexOf('char') !== -1 || item.types.indexOf('jewl') !== -1) {
                    br.bits(21, 9); // 1h min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    br.bits(23, 9); // 2h min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    br.bits(159, 9); // Throw min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                    break;
                }
                if (base['2handed']) {
                    br.bits(23, 9); // 2h min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                } else {
                    br.bits(21, 9); // 1h min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                }
                if (base.stackable) {
                    br.bits(159, 9); // Throw min
                    br.bits(stat.value + stat['save add'], stat['save bits']);
                }
                break;

            default:
                br.bits(stat.id, 9);
                if (stat['save param bits']) br.bits(stat.val1, stat['save param bits']);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                break;
        }
    }

    br.bits(511, 9);
    br.align();

    a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([br.finish()], { type: 'application/octet-stream' }));
    a.download = item.title + '.d2i';
    a.click();
}

var ItemScreenshot = {
    // Settings

    showItemColor: false, // Show the item color at the end of the desc
    drawCursor: true, // Draw the cursor
    drawSockets: true, // Draw sockets and socketed items
    drawEthereal: true, // Draw ethereal item gfx
    drawBackground: true, // Draw cube background
    debug: false, // Log image generation steps

    // ------ No touchy ------

    hand: function () {
        let img = new Image();
        img.src = imgHand;
        return img;
    }.call(),
    socket: function () {
        let img = new Image();
        img.src = imgGemSocket;
        return img;
    }.call(),

    bgnd: [
        function () {
            let img = new Image();
            img.src = imgBgnd1;
            return img;
        }.call(),
        function () {
            let img = new Image();
            img.src = imgBgnd2;
            return img;
        }.call(),
        function () {
            let img = new Image();
            img.src = imgBgnd3;
            return img;
        }.call(),
        function () {
            let img = new Image();
            img.src = imgBgnd4;
            return img;
        }.call(),
    ],

    create: function (info) {
        let i,
            n,
            width,
            image,
            iStart = Date.now(),
            num2 = 16,
            num1 = 0;

        //console.log(JSON.stringify(info));

        if (this.showItemColor && info.color.id !== 21) {
            info.desc.push({ colors: [5], strings: [' '] });
            info.desc.push({ colors: [5], strings: [info.color.name] });
        }

        for (i = 0; i < info.desc.length; i++) {
            info.desc[i].widths = [];
            info.desc[i].totalwidth = 0;

            for (n = 0; n < info.desc[i].strings.length; n++) {
                width = Font16.measureText(info.desc[i].strings[n]).width;

                info.desc[i].widths.push(width);
                info.desc[i].totalwidth += width;
            }

            if (info.desc[i].totalwidth > num1) {
                num1 = info.desc[i].totalwidth;
            }
        }

        if (num1 < 100) num1 = 100;

        image = new Image();

        image.onload = () => {
            var x,
                y,
                top,
                left = 0;

            if (image.height < 30) {
                y = 1;
                top = 32;
            } else if (image.height < 65) {
                y = 2;
                top = 61;
            } else if (image.height < 95) {
                y = 3;
                top = 90;
            } else {
                y = 4;
                top = 119;
            }

            if (image.width < 37) {
                x = 1;
                left = 213; // 212 originally
            } else {
                x = 2;
                left = 226;
            }

            var canvas = document.createElement('canvas');
            canvas.width = num1 + 14;
            canvas.height = num2 * info.desc.length + top + 1;
            document.getElementById('middle').innerHTML = '';
            document.getElementById('middle').append(canvas);
            var graphics = canvas.getContext('2d');

            if (this.debug) console.log('Setting black canvas');
            graphics.fillStyle = 'rgba(10, 10, 10, 1)';
            graphics.fillRect(0, 0, canvas.width, canvas.height);

            if (this.drawBackground) {
                if (this.debug) console.log('Drawing background');
                graphics.drawImage(this.bgnd[y - 1], Math.round(canvas.width / 2) - left, -9); // top -10 originally

                if (this.debug) console.log('Drawing item-active background');
                if (this.drawCursor) {
                    graphics.fillStyle = 'rgba(0, 128, 0, 0.1)';
                } else {
                    graphics.fillStyle = 'rgba(0, 0, 255, 0.1)';
                }

                graphics.fillRect((canvas.width - image.width) / 2, 5, image.width, image.height);
            }

            if (this.debug) console.log('Drawing item gfx');
            if (this.drawEthereal && info.ethereal) graphics.globalAlpha = 0.5;
            graphics.drawImage(image, Math.round((canvas.width - image.width) / 2), 5);
            graphics.globalAlpha = 1.0;

            if (this.drawSockets) {
                let num3 = Math.round((canvas.width - image.width) / 2);
                let num4 = num3 + 14;
                let num5 = num4 + 14;
                let num6 = 5;
                let num7 = 34;
                let num8 = 63;
                let num9 = 92;
                let num10 = 14;
                let num11 = 1;
                let num12 = -1;

                let socketPositions = [];

                switch (info.sockets) {
                    case 1:
                        if (y === 2) {
                            if (x === 1) {
                                socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                                break;
                            }
                            socketPositions.push({ x: num4 + num11, y: num6 + num10 + num12 });
                            break;
                        }
                        if (y === 3) {
                            if (x === 1) {
                                socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                                break;
                            }
                            socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                            break;
                        }
                        if (x === 1) {
                            socketPositions.push({ x: num3 + num11, y: num7 + num10 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num4 + num11, y: num7 + num10 + num12 });
                        break;
                    case 2:
                        if (y === 2) {
                            if (x === 1) {
                                socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                                socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                                break;
                            }
                            socketPositions.push({ x: num4 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                            break;
                        }
                        if (y === 3) {
                            if (x === 1) {
                                socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                                socketPositions.push({ x: num3 + num11, y: num7 + num10 + num12 });
                                break;
                            }
                            socketPositions.push({ x: num4 + num11, y: num6 + num10 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num7 + num10 + num12 });
                            break;
                        }
                        if (x === 1) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num8 + num10 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num4 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num8 + num10 + num12 });
                        break;
                    case 3:
                        if (y === 2) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                            break;
                        }
                        if (y === 3) {
                            if (x === 1) {
                                socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                                socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                                socketPositions.push({ x: num3 + num11, y: num8 + num12 });
                                break;
                            }
                            socketPositions.push({ x: num4 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num8 + num12 });
                            break;
                        }
                        if (x === 1) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num7 + num10 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num8 + num10 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num4 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num7 + num10 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num8 + num10 + num12 });
                        break;
                    case 4:
                        if (y === 3) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num6 + num10 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num7 + num10 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num7 + num10 + num12 });
                            break;
                        }
                        if (y === 2) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num7 + num12 });
                            break;
                        }
                        if (x === 1) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num8 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num9 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num4 + num11, y: num6 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num8 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num9 + num12 });
                        break;
                    case 5:
                        if (y === 3) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num4 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num8 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num8 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num5 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num4 + num11, y: num7 + num10 + num12 });
                        socketPositions.push({ x: num3 + num11, y: num8 + num10 + num12 });
                        socketPositions.push({ x: num5 + num11, y: num8 + num10 + num12 });
                        break;
                    case 6:
                        if (y === 3) {
                            socketPositions.push({ x: num3 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num6 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num7 + num12 });
                            socketPositions.push({ x: num3 + num11, y: num8 + num12 });
                            socketPositions.push({ x: num5 + num11, y: num8 + num12 });
                            break;
                        }
                        socketPositions.push({ x: num3 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num5 + num11, y: num6 + num10 + num12 });
                        socketPositions.push({ x: num3 + num11, y: num7 + num10 + num12 });
                        socketPositions.push({ x: num5 + num11, y: num7 + num10 + num12 });
                        socketPositions.push({ x: num3 + num11, y: num8 + num10 + num12 });
                        socketPositions.push({ x: num5 + num11, y: num8 + num10 + num12 });
                        break;
                    default:
                        break;
                }

                for (let i = 0; i < info.sockets && socketPositions.length; i++) {
                    graphics.globalAlpha = 0.3;
                    graphics.drawImage(this.socket, socketPositions[i].x - 2, socketPositions[i].y + 1);

                    graphics.globalAlpha = 1.0;
                }
            }

            if (this.debug) console.log('Drawing text');
            var index = 0;

            info.desc.forEach((line) => {
                let i,
                    pos = {
                        x: canvas.width / 2,
                        y: index * num2 + top - 1,
                    };

                let shift = line.totalwidth / 2;
                let xshift = 0;

                for (i = 0; i < line.strings.length; i++) {
                    Font16.drawText(graphics, pos.x - shift + xshift, pos.y, line.strings[i], line.colors[i]);
                    xshift += line.widths[i];
                }

                index += 1;
            });

            if (this.drawCursor) {
                if (this.debug) console.log('Drawing cursor');
                graphics.drawImage(this.hand, Math.round((canvas.width + image.width) / 2) - 5, 5 + 5);
            }

            if (this.debug) console.log('Creating item screenshot took ' + (Date.now() - iStart) + 'ms');
        };

        import('./assets/gfx/' + info.image + '/' + info.color.id + '.png').then((imgDynamic) => {
            image.src = imgDynamic;
        });
    },
};

var param = {
    get: function (name) {
        let reg = new RegExp('[&|#]' + name + '=([^&#]+)');
        let val = window.location.hash.match(reg);
        return !val ? '' : val[1];
    },
    set: function (name, value) {
        let reg = new RegExp(name + '=([^&#]+)');
        let ind = window.location.hash.indexOf(name + '=');
        if (ind < 0) window.location.hash += name + '=' + value + '&';
        window.location.hash = window.location.hash.replace(reg, name + '=' + value);
    },
    list: function () {
        let pairs = window.location.hash.substring(1).split('&');
        let params = {};
        for (let i = 0; pairs[0] !== '' && i < pairs[i].length; i++) {
            let pair = pairs[i].split('=');
            params[pair[0]] = pair[1];
        }
        return pairs[0] !== '' ? params : false;
    },
    loadAll: function () {
        let pairs = window.location.hash.substring(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
            if (!pairs[i]) continue;
            let pair = pairs[i].split('=');
            item[pair[0]] = +pair[1];
            if (pair[0].indexOf('range') > -1) {
                document.getElementById(pair[0]).value = +pair[1];
            } else {
                document.getElementById(pair[0] + '-Select').value = +pair[1];
            }
        }
    },
    setAll: function () {
        window.location.hash = '';
        for (var key in item) {
            //if (["type","types","class","staffmods","autogroup","amax","pmax","smax","pnum","snum","anum","maxsockets"].indexOf(key) > -1) continue;
            if (
                [
                    'quality',
                    'namepre',
                    'namesuf',
                    'classid',
                    'ethereal',
                    'expansion',
                    'level',
                    'charlvl',
                    'charclassid',
                    'autoaffix',
                    'p1',
                    'p2',
                    'p3',
                    's1',
                    's2',
                    's3',
                    'smod1',
                    'smod2',
                    'smod3',
                    'craft',
                ].indexOf(key) === -1 &&
                key.indexOf('range') === -1
            )
                continue;
            if (!defaults.hasOwnProperty(key) || item[key] !== defaults[key]) {
                //console.log(key);
                this.set(key, item[key]);
            }
        }
    },
};

function readCString(dr, offset) {
    var str = '';
    var s = 0;

    while (true) {
        var charCode = dr.getUint8(offset + s);
        if (charCode < 1) break;

        str += String.fromCharCode(charCode);
        s++;
    }

    return str;
}

function parseLocale(bytestream) {
    // Special thanks to "Doug the master programmer"
    var dr = new DataView(bytestream);

    var numElements = dr.getUint16(2, true);
    var indexBase = 21;
    var hashBase = indexBase + numElements * 2;

    for (let i = 0; i < numElements; i++) {
        var hash = dr.getUint16(indexBase + i * 2, true);
        var offset = hashBase + hash * 17;

        if (dr.getUint8(offset) < 1) continue;

        //var index = dr.getUint16(offset + 1, true);
        var keyOffset = dr.getInt32(offset + 7, true);
        var strOffset = dr.getInt32(offset + 11, true);

        var key = readCString(dr, keyOffset); //.toLowerCase();
        var val = readCString(dr, strOffset); //.toLowerCase();

        locales[key] = val;
    }

    return true;
}

function parseLocales() {
    // string.tbl > expansionstring.tbl > patchstring.tbl
    parseLocale(window.stringtbl.buffer);
    parseLocale(window.expansionstringtbl.buffer);
    parseLocale(window.patchstringtbl.buffer);
    locales['strModEnhancedDamage'] = 'Enhanced Damage';
    locales['skillname61'] = locales['skillsname61'];
    locales['Skillname223'] = 'Poison Creeper';
    console.log('Parsed locales (' + lang + ')');
    //console.log(locales);
}

function reload() {
    window.location.hash = '';
    window.location.reload();
}

function hideSelect(select) {
    item[select] = -1;
    document.getElementById(select + '-Div').style.display = 'none';
    document.getElementById(select + '-Select').value = -1;
    document.getElementById(select + '-range1Div').style.display = 'none';
    document.getElementById(select + '-range2Div').style.display = 'none';
    document.getElementById(select + '-range3Div').style.display = 'none';
    document.getElementById(select + '-range1Div').classList.remove('last');
    document.getElementById(select + '-range2Div').classList.remove('last');
    document.getElementById(select + '-range3Div').classList.remove('last');
    getAffixCount();
}

function showSelect(select) {
    document.getElementById(select + '-Div').style.display = 'block';
}

function build() {
    var excludeTypes = [
            'rune',
            'key',
            'gold',
            'ques',
            'gemz',
            'gemx',
            'gemd',
            'gemr',
            'geme',
            'gems',
            'gemt',
            'gema',
            'bowq',
            'xboq',
        ],
        select,
        option,
        n,
        sortedTypes;

    console.log('Building menus');
    window.baseTypes = weapons.concat(armor, misc);
    defaults = Object.assign({}, item);

    sortedTypes = Object.assign([], baseTypes);
    for (let n = 0; n < sortedTypes.length; n++) {
        sortedTypes[n].locale = locales[sortedTypes[n].namestr] || sortedTypes[n].name;
        sortedTypes[n].value = n;
    }
    sortedTypes.sort((a, b) => (a.locale > b.locale ? 1 : -1));

    magicSuffix[433].itype2 = 'ring';
    magicSuffix[434].itype2 = 'ring';
    magicSuffix[435].itype2 = 'ring';

    select = document.getElementById('classid-Select');
    for (let i = 0; i < sortedTypes.length; i++) {
        if (!sortedTypes[i].name) continue;
        if (sortedTypes[i].useable) continue;
        if (excludeTypes.indexOf(sortedTypes[i].type) > -1) continue;
        if ((!sortedTypes[i].spawnable || !sortedTypes[i].rarity) && !sortedTypes[i].nameable) continue;
        option = document.createElement('option');
        option.text = sortedTypes[i].locale;
        option.value = sortedTypes[i].value;
        option.id = 'classid-' + sortedTypes[i].value;
        select.add(option, i);
    }

    for (let n = 0; n < 3; n++) {
        // Prefixes
        select = document.getElementById('p' + (n + 1) + '-Select');
        for (let i = 0; i < magicPrefix.length; i++) {
            if (!magicPrefix[i].name) continue;
            if (!magicPrefix[i].spawnable) continue;
            option = document.createElement('option');
            option.text = locales[magicPrefix[i].name] + ' (' + magicPrefix[i].mod1code + ')';
            option.value = i;
            option.id = 'p' + (n + 1) + '-' + i;
            select.add(option);
        }
    }

    for (let n = 0; n < 3; n++) {
        // Suffixes
        select = document.getElementById('s' + (n + 1) + '-Select');
        for (let i = 0; i < magicSuffix.length; i++) {
            if (!magicSuffix[i].name) continue;
            if (!magicSuffix[i].spawnable) continue;
            option = document.createElement('option');
            option.text = locales[magicSuffix[i].name] + ' (' + magicSuffix[i].mod1code + ')';
            option.value = i;
            option.id = 's' + (n + 1) + '-' + i;
            select.add(option);
        }
    }

    select = document.getElementById('namepre-Select'); // Rareprefixes
    for (let i = 0; i < rarePrefix.length; i++) {
        option = document.createElement('option');
        option.text = locales[rarePrefix[i].name] || rarePrefix[i].name;
        option.value = i;
        option.id = 'namepre-' + i;
        if (i === 2) option.selected = true;
        select.add(option);
    }

    select = document.getElementById('namesuf-Select'); // Raresuffixes
    for (let i = 0; i < rareSuffix.length; i++) {
        option = document.createElement('option');
        option.text = locales[rareSuffix[i].name] || rareSuffix[i].name;
        option.value = i;
        option.id = 'namesuf-' + i;
        if (i === 79) option.selected = true;
        select.add(option);
    }

    select = document.getElementById('autoaffix-Select'); // Autoaffixes
    for (let i = 0; i < autoMagic.length; i++) {
        if (!autoMagic[i].name) continue;
        option = document.createElement('option');
        option.text = locales[autoMagic[i].name] + '   (' + autoMagic[i].mod1code + ')';
        option.value = i;
        option.id = 'autoaffix-' + i;
        select.add(option);
    }

    for (let n = 0; n < 3; n++) {
        // Staffmods
        select = document.getElementById('smod' + (n + 1) + '-Select');
        for (let i = 0; i < skills.length; i++) {
            if (!skills[i].charclass) continue;
            skills[i].name = locales['skillname' + i] || locales['Skillname' + (i + 1)];
            option = document.createElement('option');
            //option.text = skills[i].skill + " (" + skills[i].charclass + ")";
            option.text = skills[i].name + ' (' + skills[i].charclass + ')';
            option.value = i;
            option.id = 'smod' + (n + 1) + '-' + i;
            select.add(option);
        }
    }

    select = document.getElementById('craft-Select'); // Crafted affix
    for (let n = 0; n < cubeMain.length; n++) {
        if (cubeMain[n]['input 2'] !== 'jew') continue;
        if (cubeMain[n]['numinputs'] !== 4) continue;
        option = document.createElement('option');
        option.text = cubeMain[n].description.split('-> ')[1];
        option.value = n;
        option.id = 'craft-' + n;
        select.add(option);
    }

    for (let i = 0; i < colors.length; i++) {
        colorTable[colors[i].code] = {
            name: colors[i]['transform color'],
            id: i,
        };
    }

    updateItemStatCost();
    param.loadAll();
    update();
}

function getItemTypes() {
    let t,
        i,
        itemType,
        itemTypeEquiv,
        itemTypeEquivs = [];
    item.staffmods = '';
    item.types = [];
    item.typeNames = [];
    item.class = '';
    for (t = 0; t < itemTypes.length; t++) {
        if (itemTypes[t].code == item.type) break;
    }
    itemType = itemTypes[t]; //Original row of item type
    if (itemType.magic && !itemType.rare) item.maxquality = 4;
    if (itemType.rare) item.maxquality = 6;
    item.maxsockets = Math.min(
        baseTypes[item.classid].invwidth * baseTypes[item.classid].invheight,
        (item.level <= 25 ? itemType.maxsock1 : 0) || (item.level >= 41 ? itemType.maxsock40 : 0) || itemType.maxsock25,
        baseTypes[item.classid].gemsockets || 0
    );
    itemTypeEquivs.push(itemType.code);
    while (itemTypeEquivs.length) {
        itemTypeEquiv = itemTypeEquivs.shift();
        for (i = 0; i < itemTypes.length; i++) {
            if (itemTypeEquiv == itemTypes[i].code) {
                item.typeNames.push(itemTypes[i].itemtype);
                item.types.push(itemTypes[i].code);
                if (itemTypes[i].equiv1) itemTypeEquivs.push(itemTypes[i].equiv1);
                if (itemTypes[i].equiv2) itemTypeEquivs.push(itemTypes[i].equiv2);
                if (itemTypes[i].staffmods) item.staffmods = itemTypes[i].staffmods;
                if (itemTypes[i].class) item.class = itemTypes[i].class;
            }
        }
    }
}

function parseTable(table, mode = false) {
    let string = table.replace(/_|"/g, ''), //.toLowerCase(),
        lines = string.split('\r\n'),
        columns = lines.shift().toLowerCase().split('	'), // Column names lowercased ONLY
        rows = !mode ? [] : {},
        row = {},
        expansion = string.indexOf('Expansion') === -1 ? 1 : 0,
        rowData,
        i;
    lines.pop();
    for (i = 0; i < lines.length; i++) {
        rowData = lines[i].split('	');
        if (rowData[0] == 'Expansion') {
            expansion = 1;
            continue;
        }
        row = {};
        for (var n = 0; n < rowData.length; n++) {
            if (row[columns[n]]) continue;
            row[columns[n]] = isNaN(+rowData[n]) ? rowData[n] : +rowData[n];
        }
        row.expansion = expansion;
        if (!mode) rows.push(row);
        if (mode) rows[rowData[0]] = row;
    }
    console.log('Parsed table with ' + (rows.length || Object.keys(rows).length) + ' rows');
    //console.log(rows);
    return rows;
}

function getFile(path, binary = false) {
    return new Promise(function (resolve, reject) {
        let file = new XMLHttpRequest();
        if (binary) file.responseType = 'arraybuffer';
        file.onreadystatechange = function () {
            if (file.readyState === 4) {
                if (file.status === 200) {
                    //console.log("Loaded file " + path);
                    if (binary) {
                        resolve(new Uint8Array(file.response));
                    } else {
                        resolve(file.responseText);
                    }
                }
            }
        };
        file.open('GET', path, true);
        file.send();
    });
}

function getMaxAffixCount() {
    switch (item.quality) {
        case 6: //rare
            item.amax = 6;
            item.pmax = 3;
            item.smax = 3;

            if (item.classid === 643) {
                //Is a jewel
                item.amax = 4;
            }
            break;

        case 8: //crafted
            item.amax = 4;
            item.pmax = 3;
            item.smax = 3;
            break;

        default: //magic
            item.amax = 2;
            item.pmax = 1;
            item.smax = 1;
    }
}

function getAffixCount() {
    item.pnum = [item.p1, item.p2, item.p3].filter((k) => k !== -1).length;
    item.snum = [item.s1, item.s2, item.s3].filter((k) => k !== -1).length;
    item.anum = item.pnum + item.snum;
    item.smodnum = [item.smod1, item.smod2, item.smod3].filter((k) => k !== -1).length;
}

function getAvoidGroups(affix) {
    for (let i = 0; i < affixGroups.length; i++) {
        if (affixGroups[i].indexOf(affix) > -1) {
            return avoidGroups[i][affixGroups[i].indexOf(affix)];
        }
    }

    return [];
}

function setAvoidGroups() {
    let i, n;
    avoidGroups[0] = [[], [], []];
    avoidGroups[1] = [[], [], []];

    for (i = 0; i < 3; i++) {
        //iterate the prefixes
        for (n = 0; n < 3; n++) {
            if (i !== n && item[affixGroups[0][i]] !== -1) {
                avoidGroups[0][n].push(magicPrefix[item[affixGroups[0][i]]].group);
            }
        }
    }

    for (i = 0; i < 3; i++) {
        //iterate the prefixes
        for (n = 0; n < 3; n++) {
            if (i !== n && item[affixGroups[1][i]] !== -1) {
                avoidGroups[1][n].push(magicSuffix[item[affixGroups[1][i]]].group);
            }
        }
    }
}

function filterAffixGroup(affixTable, affixGroup) {
    for (let i = 0; i < affixGroup.length; i++) {
        filterAffixes(affixTable, affixGroup[i]);
    }
}

function affixOverCap(affix) {
    if (affix === 'p3' && item.pmax <= 2) return true;
    if (affix === 'p2' && item.pmax <= 1) return true;

    if (affix === 's3' && item.smax <= 2) return true;
    if (affix === 's2' && item.smax <= 1) return true;

    if (item.anum > item.amax) {
        if (affix === 's2' && item.pnum >= 3) return true;
        if (affix === 's3' && item.pnum >= 2) return true;

        if (affix === 'p2' && item.snum >= 3) return true;
        if (affix === 'p3' && item.snum >= 2) return true;
    }

    return false;
}

function filterAffixes(affixTable, affix) {
    let i, avoid;

    avoid = getAvoidGroups(affix); //Get the affix groups that are already selected
    //console.log("Filtering " + affix + " (Avoiding groups : " + avoid.join(",") + ")");

    switch (affix) {
        case 'craft':
            for (i = 0; i < cubeMain.length; i++) {
                if (cubeMain[i]['input 2'] !== 'jew') continue;
                if (cubeMain[i]['numinputs'] !== 4) continue;

                document.getElementById(affix + '-' + i).disabled = true;

                if (!item.expansion) continue;
                if (item.quality !== 8) continue;
                if (item.crafts.indexOf(i) === -1) continue;

                document.getElementById(affix + '-' + i).disabled = false;
            }
            break;

        case 'smod1': //smods
        case 'smod2':
        case 'smod3':
            //item[affix+'total'] = {1:0,6:0,12:0,18:0,24:0,30:0};

            for (i = 0; i < affixTable.length; i++) {
                if (!affixTable[i].charclass) continue;

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].charclass !== item.staffmods) continue;
                //if ((affixTable[i].itypea1 && item.types.indexOf(affixTable[i].itypea1) === -1) &&
                //	(affixTable[i].itypea2 && item.types.indexOf(affixTable[i].itypea2) === -1)) continue;
                if (affix === 'smod1' && (item.smod2 === i || item.smod3 === i)) continue;
                if (affix === 'smod2' && (item.smod1 === i || item.smod3 === i)) continue;
                if (affix === 'smod3' && (item.smod1 === i || item.smod2 === i)) continue;
                if (item.smodlevelreqs.indexOf(affixTable[i].reqlevel) === -1) continue;

                //item[affix+'total'][affixTable[i].reqlevel] += 1;
                document.getElementById(affix + '-' + i).disabled = false;
            }
            break;

        default: //prefixes/suffixes/autoaffixes
            item[affix + 'totalfreq'] = 0;
            item[affix + 'groupfreq'] = 0;

            if (affixGroups[0].indexOf(affix) > -1) pobj = {};
            if (affixGroups[1].indexOf(affix) > -1) sobj = {};

            for (i = 0; i < affixTable.length; i++) {
                if (!affixTable[i].name) continue; //Affix has no name
                if (!affixTable[i].spawnable) continue; //Affix cannot spawn

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].version === 0) continue; //Old affixes that aren't used anymore
                if (affixTable[i].version !== 1 && !item.expansion) continue; //Item version isn't same as affix
                if (!affixTable[i].rare && item.quality !== 4) continue; //Item is not magic and this affix only spawns on magic items
                if (item.types.indexOf(affixTable[i].etype1) > -1) continue; //Item has an equiv matching one of the groups this affix cannot be on
                if (item.types.indexOf(affixTable[i].etype2) > -1) continue;
                if (item.types.indexOf(affixTable[i].etype3) > -1) continue;
                if (affixTable[i].etype4 && item.types.indexOf(affixTable[i].etype4) > -1) continue;
                if (affixTable[i].etype5 && item.types.indexOf(affixTable[i].etype5) > -1) continue;
                if (item.class && affixTable[i].classspecific && affixTable[i].classspecific !== item.class) continue; //Affix is class specific and doesn't match the class specific base (if any)
                if (
                    item.types.indexOf(affixTable[i].itype1) === -1 &&
                    item.types.indexOf(affixTable[i].itype2) === -1 &&
                    item.types.indexOf(affixTable[i].itype3) === -1 &&
                    item.types.indexOf(affixTable[i].itype4) === -1 &&
                    item.types.indexOf(affixTable[i].itype5) === -1 &&
                    item.types.indexOf(affixTable[i].itype6) === -1 &&
                    item.types.indexOf(affixTable[i].itype7) === -1
                )
                    continue; //Affix cannot spawn on this basetype (none of the equivs match itype1-7)
                if (affixTable[i].level && item.alvl < affixTable[i].level) continue; //Item level is too low
                if (affixTable[i].maxlevel && affixTable[i].maxlevel < item.level) continue; //Item level is too high
                if (affix === 'autoaffix' && affixTable[i].group !== item.autogroup) continue; //Autogroup doesn't match the group of affixes the item can spawn with
                if (affixOverCap(affix)) continue; //This affix would go over prefix/suffix/affix cap

                item[affix + 'totalfreq'] += affixTable[i].frequency;
                if (item[affix] !== -1 && affixTable[item[affix]].group === affixTable[i].group)
                    item[affix + 'groupfreq'] += affixTable[i].frequency;

                if (affixGroups[0].indexOf(affix) > -1) {
                    if (!pobj.hasOwnProperty(affixTable[i].group)) {
                        pobj[affixTable[i].group] = [affixTable[i].group, affixTable[i].frequency, 1, 0, 0];
                    } else {
                        pobj[affixTable[i].group][1] += affixTable[i].frequency;
                    }
                }

                if (affixGroups[1].indexOf(affix) > -1) {
                    if (!sobj.hasOwnProperty(affixTable[i].group)) {
                        sobj[affixTable[i].group] = [affixTable[i].group, affixTable[i].frequency, 2, 0, 0];
                    } else {
                        sobj[affixTable[i].group][1] += affixTable[i].frequency;
                    }
                }

                if (avoid.indexOf(affixTable[i].group) > -1) continue; //Affix has a group that is already selected

                document.getElementById(affix + '-' + i).disabled = false;
            }
    }

    //if (affix === "autoaffix") return;

    if (item[affix] !== -1 && document.getElementById(affix + '-' + item[affix]).disabled) {
        document.getElementById(affix + '-Select').value = -1;
        item[affix] = -1;
        getAffixCount();
        setAvoidGroups();
        item[affix + 'groupfreq'] = 0;
    }
}

function getAffixLevel(lvl) {
    var alvl,
        ilvl = (lvl || item.level) < baseTypes[item.classid].level ? baseTypes[item.classid].level : lvl || item.level;

    if (baseTypes[item.classid]['magic lvl']) {
        alvl = ilvl + baseTypes[item.classid]['magic lvl'];
    } else {
        if (ilvl < 99 - Math.floor(baseTypes[item.classid].level / 2)) {
            alvl = ilvl - Math.floor(baseTypes[item.classid].level / 2);
        } else {
            alvl = ilvl * 2 - 99;
        }
    }

    alvl = Math.min(99, alvl);
    return alvl;
}

function setSlider(affixTable, affix) {
    let i, modcode, modparam, modmin, modmax, modmid, desc, slider, skill, el;

    switch (affix) {
        case 'smod1':
        case 'smod2':
        case 'smod3':
            if (item[affix] === -1) {
                document.getElementById(affix + '-range1Div').style.display = 'none';
                delete item[affix + '-range1'];
                return;
            }

            slider = document.getElementById(affix + '-range1');
            item[affix + '-range1'] = +slider.value;
            skill = skills[item[affix]];

            dstats[affix] = {};
            dstats[affix].value = +slider.value;
            dstats[affix].skill = skill;
            dstats[affix].modcode = affix;
            dstats[affix].properties = properties['skill'];
            dstats[affix].itemstat = itemStatCost[modcodeToItemStat('skill')];
            dstats[affix].descprio = dstats[affix].itemstat.descpriority; // Add a shorthand...

            document.getElementById(affix + '-range1Value').innerHTML = slider.value;
            document.getElementById(affix + '-range1Div').style.display = 'block';
            document.getElementById(affix + '-range1Div').title =
                skill.name +
                ' (ID#: ' +
                skill.id +
                ' | Level req: ' +
                skill.reqlevel +
                ' | Elem type: ' +
                (skill.etype || 'None') +
                ')';
            break;

        default:
            for (i = 0; i < 4; i++) {
                //Iterate the three modcodes - four if safety craft..
                modcode =
                    item[affix] === -1
                        ? 0
                        : affixTable[item[affix]][affix === 'craft' ? 'mod ' + (i + 1) : 'mod' + (i + 1) + 'code'];

                if (!modcode) {
                    el = document.getElementById(affix + '-range' + (i + 1) + 'Div');
                    if (el) el.style.display = 'none';
                    delete item[affix + '-range' + (i + 1)];
                    delete item[affix + '-min' + (i + 1)];
                    delete item[affix + '-max' + (i + 1)];
                    continue;
                }

                if (affix === 'craft') {
                    modparam = affixTable[item[affix]]['mod ' + (i + 1) + ' param'];
                    modmin = affixTable[item[affix]]['mod ' + (i + 1) + ' min'];
                    modmax = affixTable[item[affix]]['mod ' + (i + 1) + ' max'];
                } else {
                    modparam = affixTable[item[affix]]['mod' + (i + 1) + 'param'];
                    modmin = affixTable[item[affix]]['mod' + (i + 1) + 'min'];
                    modmax = affixTable[item[affix]]['mod' + (i + 1) + 'max'];
                }

                if (!modmin && !modmax) {
                    modmin = modparam;
                    modmax = modparam;
                    modparam = 0;
                }

                modmid = firstLoad ? item[affix + '-range' + (i + 1)] : Math.ceil((modmin + modmax) / 2);
                if (!modmid) modmid = Math.ceil((modmin + modmax) / 2);

                desc = (properties[modcode]['*desc'] || modcode) + ' (';
                desc += modparam
                    ? (properties[modcode]['*param'] ? properties[modcode]['*param'] + ': ' : '') + modparam + ' - '
                    : '';
                desc +=
                    (properties[modcode]['*min'] ? properties[modcode]['*min'] + ': ' : '') + (modmin || '') + ' - ';
                desc += (properties[modcode]['*max'] ? properties[modcode]['*max'] + ': ' : '') + (modmax || '') + ')';

                if (['charged', 'hit-skill', 'gethit-skill', 'att-skill'].indexOf(modcode) !== -1) {
                    modmid = modparam;
                    modmin = modparam;
                    modmax = modparam;
                }

                slider = document.getElementById(affix + '-range' + (i + 1));
                document.getElementById(affix + '-range' + (i + 1) + 'Div').style.display = 'block';

                if (
                    +slider.min !== modmin ||
                    +slider.max !== modmax ||
                    +slider.value > modmax ||
                    +slider.value < modmin
                ) {
                    //Don't mess with selection unless there's a change in the range
                    document.getElementById(affix + '-range' + (i + 1) + 'Value').innerHTML = modmid;
                    item[affix + '-range' + (i + 1)] = modmid;
                    slider.min = modmin;
                    slider.max = modmax;
                    slider.value = modmid;
                }

                document.getElementById(affix + '-range' + (i + 1) + 'Div').title = desc;

                slider.setAttribute(
                    'norange',
                    slider.min === slider.max || parseInt(slider.min) > parseInt(slider.max) ? true : false
                );

                if (!stats.hasOwnProperty(modcode)) stats[modcode] = 0;
                if (!dstats.hasOwnProperty(modcode)) {
                    dstats[modcode] = {};
                    dstats[modcode].value = 0;
                    dstats[modcode].modcode = modcode;
                    dstats[modcode].properties = properties[modcode];
                    dstats[modcode].itemstat = itemStatCost[modcodeToItemStat(modcode)];
                    dstats[modcode].descprio = dstats[modcode].itemstat.descpriority; // Add a shorthand...
                    dstats[modcode].affix = affixTable[item[affix]];

                    if (affix === 'craft') {
                        dstats[modcode].modparam = affixTable[item[affix]]['mod ' + (i + 1) + ' param'];
                        dstats[modcode].modmin = affixTable[item[affix]]['mod ' + (i + 1) + ' min'];
                        dstats[modcode].modmax = affixTable[item[affix]]['mod ' + (i + 1) + ' max'];
                    } else {
                        dstats[modcode].modparam = affixTable[item[affix]]['mod' + (i + 1) + 'param'];
                        dstats[modcode].modmin = affixTable[item[affix]]['mod' + (i + 1) + 'min'];
                        dstats[modcode].modmax = affixTable[item[affix]]['mod' + (i + 1) + 'max'];
                    }
                } else if (modcode === 'dmg-pois') {
                    // Have to stack poison duration too, not just the damage
                    dstats[modcode].modparam += affixTable[item[affix]]['mod' + (i + 1) + 'param'];
                }

                dstats[modcode].value += +slider.value;
                stats[modcode] += +slider.value;

                item[affix + '-range' + (i + 1)] = +slider.value;
                item[affix + '-min' + (i + 1)] = modmin;
                item[affix + '-max' + (i + 1)] = modmax;
            }
    }
}

function setSliderValue(control) {
    document.getElementById(control.id + 'Value').innerHTML = control.value;
    param.set(control.id, +control.value);
    item[control.id] = +control.value;
    stats = {};
    dstats = {};
    setSliderGroup(magicPrefix, affixGroups[0]);
    setSliderGroup(magicSuffix, affixGroups[1]);
    setSliderGroup(skills, affixGroups[2]);
    setSlider(autoMagic, 'autoaffix');
    setSlider(cubeMain, 'craft');
    getPickit();
    generateItem();
    updateTables();
    //console.log(item);
    //console.log(stats);
}

function setSliderGroup(affixTable, affixGroup) {
    for (let i = 0; i < affixGroup.length; i++) {
        setSlider(affixTable, affixGroup[i]);
    }
}

function getCompositeStats() {
    let i, skill, composite;

    if (
        dstats.hasOwnProperty('res-all') &&
        (dstats.hasOwnProperty('res-fire') ||
            dstats.hasOwnProperty('res-cold') ||
            dstats.hasOwnProperty('res-ltng') ||
            dstats.hasOwnProperty('res-pois'))
    ) {
        composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (i = 0; i < composite.length; i++) {
            if (dstats.hasOwnProperty(composite[i])) {
                dstats[composite[i]].value += dstats['res-all'].value;
                continue;
            }

            dstats[composite[i]] = {};
            dstats[composite[i]].value = dstats['res-all'].value;
            dstats[composite[i]].modcode = composite[i];
            dstats[composite[i]].properties = properties[composite[i]];
            dstats[composite[i]].itemstat = itemStatCost[modcodeToItemStat(composite[i])];
            dstats[composite[i]].descprio = dstats[composite[i]].itemstat.descpriority; // Add a shorthand...
        }

        delete dstats['res-all'];
    }
}

function getStatOrder() {
    ostats = [];

    function byDescPrio(a, b) {
        return b.descprio - a.descprio;
    }

    for (var stat in dstats) {
        ostats.push(dstats[stat]);
    }

    ostats.sort(byDescPrio);
}

function getWepClassDesc() {
    // Thanks to Doug "the best programmer" for getting this info!
    if (item.types.indexOf('staf') !== -1) return 'Staff Class';
    if (item.types.indexOf('axe') !== -1) return 'Axe Class';
    if (item.types.indexOf('swor') !== -1) return 'Sword Class';
    if (item.types.indexOf('knif') !== -1) return 'Dagger Class';
    if (item.types.indexOf('jave') !== -1) return 'Javelin Class';
    if (item.types.indexOf('spea') !== -1) return 'Spear Class';
    if (item.types.indexOf('bow') !== -1) return 'Bow Class';
    if (item.types.indexOf('pole') !== -1) return 'Polearm Class';
    if (item.types.indexOf('xbow') !== -1) return 'Crossbow Class';
    if (item.types.indexOf('h2h') !== -1) return 'Claw Class';
    if (item.types.indexOf('orb') !== -1) return 'Staff Class';
    if (item.types.indexOf('wand') !== -1) return 'Staff Class';
    if (item.types.indexOf('thro') !== -1) return 'Equip to Throw';
    if (item.types.indexOf('blun') !== -1) return 'Mace Class';
    return 'Unknown Class';
}

function getWepSpeedDesc(classId = 1, ias = 0) {
    // Another chunk of data nobody but Doug could help with, thanks !
    var wsLookup = [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
            [2, 1],
            [2, 1],
            [2, 2],
            [3, 2],
            [3, 2],
            [3, 2],
            [4, 3],
            [4, 3],
            [4, 3],
            [5, 4],
            [5, 4],
            [5, 4],
            [5, 5],
            [5, 5],
        ],
        wclass,
        animSpeed,
        frames,
        ias,
        accel,
        fpa,
        l;

    var weaponFrames = {
        // Classid	0		1		2		3		4		5		6
        hth: [
            [13, 13],
            [16, 16],
            [15, 15],
            [14, 14],
            [12, 12],
            [16, 16],
            [11, 12],
        ], // 0 Unarmed (hth)
        ht1: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [11, 12],
        ], // 1 Claws (ht1)
        '1hs': [
            [16, 16],
            [20, 20],
            [19, 19],
            [15, 15],
            [16, 16],
            [19, 19],
            [15, 15],
        ], // 2 One-Handed Swinging Weapon (1hs)
        '2hs': [
            [20, 20],
            [24, 24],
            [23, 23],
            [18, 19],
            [18, 18],
            [21, 21],
            [23, 23],
        ], // 3 Two-Handed Sword (2hs)
        '1ht': [
            [15, 15],
            [19, 19],
            [19, 19],
            [17, 17],
            [16, 16],
            [19, 19],
            [15, 15],
        ], // 4 One-Handed Thrusting Weapon (1ht)
        '2ht': [
            [18, 18],
            [23, 23],
            [24, 24],
            [20, 20],
            [19, 19],
            [23, 23],
            [23, 23],
        ], // 5 Spears (2ht)
        stf: [
            [20, 20],
            [18, 18],
            [20, 20],
            [18, 18],
            [19, 19],
            [17, 17],
            [19, 19],
        ], // 6 Staves & 2h Axes (stf)
        bow: [
            [14, 14],
            [17, 17],
            [18, 18],
            [16, 16],
            [15, 15],
            [16, 16],
            [16, 16],
        ], // 7 Bows (bow)
        xbw: [
            [20, 20],
            [20, 20],
            [20, 20],
            [20, 20],
            [20, 20],
            [20, 20],
            [21, 21],
        ], // 8 Crossbows (xbw)
    };

    wclass = baseTypes[item.classid].wclass || 'hth';
    animSpeed = classId === 6 && wclass === 'ht1' ? 208 : 256; // Assassin using claws || any other class and wep
    frames = weaponFrames[wclass][classId]; // Base FPA for our class
    accel = ias - (baseTypes[item.classid].speed || 0) + 100;
    fpa = Math.floor((256 * frames[0]) / Math.floor((animSpeed * accel) / 100.0));

    if (fpa == 0) return 'Very Slow Attack Speed';
    fpa -= 10;
    if (fpa < 0) return 'Very Fast Attack Speed';
    if (fpa > 17) return 'Very Slow Attack Speed';

    l = wsLookup[fpa][[1, 2, 5].indexOf(classId) === -1 ? 0 : 1]; // 1 = Sor Nec Dru, 0 = Other classes

    if (l == 1) return 'Very Fast Attack Speed';
    if (l == 2) return 'Fast Attack Speed';
    if (l == 3) return 'Normal Attack Speed';
    if (l == 4) return 'Slow Attack Speed';
    if (l == 5) return 'Very Slow Attack Speed';

    return 'Normal Attack Speed?';
}

function getImplicits() {
    let i,
        ikey,
        implicit,
        val,
        pre,
        col,
        val2,
        ikeys = [
            'name',
            'base',
            'maxac',
            'block',
            'smite',
            'throw',
            '1hand',
            '2hand',
            'durability',
            'class', // Class specific base
            'maxstack',
            'socketable',
            'charm', // keep in inventory to gain bonus
            'reqdex',
            'reqstr',
            'levelreq',
            'speed', // Also has "mace class - ", etc before
        ];

    implicits = [];

    for (i = 0; i < ikeys.length; i++) {
        implicit = { colors: [], strings: [] };
        ikey = ikeys[i];

        switch (ikey) {
            case 'name':
                if (item.quality === 4) break;
                implicit.colors.push({ 4: 3, 6: 9, 8: 8 }[item.quality]);
                implicit.strings.push(
                    locales[rarePrefix[item.namepre].name] + ' ' + locales[rareSuffix[item.namesuf].name]
                );
                break;
            case 'base':
                val = locales[baseTypes[item.classid].namestr] || baseTypes[item.classid].name;
                if (item.quality === 4) {
                    if (item.p1 !== -1) val = locales[magicPrefix[item.p1].name] + ' ' + val;
                    if (item.p2 !== -1) val = locales[magicPrefix[item.p2].name] + ' ' + val;
                    if (item.p3 !== -1) val = locales[magicPrefix[item.p3].name] + ' ' + val;
                    if (item.s1 !== -1) val = val + ' ' + locales[magicSuffix[item.s1].name];
                    if (item.s2 !== -1) val = val + ' ' + locales[magicSuffix[item.s2].name];
                    if (item.s3 !== -1) val = val + ' ' + locales[magicSuffix[item.s3].name];
                }
                implicit.colors.push({ 4: 3, 6: 9, 8: 8 }[item.quality]);
                implicit.strings.push(val);
                break;
            case 'maxac':
                val =
                    stats['ac%'] || stats['ac%/lvl']
                        ? baseTypes[item.classid].maxac + 1
                        : baseTypes[item.classid].maxac;
                if (!val) break;
                if ([91, 92, 93, 94].indexOf(item.craft) !== -1 && dstats['ac%'].affix.hasOwnProperty('name')) val += 1; // Thanks @Kaylin
                pre = baseTypes[item.classid].maxac;
                if (item.ethereal) val = Math.floor(val * 1.5);
                if (item.ethereal) pre = Math.floor(pre * 1.5);
                val = Math.floor(
                    val * (1 + ((stats['ac%'] || 0) + Math.floor(((stats['ac%/lvl'] || 0) * item.charlvl) / 8)) / 100.0)
                );
                val += (stats.ac || 0) + Math.floor(((stats['ac/lvl'] || 0) * item.charlvl) / 8);
                implicit.colors.push(0);
                implicit.strings.push(locales['ItemStats1h'] + ' ');
                implicit.colors.push(val > pre ? 3 : 0);
                implicit.strings.push(val.toString());
                break;
            case 'block':
                if (item.types.indexOf('shld') === -1) break;
                val = stats['block'] || 0;
                switch (item.charclassid) {
                    case 1: // Sor
                    case 2: // Nec
                    case 5: // Dru
                        val2 = 20;
                        break;
                    case 0: // Zon
                    case 4: // Bar
                    case 6: // Sin
                        val2 = 25;
                        break;
                    case 3: // Pal
                        val2 = 30;
                        break;
                    default:
                        val2 = 20;
                }
                implicit.colors.push(0);
                implicit.strings.push(locales['ItemStats1r']);
                implicit.colors.push(val ? 3 : 0);
                implicit.strings.push(baseTypes[item.classid].block + val + val2 + '%');
                break;
            case 'smite':
                if (item.charclassid !== 3) break; // Only show smite dmg on paladin
                if (item.types.indexOf('shld') === -1) break; // Isn't a shield
                if (!baseTypes[item.classid].mindam) break; // Has no smite damage
                implicit.colors.push(0);
                implicit.strings.push(
                    locales['ItemStats1o'] +
                        ' ' +
                        baseTypes[item.classid].mindam +
                        ' to ' +
                        baseTypes[item.classid].maxdam
                );
                break;
            case 'throw':
            case '1hand':
            case '2hand':
                if (item.classid > 305) break;
                //Min
                col = { throw: 'minmisdam', '1hand': 'mindam', '2hand': '2handmindam' }[ikey];
                val = baseTypes[item.classid][col];
                if (!val) break;
                if (item.ethereal) val = Math.floor(val * 1.5);
                pre = val;
                val = Math.floor(val * (1 + (stats['dmg%'] || 0) / 100.0));
                val += stats['dmg-min'] || 0; //dmg/lvl is always for max damage
                val2 = val;
                //Max
                col = { throw: 'maxmisdam', '1hand': 'maxdam', '2hand': '2handmaxdam' }[ikey];
                val = baseTypes[item.classid][col];
                if (!val) break;
                if (item.ethereal) val = Math.floor(val * 1.5);
                pre2 = val;
                val = Math.floor(
                    val *
                        (1 + ((stats['dmg%'] || 0) + Math.floor(((stats['dmg%/lvl'] || 0) * item.charlvl) / 8)) / 100.0)
                );
                val += (stats['dmg-max'] || 0) + Math.floor(((stats['dmg/lvl'] || 0) * item.charlvl) / 8);
                if (val2 >= val) val = val2 + 1;
                implicit.colors.push(0);
                implicit.strings.push({ throw: 'Throw', '1hand': 'One-Hand', '2hand': 'Two-Hand' }[ikey] + ' Damage: ');
                implicit.colors.push(val2 > pre || val > pre2 ? 3 : 0);
                implicit.strings.push(val2 + ' to ' + val);
                break;
            case 'durability':
                val = baseTypes[item.classid][ikey];
                if (!val || baseTypes[item.classid].stackable || baseTypes[item.classid].nodurability) break;
                if (item.ethereal) val = Math.floor(val / 2) + 1;
                implicit.colors.push(0);
                implicit.strings.push(locales['ItemStats1d'] + ' ' + val + ' of ' + val);
                break;
            case 'class':
                if (!item.class) break;
                let strOnly = lang === 'eng' ? ' Only' : ' 전용';
                implicit.colors.push(classCodes.indexOf(item.class) === item.charclassid ? 0 : 1);
                implicit.strings.push('(' + locales['partychar' + item.class] + strOnly);
                break;
            case 'maxstack':
                val = baseTypes[item.classid][ikey];
                if (!val) break;
                val += stats['stack'] || 0;
                implicit.colors.push(0); // Always white, even with increased stack?
                implicit.strings.push(locales['ItemStats1i'] + ' ' + val);
                break;
            case 'socketable':
                if (item.types.indexOf('sock') === -1) break;
                implicit.colors.push(0);
                implicit.strings.push(locales['ExInsertSockets']);
                break;
            case 'reqdex':
            case 'reqstr':
                val = baseTypes[item.classid][ikey];
                if (!val) break;
                val = val - Math.floor(val * (Math.abs(stats.ease || 0) / 100));
                if (item.ethereal) val -= 10;
                if (val < 1) break;
                implicit.colors.push(0);
                implicit.strings.push(locales[{ reqstr: 'ItemStats1e', reqdex: 'ItemStats1f' }[ikey]] + ' ' + val);
                break;
            case 'charm':
                if (item.types.indexOf('char') === -1) break;
                implicit.colors.push(0);
                implicit.strings.push(locales['Charmdes']);
                break;
            case 'levelreq':
                val = getItemLevelReq();
                if (!val) break;
                implicit.colors.push(0);
                implicit.strings.push(locales['ItemStats1p'] + ' ' + val);
                break;
            case 'speed':
                if (item.classid > 305) break;
                implicit.colors.push(0);
                implicit.strings.push(getWepClassDesc() + ' - ');
                val = (stats['swing1'] || 0) + (stats['swing2'] || 0) + (stats['swing3'] || 0);
                if (val) implicit.colors.push(3);
                else implicit.colors.push(0);
                implicit.strings.push(getWepSpeedDesc(item.charclassid, val));
                break;
        }

        if (implicit.strings.length) {
            implicits.push(implicit);
        }
    }
}

function getExplicits() {
    // Special thanks to Nefarius @ d2mods.info - more about these calcs here https://d2mods.info/forum/kb/viewarticle?a=448
    let i, n, temp;

    explicits = [];

    for (i = 0; i < ostats.length; i++) {
        var descstr = locales[ostats[i].itemstat.descstrpos];
        ostats[i].desc = '';

        switch (
            ostats[i].modcode // Manual handling, fuck it!
        ) {
            case 'smod1':
            case 'smod2':
            case 'smod3':
                //ostats[i].desc = "+" + ostats[i].value + " to " + (locales[ostats[i].skill.skill] || ostats[i].skill.skill) + " (" + locales["partychar"+ostats[i].skill.charclass] + " Only)";
                ostats[i].desc =
                    '+' +
                    ostats[i].value +
                    ' to ' +
                    ostats[i].skill.name +
                    ' (' +
                    locales['partychar' + ostats[i].skill.charclass] +
                    ' Only)';
                continue;
            case 'cold-len':
            case 'cold-max':
            case 'fire-max':
            case 'ltng-max':
            case 'pois-max':
            case 'pois-len':
                continue;
            case 'cold-min':
                ostats[i].desc = 'Adds ' + ostats[i].value + '-' + dstats['cold-max'].value + ' cold damage';
                continue;
            case 'fire-min':
                ostats[i].desc = 'Adds ' + ostats[i].value + '-' + dstats['fire-max'].value + ' fire damage';
                continue;
            case 'ltng-min':
                ostats[i].desc = 'Adds ' + ostats[i].value + '-' + dstats['ltng-max'].value + ' lightning damage';
                continue;
            case 'dmg-pois':
                ostats[i].desc =
                    '+' +
                    Math.round((ostats[i].value * ostats[i].modparam) / 256) +
                    ' poison damage over ' +
                    Math.round(ostats[i].modparam / 25) +
                    ' seconds';
                continue;
            case 'pois-min': // Only appears on nec heads
                ostats[i].desc =
                    'Adds ' +
                    Math.round((dstats['pois-min'].value * dstats['pois-len'].value) / 256) +
                    '-' +
                    Math.floor((dstats['pois-max'].value * dstats['pois-len'].value) / 256) +
                    ' poison damage over ' +
                    Math.floor(dstats['pois-len'].value / 25) +
                    ' seconds';
                continue;
            case 'mana/lvl':
                ostats[i].desc =
                    '+' + Math.floor((ostats[i].value / 8) * item.charlvl) + ' to Mana ' + locales['ModStre9c'];
                continue;
            case 'att%/lvl':
                ostats[i].desc =
                    Math.floor((ostats[i].value / 2) * item.charlvl) +
                    '% Bonus to Attack Rating ' +
                    locales['ModStre9c'];
                continue;
            case 'att/lvl':
                ostats[i].desc =
                    '+' +
                    Math.floor((ostats[i].value / 2) * item.charlvl) +
                    ' to Attack Rating ' +
                    locales['ModStre9c'];
                continue;
            case 'dmg/lvl':
                ostats[i].desc =
                    Math.floor((ostats[i].value / 8) * item.charlvl) + ' to Maximum Damage ' + locales['ModStre9c'];
                continue;
            case 'ac/lvl':
                ostats[i].desc =
                    '+' + Math.floor((ostats[i].value / 8) * item.charlvl) + ' Defense ' + locales['ModStre9c'];
                continue;
            case 'skilltab':
                ostats[i].desc = locales[skillTabs[ostats[i].modparam]].replace(/%d/g, ostats[i].value);
                ostats[i].desc += ' (' + classes[Math.floor(ostats[i].modparam / 3)] + ' Only)';
                continue;
            case 'sock':
                temp = Math.min(item.maxsockets, ostats[i].value);
                if (temp) ostats[i].desc = 'Socketed (' + temp + ')';
                if (item.ethereal) ostats[i].desc = 'Ethereal (Cannot be Repaired), ' + ostats[i].desc;
                continue;
            case 'res-all':
                ostats[i].desc = descstr.replace('%d', ostats[i].value);
                continue;
            case 'ease':
                ostats[i].desc = descstr + ' ' + ostats[i].value + '%';
                continue;
            case 'dmg-min': // Replace min and max damage with "Adds min-max damage" when min is < max.
                if (!dstats['dmg-max'] || dstats['dmg-min'].value >= dstats['dmg-max'].value) break;
                ostats[i].desc = 'Adds ' + dstats['dmg-min'].value + '-' + dstats['dmg-max'].value + ' damage';
                continue;
            case 'dmg-max':
                if (dstats['dmg-min'] && dstats['dmg-min'].value < dstats['dmg-max'].value) continue;
                break;
        }

        if (descstr === undefined) console.log('undefined descstr: ' + ostats[i].modcode);

        switch (ostats[i].itemstat.descval) {
            case 0: // Don't add a value, it already exists or the value shouldn't be visible
                break;
            case 1: // Show the value before
                descstr = '%d ' + descstr;
                break;
            case 2: // Show the value after
                descstr = descstr + ' %d';
                break;
        }

        switch (ostats[i].itemstat.descfunc) {
            case 1: // +[value] [string1]
                ostats[i].desc = descstr.replace(/%d/g, '+' + ostats[i].value);
                break;
            case 2: // [value]% [string1]
                ostats[i].desc = descstr.replace(/%d/g, ostats[i].value + '%');
                break;
            case 3: // [string1] [value]
                ostats[i].desc = descstr.replace(/%d/g, ostats[i].value);
                break;
            case 4: // +[value]% [string1]
                ostats[i].desc = descstr.replace(/%d/g, '+' + ostats[i].value + '%');
                break;
            case 5: // [value*100/128]% [string1]
                ostats[i].desc = descstr.replace(/%d/g, Math.floor((ostats[i].value * 100) / 128) + '%');
                break;
            case 11: // Repairs 1 Durability In [100 / value] Seconds
                ostats[i].desc = 'Repairs 1 durability in ' + Math.floor(100 / ostats[i].value) + ' seconds';
                break;
            case 13: // +[value] to [class] Skill Levels
                descstr = descstr.replace(/%d/g, '+' + ostats[i].value);
                ostats[i].desc = descstr.replace('Amazon', classes[ostats[i].properties.val1]);
                break;
            case 15: // [chance]% to cast [slvl] [skill] on [event]
                descstr = descstr.replace('%d%', ostats[i].modmin);
                descstr = descstr.replace('%d', ostats[i].modmax);
                ostats[i].desc = descstr.replace('%s', skills[ostats[i].value].name);
                break;
            case 24: // Charged skills
                temp = Math.max(
                    1,
                    Math.floor(
                        (item.level - skills[ostats[i].value].reqlevel) /
                            Math.floor((99 - skills[ostats[i].value].reqlevel) / Math.abs(ostats[i].modmax))
                    )
                );
                ostats[i].desc = 'Level ' + temp + ' ';
                temp = Math.floor((Math.abs(ostats[i].modmin) * temp) / 8) + Math.abs(ostats[i].modmin);
                ostats[i].desc += skills[ostats[i].value].name + ' ';
                ostats[i].desc += descstr.replace(/%d/g, temp);
                break;
        }
    }

    for (i = 0; i < ostats.length; i++) {
        if (!ostats[i].desc) continue;

        explicits.push(ostats[i].desc);
    }

    if (item.ethereal && !dstats.hasOwnProperty('sock')) {
        explicits.push('Ethereal (Cannot be Repaired)');
    }

    for (i = 0; i < explicits.length; i++) {
        explicits[i] = { colors: [3], strings: [explicits[i]] };
    }
}

function modcodeToItemStat(code) {
    return propertyToItemStat(modcodeToProperty(code));
}

function modcodeToProperty(code) {
    if (!properties.hasOwnProperty(code)) {
        console.log('Missing property for modcode: ' + code);
        return 'unknown';
    }

    switch (
        code // manually added codes
    ) {
        case 'res-all':
            return code;
    }

    return properties[code].stat1 || code;
}

function propertyToItemStat(prop) {
    switch (prop) {
        case 'dmg%':
            return 'damagepercent';
        case 'dmg-min':
            return 'mindamage';
        case 'dmg-max':
            return 'maxdamage';
        case 'indestruct':
            return 'itemindesctructible'; // Actually is a typo in the statname in the table... indesc truc tible ?
    }

    if (!itemStatCost.hasOwnProperty(prop)) {
        console.log('Missing itemStat for property: ' + prop);
        return 'unknown';
    }

    return itemStatCost[prop].stat1 || prop;
}

function updateItemStatCost() {
    itemStatCost['res-all'] = {
        stat: 'res-all',
        id: 555,
        descpriority: 40,
        descstrpos: 'strModAllResistances',
        descfunc: 1,
        descval: 1,
    };
    itemStatCost['res-all'] = {
        stat: 'res-all',
        id: 555,
        descpriority: 40,
        descstrpos: 'strModAllResistances',
        descfunc: 1,
        descval: 1,
    };
    itemStatCost['damagepercent'].descpriority = 130;
    itemStatCost['damagepercent'].descfunc = 4;
    itemStatCost['damagepercent'].descval = 1;

    for (var stat in itemStatCost) {
        if (!itemStatCost[stat].descpriority) {
            // Descprio missing
            switch (stat) {
                default:
                    itemStatCost[stat].descpriority = 0 - itemStatCost[stat].id; // Order by highest descprio to lowest and then order of ids
            }
        }

        if (!itemStatCost[stat].descfunc) {
            // Descfunc missing
            switch (stat) {
                default:
                    itemStatCost[stat].descfunc = 1;
            }
        }

        if (isNaN(itemStatCost[stat].descval)) {
            // Descval missing 0 does not count as not missing
            switch (stat) {
                default:
                    itemStatCost[stat].descval = 1;
            }
        }

        if (!itemStatCost[stat].descstrpos) {
            // descstrpos missing
            switch (stat) {
                case 'damagepercent':
                    itemStatCost[stat].descstrpos = 'strModEnhancedDamage';
                    break;
                default:
                //console.log("Unhandled descstrpos for: " + stat);
            }
        }
    }
}

function getItemColor(equipped) {
    //S1 > S2 > S3 > P1 > P2 > P3
    let i;

    item[equipped ? 'ecolor' : 'icolor'] = { name: 'none', id: 21 };
    if (item.quality === 8) return true;

    if (baseTypes[item.classid][equipped ? 'transform' : 'invtrans']) {
        for (i = 0; i < affixGroups[1].length; i++) {
            if (item[affixGroups[1][i]] !== -1) {
                if (magicSuffix[item[affixGroups[1][i]]].transformcolor) {
                    item[equipped ? 'ecolor' : 'icolor'] =
                        colorTable[magicSuffix[item[affixGroups[1][i]]].transformcolor];
                    return true;
                }
            }
        }
        for (i = 0; i < affixGroups[0].length; i++) {
            if (item[affixGroups[0][i]] !== -1) {
                if (magicPrefix[item[affixGroups[0][i]]].transformcolor) {
                    item[equipped ? 'ecolor' : 'icolor'] =
                        colorTable[magicPrefix[item[affixGroups[0][i]]].transformcolor];
                    return true;
                }
            }
        }
        if (item.autoaffix + 1 && autoMagic[item.autoaffix].transform) {
            item[equipped ? 'ecolor' : 'icolor'] = colorTable[autoMagic[item.autoaffix].transformcolor];
        }
    }

    return true;
}

function getItemGambleable() {
    for (let i = 0; i < gamble.length; i++) {
        if (gamble[i].code === baseTypes[item.classid].code) return 'yes';
        if (!baseTypes[item.classid].hasOwnProperty('normcode')) continue;
        if (gamble[i].code === baseTypes[item.classid].normcode) return 'yes';
    }
    return 'no';
}

function getItemUpgradeable() {
    if (!item.expansion) return 'no';
    if (baseTypes[item.classid].code === baseTypes[item.classid].normcode) return 'twice';
    if (baseTypes[item.classid].code === baseTypes[item.classid].ubercode) return 'once';
    if (baseTypes[item.classid].code === baseTypes[item.classid].ultracode) return 'no';
    return 'no';
}

function getItemLevel() {
    var lvl = Math.max(
        //item.classid	=== -1 ? 0 : baseTypes[item.classid].level,
        item.p1 === -1 ? 0 : magicPrefix[item.p1].level,
        item.p2 === -1 ? 0 : magicPrefix[item.p2].level,
        item.p3 === -1 ? 0 : magicPrefix[item.p3].level,
        item.s1 === -1 ? 0 : magicSuffix[item.s1].level,
        item.s2 === -1 ? 0 : magicSuffix[item.s2].level,
        item.s3 === -1 ? 0 : magicSuffix[item.s3].level,
        item.autoaffix === -1 ? 0 : autoMagic[item.autoaffix].level
    );

    for (let i = 1; i < 99; i++) {
        if (getAffixLevel(i) >= lvl) {
            lvl = i;
            break;
        }
    }

    item.minlevel = lvl;
    return lvl;
}

function getItemLevelReq() {
    var rlvl = 0;

    rlvl = Math.max(
        item.classid === -1 ? 0 : baseTypes[item.classid].levelreq,
        item.p1 === -1 ? 0 : magicPrefix[item.p1].levelreq,
        item.p2 === -1 ? 0 : magicPrefix[item.p2].levelreq,
        item.p3 === -1 ? 0 : magicPrefix[item.p3].levelreq,
        item.s1 === -1 ? 0 : magicSuffix[item.s1].levelreq,
        item.s2 === -1 ? 0 : magicSuffix[item.s2].levelreq,
        item.s3 === -1 ? 0 : magicSuffix[item.s3].levelreq,
        item.autoaffix === -1 ? 0 : autoMagic[item.autoaffix].levelreq
    );

    if (item.quality === 8) {
        rlvl += 10 + item.anum * 3;
    }

    rlvl = Math.max(
        rlvl,
        item.smod1 === -1 ? 0 : skills[item.smod1].reqlevel,
        item.smod2 === -1 ? 0 : skills[item.smod2].reqlevel,
        item.smod3 === -1 ? 0 : skills[item.smod3].reqlevel
    );

    return Math.min(rlvl, 98);
}

var tables = {
    //Values to get from the table, add extras separately (column: label)
    baseTypes: {
        gambleable: 'can be gambled',
        upgradeable: 'can be upped',
        nameable: 'nameable',
        maxstack: 'max stack',
        invheight: 'inv height',
        invwidth: 'inv width',
        durability: 'durability',
        dexbonus: 'dex bonus to dmg%',
        strbonus: 'str bonus to dmg%',
        '2handed': 'two handed',
        speed: 'speed modifier',
        rangeadder: 'weapon range',
        gemsockets: 'max sockets',
        levelreq: 'req level',
        level: 'min ilvl',
        reqdex: 'req dexterity',
        reqstr: 'req strength',
        maxac: 'max defense',
        minac: 'min defense',
        maxdam: 'max dmg',
        mindam: 'min dmg',
        maxmisdam: 'max throw dmg',
        minmisdam: 'min throw dmg',
        '2handmaxdam': 'max 2h dmg',
        '2handmindam': 'min 2h dmg',
        block: 'block',
    },

    pickit: {},

    general: {
        'color (inv)': 'color (inv)',
        'color (equipped)': 'color (equipped)',
        'min ilvl': 'min ilvl',
        'affix level': 'alvl',
        'ideal ingredient ilvl': 'ideal ingredient ilvl',
        'min ingredient ilvl': 'min ingredient ilvl',
        'level req': 'level req',

        'chance for affixes': 'chance for affixes',
        'chance for affixes': 'chance for affixes',

        'req dexterity (total)': 'reqdex',
        'req strength (total)': 'reqstr',

        'max defense (total)': 'maxac',
        'min defense (total)': 'minac',

        'max dmg (total)': 'maxdam',
        'min dmg (total)': 'mindam',
        'max throw dmg (total)': 'maxmisdam',
        'min throw dmg (total)': 'minmisdam',
        'max 2h dmg (total)': '2handmaxdam',
        'min 2h dmg (total)': '2handmindam',
    },
};

function getStaffTiers() {
    let i;

    item.smodtier = 0;
    item.smodlevelreqs = [];

    if (!item.staffmods) return;

    var smodLevelReqs = [
        // Possible skills with X level req for each tier
        [1, 6], // smod tier 1
        [1, 6, 12], // smod tier 2
        [1, 6, 12, 18], // smod tier 3
        [6, 12, 18, 24], // smod tier 4
        [12, 18, 24, 30], // smod tier 5
    ];

    var smodTierOdds = [
        // Odds of getting a skill from smod groups 1-6 (1, 6, 12, 18, 24, 30) by item smod tier
        [81, 19, 0, 0, 0, 0], // Ex : 81% chance of getting a skill from smod group of level req 1 when item has smod tier 1
        [31, 50, 19, 0, 0, 0],
        [11, 20, 50, 19, 0, 0],
        [0, 11, 20, 50, 19, 0],
        [0, 0, 11, 20, 50, 19],
    ];

    var smods = {}; // lists of possible skills by required level
    var smodsf = {}; // lists of possible skills by required level THAT ARE FORBIDDEN

    for (i = 0; i < skills.length; i++) {
        if (!skills[i].charclass) continue;
        if (skills[i].charclass !== item.staffmods) continue;

        if (!smods.hasOwnProperty(skills[i].reqlevel)) smods[skills[i].reqlevel] = [];
        if (!smodsf.hasOwnProperty(skills[i].reqlevel)) smodsf[skills[i].reqlevel] = [];
        smods[skills[i].reqlevel].push(i);

        if (
            (skills[i].itypea1 || skills[i].itypea2 || skills[i].itypea3) && //At least one itypea specifified AND (item doesn't have itypea1 && 2 && 3) aka is not in any of the allowed itypea's
            item.types.indexOf(skills[i].itypea1) === -1 &&
            item.types.indexOf(skills[i].itypea2) === -1 &&
            item.types.indexOf(skills[i].itypea3) === -1
        ) {
            smodsf[skills[i].reqlevel].push(i);
        }
    }

    if (item.level >= 1 && item.level <= 11) item.smodtier = 1;
    if (item.level >= 12 && item.level <= 18) item.smodtier = 2;
    if (item.level >= 19 && item.level <= 24) item.smodtier = 3;
    if (item.level >= 25 && item.level <= 36) item.smodtier = 4;
    if (item.level >= 37 && item.level <= 99) item.smodtier = 5;
    if (item.level >= 25 && !item.expansion) item.smodtier = 4;

    item.smodlevelreqs = smodLevelReqs[item.smodtier - 1];
    item.smodtierodds = smodTierOdds[item.smodtier - 1];
    item.smods = smods;
    item.smodsf = smodsf;
    return;
}

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function binomial(n, k) {
    if (typeof n !== 'number' || typeof k !== 'number') return false;
    var coeff = 1;
    for (var x = n - k + 1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}

function factorial(n) {
    if (!n) return 1;
    return n != 1 ? n * factorial(n - 1) : 1;
}

function permutations(n, k) {
    // Permutations possible based on n = length of set, k = number of picks
    return factorial(n) / factorial(n - k);
}

function delta(min, max) {
    return Math.abs(min - max) + 1;
}

function getAffixProbability(imbued) {
    //Many thanks to @Tub from diablo3.ingame.de for his instrumental work on affix calculations without which this wouldn't be possible!
    var totalprefixchance,
        totalsuffixchance,
        i,
        affixes,
        extra = 1,
        smodchance = 1,
        prefixfreq = 0,
        suffixfreq = 0,
        pgroups = [],
        sgroups = [],
        totalchance = 0,
        chance = 1;

    var addPrefix = function (prenum, chance, prefixfreq) {
        let i;

        if (prenum == 0) {
            for (i = 0; i < pgroups.length; i++) {
                if (pgroups[i][4] == 1 && pgroups[i][3] == 0) return;
            }
            totalprefixchance += chance;
            return;
        }

        for (i = 0; i < pgroups.length; i++) {
            var g = pgroups[i];
            if (g[3] == 0) {
                const newchance = (chance * g[1]) / prefixfreq;
                g[3] = 1;
                addPrefix(prenum - 1, newchance, prefixfreq - g[1]);
                g[3] = 0;
            }
        }
    };

    var addSuffix = function (sufnum, chance, suffixfreq) {
        let i;

        if (sufnum == 0) {
            for (i = 0; i < sgroups.length; i++) {
                if (sgroups[i][4] == 1 && sgroups[i][3] == 0) return;
            }
            totalsuffixchance += chance;
            return;
        }

        for (i = 0; i < sgroups.length; i++) {
            var g = sgroups[i];

            if (g[3] == 0) {
                const newchance = (chance * g[1]) / suffixfreq;
                g[3] = 1;
                addSuffix(sufnum - 1, newchance, suffixfreq - g[1]);
                g[3] = 0;
            }
        }
    };

    var addAffix = function (prenum, sufnum, chance) {
        totalprefixchance = 0;
        totalsuffixchance = 0;

        if (item.pnum > prenum) return;
        if (item.snum > sufnum) return;

        addPrefix(prenum, 1, prefixfreq);
        addSuffix(sufnum, 1, suffixfreq);

        totalchance += totalprefixchance * totalsuffixchance * chance;
    };

    if (item.smodnum) {
        /* Thanks to @feanur for the back and forth and @librarian for the documentation http://www.mannm.org/d2library/faqtoids/staffmods_eng.html#gestab 
		
			RND[100] = 0-99
			+3 : RND >= 90			10%
			+2 : 60 <= RND <= 89	30%
			+1 : RND <= 59			60%

			RND[100] = 0-99
			3x : RND >= 91			9%
			2x : 71 <= RND <= 90	20%
			1x : 31 <= RND <= 70	40%
			0x : RND <= 30			31%
		*/
        /*
		var plus1 = Math.max(0, 60 - (imbued ? Math.floor(item.level / 2) : 0));
		var plus2 = Math.max(0, 30 + Math.min(0, 60 - (imbued ? Math.floor(item.level / 2) : 0)));
		var plus3 = Math.min(100, 10 + (imbued ? Math.floor(item.level / 2) : 0));
		
		var skill0 = Math.max(0, 31 - (imbued ? item.level : 0));
		var skill1 = Math.max(0, 40 + Math.min(0, 31 - (imbued ? item.level : 0)));
		var skill2 = Math.max(0, 20 + Math.min(0, 71 - (imbued ? item.level : 0)));
		var skill3 = Math.min(100, 9 + (imbued ? item.level : 0));

		var avgSmodNum = ((skill0*0) + (skill1*1) + (skill2*2) + (skill3*3)) / 100 // Average number of smods given weighting of 0/1/2/3 skills
		
		for (i = 0; i < affixGroups[2].length; i++) {
			if (item[affixGroups[2][i]] === -1) continue; 										// no smod set
			var smod = skills[item[affixGroups[2][i]]]; 										// entire smod row from table
			var smodGroupIndex = [1, 6, 12, 18, 24, 30].indexOf(smod.reqlevel); 				// smod group index, 0 = level 1 skills, 1 = level 6 skills, etc..
			var smodGroup = item.smods[smod.reqlevel]; 											// list of skills in the group
			var smodGroupf = item.smodsf[smod.reqlevel]; 										// list of forbidden skills in the group
			var forbidden = item.smodsf[smod.reqlevel].indexOf(smod.id) !== -1; 				// is the smod forbidden (bool)
			var smodGroupChance = item.smodtierodds[smodGroupIndex]; 							// Odds of hitting this smod group (val in percentage)
			
			var existingSmod = ( (smodGroupChance / 100) * (avgSmodNum - 1) ) / (smodGroup.length - smodGroupf.length); // Imprecise, but I can't come up with something better :(
			
			// chance of hitting stuff without considering if maybe there's already something on the item
			//var smodPickChance = ((smodGroup.length - smodGroupf.length) * (Math.pow(smodGroup.length,6) / (Math.pow(smodGroup.length,6) - Math.pow(smodGroupf.length,6)))) // 1/val Chance of getting a specific non forbidden smod ((n - (k)) (n^6 / (n^6 - (k)^6))   
			//var smodfPickChance = Math.pow(smodGroup.length / smodGroupf.length, 5) * smodGroup.length; // 1/val chance of getting a specific forbidden smod
						
			// chance of hitting stuff with consideration for how many mods there are already on the item - of previous picks also being in this smodgroup
			var smodPickChance = (smodGroup.length - (smodGroupf.length + existingSmod)) * (Math.pow(smodGroup.length,6) / (Math.pow(smodGroup.length,6) - Math.pow(smodGroupf.length + existingSmod,6))) // 1/val Chance of getting a specific non forbidden smod  
			var smodfPickChance = Math.pow(smodGroup.length / (smodGroupf.length + existingSmod), 5) * smodGroup.length; // 1/val chance of getting a specific forbidden smod
			
			//var smodOverrideOdds = (Math.pow(smodGroup.length - 1, 6) / (item.smodtierodds[smodGroupIndex] / 100)) / (avgSmodNum - 1); // 1/val Odds of this smod being overridden by a DIFFERENT not possible... different smod doesn't go over the other.. smod (any avg number of smods over 1.00).

			// 1/val odds of hitting this specific smod group, and the specific smod in the group, and accounting for odds to be overriden by a different smod roll afterwards and the odds of getting another shot at the smod on the other 0-2 extra possible smod rolls
			smodchance = ((forbidden ? smodfPickChance : smodPickChance) / (smodGroupChance / 100));
			//smodchance *= (1 + (1 / smodOverrideOdds));
			smodchance /= avgSmodNum; 

			switch (item[affixGroups[2][i]+'-range1']) {
			case 1: // At least +1 to this skill (100% chance)
				smodchance /= (plus1 + plus2 + plus3) / 100;
				break;
			case 2: // At least +2 to this skill
				smodchance /= (plus2 + plus3) / 100;
				break;
			case 3: // At least +3 to this skill
				smodchance /= (plus3) / 100;
				break;
			}
			
			extra *= smodchance;
		}
		*/

        var plus1 = Math.max(0, 60 - (imbued ? Math.floor(item.level / 2) : 0));
        var plus2 = Math.max(0, 30 + Math.min(0, 60 - (imbued ? Math.floor(item.level / 2) : 0)));
        var plus3 = Math.min(100, 10 + (imbued ? Math.floor(item.level / 2) : 0));

        var skill0 = Math.max(0, 31 - (imbued ? item.level : 0));
        var skill1 = Math.max(0, 40 + Math.min(0, 31 - (imbued ? item.level : 0)));
        var skill2 = Math.max(0, 20 + Math.min(0, 71 - (imbued ? item.level : 0)));
        var skill3 = Math.min(100, 9 + (imbued ? item.level : 0));

        var avgSmodNum = (skill0 * 0 + skill1 * 1 + skill2 * 2 + skill3 * 3) / 100; // Average number of smods given weighting of 0/1/2/3 skills
        var smods = [];

        for (i = 0; i < affixGroups[2].length; i++) {
            if (item[affixGroups[2][i]] === -1) continue; // no smod set
            var row = skills[item[affixGroups[2][i]]];
            var smod = {};

            smod.id = row.id;
            smod.reqlevel = row.reqlevel;
            smod.groupid = [1, 6, 12, 18, 24, 30].indexOf(row.reqlevel);
            smod.group = item.smods[row.reqlevel];
            smod.groupf = item.smodsf[row.reqlevel];
            //smod.groupchance = 100 / item.smodtierodds[smod.groupid];
            smod.groupchance = item.smodtierodds[smod.groupid] / 100;
            smod.forbidden = item.smodsf[row.reqlevel].indexOf(smod.id) !== -1;

            switch (item[affixGroups[2][i] + '-range1']) {
                case 1: // At least +1 to this skill (100% chance)
                    smod.pluschance = (plus1 + plus2 + plus3) / 100;
                    break;
                case 2: // At least +2 to this skill
                    smod.pluschance = (plus2 + plus3) / 100;
                    break;
                case 3: // At least +3 to this skill
                    smod.pluschance = plus3 / 100;
                    break;
            }

            if (smod.forbidden) {
                smod.prob0 = (1 / smod.group.length) * Math.pow((smod.groupf.length + 0) / smod.group.length, 6 - 1); // Chance of getting this skill if forbidden and there's already 0 forbidden skills selected on the item
                smod.prob1 = (1 / smod.group.length) * Math.pow((smod.groupf.length + 1) / smod.group.length, 6 - 1); // Chance of getting this skill if forbidden and there's already 1 forbidden skills selected on the item
                smod.prob2 = (1 / smod.group.length) * Math.pow((smod.groupf.length + 2) / smod.group.length, 6 - 1); // Chance of getting this skill if forbidden and there's already 2 forbidden skills selected on the item
            } else {
                smod.prob0 =
                    ((1 / smod.group.length) * (1 - Math.pow((smod.groupf.length + 0) / smod.group.length, 6))) /
                    (1 - (smod.groupf.length + 0) / smod.group.length); // Chance of getting this skill if NOT forbidden and there's already 0 forbidden skills selected on the item
                smod.prob1 =
                    ((1 / smod.group.length) * (1 - Math.pow((smod.groupf.length + 1) / smod.group.length, 6))) /
                    (1 - (smod.groupf.length + 1) / smod.group.length); // Chance of getting this skill if NOT forbidden and there's already 1 forbidden skills selected on the item
                smod.prob2 =
                    ((1 / smod.group.length) * (1 - Math.pow((smod.groupf.length + 2) / smod.group.length, 6))) /
                    (1 - (smod.groupf.length + 2) / smod.group.length); // Chance of getting this skill if NOT forbidden and there's already 2 forbidden skills selected on the item
            }

            smods.push(smod);
        }

        switch (
            item.smodnum // Switch sur le nombre de skills que le user a select
        ) {
            case 1:
                // 1 lottery
                prob1 = smods[0].groupchance * smods[0].prob0;
                prob1 *= skill1 / 100;

                // 2 lotteries
                if (!smods[0].forbidden) {
                    prob2 =
                        smods[0].groupchance *
                        smods[0].prob0 *
                        (1 -
                            smods[0].groupchance *
                                ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                    (1 / (smods[0].groupf.length + 1))));
                    prob2 +=
                        (1 -
                            smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob0);
                    prob2 +=
                        smods[0].groupchance *
                        ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0) *
                        (smods[0].groupchance * smods[0].prob1);
                    prob2 *= skill2 / 100;
                }

                if (smods[0].forbidden) {
                    prob2 = smods[0].groupchance * smods[0].prob0 * (1 - smods[0].groupchance * smods[0].prob0);
                    prob2 +=
                        (1 -
                            smods[0].groupchance +
                            smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob0);
                    prob2 +=
                        smods[0].groupchance *
                        (1 - smods[0].groupf.length * smods[0].prob0) *
                        (smods[0].groupchance * smods[0].prob1);
                    prob2 *= skill2 / 100;
                }

                // 3 lotteries
                if (!smods[0].forbidden) {
                    prob3 =
                        2 *
                        (smods[0].groupchance * smods[0].prob0) *
                        Math.pow(
                            1 -
                                smods[0].groupchance *
                                    ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                        (1 / (smods[0].groupf.length + 1))),
                            2
                        ); //estimation
                    prob3 +=
                        (1 -
                            smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob0) *
                        (1 -
                            smods[0].groupchance *
                                ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                    (1 / (smods[0].groupf.length + 1))));
                    prob3 +=
                        smods[0].groupchance *
                        ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0) *
                        (smods[0].groupchance * smods[0].prob1) *
                        (1 -
                            smods[0].groupchance *
                                ((1 - (smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob1) *
                                    (1 / (smods[0].groupf.length + 2))));
                    prob3 +=
                        2 *
                        Math.pow(
                            1 -
                                smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0),
                            2
                        ) *
                        (smods[0].groupchance * smods[0].prob0);
                    prob3 +=
                        2 *
                        (1 -
                            smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0)) *
                        (smods[0].groupchance *
                            ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob1);
                    prob3 +=
                        2 *
                        (smods[0].groupchance *
                            ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                        (smods[0].groupchance *
                            ((smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob1)) *
                        (smods[0].groupchance * smods[0].prob2);
                    prob3 *= skill3 / 100;
                }

                if (smods[0].forbidden) {
                    prob3 =
                        2 *
                        (smods[0].groupchance * smods[0].prob0) *
                        Math.pow(1 - smods[0].groupchance * smods[0].prob0, 2);
                    prob3 +=
                        (1 -
                            smods[0].groupchance +
                            smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob0) *
                        (1 - smods[0].groupchance * smods[0].prob0);
                    prob3 +=
                        smods[0].groupchance *
                        ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0) *
                        (smods[0].groupchance * smods[0].prob1) *
                        (1 - smods[0].groupchance * 2 * smods[0].prob1);
                    prob3 +=
                        2 *
                        (1 - smods[0].groupchance) *
                        (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                        (smods[0].groupchance * smods[0].prob1);
                    prob3 +=
                        2 *
                        (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                        (smods[0].groupchance * (1 - (smods[0].groupf.length + 1) * smods[0].prob1)) *
                        (smods[0].groupchance * smods[0].prob2);
                    prob3 *= skill3 / 100;
                }

                extra *= 1 / (smods[0].pluschance * (prob1 + prob2 + prob3));

                break;

            case 2: // Two skills selected
                var prob2 = 0;
                var prob3 = 0;

                if (smods[0].groupid === smods[1].groupid) {
                    // Both skills are in the same group
                    // 2 Skills given --------------------------------------------------------------------------------------

                    // NF + NF
                    if (!smods[0].forbidden && !smods[1].forbidden) {
                        prob2 = 2 * (smods[0].groupchance * smods[0].prob0 * (smods[1].groupchance * smods[1].prob1));
                        prob2 *= skill2 / 100;
                    }

                    // F + F
                    if (smods[0].forbidden && smods[1].forbidden) {
                        prob2 = 2 * (smods[0].groupchance * smods[0].prob0 * (smods[1].groupchance * smods[1].prob1));
                        prob2 *= skill2 / 100;
                    }

                    // NF + F
                    if (!smods[0].forbidden && smods[1].forbidden) {
                        prob2 = smods[0].groupchance * smods[0].prob0 * (smods[1].groupchance * smods[1].prob1);
                        prob2 += smods[1].groupchance * smods[1].prob0 * (smods[0].groupchance * smods[0].prob0); //pas de plus
                        prob2 *= skill2 / 100;
                    }

                    // F + NF
                    if (smods[0].forbidden && !smods[1].forbidden) {
                        prob2 = smods[0].groupchance * smods[0].prob0 * (smods[1].groupchance * smods[1].prob0); //pas de plus
                        prob2 += smods[1].groupchance * smods[1].prob0 * (smods[0].groupchance * smods[0].prob1);
                        prob2 *= skill2 / 100;
                    }

                    // 3 Skills given --------------------------------------------------------------------------------------

                    // NF + NF
                    if (!smods[0].forbidden && !smods[1].forbidden) {
                        prob3 =
                            2 *
                            ((1 -
                                smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0)) *
                                (smods[0].groupchance * smods[0].prob0) *
                                (smods[1].groupchance * smods[1].prob1));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob0) *
                                (smods[0].groupchance * smods[0].prob1) *
                                (smods[1].groupchance * smods[1].prob2));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (1 -
                                    smods[0].groupchance *
                                        ((smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob1)) *
                                (smods[1].groupchance * smods[1].prob1));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob1)) *
                                (smods[1].groupchance * smods[1].prob2));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (smods[1].groupchance * smods[1].prob1) *
                                (1 -
                                    smods[0].groupchance *
                                        ((1 - (smods[0].group.length - smods[0].groupf.length - 2) * smods[0].prob2) *
                                            (2 / (smods[0].groupf.length + 2)))));

                        prob3 *= skill3 / 100;
                    }

                    // F + F
                    if (smods[0].forbidden && smods[1].forbidden) {
                        prob3 =
                            2 *
                            ((1 - smods[0].groupchance) *
                                (smods[0].groupchance * smods[0].prob0) *
                                (smods[1].groupchance * smods[1].prob0));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                (1 - (smods[0].prob0 + smods[1].prob0)) *
                                (smods[0].groupchance * smods[0].prob1) *
                                (smods[1].groupchance * smods[1].prob1));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (1 - smods[0].groupchance) *
                                (smods[1].groupchance * smods[1].prob0));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (smods[0].groupchance * (1 - (smods[0].prob0 + smods[1].prob0))) *
                                (smods[1].groupchance * smods[1].prob1));
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                smods[0].prob0 *
                                (smods[1].groupchance * smods[1].prob0) *
                                (1 - smods[0].groupchance * (smods[0].prob0 + smods[1].prob0)));

                        prob3 *= skill3 / 100;
                    }

                    // NF + F
                    if (!smods[0].forbidden && smods[1].forbidden) {
                        //Roll rando en 1er
                        prob3 +=
                            (1 -
                                smods[0].groupchance +
                                smods[0].groupchance *
                                    (1 -
                                        ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0 +
                                            smods[1].prob0))) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            (1 -
                                smods[0].groupchance +
                                smods[0].groupchance *
                                    (1 -
                                        ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0 +
                                            smods[1].prob0))) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob2);
                        prob3 +=
                            smods[0].groupchance *
                            ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob1);

                        //Roll rando en 2e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[0].groupchance +
                                smods[0].groupchance *
                                    (1 -
                                        ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1 +
                                            2 * smods[1].prob1))) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 -
                                smods[0].groupchance +
                                smods[0].groupchance *
                                    (1 -
                                        ((smods[0].group.length - smods[0].groupf.length - 0) * smods[0].prob0 +
                                            1 * smods[1].prob0))) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1)) *
                            (smods[1].groupchance * smods[1].prob2);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 0) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1);

                        //Roll rando en 3e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance * smods[1].prob1) *
                            (1 - smods[0].groupchance + smods[0].groupchance * (1 - 2 * smods[1].prob1));
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (1 - smods[0].groupchance + smods[0].groupchance * (1 - 2 * smods[1].prob1));

                        prob3 *= skill3 / 100;
                    }

                    // F + NF
                    if (smods[0].forbidden && !smods[1].forbidden) {
                        //Roll rando en 1er
                        prob3 =
                            (1 -
                                smods[1].groupchance +
                                smods[1].groupchance *
                                    (1 -
                                        ((smods[1].group.length - smods[1].groupf.length) * smods[1].prob0 +
                                            smods[0].prob0))) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob1);
                        prob3 +=
                            (1 -
                                smods[1].groupchance +
                                smods[1].groupchance *
                                    (1 -
                                        ((smods[1].group.length - smods[1].groupf.length) * smods[1].prob0 +
                                            smods[0].prob0))) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob2);
                        prob3 +=
                            smods[1].groupchance *
                            ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob1);

                        //Roll rando en 2e
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 -
                                smods[1].groupchance +
                                smods[1].groupchance *
                                    (1 -
                                        ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob1 +
                                            2 * smods[0].prob1))) *
                            (smods[0].groupchance * smods[0].prob1);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[1].groupchance +
                                smods[1].groupchance *
                                    (1 -
                                        ((smods[1].group.length - smods[1].groupf.length - 0) * smods[1].prob0 +
                                            1 * smods[0].prob0))) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob1)) *
                            (smods[0].groupchance * smods[0].prob2);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 0) * smods[1].prob0)) *
                            (smods[0].groupchance * smods[1].prob1);

                        //Roll rando en 3e
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance * smods[0].prob1) *
                            (1 - smods[1].groupchance + smods[1].groupchance * (1 - 2 * smods[0].prob1));
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (1 - smods[1].groupchance + smods[1].groupchance * (1 - 2 * smods[0].prob1));

                        prob3 *= skill3 / 100;
                    }
                } else {
                    // Both skills are in different groups
                    // 2 skills given --------------------------------------------------------------------------------------

                    prob2 = 2 * (smods[0].groupchance * smods[0].prob0 * (smods[1].groupchance * smods[1].prob0)); //aucune influence si c'est NF ou F, on a deja les formules pour ca
                    prob2 *= skill2 / 100;

                    // 3 skills given --------------------------------------------------------------------------------------

                    // NF + NF
                    if (!smods[0].forbidden && !smods[1].forbidden) {
                        // Roll rando en 1er
                        prob3 =
                            2 *
                            (1 -
                                smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0) -
                                smods[1].groupchance *
                                    ((smods[1].group.length - smods[1].groupf.length) * smods[1].prob0)) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob0);

                        // Roll rando en 2e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[1].groupchance *
                                    ((smods[1].group.length - smods[1].groupf.length) * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 -
                                smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1);

                        // Roll rando en 3e
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (1 -
                                smods[0].groupchance *
                                    ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                        (1 / (smods[0].groupf.length + 1))) -
                                smods[1].groupchance *
                                    ((1 - (smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob1) *
                                        (1 / (smods[1].groupf.length + 1))));

                        prob3 *= skill3 / 100;
                    }

                    // F + F
                    if (smods[0].forbidden && smods[1].forbidden) {
                        // Roll rando en 1er
                        prob3 =
                            2 *
                            (1 -
                                smods[0].groupchance -
                                smods[1].groupchance +
                                smods[0].groupchance * (1 - (smods[0].groupf.length - 1) * smods[0].prob0) +
                                smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob0);

                        // Roll rando en 2e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[0].groupchance * smods[0].prob0 -
                                smods[1].groupchance +
                                smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 -
                                smods[1].groupchance * smods[1].prob0 -
                                smods[0].groupchance +
                                smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1);

                        // Roll rando en 3e
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (1 - smods[0].groupchance * smods[0].prob0 - smods[1].groupchance * smods[1].prob0);

                        prob3 *= skill3 / 100;
                    }

                    // NF + F
                    if (!smods[0].forbidden && smods[1].forbidden) {
                        // Roll rando en 1er
                        prob3 =
                            2 *
                            (1 -
                                smods[0].groupchance *
                                    ((smods[0].group.length - smods[0].groupf.length) * smods[0].prob0) -
                                smods[1].groupchance +
                                smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob0);

                        // Roll rando en 2e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[0].groupchance *
                                    ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                        (1 / (smods[0].groupf.length + 1))) -
                                smods[1].groupchance * smods[1].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 - smods[0].groupchance * smods[0].prob0 - smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[1].groupchance * (1 - smods[1].groupf.length * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[0].groupchance *
                                ((smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1);

                        // Roll rando en 3e
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (1 -
                                smods[0].groupchance *
                                    ((1 - (smods[0].group.length - smods[0].groupf.length - 1) * smods[0].prob1) *
                                        (1 / (smods[0].groupf.length + 1))) -
                                smods[1].groupchance * smods[1].prob0);

                        prob3 *= skill3 / 100;
                    }

                    // F + NF
                    if (smods[0].forbidden && !smods[1].forbidden) {
                        // Roll rando en 1er
                        prob3 =
                            2 *
                            (1 -
                                smods[1].groupchance *
                                    ((smods[1].group.length - smods[1].groupf.length) * smods[1].prob0) -
                                smods[0].groupchance +
                                smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            2 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0)) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob0);

                        // Roll rando en 2e
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (1 -
                                smods[1].groupchance *
                                    ((1 - (smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob1) *
                                        (1 / (smods[1].groupf.length + 1))) -
                                smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (1 - smods[0].groupchance * smods[0].prob0 - smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            smods[0].groupchance *
                            smods[0].prob0 *
                            (smods[0].groupchance * (1 - smods[0].groupf.length * smods[0].prob0)) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            smods[1].groupchance *
                            smods[1].prob0 *
                            (smods[1].groupchance *
                                ((smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob0)) *
                            (smods[0].groupchance * smods[0].prob1);

                        // Roll rando en 3e
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (1 -
                                smods[1].groupchance *
                                    ((1 - (smods[1].group.length - smods[1].groupf.length - 1) * smods[1].prob1) *
                                        (1 / (smods[1].groupf.length + 1))) -
                                smods[0].groupchance * smods[0].prob0);

                        prob3 *= skill3 / 100;
                    }
                }

                extra *= 1 / (smods[0].pluschance * smods[1].pluschance * (prob2 + prob3));

                break;
            case 3:
                // x y z tous differents groupes
                if (
                    smods[0].groupchance !== smods[1].groupchance &&
                    smods[1].groupchance !== smods[2].groupchance &&
                    smods[0].groupchance !== smods[2].groupchance
                ) {
                    prob3 =
                        6 *
                        (smods[0].groupchance * smods[0].prob0) *
                        (smods[1].groupchance * smods[1].prob0) *
                        (smods[2].groupchance * smods[2].prob0);
                    prob3 *= skill3 / 100;
                }

                //Si x, y meme groupe et z different
                if (smods[0].groupchance === smods[1].groupchance && smods[0].groupchance !== smods[2].groupchance) {
                    //Si x est NF et y est NF
                    if (!smods[0].forbidden && !smods[1].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F et y est F
                    if (smods[0].forbidden && smods[1].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est NF et y est F
                    if (!smods[0].forbidden && smods[1].forbidden) {
                        prob3 =
                            3 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 +=
                            3 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F et y est NF
                    if (smods[0].forbidden && !smods[1].forbidden) {
                        prob3 =
                            3 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 +=
                            3 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }
                }

                //Si x, z meme groupe et y different
                if (smods[0].groupchance === smods[2].groupchance && smods[0].groupchance !== smods[1].groupchance) {
                    //Si x est NF et z est NF
                    if (!smods[0].forbidden && !smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F et z est F
                    if (smods[0].forbidden && smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est NF et z est F
                    if (!smods[0].forbidden && smods[2].forbidden) {
                        prob3 =
                            3 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            3 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F et z est NF
                    if (smods[0].forbidden && !smods[2].forbidden) {
                        prob3 =
                            3 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 +=
                            3 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 *= skill3 / 100;
                    }
                }

                // Si y, z meme groupe et x different
                if (smods[1].groupchance === smods[2].groupchance && smods[0].groupchance !== smods[1].groupchance) {
                    //Si y est NF et z est NF
                    if (!smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si y est F et z est F
                    if (smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si y est NF et z est F
                    if (!smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            3 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            3 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si y est F et z est NF
                    if (smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            3 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 +=
                            3 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 *= skill3 / 100;
                    }
                }

                //Si x, y, z meme groupe
                if (smods[0].groupchance === smods[1].groupchance && smods[1].groupchance === smods[2].groupchance) {
                    //Si x est NF, y est NF, z est NF
                    if (!smods[0].forbidden && !smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob2);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F, y est F, z est F
                    if (smods[0].forbidden && smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            6 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est NF, y est NF, z est F
                    if (!smods[0].forbidden && !smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob2);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            2 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est NF, y est F, z est NF
                    if (!smods[0].forbidden && smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[1].groupchance * smods[1].prob2);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F, y est NF, z est NF
                    if (smods[0].forbidden && !smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob1) *
                            (smods[0].groupchance * smods[0].prob2);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est NF, y est F, z est F
                    if (!smods[0].forbidden && smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob1) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F, y est NF, z est F
                    if (smods[0].forbidden && !smods[1].forbidden && smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob1);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob0);
                        prob3 *= skill3 / 100;
                    }

                    //Si x est F, y est F, z est NF
                    if (smods[0].forbidden && smods[1].forbidden && !smods[2].forbidden) {
                        prob3 =
                            2 *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[0].groupchance * smods[0].prob1) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[2].groupchance * smods[2].prob0) *
                            (smods[1].groupchance * smods[1].prob1);
                        prob3 +=
                            2 *
                            (smods[0].groupchance * smods[0].prob0) *
                            (smods[1].groupchance * smods[1].prob0) *
                            (smods[2].groupchance * smods[2].prob0);
                        prob3 *= skill3 / 100;
                    }
                }

                extra *= 1 / (smods[0].pluschance * smods[1].pluschance * smods[2].pluschance * prob3);
                break;
        }
    }

    if (item.autoaffix !== -1) {
        extra *= item.autoaffixtotalfreq / item.autoaffixfreq;
    }

    var addRange = function (min, max, val) {
        var r = Math.abs(min - max) + 1;
        var v = Math.abs(val - max) + 1;

        chance *= v / r;
    };

    // Calc chances of getting a value >= slider value
    for (i = 1; i < 5; i++) {
        // 1-4 cause safety crafts have four ranges...
        if (item.hasOwnProperty('p1-range' + i)) addRange(item['p1-min' + i], item['p1-max' + i], item['p1-range' + i]);
        if (item.hasOwnProperty('p2-range' + i)) addRange(item['p2-min' + i], item['p2-max' + i], item['p2-range' + i]);
        if (item.hasOwnProperty('p3-range' + i)) addRange(item['p3-min' + i], item['p3-max' + i], item['p3-range' + i]);
        if (item.hasOwnProperty('s1-range' + i)) addRange(item['s1-min' + i], item['s1-max' + i], item['s1-range' + i]);
        if (item.hasOwnProperty('s2-range' + i)) addRange(item['s2-min' + i], item['s2-max' + i], item['s2-range' + i]);
        if (item.hasOwnProperty('s3-range' + i)) addRange(item['s3-min' + i], item['s3-max' + i], item['s3-range' + i]);
        if (item.hasOwnProperty('craft-range' + i))
            addRange(item['craft-min' + i], item['craft-max' + i], item['craft-range' + i]);
        if (item.hasOwnProperty('autoaffix-range' + i))
            addRange(item['autoaffix-min' + i], item['autoaffix-max' + i], item['autoaffix-range' + i]);
    }

    if (item.quality !== 4) {
        if (item.p1 !== -1) chance *= item.p1freq / item.p1groupfreq;
        if (item.p2 !== -1) chance *= item.p2freq / item.p2groupfreq;
        if (item.p3 !== -1) chance *= item.p3freq / item.p3groupfreq;
        if (item.s1 !== -1) chance *= item.s1freq / item.s1groupfreq;
        if (item.s2 !== -1) chance *= item.s2freq / item.s2groupfreq;
        if (item.s3 !== -1) chance *= item.s3freq / item.s3groupfreq;

        for (i in pobj) {
            if (item.p1 !== -1 && pobj[i][0] === magicPrefix[item.p1].group) pobj[i][4] = 1;
            if (item.p2 !== -1 && pobj[i][0] === magicPrefix[item.p2].group) pobj[i][4] = 1;
            if (item.p3 !== -1 && pobj[i][0] === magicPrefix[item.p3].group) pobj[i][4] = 1;
            prefixfreq += pobj[i][1];
            pgroups.push(pobj[i]);
        }

        for (i in sobj) {
            if (item.s1 !== -1 && sobj[i][0] === magicSuffix[item.s1].group) sobj[i][4] = 1;
            if (item.s2 !== -1 && sobj[i][0] === magicSuffix[item.s2].group) sobj[i][4] = 1;
            if (item.s3 !== -1 && sobj[i][0] === magicSuffix[item.s3].group) sobj[i][4] = 1;
            suffixfreq += sobj[i][1];
            sgroups.push(sobj[i]);
        }
    }

    switch (item.quality) {
        case 4:
            if (item.p1 !== -1) chance /= item.p1totalfreq / item.p1freq;
            if (item.p2 !== -1) chance /= item.p2totalfreq / item.p2freq;
            if (item.p3 !== -1) chance /= item.p3totalfreq / item.p3freq;
            if (item.s1 !== -1) chance /= item.s1totalfreq / item.s1freq;
            if (item.s2 !== -1) chance /= item.s2totalfreq / item.s2freq;
            if (item.s3 !== -1) chance /= item.s3totalfreq / item.s3freq;

            if (item.anum === 2) {
                chance *= 1 / 4; // 25% chance for 1 prefix 1 suffix
            } else {
                if (item.pnum === 1) chance *= 1 / 2; // 25% chance for 1 prefix, item only has one prefix specified so it could be either this or prefix1 prefix1 (25% + 25%)
                if (item.snum === 1) chance *= 3 / 4; // 50% chance for 1 suffix, so (25% + 50%)
            }

            return Math.round((1 / chance) * extra);

        case 6:
            if (item.amax === 6) {
                addAffix(3, 3, (1 * 1) / 4); // 6
                addAffix(3, 2, ((1 / 2) * 1) / 4); // 5
                addAffix(2, 3, ((1 / 2) * 1) / 4); // 5
                addAffix(3, 1, ((5 / 16) * 1) / 4); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 4); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 4); // 4
                addAffix(3, 0, ((1 / 8) * 1) / 4); // 3
                addAffix(2, 1, ((3 / 8) * 1) / 4); // 3
                addAffix(1, 2, ((3 / 8) * 1) / 4); // 3
                addAffix(0, 3, ((1 / 8) * 1) / 4); // 3
            }

            if (item.amax === 4) {
                addAffix(3, 1, ((5 / 16) * 1) / 2); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 2); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 2); // 4
                addAffix(3, 0, ((1 / 8) * 1) / 2); // 3
                addAffix(2, 1, ((3 / 8) * 1) / 2); // 3
                addAffix(1, 2, ((3 / 8) * 1) / 2); // 3
                addAffix(0, 3, ((1 / 8) * 1) / 2); // 3
            }
            break;

        case 8:
            if (item.level < 31) {
                addAffix(0, 1, ((1 / 2) * 2) / 5); // 1
                addAffix(1, 0, ((1 / 2) * 2) / 5); // 1
                addAffix(0, 2, ((1 / 4) * 1) / 5); // 2
                addAffix(1, 2, ((1 / 2) * 1) / 5); // 2
                addAffix(2, 0, ((1 / 4) * 1) / 5); // 2
                addAffix(3, 0, ((1 / 8) * 1) / 5); // 3
                addAffix(2, 1, ((3 / 8) * 1) / 5); // 3
                addAffix(1, 2, ((3 / 8) * 1) / 5); // 3
                addAffix(0, 3, ((1 / 8) * 1) / 5); // 3
                addAffix(3, 1, ((5 / 16) * 1) / 5); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 5); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 5); // 4
            }

            if (item.level > 30 && item.level < 51) {
                addAffix(0, 2, ((1 / 4) * 3) / 5); // 2
                addAffix(1, 2, ((1 / 2) * 3) / 5); // 2
                addAffix(2, 0, ((1 / 4) * 3) / 5); // 2
                addAffix(3, 0, ((1 / 8) * 1) / 5); // 3
                addAffix(2, 1, ((3 / 8) * 1) / 5); // 3
                addAffix(1, 2, ((3 / 8) * 1) / 5); // 3
                addAffix(0, 3, ((1 / 8) * 1) / 5); // 3
                addAffix(3, 1, ((5 / 16) * 1) / 5); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 5); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 5); // 4
            }

            if (item.level > 50 && item.level < 71) {
                addAffix(3, 0, ((1 / 8) * 4) / 5); // 3
                addAffix(2, 1, ((3 / 8) * 4) / 5); // 3
                addAffix(1, 2, ((3 / 8) * 4) / 5); // 3
                addAffix(0, 3, ((1 / 8) * 4) / 5); // 3
                addAffix(3, 1, ((5 / 16) * 1) / 5); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 5); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 5); // 4
            }

            if (item.level > 70) {
                addAffix(3, 1, 5 / 16); // 4
                addAffix(2, 2, 6 / 16); // 4
                addAffix(1, 3, 5 / 16); // 4
            }
    }

    return Math.round((1 / (chance * totalchance)) * extra);
}

function updateTables() {
    var tableName, t, index, column, val, i;

    var insert = function (label, value, tooltip) {
        var row, cell1, cell2;

        row = t.insertRow(0);
        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell1.innerHTML = label;
        cell2.innerHTML = value;
        if (tooltip) cell2.title = tooltip;
        //cell2.id = label + "-tableval";
    };

    //console.log(stats);
    tval = {};

    for (tableName in tables) {
        t = document.getElementById(tableName + '-Table').tBodies[0];
        t.innerHTML = '';

        if (tableName === 'baseTypes') index = item.classid;
        if (tableName === 'pickit') {
            var row = t.insertRow(0);
            var cell = row.insertCell(0);

            cell.innerHTML = item.pickit;
            cell.title = 'Click to copy pickit line.';
            continue;
        }

        for (column in tables[tableName]) {
            switch (column) {
                case 'chance for affixes':
                    /*var affixes = [].concat(affixGroups[0],affixGroups[1],affixGroups[3]).reverse();
				for (i = 0; i < affixes.length; i++) {
					if (item[affixes[i]] === -1) continue;
					val = Math.round(item[affixes[i]+'totalfreq'] / item[affixes[i]+'freq']);
					console.log(item[affixes[i]+'freq'] + ":" + item[affixes[i]+'totalfreq']);
					insert(affixes[i] + " chance", 1 + ":" + val, "probability of hitting this affix");
				}*/
                    if (item.staffmods && item.quality === 6)
                        insert(
                            'affix chance (imbue)',
                            '1/' + getAffixProbability(true),
                            'probability of this combination of stats to appear with imbue quest'
                        );
                    insert(
                        'affix chance',
                        '1/' + getAffixProbability(),
                        'probability of this combination of stats to appear'
                    );
                    break;

                case 'min ingredient ilvl':
                    if (item.craft === -1) break;
                    val = Math.max((Math.max(item.minlevel) - Math.floor(item.charlvl / 2)) * 2, 1);
                    if (val > 99) val = 'not possible';
                    insert(
                        'min ingredient ilvl',
                        val,
                        'minimum item level of main recipe ingredient to craft this item at char level: ' + item.charlvl
                    );
                    break;

                case 'ideal ingredient ilvl':
                    if (item.craft === -1) break;
                    val = Math.max(Math.min((Math.max(item.minlevel, 71) - Math.floor(item.charlvl / 2)) * 2, 99), 1);
                    insert(
                        'ideal ingredient ilvl',
                        val,
                        'Ideal item level of main recipe ingredient to craft this item at char level: ' + item.charlvl
                    );
                    break;

                case 'min ilvl':
                    insert(
                        'min ilvl',
                        item.minlevel,
                        'minimum item level to make these affixes available on the specific base. for mob drops, the base will not drop unless base specific ilvl is met'
                    );
                    break;

                case 'level req':
                    insert('level req', getItemLevelReq(), 'with stats included');
                    break;

                case 'color (equipped)':
                    insert('color (equipped)', item.ecolor.name);
                    break;

                case 'color (inv)':
                    insert('color (inv)', item.icolor.name);
                    break;

                case 'gambleable':
                    insert('can be gambled', getItemGambleable());
                    break;

                case 'upgradeable':
                    insert('can be upped', getItemUpgradeable());
                    break;

                case 'affix level':
                    insert('affix level', item.alvl);
                    break;

                case 'nameable':
                    insert('nameable', window[tableName][index][column] ? 'Yes' : 'No');
                    break;

                case '2handed':
                    if (window[tableName][index].hasOwnProperty(column)) {
                        insert('two handed', window[tableName][index][column] ? 'Yes' : 'No');
                    }
                    break;

                case 'min dmg (total)':
                case 'min throw dmg (total)':
                case 'min 2h dmg (total)':
                    if (item.classid > 305) break;
                    val = baseTypes[item.classid][tables[tableName][column]];
                    if (!val) break;
                    if (item.ethereal) val = Math.floor(val * 1.5);
                    val = Math.floor(val * (1 + (stats['dmg%'] || 0) / 100.0));
                    val += stats['dmg-min'] || 0; //dmg/lvl is always for max damage
                    insert(column, val, 'with stats included');
                    break;

                case 'max dmg (total)':
                case 'max throw dmg (total)':
                case 'max 2h dmg (total)':
                    if (item.classid > 305) break;
                    val = baseTypes[item.classid][tables[tableName][column]];
                    if (!val) break;
                    if (item.ethereal) val = Math.floor(val * 1.5);
                    val = Math.floor(
                        val *
                            (1 +
                                ((stats['dmg%'] || 0) + Math.floor(((stats['dmg%/lvl'] || 0) * item.charlvl) / 8)) /
                                    100.0)
                    );
                    val += (stats['dmg-max'] || 0) + Math.floor(((stats['dmg/lvl'] || 0) * item.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'min defense (total)':
                    val =
                        stats['ac%'] || stats['ac%/lvl']
                            ? baseTypes[item.classid].maxac + 1
                            : baseTypes[item.classid].minac;
                    if (!val) break;
                    if ([91, 92, 93, 94].indexOf(item.craft) !== -1 && dstats['ac%'].affix.hasOwnProperty('name'))
                        val += 1; // Thanks @Kaylin
                    if (item.ethereal) val = Math.floor(val * 1.5);
                    val = Math.floor(
                        val *
                            (1 +
                                ((stats['ac%'] || 0) + Math.floor(((stats['ac%/lvl'] || 0) * item.charlvl) / 8)) /
                                    100.0)
                    );
                    val += (stats.ac || 0) + Math.floor(((stats['ac/lvl'] || 0) * item.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'max defense (total)':
                    val =
                        stats['ac%'] || stats['ac%/lvl']
                            ? baseTypes[item.classid].maxac + 1
                            : baseTypes[item.classid].maxac;
                    if (!val) break;
                    if ([91, 92, 93, 94].indexOf(item.craft) !== -1 && dstats['ac%'].affix.hasOwnProperty('name'))
                        val += 1; // Thanks @Kaylin
                    if (item.ethereal) val = Math.floor(val * 1.5);
                    val = Math.floor(
                        val *
                            (1 +
                                ((stats['ac%'] || 0) + Math.floor(((stats['ac%/lvl'] || 0) * item.charlvl) / 8)) /
                                    100.0)
                    );
                    val += (stats.ac || 0) + Math.floor(((stats['ac/lvl'] || 0) * item.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'req strength (total)':
                case 'req dexterity (total)':
                    val = stats[tables[tableName][column]] || 0;
                    val = val - Math.floor(val * (Math.abs(stats.ease || 0) / 100));
                    if (!val) break;
                    insert(column, val, 'with stats included');
                    break;

                case 'reqstr':
                case 'reqdex':
                    val = window[tableName][index][column];
                    if (!window[tableName][index][column]) break;
                    if (item.ethereal) val -= 10;
                    insert(tables[tableName][column], val);
                    break;

                case 'gemsockets':
                    if (item.maxsockets) {
                        tval[column] = item.maxsockets;
                        insert(tables[tableName][column], item.maxsockets, 'considers ilvl and basetype');
                    }
                    break;

                case 'durability':
                    val = window[tableName][index][column];
                    if (!val || baseTypes[item.classid].stackable || baseTypes[item.classid].nodurability) break;
                    if (item.ethereal) val = Math.floor(val / 2) + 1;
                    tval[column] = val;
                    insert(tables[tableName][column], val);
                    break;

                case 'minac':
                case 'maxac':
                case 'mindam':
                case 'maxdam':
                case 'maxmisdam':
                case 'minmisdam':
                case '2handmaxdam':
                case '2handmindam':
                    val = window[tableName][index][column];
                    if (!val) break;
                    if (item.ethereal) val = Math.floor(val * 1.5);
                    //stats[column] = val;
                    tval[column] = val;
                    insert(tables[tableName][column], val);
                    break;

                default:
                    if (window[tableName][index][column]) {
                        tval[column] = window[tableName][index][column];
                        insert(tables[tableName][column], window[tableName][index][column]);
                    }
            }
        }
    }
}

function pickitToClipboard() {
    var textArea = document.createElement('textarea');
    var t = document.getElementById('pickit-Table').tBodies[0];
    t.innerHTML = '';
    var row = t.insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = 'Copied to clipboard.';

    setTimeout(function () {
        var t = document.getElementById('pickit-Table').tBodies[0];
        t.innerHTML = '';
        var row = t.insertRow(0);
        var cell = row.insertCell(0);

        cell.innerHTML = item.pickit;
        cell.title = 'Click to copy pickit line.';
    }, 1000);

    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = item.pickit;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

function getPickit() {
    let i,
        pickit = '';
    var iname = (locales[baseTypes[item.classid].namestr] || baseTypes[item.classid].name).replace(/ /g, '');

    pickit += '[name] == ' + iname + ' ';
    pickit += '&& [quality] == ' + { 4: 'magic', 6: 'rare', 8: 'crafted' }[item.quality] + ' ';
    pickit += '&& [flag] ' + (item.ethereal ? '=' : '!') + '= ethereal ';

    const statList = [];

    for (var stat in stats) {
        switch (stat) {
            case 'cold-len':
            case 'pois-len':
                break;

            case 'ease':
                statList.push('[' + ARR_NAME_STAT[stat] + '] <= ' + stats[stat]);
                break;

            case 'rep-dur':
            case 'rep-quant':
            case 'indestruct':
            case 'dmg/lvl':
            case 'att/lvl':
                statList.push('[' + ARR_NAME_STAT[stat] + '] >= 1');
                break;

            case 'dmg-min':
            case 'dmg-max':
                statList.push('[plus' + ARR_NAME_STAT[stat] + '] >= ' + stats[stat]);
                break;

            case 'charged':
            case 'hit-skill':
            case 'gethit-skill':
            case 'att-skill':
                statList.push('[' + ARR_NAME_STAT[stat] + '] == ' + stats[stat]);
                break;

            case 'res-all':
                statList.push('[fireresist]+[coldresist]+[lightresist]+[poisonresist] >= ' + stats[stat] * 4);
                break;

            default:
                statList.push('[' + ARR_NAME_STAT[stat] + '] >= ' + stats[stat]);
                break;
        }
    }

    for (i = 1; i < 4; i++) {
        if (item['smod' + i] === -1) continue;
        statList.push(
            '[skill' + skills[item['smod' + i]].skill.replace(/ /g, '') + '] >= ' + item['smod' + i + '-range1']
        );
    }

    if (statList.length) {
        pickit += '# ';
        pickit += statList.join(' && ');
    }

    item.pickit = pickit;
    //console.log(pickit);
}

function getItemCrafts() {
    let i, craftBase;

    item.crafts = [];

    for (i = 0; i < cubeMain.length; i++) {
        if (cubeMain[i]['input 2'] !== 'jew' || cubeMain[i]['numinputs'] !== 4) continue; //Only check crafting recipes
        craftBase = cubeMain[i]['input 1'].split(',')[0];

        if (
            (baseTypes[item.classid].hasOwnProperty('normcode') && baseTypes[item.classid]['normcode'] === craftBase) ||
            item.types.indexOf(craftBase) > -1
        ) {
            item.crafts.push(i);
        }
    }
}

function getAffixFreqs() {
    item.p1freq = item.p1 === -1 ? 0 : magicPrefix[item.p1].frequency;
    item.p2freq = item.p2 === -1 ? 0 : magicPrefix[item.p2].frequency;
    item.p3freq = item.p3 === -1 ? 0 : magicPrefix[item.p3].frequency;

    item.s1freq = item.s1 === -1 ? 0 : magicSuffix[item.s1].frequency;
    item.s2freq = item.s2 === -1 ? 0 : magicSuffix[item.s2].frequency;
    item.s3freq = item.s3 === -1 ? 0 : magicSuffix[item.s3].frequency;

    item.autoaffixfreq = item.autoaffix === -1 ? 0 : autoMagic[item.autoaffix].frequency;
}

function generateItem() {
    getCompositeStats();
    getStatOrder();
    getExplicits();
    getImplicits();

    ItemScreenshot.create({
        image: item.invfile,
        color: item.icolor,
        ethereal: item.ethereal,
        sockets: Math.min(item.maxsockets, stats['sock'] || 0),
        desc: [].concat(implicits, explicits),
    });
}

function getInvFile() {
    // invfile overrides
    switch (item.classid) {
        case 603: // Small charm
            return 'invch1';
        case 604: // Large charm
            return 'invch2';
        case 605: // Grand charm
            return 'invch3';
        case 643: // Jewel
            return 'invjw5';
    }

    return baseTypes[item.classid].invfile;
}

function filterRareNames(p) {
    var nameTable = p ? rarePrefix : rareSuffix,
        nameType = p ? 'namepre' : 'namesuf',
        div,
        sel,
        opt,
        valid,
        i;

    div = document.getElementById(nameType + '-Div');
    sel = document.getElementById(nameType + '-Select');

    if (item.quality === 4) {
        div.style.display = 'none';
    } else {
        div.style.display = 'block';
    }

    for (i = 0; i < nameTable.length; i++) {
        opt = document.getElementById(nameType + '-' + i);

        if (
            item.types.indexOf(nameTable[i].itype1) === -1 &&
            item.types.indexOf(nameTable[i].itype2) === -1 &&
            item.types.indexOf(nameTable[i].itype3) === -1 &&
            item.types.indexOf(nameTable[i].itype4) === -1 &&
            item.types.indexOf(nameTable[i].itype5) === -1 &&
            item.types.indexOf(nameTable[i].itype6) === -1
        ) {
            opt.disabled = true;
        } else {
            opt.disabled = false;
            valid = valid ? valid : i; // Save the first valid name
        }
    }

    if (document.getElementById(nameType + '-' + item[nameType]).disabled) {
        item[nameType] = valid;
        sel.value = valid;
    }
}

function getTitle() {
    var name = '',
        a,
        base;

    base = locales[baseTypes[item.classid].namestr] || baseTypes[item.classid].name;

    if (item.quality === 4) {
        if (item.p1 !== -1) name += locales[magicPrefix[item.p1].name] + ' ';
        if (item.p2 !== -1) name += locales[magicPrefix[item.p2].name] + ' ';
        if (item.p3 !== -1) name += locales[magicPrefix[item.p3].name] + ' ';
        name += base;
        if (item.s1 !== -1) name += ' ' + locales[magicSuffix[item.s1].name];
        if (item.s2 !== -1) name += ' ' + locales[magicSuffix[item.s2].name];
        if (item.s3 !== -1) name += ' ' + locales[magicSuffix[item.s3].name];
    } else {
        name = locales[rarePrefix[item.namepre].name] + ' ' + locales[rareSuffix[item.namesuf].name] + ' ' + base;
    }

    item.title = name;
}

function saveImage(imgDiv) {
    var a = document.createElement('a');
    a.href = imgDiv.firstChild.toDataURL();
    a.download = item.title;
    a.click();

    return true;
}

function update(control) {
    if (!control) control = { id: 'none-none' };
    stats = {};
    dstats = {};

    var controlGroups = control.id.split('-'),
        i;

    item.quality = +document.getElementById('quality-Select').value;
    item.classid = +document.getElementById('classid-Select').value;
    item.namepre = +document.getElementById('namepre-Select').value;
    item.namesuf = +document.getElementById('namesuf-Select').value;
    item.ethereal = +document.getElementById('ethereal-Select').value;
    item.expansion = +document.getElementById('expansion-Select').value;
    item.level = +document.getElementById('level-Select').value;
    item.charlvl = +document.getElementById('charlvl-Select').value;
    item.charclassid = +document.getElementById('charclassid-Select').value;
    item.p1 = +document.getElementById('p1-Select').value;
    item.p2 = +document.getElementById('p2-Select').value;
    item.p3 = +document.getElementById('p3-Select').value;
    item.s1 = +document.getElementById('s1-Select').value;
    item.s2 = +document.getElementById('s2-Select').value;
    item.s3 = +document.getElementById('s3-Select').value;
    item.smod1 = +document.getElementById('smod1-Select').value;
    item.smod2 = +document.getElementById('smod2-Select').value;
    item.smod3 = +document.getElementById('smod3-Select').value;
    item.craft = +document.getElementById('craft-Select').value;
    item.autoaffix = +document.getElementById('autoaffix-Select').value;
    item.type = baseTypes[item.classid].type;
    item.autogroup = baseTypes[item.classid]['auto prefix'];

    getItemTypes();
    item.invfile = getInvFile();
    item.alvl = getAffixLevel();

    if (item.maxquality === 4 && item.quality !== 4) {
        document.getElementById('quality-Select').value = 4;
        item.quality = 4;
    }

    if (baseTypes[item.classid].expansion) {
        //Force expansion mods when using expansion only item types
        document.getElementById('expansion-Select').value = 1;
        item.expansion = 1;
    }

    if (
        (!item.expansion || item.quality === 8 || baseTypes[item.classid].nodurability) &&
        item.ethereal &&
        item.classid !== 225
    ) {
        //Force non eth items to be non eth
        document.getElementById('ethereal-Select').value = 0;
        item.ethereal = 0;
    }

    if (!item.staffmods) {
        //Remove staffmods if the base can't have them
        document.getElementById('smod1-Select').value = -1;
        document.getElementById('smod2-Select').value = -1;
        document.getElementById('smod3-Select').value = -1;
        item.smod1 = -1;
        item.smod2 = -1;
        item.smod3 = -1;
    }

    if (!item.autogroup) {
        document.getElementById('autoaffix-Select').value = -1;
        item.autoaffix = -1;
    }

    getItemCrafts();

    if (!item.crafts.length || !item.expansion) {
        document.getElementById('quality-8').disabled = true;
        document.getElementById('craft-Select').value = -1;

        if (+document.getElementById('quality-Select').value === 8) {
            document.getElementById('quality-Select').value = 6;
            item.quality = 6;
        }

        item.craft = -1;
    } else {
        document.getElementById('quality-8').disabled = false;
    }

    filterRareNames(true);
    filterRareNames(false);
    getAffixCount();
    getMaxAffixCount();
    setAvoidGroups();
    getStaffTiers();

    filterAffixGroup(magicPrefix, affixGroups[0]);
    filterAffixGroup(magicSuffix, affixGroups[1]);
    filterAffixGroup(skills, affixGroups[2]);
    filterAffixes(autoMagic, 'autoaffix');
    filterAffixes(cubeMain, 'craft');

    setSliderGroup(magicPrefix, affixGroups[0]);
    setSliderGroup(magicSuffix, affixGroups[1]);
    setSliderGroup(skills, affixGroups[2]);
    setSlider(autoMagic, 'autoaffix');
    setSlider(cubeMain, 'craft');

    getAffixFreqs();
    getItemLevel();
    getPickit();
    getItemColor(true);
    getItemColor(false);
    getTitle();
    generateItem();

    param.setAll();
    updateTables();

    //console.log(item);
    //console.log(dstats);
    firstLoad = false;
}

const classidSelect = document.getElementById('classid-Select');
classidSelect.onchange = update.bind(this, classidSelect);
const namepreSelect = document.getElementById('namepre-Select');
namepreSelect.onchange = update.bind(this, namepreSelect);
const namesufSelect = document.getElementById('namesuf-Select');
namesufSelect.onchange = update.bind(this, namesufSelect);
const qualitySelect = document.getElementById('quality-Select');
qualitySelect.onchange = update.bind(this, qualitySelect);
const etherealSelect = document.getElementById('ethereal-Select');
etherealSelect.onchange = update.bind(this, etherealSelect);
const expansionSelect = document.getElementById('expansion-Select');
expansionSelect.onchange = update.bind(this, expansionSelect);
const levelSelect = document.getElementById('level-Select');
levelSelect.onchange = update.bind(this, levelSelect);
const charlvlSelect = document.getElementById('charlvl-Select');
charlvlSelect.onchange = update.bind(this, charlvlSelect);
const charclassidSelect = document.getElementById('charclassid-Select');
charclassidSelect.onchange = update.bind(this, charclassidSelect);
const p1Select = document.getElementById('p1-Select');
p1Select.onchange = update.bind(this, p1Select);
const p1range1 = document.getElementById('p1-range1');
p1range1.onchange = setSliderValue.bind(this, p1range1);
const p1range2 = document.getElementById('p1-range2');
p1range2.onchange = setSliderValue.bind(this, p1range2);
const p1range3 = document.getElementById('p1-range3');
p1range3.onchange = setSliderValue.bind(this, p1range3);
const p2Select = document.getElementById('p2-Select');
p2Select.onchange = update.bind(this, p2Select);
const p2range1 = document.getElementById('p2-range1');
p2range1.onchange = setSliderValue.bind(this, p2range1);
const p2range2 = document.getElementById('p2-range2');
p2range2.onchange = setSliderValue.bind(this, p2range2);
const p2range3 = document.getElementById('p2-range3');
p2range3.onchange = setSliderValue.bind(this, p2range3);
const p3Select = document.getElementById('p3-Select');
p3Select.onchange = update.bind(this, p3Select);
const p3range1 = document.getElementById('p3-range1');
p3range1.onchange = setSliderValue.bind(this, p3range1);
const p3range2 = document.getElementById('p3-range2');
p3range2.onchange = setSliderValue.bind(this, p3range2);
const p3range3 = document.getElementById('p3-range3');
p3range3.onchange = setSliderValue.bind(this, p3range3);
const s1Select = document.getElementById('s1-Select');
s1Select.onchange = update.bind(this, s1Select);
const s1range1 = document.getElementById('s1-range1');
s1range1.onchange = setSliderValue.bind(this, s1range1);
const s1range2 = document.getElementById('s1-range2');
s1range2.onchange = setSliderValue.bind(this, s1range2);
const s1range3 = document.getElementById('s1-range3');
s1range3.onchange = setSliderValue.bind(this, s1range3);
const s2Select = document.getElementById('s2-Select');
s2Select.onchange = update.bind(this, s2Select);
const s2range1 = document.getElementById('s2-range1');
s2range1.onchange = setSliderValue.bind(this, s2range1);
const s2range2 = document.getElementById('s2-range2');
s2range2.onchange = setSliderValue.bind(this, s2range2);
const s2range3 = document.getElementById('s2-range3');
s2range3.onchange = setSliderValue.bind(this, s2range3);
const s3Select = document.getElementById('s3-Select');
s3Select.onchange = update.bind(this, s3Select);
const s3range1 = document.getElementById('s3-range1');
s3range1.onchange = setSliderValue.bind(this, s3range1);
const s3range2 = document.getElementById('s3-range2');
s3range2.onchange = setSliderValue.bind(this, s3range2);
const s3range3 = document.getElementById('s3-range3');
s3range3.onchange = setSliderValue.bind(this, s3range3);
const smod1Select = document.getElementById('smod1-Select');
smod1Select.onchange = update.bind(this, smod1Select);
const smod1range1 = document.getElementById('smod1-range1');
smod1range1.onchange = setSliderValue.bind(this, smod1range1);
const smod1range2 = document.getElementById('smod1-range2');
smod1range2.onchange = setSliderValue.bind(this, smod1range2);
const smod1range3 = document.getElementById('smod1-range3');
smod1range3.onchange = setSliderValue.bind(this, smod1range3);
const smod2Select = document.getElementById('smod2-Select');
smod2Select.onchange = update.bind(this, smod2Select);
const smod2range1 = document.getElementById('smod2-range1');
smod2range1.onchange = setSliderValue.bind(this, smod2range1);
const smod2range2 = document.getElementById('smod2-range2');
smod2range2.onchange = setSliderValue.bind(this, smod2range2);
const smod2range3 = document.getElementById('smod2-range3');
smod2range3.onchange = setSliderValue.bind(this, smod2range3);
const smod3Select = document.getElementById('smod3-Select');
smod3Select.onchange = update.bind(this, smod3Select);
const smod3range1 = document.getElementById('smod3-range1');
smod3range1.onchange = setSliderValue.bind(this, smod3range1);
const smod3range2 = document.getElementById('smod3-range2');
smod3range2.onchange = setSliderValue.bind(this, smod3range2);
const smod3range3 = document.getElementById('smod3-range3');
smod3range3.onchange = setSliderValue.bind(this, smod3range3);
const craftSelect = document.getElementById('craft-Select');
craftSelect.onchange = update.bind(this, craftSelect);
const craftrange1 = document.getElementById('craft-range1');
craftrange1.onchange = setSliderValue.bind(this, craftrange1);
const craftrange2 = document.getElementById('craft-range2');
craftrange2.onchange = setSliderValue.bind(this, craftrange2);
const craftrange3 = document.getElementById('craft-range3');
craftrange3.onchange = setSliderValue.bind(this, craftrange3);
const craftrange4 = document.getElementById('craft-range4');
craftrange4.onchange = setSliderValue.bind(this, craftrange4);
const autoaffixSelect = document.getElementById('autoaffix-Select');
autoaffixSelect.onchange = update.bind(this, autoaffixSelect);
const autoaffixrange1 = document.getElementById('autoaffix-range1');
autoaffixrange1.onchange = setSliderValue.bind(this, autoaffixrange1);
const autoaffixrange2 = document.getElementById('autoaffix-range2');
autoaffixrange2.onchange = setSliderValue.bind(this, autoaffixrange2);
const autoaffixrange3 = document.getElementById('autoaffix-range3');
autoaffixrange3.onchange = setSliderValue.bind(this, autoaffixrange3);
const pickitTable = document.getElementById('pickit-Table');
pickitTable.onclick = pickitToClipboard;
const middle = document.getElementById('middle');
middle.onclick = saveImage.bind(this, middle);
const clear = document.getElementById('clear');
clear.onclick = reload;
const save = document.getElementById('save');
save.onclick = saveD2i;
