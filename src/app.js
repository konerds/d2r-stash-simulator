import './app.css';

import imgFont16 from './assets/images/font16.png';
import imgHand from './assets/images/hand.png';
import imgGemSocket from './assets/images/gemsocket.png';
import imgBgnd1 from './assets/images/bgnd1.png';
import imgBgnd2 from './assets/images/bgnd2.png';
import imgBgnd3 from './assets/images/bgnd3.png';
import imgBgnd4 from './assets/images/bgnd4.png';

import txtMagicPrefix from './assets/mpq/MagicPrefix.txt';
import txtMagicSuffix from './assets/mpq/MagicSuffix.txt';
import txtAutomagic from './assets/mpq/automagic.txt';
import txtSkills from './assets/mpq/skills.txt';
import txtWeapons from './assets/mpq/weapons.txt';
import txtArmor from './assets/mpq/armor.txt';
import txtMisc from './assets/mpq/misc.txt';
import txtItemTypes from './assets/mpq/ItemTypes.txt';
import txtCubemain from './assets/mpq/cubemain.txt';
import txtColors from './assets/mpq/colors.txt';
import txtGamble from './assets/mpq/gamble.txt';
import txtRarePrefix from './assets/mpq/RarePrefix.txt';
import txtRareSuffix from './assets/mpq/RareSuffix.txt';
import txtItemStatCost from './assets/mpq/ItemStatCost.txt';
import txtProperties from './assets/mpq/Properties.txt';

import tblString from './assets/lang/eng/string.tbl';
import tblExpansionstring from './assets/lang/eng/expansionstring.tbl';
import tblPatchstring from './assets/lang/eng/patchstring.tbl';

import {
    listGroupAffix,
    objPrefix,
    objSuffix,
    objTableColor,
    listLocale,
    objStat,
    setObjStat,
    objStatD,
    setObjStatD,
    listImplicit,
    isLoadedFirst,
    setObjDefault,
    objItemCurrent,
    objDefault,
    setObjPrefix,
    setObjSuffix,
    listExplicit,
    setIsLoadedFirst,
} from './data/index.js';
import {
    CHandlerBinary,
    affixOverCap,
    getAffixCount,
    getAffixFreqs,
    getAffixLevel,
    getAvoidGroups,
    getCompositeStats,
    getExplicits,
    getImplicits,
    getInvFile,
    getItemColor,
    getItemCrafts,
    getItemLevel,
    getItemTypes,
    getMaxAffixCount,
    getStaffTiers,
    getStatOrder,
    getTitle,
    modcodeToItemStat,
    parseLocales,
    parseTable,
    setAvoidGroups,
    updateItemStatCost,
} from './utils/index';

const objFont16 = {
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
        return new Promise((resolve, _) => {
            const cStart = Date.now();
            const img = new Image();

            img.onload = () => {
                const fonts = [];
                const cWidth = 14;
                const cHeight = 16;

                for (let color = 0; color < 14; color++) {
                    fonts[color] = [];

                    for (let ch = 0; ch < 256; ch++) {
                        const newChar = document.createElement('canvas');
                        newChar.width = cWidth;
                        newChar.height = cHeight;
                        const ctx = newChar.getContext('2d');
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
        }).then((result) => (objFont16.font = result));
    },

    measureText: function (text) {
        const lines = Array.isArray(text) ? text : text.split('\n');
        let width = 0;
        let height = 0;

        lines.forEach((line) => {
            let tmpw = 0;
            let tmph = 0;

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
        let x_pos = Math.round(x);
        let y_pos = Math.round(y);
        const lines = Array.isArray(text) ? text : text.split('\n');

        lines.forEach((line) => {
            for (let i = 0; i < line.length; i++) {
                const ch = line.charCodeAt(i);
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

// Async file gets
objFont16
    .load()
    .then(() => {
        window.magicPrefix = parseTable(txtMagicPrefix);
        window.magicSuffix = parseTable(txtMagicSuffix);
        window.autoMagic = parseTable(txtAutomagic);
        window.skills = parseTable(txtSkills);
        window.weapons = parseTable(txtWeapons);
        window.armor = parseTable(txtArmor);
        window.misc = parseTable(txtMisc);
        window.itemTypes = parseTable(txtItemTypes);
        window.cubeMain = parseTable(txtCubemain);
        window.colors = parseTable(txtColors);
        window.gamble = parseTable(txtGamble);
        window.rarePrefix = parseTable(txtRarePrefix);
        window.rareSuffix = parseTable(txtRareSuffix);
        window.itemStatCost = parseTable(txtItemStatCost, true);
        window.properties = parseTable(txtProperties, true);

        // 390,570 bytes
        window.stringtbl = new Uint8Array(tblString);
        // 173,234 bytes
        window.expansionstringtbl = new Uint8Array(tblExpansionstring);
        // 35,678 bytes
        window.patchstringtbl = new Uint8Array(tblPatchstring);

        parseLocales();
    })
    .then(() => build());

function saveD2i() {
    const br = new CHandlerBinary();
    const base = baseTypes[objItemCurrent.classid];
    const code = base.code;
    const sock = Math.min(objItemCurrent.maxsockets, objStat['sock'] || 0);
    let val;

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
    br.bits(objItemCurrent.ethereal, 1); // Ethereal
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
    br.bits(objItemCurrent.level, 7); // ilvl
    br.bits(objItemCurrent.quality, 4); // Quality
    br.bits(0, 1); // Custom gfx?

    if (objItemCurrent.autoaffix + 1) {
        br.bits(1, 1); // Autoaffix?
        br.bits(objItemCurrent.autoaffix + 1, 11); // Autoaffix index
    } else {
        br.bits(0, 1);
    }

    switch (objItemCurrent.quality) {
        case 4:
            br.bits(objItemCurrent.p1 + 1 ? objItemCurrent.p1 + 1 : 0, 11); // ? name prefix??
            br.bits(objItemCurrent.s1 + 1 ? objItemCurrent.s1 + 1 : 0, 11); // ? name suffix??
            break;
        case 6:
        case 8:
            br.bits(objItemCurrent.namepre + 1 ? objItemCurrent.namepre + 156 : 0, 8);
            br.bits(objItemCurrent.namesuf + 1 ? objItemCurrent.namesuf + 1 : 0, 8);
            if (objItemCurrent.p1 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.p1 + 1, 11);
            } else br.bits(0, 1);
            if (objItemCurrent.s1 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.s1 + 1, 11);
            } else br.bits(0, 1);
            if (objItemCurrent.p2 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.p2 + 1, 11);
            } else br.bits(0, 1);
            if (objItemCurrent.s2 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.s2 + 1, 11);
            } else br.bits(0, 1);
            if (objItemCurrent.p3 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.p3 + 1, 11);
            } else br.bits(0, 1);
            if (objItemCurrent.s3 + 1) {
                br.bits(1, 1);
                br.bits(objItemCurrent.s3 + 1, 11);
            } else br.bits(0, 1);
            break;
    }

    //br.bits(0, 5); // Only applies to tp and id tomes
    br.bits(0, 1);

    if (objItemCurrent.classid > 305 && objItemCurrent.classid < 508) {
        // Is from armor table
        val = objStat['ac%'] || objStat['ac%/lvl'] ? base.maxac + 1 : base.maxac;
        if (
            val &&
            [91, 92, 93, 94].indexOf(objItemCurrent.craft) !== -1 &&
            objStatD['ac%'].affix.hasOwnProperty('name')
        ) {
            val += 1; // Thanks @Kaylin
        }
        if (val && objItemCurrent.ethereal) {
            val = Math.floor(val * 1.5);
        }
        br.bits((val || 0) + 10, 11); // Defense
    }

    if (objItemCurrent.classid < 508) {
        val = baseTypes[objItemCurrent.classid].durability || 0;
        br.bits(val, 8); // Dura
        if (val) {
            br.bits(val, 9); // Maxdura
        }
    }

    if (base.stackable) {
        br.bits(base.maxstack || 0, 9); // Quantity
    }

    if (sock > 0) {
        br.bits(sock, 4);
    }

    const bstats = {};
    const cstats = {};
    for (const a in objStatD) {
        bstats[a] = objStatD[a];
    }
    if (bstats.hasOwnProperty('res-all')) {
        let composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (let i = 0; i < composite.length; i++) {
            bstats[composite[i]] = {};
            bstats[composite[i]].value = objStatD['res-all'].value;
            bstats[composite[i]].modcode = composite[i];
            bstats[composite[i]].properties = properties[composite[i]];
            bstats[composite[i]].itemstat = itemStatCost[modcodeToItemStat(composite[i])];
        }

        delete bstats['res-all'];
    }
    for (const a in bstats) {
        let stat = bstats[a].itemstat.stat;

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

    for (const a in cstats) {
        if (!cstats.hasOwnProperty(a)) {
            continue;
        }

        const stat = cstats[a];
        let stat2;

        switch (a) {
            case 'firemaxdam':
            case 'lightmaxdam':
            case 'magicmaxdam':
                if (cstats.hasOwnProperty(a.replace('max', 'min'))) {
                    break;
                }
                br.bits(cost.id, 9);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                break;

            case 'firemindam':
            case 'lightmindam':
            case 'magicmindam':
                const b = a.replace('min', 'max');
                stat2 = cstats[b];
                br.bits(stat.id, 9);
                br.bits(stat.value + stat['save add'], stat['save bits']);
                br.bits(stat2.value + stat2['save add'], stat2['save bits']);
                delete cstats[b];
                break;

            case 'coldmindam':
            case 'poisonmindam':
                stat2 = itemStatCost[a.replace('min', 'max')];
                const stat3 = itemStatCost[a.replace('mindam', 'length')];
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
                        (objItemCurrent.level - skills[stat.value].reqlevel) /
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
                const min = itemStatCost['itemmindamagepercent'];
                const max = itemStatCost['itemmaxdamagepercent'];
                br.bits(max.id, 9);
                br.bits(stat.value + max['save add'], max['save bits']);
                br.bits(stat.value + min['save add'], min['save bits']);
                break;

            case 'maxdamage':
                if (objItemCurrent.types.indexOf('char') !== -1 || objItemCurrent.types.indexOf('jewl') !== -1) {
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
                if (objItemCurrent.types.indexOf('char') !== -1 || objItemCurrent.types.indexOf('jewl') !== -1) {
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

    const elA = document.createElement('a');
    elA.href = URL.createObjectURL(new Blob([br.finish()], { type: 'application/octet-stream' }));
    elA.download = objItemCurrent.title + '.d2i';
    elA.click();
}

const ItemScreenshot = {
    // Settings

    showItemColor: false, // Show the item color at the end of the desc
    drawCursor: true, // Draw the cursor
    drawSockets: true, // Draw sockets and socketed items
    drawEthereal: true, // Draw ethereal item gfx
    drawBackground: true, // Draw cube background
    debug: false, // Log image generation steps

    // ------ No touchy ------

    hand: function () {
        const img = new Image();
        img.src = imgHand;
        return img;
    }.call(),
    socket: function () {
        const img = new Image();
        img.src = imgGemSocket;
        return img;
    }.call(),

    bgnd: [
        function () {
            const img = new Image();
            img.src = imgBgnd1;
            return img;
        }.call(),
        function () {
            const img = new Image();
            img.src = imgBgnd2;
            return img;
        }.call(),
        function () {
            const img = new Image();
            img.src = imgBgnd3;
            return img;
        }.call(),
        function () {
            const img = new Image();
            img.src = imgBgnd4;
            return img;
        }.call(),
    ],

    create: function (info) {
        let width,
            image,
            iStart = Date.now(),
            num2 = 16,
            num1 = 0;

        if (this.showItemColor && info.color.id !== 21) {
            info.desc.push({ colors: [5], strings: [' '] });
            info.desc.push({ colors: [5], strings: [info.color.name] });
        }

        for (let i = 0; i < info.desc.length; i++) {
            info.desc[i].widths = [];
            info.desc[i].totalwidth = 0;

            for (let n = 0; n < info.desc[i].strings.length; n++) {
                width = objFont16.measureText(info.desc[i].strings[n]).width;

                info.desc[i].widths.push(width);
                info.desc[i].totalwidth += width;
            }

            if (info.desc[i].totalwidth > num1) {
                num1 = info.desc[i].totalwidth;
            }
        }

        if (num1 < 100) {
            num1 = 100;
        }

        image = new Image();

        image.onload = () => {
            let x;
            let y;
            let top;
            let left = 0;

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

            const canvas = document.createElement('canvas');
            canvas.width = num1 + 14;
            canvas.height = num2 * info.desc.length + top + 1;
            document.getElementById('middle').innerHTML = '';
            document.getElementById('middle').append(canvas);
            const graphics = canvas.getContext('2d');

            if (this.debug) {
                console.log('Setting black canvas');
            }
            graphics.fillStyle = 'rgba(10, 10, 10, 1)';
            graphics.fillRect(0, 0, canvas.width, canvas.height);

            if (this.drawBackground) {
                if (this.debug) {
                    console.log('Drawing background');
                }
                graphics.drawImage(this.bgnd[y - 1], Math.round(canvas.width / 2) - left, -9); // top -10 originally

                if (this.debug) {
                    console.log('Drawing item-active background');
                }
                if (this.drawCursor) {
                    graphics.fillStyle = 'rgba(0, 128, 0, 0.1)';
                } else {
                    graphics.fillStyle = 'rgba(0, 0, 255, 0.1)';
                }

                graphics.fillRect((canvas.width - image.width) / 2, 5, image.width, image.height);
            }

            if (this.debug) {
                console.log('Drawing item gfx');
            }
            if (this.drawEthereal && info.ethereal) {
                graphics.globalAlpha = 0.5;
            }
            graphics.drawImage(image, Math.round((canvas.width - image.width) / 2), 5);
            graphics.globalAlpha = 1.0;

            if (this.drawSockets) {
                const num3 = Math.round((canvas.width - image.width) / 2);
                const num4 = num3 + 14;
                const num5 = num4 + 14;
                const num6 = 5;
                const num7 = 34;
                const num8 = 63;
                const num9 = 92;
                const num10 = 14;
                const num11 = 1;
                const num12 = -1;

                const socketPositions = [];

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

            if (this.debug) {
                console.log('Drawing text');
            }

            let index = 0;

            info.desc.forEach((line) => {
                const pos = {
                    x: canvas.width / 2,
                    y: index * num2 + top - 1,
                };

                const shift = line.totalwidth / 2;
                let xshift = 0;

                for (let i = 0; i < line.strings.length; i++) {
                    objFont16.drawText(graphics, pos.x - shift + xshift, pos.y, line.strings[i], line.colors[i]);
                    xshift += line.widths[i];
                }

                index += 1;
            });

            if (this.drawCursor) {
                if (this.debug) {
                    console.log('Drawing cursor');
                }
                graphics.drawImage(this.hand, Math.round((canvas.width + image.width) / 2) - 5, 5 + 5);
            }

            if (this.debug) {
                console.log('Creating item screenshot took ' + (Date.now() - iStart) + 'ms');
            }
        };

        import('./assets/gfx/' + info.image + '/' + info.color.id + '.png').then((imgDynamic) => {
            image.src = imgDynamic.default;
        });
    },
};

const param = {
    get: function (name) {
        const reg = new RegExp('[&|#]' + name + '=([^&#]+)');
        const val = window.location.hash.match(reg);
        return !val ? '' : val[1];
    },
    set: function (name, value) {
        const reg = new RegExp(name + '=([^&#]+)');
        const ind = window.location.hash.indexOf(name + '=');
        if (ind < 0) {
            window.location.hash += name + '=' + value + '&';
        }
        window.location.hash = window.location.hash.replace(reg, name + '=' + value);
    },
    list: function () {
        const pairs = window.location.hash.substring(1).split('&');
        const params = {};
        for (let i = 0; pairs[0] !== '' && i < pairs[i].length; i++) {
            const pair = pairs[i].split('=');
            params[pair[0]] = pair[1];
        }
        return pairs[0] !== '' ? params : false;
    },
    loadAll: function () {
        const pairs = window.location.hash.substring(1).split('&');
        for (let i = 0; i < pairs.length; i++) {
            if (!pairs[i]) {
                continue;
            }
            const pair = pairs[i].split('=');
            objItemCurrent[pair[0]] = +pair[1];
            if (pair[0].indexOf('range') > -1) {
                document.getElementById(pair[0]).value = +pair[1];
            } else {
                document.getElementById(pair[0] + '-Select').value = +pair[1];
            }
        }
    },
    setAll: function () {
        window.location.hash = '';
        for (const key in objItemCurrent) {
            //if (["type","types","class","staffmods","autogroup","amax","pmax","smax","pnum","snum","anum","maxsockets"].indexOf(key) > -1){ continue;}
            if (
                [
                    'quality',
                    'namepre',
                    'namesuf',
                    'classid',
                    'ethereal',
                    'expansion',
                    'level',
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
            ) {
                continue;
            }
            if (!objDefault.hasOwnProperty(key) || objItemCurrent[key] !== objDefault[key]) {
                this.set(key, objItemCurrent[key]);
            }
        }
    },
};

function reload() {
    window.location.hash = '';
    window.location.reload();
}

// function hideSelect(select) {
//     objItemCurrent[select] = -1;
//     document.getElementById(select + '-Div').style.display = 'none';
//     document.getElementById(select + '-Select').value = -1;
//     document.getElementById(select + '-range1Div').style.display = 'none';
//     document.getElementById(select + '-range2Div').style.display = 'none';
//     document.getElementById(select + '-range3Div').style.display = 'none';
//     document.getElementById(select + '-range1Div').classList.remove('last');
//     document.getElementById(select + '-range2Div').classList.remove('last');
//     document.getElementById(select + '-range3Div').classList.remove('last');
//     getAffixCount();
// }

// function showSelect(select) {
//     document.getElementById(select + '-Div').style.display = 'block';
// }

function build() {
    const excludeTypes = [
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
    ];
    let select;
    let option;
    let sortedTypes;

    console.log('Building menus');
    window.baseTypes = weapons.concat(armor, misc);
    setObjDefault(objItemCurrent);

    sortedTypes = Object.assign([], baseTypes);
    for (let n = 0; n < sortedTypes.length; n++) {
        sortedTypes[n].locale = listLocale[sortedTypes[n].namestr] || sortedTypes[n].name;
        sortedTypes[n].value = n;
    }
    sortedTypes.sort((a, b) => (a.locale > b.locale ? 1 : -1));

    magicSuffix[433].itype2 = 'ring';
    magicSuffix[434].itype2 = 'ring';
    magicSuffix[435].itype2 = 'ring';

    select = document.getElementById('classid-Select');
    for (let i = 0; i < sortedTypes.length; i++) {
        if (!sortedTypes[i].name) {
            continue;
        }
        if (sortedTypes[i].useable) {
            continue;
        }
        if (excludeTypes.indexOf(sortedTypes[i].type) > -1) {
            continue;
        }
        if ((!sortedTypes[i].spawnable || !sortedTypes[i].rarity) && !sortedTypes[i].nameable) {
            continue;
        }
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
            if (!magicPrefix[i].name) {
                continue;
            }
            if (!magicPrefix[i].spawnable) {
                continue;
            }
            option = document.createElement('option');
            option.text = listLocale[magicPrefix[i].name] + ' (' + magicPrefix[i].mod1code + ')';
            option.value = i;
            option.id = 'p' + (n + 1) + '-' + i;
            select.add(option);
        }
    }

    for (let n = 0; n < 3; n++) {
        // Suffixes
        select = document.getElementById('s' + (n + 1) + '-Select');
        for (let i = 0; i < magicSuffix.length; i++) {
            if (!magicSuffix[i].name) {
                continue;
            }
            if (!magicSuffix[i].spawnable) {
                continue;
            }
            option = document.createElement('option');
            option.text = listLocale[magicSuffix[i].name] + ' (' + magicSuffix[i].mod1code + ')';
            option.value = i;
            option.id = 's' + (n + 1) + '-' + i;
            select.add(option);
        }
    }

    select = document.getElementById('namepre-Select'); // Rareprefixes
    for (let i = 0; i < rarePrefix.length; i++) {
        option = document.createElement('option');
        option.text = listLocale[rarePrefix[i].name] || rarePrefix[i].name;
        option.value = i;
        option.id = 'namepre-' + i;
        if (i === 2) option.selected = true;
        select.add(option);
    }

    select = document.getElementById('namesuf-Select'); // Raresuffixes
    for (let i = 0; i < rareSuffix.length; i++) {
        option = document.createElement('option');
        option.text = listLocale[rareSuffix[i].name] || rareSuffix[i].name;
        option.value = i;
        option.id = 'namesuf-' + i;
        if (i === 79) option.selected = true;
        select.add(option);
    }

    select = document.getElementById('autoaffix-Select'); // Autoaffixes
    for (let i = 0; i < autoMagic.length; i++) {
        if (!autoMagic[i].name) {
            continue;
        }
        option = document.createElement('option');
        option.text = listLocale[autoMagic[i].name] + '   (' + autoMagic[i].mod1code + ')';
        option.value = i;
        option.id = 'autoaffix-' + i;
        select.add(option);
    }

    for (let n = 0; n < 3; n++) {
        // Staffmods
        select = document.getElementById('smod' + (n + 1) + '-Select');
        for (let i = 0; i < skills.length; i++) {
            if (!skills[i].charclass) {
                continue;
            }
            skills[i].name = listLocale['skillname' + i] || listLocale['Skillname' + (i + 1)];
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
        if (cubeMain[n]['input 2'] !== 'jew') {
            continue;
        }
        if (cubeMain[n]['numinputs'] !== 4) {
            continue;
        }
        option = document.createElement('option');
        option.text = cubeMain[n].description.split('-> ')[1];
        option.value = n;
        option.id = 'craft-' + n;
        select.add(option);
    }

    for (let i = 0; i < colors.length; i++) {
        objTableColor[colors[i].code] = {
            name: colors[i]['transform color'],
            id: i,
        };
    }

    updateItemStatCost();
    param.loadAll();
    update();
}

function setSlider(affixTable, affix) {
    let modcode, modparam, modmin, modmax, modmid, desc, slider, skill, el;

    switch (affix) {
        case 'smod1':
        case 'smod2':
        case 'smod3':
            if (objItemCurrent[affix] === -1) {
                document.getElementById(affix + '-range1Div').style.display = 'none';
                delete objItemCurrent[affix + '-range1'];
                return;
            }

            slider = document.getElementById(affix + '-range1');
            objItemCurrent[affix + '-range1'] = +slider.value;
            skill = skills[objItemCurrent[affix]];

            objStatD[affix] = {};
            objStatD[affix].value = +slider.value;
            objStatD[affix].skill = skill;
            objStatD[affix].modcode = affix;
            objStatD[affix].properties = properties['skill'];
            objStatD[affix].itemstat = itemStatCost[modcodeToItemStat('skill')];
            objStatD[affix].descprio = objStatD[affix].itemstat.descpriority; // Add a shorthand...

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
            for (let i = 0; i < 4; i++) {
                //Iterate the three modcodes - four if safety craft..
                modcode =
                    objItemCurrent[affix] === -1
                        ? 0
                        : affixTable[objItemCurrent[affix]][
                              affix === 'craft' ? 'mod ' + (i + 1) : 'mod' + (i + 1) + 'code'
                          ];

                if (!modcode) {
                    el = document.getElementById(affix + '-range' + (i + 1) + 'Div');
                    if (el) el.style.display = 'none';
                    delete objItemCurrent[affix + '-range' + (i + 1)];
                    delete objItemCurrent[affix + '-min' + (i + 1)];
                    delete objItemCurrent[affix + '-max' + (i + 1)];
                    continue;
                }

                if (affix === 'craft') {
                    modparam = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' param'];
                    modmin = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' min'];
                    modmax = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' max'];
                } else {
                    modparam = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'param'];
                    modmin = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'min'];
                    modmax = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'max'];
                }

                if (!modmin && !modmax) {
                    modmin = modparam;
                    modmax = modparam;
                    modparam = 0;
                }

                modmid = isLoadedFirst ? objItemCurrent[affix + '-range' + (i + 1)] : Math.ceil((modmin + modmax) / 2);
                if (!modmid) {
                    modmid = Math.ceil((modmin + modmax) / 2);
                }

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
                    objItemCurrent[affix + '-range' + (i + 1)] = modmid;
                    slider.min = modmin;
                    slider.max = modmax;
                    slider.value = modmid;
                }

                document.getElementById(affix + '-range' + (i + 1) + 'Div').title = desc;

                slider.setAttribute(
                    'norange',
                    slider.min === slider.max || parseInt(slider.min) > parseInt(slider.max) ? true : false
                );

                if (!objStat.hasOwnProperty(modcode)) {
                    objStat[modcode] = 0;
                }
                if (!objStatD.hasOwnProperty(modcode)) {
                    objStatD[modcode] = {};
                    objStatD[modcode].value = 0;
                    objStatD[modcode].modcode = modcode;
                    objStatD[modcode].properties = properties[modcode];
                    objStatD[modcode].itemstat = itemStatCost[modcodeToItemStat(modcode)];
                    objStatD[modcode].descprio = objStatD[modcode].itemstat.descpriority; // Add a shorthand...
                    objStatD[modcode].affix = affixTable[objItemCurrent[affix]];

                    if (affix === 'craft') {
                        objStatD[modcode].modparam = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' param'];
                        objStatD[modcode].modmin = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' min'];
                        objStatD[modcode].modmax = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' max'];
                    } else {
                        objStatD[modcode].modparam = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'param'];
                        objStatD[modcode].modmin = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'min'];
                        objStatD[modcode].modmax = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'max'];
                    }
                } else if (modcode === 'dmg-pois') {
                    // Have to stack poison duration too, not just the damage
                    objStatD[modcode].modparam += affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'param'];
                }

                objStatD[modcode].value += +slider.value;
                objStat[modcode] += +slider.value;

                objItemCurrent[affix + '-range' + (i + 1)] = +slider.value;
                objItemCurrent[affix + '-min' + (i + 1)] = modmin;
                objItemCurrent[affix + '-max' + (i + 1)] = modmax;
            }
    }
}

function setSliderValue(control) {
    document.getElementById(control.id + 'Value').innerHTML = control.value;
    param.set(control.id, +control.value);
    objItemCurrent[control.id] = +control.value;
    setObjStat({});
    setObjStatD({});
    setSliderGroup(magicPrefix, listGroupAffix[0]);
    setSliderGroup(magicSuffix, listGroupAffix[1]);
    setSliderGroup(skills, listGroupAffix[2]);
    setSlider(autoMagic, 'autoaffix');
    setSlider(cubeMain, 'craft');
    generateItem();
}

function setSliderGroup(affixTable, affixGroup) {
    for (let i = 0; i < affixGroup.length; i++) {
        setSlider(affixTable, affixGroup[i]);
    }
}

function generateItem() {
    getCompositeStats();
    getStatOrder();
    getExplicits();
    getImplicits();

    ItemScreenshot.create({
        image: objItemCurrent.invfile,
        color: objItemCurrent.icolor,
        ethereal: objItemCurrent.ethereal,
        sockets: Math.min(objItemCurrent.maxsockets, objStat['sock'] || 0),
        desc: [].concat(listImplicit, listExplicit),
    });
}

function filterRareNames(p) {
    const nameTable = p ? rarePrefix : rareSuffix;
    const nameType = p ? 'namepre' : 'namesuf';
    let valid;

    const div = document.getElementById(nameType + '-Div');
    const sel = document.getElementById(nameType + '-Select');

    div.style.display = objItemCurrent.quality === 4 ? 'none' : 'block';

    for (let i = 0; i < nameTable.length; i++) {
        const opt = document.getElementById(nameType + '-' + i);
        if (
            objItemCurrent.types.indexOf(nameTable[i].itype1) === -1 &&
            objItemCurrent.types.indexOf(nameTable[i].itype2) === -1 &&
            objItemCurrent.types.indexOf(nameTable[i].itype3) === -1 &&
            objItemCurrent.types.indexOf(nameTable[i].itype4) === -1 &&
            objItemCurrent.types.indexOf(nameTable[i].itype5) === -1 &&
            objItemCurrent.types.indexOf(nameTable[i].itype6) === -1
        ) {
            opt.disabled = true;
        } else {
            opt.disabled = false;
            valid = valid ? valid : i; // Save the first valid name
        }
    }

    if (document.getElementById(nameType + '-' + objItemCurrent[nameType]).disabled) {
        objItemCurrent[nameType] = valid;
        sel.value = valid;
    }
}

function saveImage(imgDiv) {
    const elA = document.createElement('a');
    elA.href = imgDiv.firstChild.toDataURL();
    elA.download = objItemCurrent.title;
    elA.click();
    return true;
}

const filterAffixGroup = (affixTable, affixGroup) => {
    for (let i = 0; i < affixGroup.length; i++) {
        filterAffixes(affixTable, affixGroup[i]);
    }
};

const filterAffixes = (affixTable, affix) => {
    let avoid = getAvoidGroups(affix); // Get the affix groups that are already selected
    // console.log("Filtering " + affix + " (Avoiding groups : " + avoid.join(",") + ")");

    switch (affix) {
        case 'craft':
            for (let i = 0; i < cubeMain.length; i++) {
                if (cubeMain[i]['input 2'] !== 'jew') {
                    continue;
                }
                if (cubeMain[i]['numinputs'] !== 4) {
                    continue;
                }

                document.getElementById(affix + '-' + i).disabled = true;

                if (!objItemCurrent.expansion) {
                    continue;
                }
                if (objItemCurrent.quality !== 8) {
                    continue;
                }
                if (objItemCurrent.crafts.indexOf(i) === -1) {
                    continue;
                }

                document.getElementById(affix + '-' + i).disabled = false;
            }
            break;

        case 'smod1': // smods
        case 'smod2':
        case 'smod3':
            for (let i = 0; i < affixTable.length; i++) {
                if (!affixTable[i].charclass) {
                    continue;
                }

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].charclass !== objItemCurrent.staffmods) {
                    continue;
                }
                if (affix === 'smod1' && (objItemCurrent.smod2 === i || objItemCurrent.smod3 === i)) {
                    continue;
                }
                if (affix === 'smod2' && (objItemCurrent.smod1 === i || objItemCurrent.smod3 === i)) {
                    continue;
                }
                if (affix === 'smod3' && (objItemCurrent.smod1 === i || objItemCurrent.smod2 === i)) {
                    continue;
                }
                if (objItemCurrent.smodlevelreqs.indexOf(affixTable[i].reqlevel) === -1) {
                    continue;
                }

                document.getElementById(affix + '-' + i).disabled = false;
            }
            break;

        default: // prefixes/suffixes/autoaffixes
            objItemCurrent[affix + 'totalfreq'] = 0;
            objItemCurrent[affix + 'groupfreq'] = 0;

            if (listGroupAffix[0].indexOf(affix) > -1) {
                setObjPrefix({});
            }
            if (listGroupAffix[1].indexOf(affix) > -1) {
                setObjSuffix({});
            }

            for (let i = 0; i < affixTable.length; i++) {
                if (!affixTable[i].name) {
                    continue;
                } // Affix has no name
                if (!affixTable[i].spawnable) {
                    continue;
                } // Affix cannot spawn

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].version === 0) {
                    continue;
                } // Old affixes that aren't used anymore
                if (affixTable[i].version !== 1 && !objItemCurrent.expansion) {
                    continue;
                } // Item version isn't same as affix
                if (!affixTable[i].rare && objItemCurrent.quality !== 4) {
                    continue;
                } // Item is not magic and this affix only spawns on magic items
                if (objItemCurrent.types.indexOf(affixTable[i].etype1) > -1) {
                    continue;
                } // Item has an equiv matching one of the groups this affix cannot be on
                if (objItemCurrent.types.indexOf(affixTable[i].etype2) > -1) {
                    continue;
                }
                if (objItemCurrent.types.indexOf(affixTable[i].etype3) > -1) {
                    continue;
                }
                if (affixTable[i].etype4 && objItemCurrent.types.indexOf(affixTable[i].etype4) > -1) {
                    continue;
                }
                if (affixTable[i].etype5 && objItemCurrent.types.indexOf(affixTable[i].etype5) > -1) {
                    continue;
                }
                if (
                    objItemCurrent.class &&
                    affixTable[i].classspecific &&
                    affixTable[i].classspecific !== objItemCurrent.class
                )
                    continue; // Affix is class specific and doesn't match the class specific base (if any)
                if (
                    objItemCurrent.types.indexOf(affixTable[i].itype1) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype2) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype3) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype4) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype5) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype6) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype7) === -1
                )
                    continue; // Affix cannot spawn on this basetype (none of the equivs match itype1-7)
                if (affixTable[i].level && objItemCurrent.alvl < affixTable[i].level) {
                    continue;
                } // Item level is too low
                if (affixTable[i].maxlevel && affixTable[i].maxlevel < objItemCurrent.level) {
                    continue;
                } // Item level is too high
                if (affix === 'autoaffix' && affixTable[i].group !== objItemCurrent.autogroup) {
                    continue;
                } // Autogroup doesn't match the group of affixes the item can spawn with
                if (affixOverCap(affix)) {
                    continue;
                } // This affix would go over prefix/suffix/affix cap

                objItemCurrent[affix + 'totalfreq'] += affixTable[i].frequency;
                if (objItemCurrent[affix] !== -1 && affixTable[objItemCurrent[affix]].group === affixTable[i].group)
                    objItemCurrent[affix + 'groupfreq'] += affixTable[i].frequency;

                if (listGroupAffix[0].indexOf(affix) > -1) {
                    if (!objPrefix.hasOwnProperty(affixTable[i].group)) {
                        objPrefix[affixTable[i].group] = [affixTable[i].group, affixTable[i].frequency, 1, 0, 0];
                    } else {
                        objPrefix[affixTable[i].group][1] += affixTable[i].frequency;
                    }
                }

                if (listGroupAffix[1].indexOf(affix) > -1) {
                    if (!objSuffix.hasOwnProperty(affixTable[i].group)) {
                        objSuffix[affixTable[i].group] = [affixTable[i].group, affixTable[i].frequency, 2, 0, 0];
                    } else {
                        objSuffix[affixTable[i].group][1] += affixTable[i].frequency;
                    }
                }

                if (avoid.indexOf(affixTable[i].group) > -1) {
                    continue;
                } // Affix has a group that is already selected

                document.getElementById(affix + '-' + i).disabled = false;
            }
    }

    if (objItemCurrent[affix] !== -1 && document.getElementById(affix + '-' + objItemCurrent[affix]).disabled) {
        document.getElementById(affix + '-Select').value = -1;
        objItemCurrent[affix] = -1;
        getAffixCount();
        setAvoidGroups();
        objItemCurrent[affix + 'groupfreq'] = 0;
    }
};

function update(control) {
    if (!control) {
        control = { id: 'none-none' };
    }
    setObjStat({});
    setObjStatD({});

    objItemCurrent.quality = +document.getElementById('quality-Select').value;
    objItemCurrent.classid = +document.getElementById('classid-Select').value;
    objItemCurrent.namepre = +document.getElementById('namepre-Select').value;
    objItemCurrent.namesuf = +document.getElementById('namesuf-Select').value;
    objItemCurrent.ethereal = +document.getElementById('ethereal-Select').value;
    objItemCurrent.expansion = +document.getElementById('expansion-Select').value;
    objItemCurrent.charclassid = +document.getElementById('charclassid-Select').value;
    objItemCurrent.p1 = +document.getElementById('p1-Select').value;
    objItemCurrent.p2 = +document.getElementById('p2-Select').value;
    objItemCurrent.p3 = +document.getElementById('p3-Select').value;
    objItemCurrent.s1 = +document.getElementById('s1-Select').value;
    objItemCurrent.s2 = +document.getElementById('s2-Select').value;
    objItemCurrent.s3 = +document.getElementById('s3-Select').value;
    objItemCurrent.smod1 = +document.getElementById('smod1-Select').value;
    objItemCurrent.smod2 = +document.getElementById('smod2-Select').value;
    objItemCurrent.smod3 = +document.getElementById('smod3-Select').value;
    objItemCurrent.craft = +document.getElementById('craft-Select').value;
    objItemCurrent.autoaffix = +document.getElementById('autoaffix-Select').value;
    objItemCurrent.type = baseTypes[objItemCurrent.classid].type;
    objItemCurrent.autogroup = baseTypes[objItemCurrent.classid]['auto prefix'];

    getItemTypes();
    objItemCurrent.invfile = getInvFile();
    objItemCurrent.alvl = getAffixLevel();

    if (objItemCurrent.maxquality === 4 && objItemCurrent.quality !== 4) {
        document.getElementById('quality-Select').value = 4;
        objItemCurrent.quality = 4;
    }

    if (baseTypes[objItemCurrent.classid].expansion) {
        //Force expansion mods when using expansion only item types
        document.getElementById('expansion-Select').value = 1;
        objItemCurrent.expansion = 1;
    }

    if (
        (!objItemCurrent.expansion || objItemCurrent.quality === 8 || baseTypes[objItemCurrent.classid].nodurability) &&
        objItemCurrent.ethereal &&
        objItemCurrent.classid !== 225
    ) {
        //Force non eth items to be non eth
        document.getElementById('ethereal-Select').value = 0;
        objItemCurrent.ethereal = 0;
    }

    if (!objItemCurrent.staffmods) {
        //Remove staffmods if the base can't have them
        document.getElementById('smod1-Select').value = -1;
        document.getElementById('smod2-Select').value = -1;
        document.getElementById('smod3-Select').value = -1;
        objItemCurrent.smod1 = -1;
        objItemCurrent.smod2 = -1;
        objItemCurrent.smod3 = -1;
    }

    if (!objItemCurrent.autogroup) {
        document.getElementById('autoaffix-Select').value = -1;
        objItemCurrent.autoaffix = -1;
    }

    getItemCrafts();

    if (!objItemCurrent.crafts.length || !objItemCurrent.expansion) {
        document.getElementById('quality-8').disabled = true;
        document.getElementById('craft-Select').value = -1;

        if (+document.getElementById('quality-Select').value === 8) {
            document.getElementById('quality-Select').value = 6;
            objItemCurrent.quality = 6;
        }

        objItemCurrent.craft = -1;
    } else {
        document.getElementById('quality-8').disabled = false;
    }

    filterRareNames(true);
    filterRareNames(false);
    getAffixCount();
    getMaxAffixCount();
    setAvoidGroups();
    getStaffTiers();

    filterAffixGroup(magicPrefix, listGroupAffix[0]);
    filterAffixGroup(magicSuffix, listGroupAffix[1]);
    filterAffixGroup(skills, listGroupAffix[2]);
    filterAffixes(autoMagic, 'autoaffix');
    filterAffixes(cubeMain, 'craft');

    setSliderGroup(magicPrefix, listGroupAffix[0]);
    setSliderGroup(magicSuffix, listGroupAffix[1]);
    setSliderGroup(skills, listGroupAffix[2]);
    setSlider(autoMagic, 'autoaffix');
    setSlider(cubeMain, 'craft');

    getAffixFreqs();
    getItemLevel();
    getItemColor(true);
    getItemColor(false);
    getTitle();
    generateItem();

    param.setAll();

    setIsLoadedFirst(false);
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
const middle = document.getElementById('middle');
middle.onclick = saveImage.bind(this, middle);
const clear = document.getElementById('clear');
clear.onclick = reload;
const save = document.getElementById('save');
save.onclick = saveD2i;
