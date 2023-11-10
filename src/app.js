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
    LANGUAGE_CURRENT,
    listGroupAffix,
    listGroupAvoid,
    listClass,
    listCodeClass,
    objPrefix,
    objSuffix,
    objTableColor,
    listLocale,
    objStat,
    setObjStat,
    objStatDefense,
    listStatOffense,
    setListStatOffense,
    listImplicit,
    isLoadedFirst,
    setObjDefault,
    objItemCurrent,
    listTabSkill,
    objValueTable,
    objDefault,
    setObjPrefix,
    setObjSuffix,
    listExplicit,
    setListExplicit,
    setListImplicit,
    setObjValueTable,
    setIsLoadedFirst,
} from './data/index.js';
import { CHandlerBinary } from './utils/index';
import { parseTable } from './utils/index';

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

//Async file gets
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
            objStatDefense['ac%'].affix.hasOwnProperty('name')
        )
            val += 1; // Thanks @Kaylin
        if (val && objItemCurrent.ethereal) {
            val = Math.floor(val * 1.5);
        }
        br.bits((val || 0) + 10, 11); // Defense
    }

    if (objItemCurrent.classid < 508) {
        // Is from wep/armor table
        val = objValueTable.durability || 0;
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
    for (const a in objStatDefense) {
        bstats[a] = objStatDefense[a];
    }
    if (bstats.hasOwnProperty('res-all')) {
        let composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (let i = 0; i < composite.length; i++) {
            bstats[composite[i]] = {};
            bstats[composite[i]].value = objStatDefense['res-all'].value;
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

        //console.log(JSON.stringify(info));

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

            if (this.debug) console.log('Setting black canvas');
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
                if (this.debug) console.log('Drawing cursor');
                graphics.drawImage(this.hand, Math.round((canvas.width + image.width) / 2) - 5, 5 + 5);
            }

            if (this.debug) console.log('Creating item screenshot took ' + (Date.now() - iStart) + 'ms');
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
            ) {
                continue;
            }
            if (!objDefault.hasOwnProperty(key) || objItemCurrent[key] !== objDefault[key]) {
                //console.log(key);
                this.set(key, objItemCurrent[key]);
            }
        }
    },
};

function readCString(dr, offset) {
    let str = '';
    let s = 0;

    while (true) {
        const charCode = dr.getUint8(offset + s);
        if (charCode < 1) {
            break;
        }

        str += String.fromCharCode(charCode);
        s++;
    }

    return str;
}

function parseLocale(bytestream) {
    // Special thanks to "Doug the master programmer"
    const dr = new DataView(bytestream);

    const numElements = dr.getUint16(2, true);
    const indexBase = 21;
    const hashBase = indexBase + numElements * 2;

    for (let i = 0; i < numElements; i++) {
        const hash = dr.getUint16(indexBase + i * 2, true);
        const offset = hashBase + hash * 17;

        if (dr.getUint8(offset) < 1) {
            continue;
        }

        // const index = dr.getUint16(offset + 1, true);
        const keyOffset = dr.getInt32(offset + 7, true);
        const strOffset = dr.getInt32(offset + 11, true);

        const key = readCString(dr, keyOffset); //.toLowerCase();
        const val = readCString(dr, strOffset); //.toLowerCase();

        listLocale[key] = val;
    }

    return true;
}

function parseLocales() {
    // string.tbl > expansionstring.tbl > patchstring.tbl
    parseLocale(window.stringtbl.buffer);
    parseLocale(window.expansionstringtbl.buffer);
    parseLocale(window.patchstringtbl.buffer);
    listLocale['strModEnhancedDamage'] = 'Enhanced Damage';
    listLocale['skillname61'] = listLocale['skillsname61'];
    listLocale['Skillname223'] = 'Poison Creeper';
    console.log('Parsed listLocale (' + LANGUAGE_CURRENT + ')');
    //console.log(listLocale);
}

function reload() {
    window.location.hash = '';
    window.location.reload();
}

function hideSelect(select) {
    objItemCurrent[select] = -1;
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

function getItemTypes() {
    let t,
        itemType,
        itemTypeEquiv,
        itemTypeEquivs = [];
    objItemCurrent.staffmods = '';
    objItemCurrent.types = [];
    objItemCurrent.typeNames = [];
    objItemCurrent.class = '';
    for (t = 0; t < itemTypes.length; t++) {
        if (itemTypes[t].code == objItemCurrent.type) {
            break;
        }
    }
    itemType = itemTypes[t]; //Original row of item type
    if (itemType.magic && !itemType.rare) {
        objItemCurrent.maxquality = 4;
    }
    if (itemType.rare) {
        objItemCurrent.maxquality = 6;
    }
    objItemCurrent.maxsockets = Math.min(
        baseTypes[objItemCurrent.classid].invwidth * baseTypes[objItemCurrent.classid].invheight,
        (objItemCurrent.level <= 25 ? itemType.maxsock1 : 0) ||
            (objItemCurrent.level >= 41 ? itemType.maxsock40 : 0) ||
            itemType.maxsock25,
        baseTypes[objItemCurrent.classid].gemsockets || 0
    );
    itemTypeEquivs.push(itemType.code);
    while (itemTypeEquivs.length) {
        itemTypeEquiv = itemTypeEquivs.shift();
        for (let i = 0; i < itemTypes.length; i++) {
            if (itemTypeEquiv == itemTypes[i].code) {
                objItemCurrent.typeNames.push(itemTypes[i].itemtype);
                objItemCurrent.types.push(itemTypes[i].code);
                if (itemTypes[i].equiv1) itemTypeEquivs.push(itemTypes[i].equiv1);
                if (itemTypes[i].equiv2) itemTypeEquivs.push(itemTypes[i].equiv2);
                if (itemTypes[i].staffmods) objItemCurrent.staffmods = itemTypes[i].staffmods;
                if (itemTypes[i].class) objItemCurrent.class = itemTypes[i].class;
            }
        }
    }
}

function getMaxAffixCount() {
    switch (objItemCurrent.quality) {
        case 6: //rare
            objItemCurrent.amax = 6;
            objItemCurrent.pmax = 3;
            objItemCurrent.smax = 3;

            if (objItemCurrent.classid === 643) {
                //Is a jewel
                objItemCurrent.amax = 4;
            }
            break;

        case 8: //crafted
            objItemCurrent.amax = 4;
            objItemCurrent.pmax = 3;
            objItemCurrent.smax = 3;
            break;

        default: //magic
            objItemCurrent.amax = 2;
            objItemCurrent.pmax = 1;
            objItemCurrent.smax = 1;
    }
}

function getAffixCount() {
    objItemCurrent.pnum = [objItemCurrent.p1, objItemCurrent.p2, objItemCurrent.p3].filter((k) => k !== -1).length;
    objItemCurrent.snum = [objItemCurrent.s1, objItemCurrent.s2, objItemCurrent.s3].filter((k) => k !== -1).length;
    objItemCurrent.anum = objItemCurrent.pnum + objItemCurrent.snum;
    objItemCurrent.smodnum = [objItemCurrent.smod1, objItemCurrent.smod2, objItemCurrent.smod3].filter(
        (k) => k !== -1
    ).length;
}

function getAvoidGroups(affix) {
    for (let i = 0; i < listGroupAffix.length; i++) {
        if (listGroupAffix[i].indexOf(affix) > -1) {
            return listGroupAvoid[i][listGroupAffix[i].indexOf(affix)];
        }
    }

    return [];
}

function setAvoidGroups() {
    listGroupAvoid[0] = [[], [], []];
    listGroupAvoid[1] = [[], [], []];

    for (let i = 0; i < 3; i++) {
        //iterate the prefixes
        for (let n = 0; n < 3; n++) {
            if (i !== n && objItemCurrent[listGroupAffix[0][i]] !== -1) {
                listGroupAvoid[0][n].push(magicPrefix[objItemCurrent[listGroupAffix[0][i]]].group);
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        //iterate the prefixes
        for (let n = 0; n < 3; n++) {
            if (i !== n && objItemCurrent[listGroupAffix[1][i]] !== -1) {
                listGroupAvoid[1][n].push(magicSuffix[objItemCurrent[listGroupAffix[1][i]]].group);
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
    if (affix === 'p3' && objItemCurrent.pmax <= 2) return true;
    if (affix === 'p2' && objItemCurrent.pmax <= 1) return true;

    if (affix === 's3' && objItemCurrent.smax <= 2) return true;
    if (affix === 's2' && objItemCurrent.smax <= 1) return true;

    if (objItemCurrent.anum > objItemCurrent.amax) {
        if (affix === 's2' && objItemCurrent.pnum >= 3) return true;
        if (affix === 's3' && objItemCurrent.pnum >= 2) return true;

        if (affix === 'p2' && objItemCurrent.snum >= 3) return true;
        if (affix === 'p3' && objItemCurrent.snum >= 2) return true;
    }

    return false;
}

function filterAffixes(affixTable, affix) {
    let avoid = getAvoidGroups(affix); //Get the affix groups that are already selected
    //console.log("Filtering " + affix + " (Avoiding groups : " + avoid.join(",") + ")");

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

        case 'smod1': //smods
        case 'smod2':
        case 'smod3':
            //objItemCurrent[affix+'total'] = {1:0,6:0,12:0,18:0,24:0,30:0};

            for (let i = 0; i < affixTable.length; i++) {
                if (!affixTable[i].charclass) {
                    continue;
                }

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].charclass !== objItemCurrent.staffmods) {
                    continue;
                }
                //if ((affixTable[i].itypea1 && objItemCurrent.types.indexOf(affixTable[i].itypea1) === -1) &&
                //	(affixTable[i].itypea2 && objItemCurrent.types.indexOf(affixTable[i].itypea2) === -1)){ continue;}
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

                //objItemCurrent[affix+'total'][affixTable[i].reqlevel] += 1;
                document.getElementById(affix + '-' + i).disabled = false;
            }
            break;

        default: //prefixes/suffixes/autoaffixes
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
                } //Affix has no name
                if (!affixTable[i].spawnable) {
                    continue;
                } //Affix cannot spawn

                document.getElementById(affix + '-' + i).disabled = true;

                if (affixTable[i].version === 0) {
                    continue;
                } //Old affixes that aren't used anymore
                if (affixTable[i].version !== 1 && !objItemCurrent.expansion) {
                    continue;
                } //Item version isn't same as affix
                if (!affixTable[i].rare && objItemCurrent.quality !== 4) {
                    continue;
                } //Item is not magic and this affix only spawns on magic items
                if (objItemCurrent.types.indexOf(affixTable[i].etype1) > -1) {
                    continue;
                } //Item has an equiv matching one of the groups this affix cannot be on
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
                    continue; //Affix is class specific and doesn't match the class specific base (if any)
                if (
                    objItemCurrent.types.indexOf(affixTable[i].itype1) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype2) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype3) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype4) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype5) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype6) === -1 &&
                    objItemCurrent.types.indexOf(affixTable[i].itype7) === -1
                )
                    continue; //Affix cannot spawn on this basetype (none of the equivs match itype1-7)
                if (affixTable[i].level && objItemCurrent.alvl < affixTable[i].level) {
                    continue;
                } //Item level is too low
                if (affixTable[i].maxlevel && affixTable[i].maxlevel < objItemCurrent.level) {
                    continue;
                } //Item level is too high
                if (affix === 'autoaffix' && affixTable[i].group !== objItemCurrent.autogroup) {
                    continue;
                } //Autogroup doesn't match the group of affixes the item can spawn with
                if (affixOverCap(affix)) {
                    continue;
                } //This affix would go over prefix/suffix/affix cap

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
                } //Affix has a group that is already selected

                document.getElementById(affix + '-' + i).disabled = false;
            }
    }

    //if (affix === "autoaffix") return;

    if (objItemCurrent[affix] !== -1 && document.getElementById(affix + '-' + objItemCurrent[affix]).disabled) {
        document.getElementById(affix + '-Select').value = -1;
        objItemCurrent[affix] = -1;
        getAffixCount();
        setAvoidGroups();
        objItemCurrent[affix + 'groupfreq'] = 0;
    }
}

function getAffixLevel(lvl) {
    let alvl;
    let ilvl =
        (lvl || objItemCurrent.level) < baseTypes[objItemCurrent.classid].level
            ? baseTypes[objItemCurrent.classid].level
            : lvl || objItemCurrent.level;

    if (baseTypes[objItemCurrent.classid]['magic lvl']) {
        alvl = ilvl + baseTypes[objItemCurrent.classid]['magic lvl'];
    } else {
        if (ilvl < 99 - Math.floor(baseTypes[objItemCurrent.classid].level / 2)) {
            alvl = ilvl - Math.floor(baseTypes[objItemCurrent.classid].level / 2);
        } else {
            alvl = ilvl * 2 - 99;
        }
    }

    alvl = Math.min(99, alvl);
    return alvl;
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

            objStatDefense[affix] = {};
            objStatDefense[affix].value = +slider.value;
            objStatDefense[affix].skill = skill;
            objStatDefense[affix].modcode = affix;
            objStatDefense[affix].properties = properties['skill'];
            objStatDefense[affix].itemstat = itemStatCost[modcodeToItemStat('skill')];
            objStatDefense[affix].descprio = objStatDefense[affix].itemstat.descpriority; // Add a shorthand...

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
                if (!objStatDefense.hasOwnProperty(modcode)) {
                    objStatDefense[modcode] = {};
                    objStatDefense[modcode].value = 0;
                    objStatDefense[modcode].modcode = modcode;
                    objStatDefense[modcode].properties = properties[modcode];
                    objStatDefense[modcode].itemstat = itemStatCost[modcodeToItemStat(modcode)];
                    objStatDefense[modcode].descprio = objStatDefense[modcode].itemstat.descpriority; // Add a shorthand...
                    objStatDefense[modcode].affix = affixTable[objItemCurrent[affix]];

                    if (affix === 'craft') {
                        objStatDefense[modcode].modparam =
                            affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' param'];
                        objStatDefense[modcode].modmin = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' min'];
                        objStatDefense[modcode].modmax = affixTable[objItemCurrent[affix]]['mod ' + (i + 1) + ' max'];
                    } else {
                        objStatDefense[modcode].modparam = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'param'];
                        objStatDefense[modcode].modmin = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'min'];
                        objStatDefense[modcode].modmax = affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'max'];
                    }
                } else if (modcode === 'dmg-pois') {
                    // Have to stack poison duration too, not just the damage
                    objStatDefense[modcode].modparam += affixTable[objItemCurrent[affix]]['mod' + (i + 1) + 'param'];
                }

                objStatDefense[modcode].value += +slider.value;
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
    setObjDefault({});
    setSliderGroup(magicPrefix, listGroupAffix[0]);
    setSliderGroup(magicSuffix, listGroupAffix[1]);
    setSliderGroup(skills, listGroupAffix[2]);
    setSlider(autoMagic, 'autoaffix');
    setSlider(cubeMain, 'craft');
    generateItem();
    updateTables();
    //console.log(objItemCurrent);
    //console.log(objStat);
}

function setSliderGroup(affixTable, affixGroup) {
    for (let i = 0; i < affixGroup.length; i++) {
        setSlider(affixTable, affixGroup[i]);
    }
}

function getCompositeStats() {
    if (
        objStatDefense.hasOwnProperty('res-all') &&
        (objStatDefense.hasOwnProperty('res-fire') ||
            objStatDefense.hasOwnProperty('res-cold') ||
            objStatDefense.hasOwnProperty('res-ltng') ||
            objStatDefense.hasOwnProperty('res-pois'))
    ) {
        const composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (let i = 0; i < composite.length; i++) {
            if (objStatDefense.hasOwnProperty(composite[i])) {
                objStatDefense[composite[i]].value += objStatDefense['res-all'].value;
                continue;
            }

            objStatDefense[composite[i]] = {};
            objStatDefense[composite[i]].value = objStatDefense['res-all'].value;
            objStatDefense[composite[i]].modcode = composite[i];
            objStatDefense[composite[i]].properties = properties[composite[i]];
            objStatDefense[composite[i]].itemstat = itemStatCost[modcodeToItemStat(composite[i])];
            objStatDefense[composite[i]].descprio = objStatDefense[composite[i]].itemstat.descpriority; // Add a shorthand...
        }

        delete objStatDefense['res-all'];
    }
}

function getStatOrder() {
    setListStatOffense([]);

    function byDescPrio(a, b) {
        return b.descprio - a.descprio;
    }

    for (const stat in objStatDefense) {
        listStatOffense.push(objStatDefense[stat]);
    }

    listStatOffense.sort(byDescPrio);
}

function getWepClassDesc() {
    // Thanks to Doug "the best programmer" for getting this info!
    if (objItemCurrent.types.indexOf('staf') !== -1) return 'Staff Class';
    if (objItemCurrent.types.indexOf('axe') !== -1) return 'Axe Class';
    if (objItemCurrent.types.indexOf('swor') !== -1) return 'Sword Class';
    if (objItemCurrent.types.indexOf('knif') !== -1) return 'Dagger Class';
    if (objItemCurrent.types.indexOf('jave') !== -1) return 'Javelin Class';
    if (objItemCurrent.types.indexOf('spea') !== -1) return 'Spear Class';
    if (objItemCurrent.types.indexOf('bow') !== -1) return 'Bow Class';
    if (objItemCurrent.types.indexOf('pole') !== -1) return 'Polearm Class';
    if (objItemCurrent.types.indexOf('xbow') !== -1) return 'Crossbow Class';
    if (objItemCurrent.types.indexOf('h2h') !== -1) return 'Claw Class';
    if (objItemCurrent.types.indexOf('orb') !== -1) return 'Staff Class';
    if (objItemCurrent.types.indexOf('wand') !== -1) return 'Staff Class';
    if (objItemCurrent.types.indexOf('thro') !== -1) return 'Equip to Throw';
    if (objItemCurrent.types.indexOf('blun') !== -1) return 'Mace Class';
    return 'Unknown Class';
}

function getWepSpeedDesc(classId = 1, ias = 0) {
    // Another chunk of data nobody but Doug could help with, thanks !
    const wsLookup = [
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
    ];

    const weaponFrames = {
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

    const wclass = baseTypes[objItemCurrent.classid].wclass || 'hth';
    const animSpeed = classId === 6 && wclass === 'ht1' ? 208 : 256; // Assassin using claws || any other class and wep
    const frames = weaponFrames[wclass][classId]; // Base FPA for our class
    const accel = ias - (baseTypes[objItemCurrent.classid].speed || 0) + 100;
    let fpa = Math.floor((256 * frames[0]) / Math.floor((animSpeed * accel) / 100.0));

    if (fpa == 0) {
        return 'Very Slow Attack Speed';
    }
    fpa -= 10;
    if (fpa < 0) {
        return 'Very Fast Attack Speed';
    }
    if (fpa > 17) {
        return 'Very Slow Attack Speed';
    }

    const l = wsLookup[fpa][[1, 2, 5].indexOf(classId) === -1 ? 0 : 1]; // 1 = Sor Nec Dru, 0 = Other classes

    if (l == 1) {
        return 'Very Fast Attack Speed';
    }
    if (l == 2) {
        return 'Fast Attack Speed';
    }
    if (l == 3) {
        return 'Normal Attack Speed';
    }
    if (l == 4) {
        return 'Slow Attack Speed';
    }
    if (l == 5) {
        return 'Very Slow Attack Speed';
    }

    return 'Normal Attack Speed?';
}

function getImplicits() {
    let ikey, implicit, val, pre, col, val2;
    const ikeys = [
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

    setListImplicit([]);

    for (let i = 0; i < ikeys.length; i++) {
        implicit = { colors: [], strings: [] };
        ikey = ikeys[i];

        switch (ikey) {
            case 'name':
                if (objItemCurrent.quality === 4) {
                    break;
                }
                implicit.colors.push({ 4: 3, 6: 9, 8: 8 }[objItemCurrent.quality]);
                implicit.strings.push(
                    listLocale[rarePrefix[objItemCurrent.namepre].name] +
                        ' ' +
                        listLocale[rareSuffix[objItemCurrent.namesuf].name]
                );
                break;
            case 'base':
                val = listLocale[baseTypes[objItemCurrent.classid].namestr] || baseTypes[objItemCurrent.classid].name;
                if (objItemCurrent.quality === 4) {
                    if (objItemCurrent.p1 !== -1) val = listLocale[magicPrefix[objItemCurrent.p1].name] + ' ' + val;
                    if (objItemCurrent.p2 !== -1) val = listLocale[magicPrefix[objItemCurrent.p2].name] + ' ' + val;
                    if (objItemCurrent.p3 !== -1) val = listLocale[magicPrefix[objItemCurrent.p3].name] + ' ' + val;
                    if (objItemCurrent.s1 !== -1) val = val + ' ' + listLocale[magicSuffix[objItemCurrent.s1].name];
                    if (objItemCurrent.s2 !== -1) val = val + ' ' + listLocale[magicSuffix[objItemCurrent.s2].name];
                    if (objItemCurrent.s3 !== -1) val = val + ' ' + listLocale[magicSuffix[objItemCurrent.s3].name];
                }
                implicit.colors.push({ 4: 3, 6: 9, 8: 8 }[objItemCurrent.quality]);
                implicit.strings.push(val);
                break;
            case 'maxac':
                val =
                    objStat['ac%'] || objStat['ac%/lvl']
                        ? baseTypes[objItemCurrent.classid].maxac + 1
                        : baseTypes[objItemCurrent.classid].maxac;
                if (!val) {
                    break;
                }
                if (
                    [91, 92, 93, 94].indexOf(objItemCurrent.craft) !== -1 &&
                    objStatDefense['ac%'].affix.hasOwnProperty('name')
                ) {
                    val += 1; // Thanks @Kaylin
                }
                pre = baseTypes[objItemCurrent.classid].maxac;
                if (objItemCurrent.ethereal) {
                    val = Math.floor(val * 1.5);
                }
                if (objItemCurrent.ethereal) {
                    pre = Math.floor(pre * 1.5);
                }
                val = Math.floor(
                    val *
                        (1 +
                            ((objStat['ac%'] || 0) +
                                Math.floor(((objStat['ac%/lvl'] || 0) * objItemCurrent.charlvl) / 8)) /
                                100.0)
                );
                val += (objStat.ac || 0) + Math.floor(((objStat['ac/lvl'] || 0) * objItemCurrent.charlvl) / 8);
                implicit.colors.push(0);
                implicit.strings.push(listLocale['ItemStats1h'] + ' ');
                implicit.colors.push(val > pre ? 3 : 0);
                implicit.strings.push(val.toString());
                break;
            case 'block':
                if (objItemCurrent.types.indexOf('shld') === -1) {
                    break;
                }
                val = objStat['block'] || 0;
                switch (objItemCurrent.charclassid) {
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
                implicit.strings.push(listLocale['ItemStats1r']);
                implicit.colors.push(val ? 3 : 0);
                implicit.strings.push(baseTypes[objItemCurrent.classid].block + val + val2 + '%');
                break;
            case 'smite':
                if (objItemCurrent.charclassid !== 3) {
                    break; // Only show smite dmg on paladin
                }
                if (objItemCurrent.types.indexOf('shld') === -1) {
                    break; // Isn't a shield
                }
                if (!baseTypes[objItemCurrent.classid].mindam) {
                    break; // Has no smite damage
                }
                implicit.colors.push(0);
                implicit.strings.push(
                    listLocale['ItemStats1o'] +
                        ' ' +
                        baseTypes[objItemCurrent.classid].mindam +
                        ' to ' +
                        baseTypes[objItemCurrent.classid].maxdam
                );
                break;
            case 'throw':
            case '1hand':
            case '2hand':
                if (objItemCurrent.classid > 305) {
                    break;
                }
                //Min
                col = { throw: 'minmisdam', '1hand': 'mindam', '2hand': '2handmindam' }[ikey];
                val = baseTypes[objItemCurrent.classid][col];
                if (!val) {
                    break;
                }
                if (objItemCurrent.ethereal) {
                    val = Math.floor(val * 1.5);
                }
                pre = val;
                val = Math.floor(val * (1 + (objStat['dmg%'] || 0) / 100.0));
                val += objStat['dmg-min'] || 0; //dmg/lvl is always for max damage
                val2 = val;
                //Max
                col = { throw: 'maxmisdam', '1hand': 'maxdam', '2hand': '2handmaxdam' }[ikey];
                val = baseTypes[objItemCurrent.classid][col];
                if (!val) {
                    break;
                }
                if (objItemCurrent.ethereal) {
                    val = Math.floor(val * 1.5);
                }
                const pre2 = val;
                val = Math.floor(
                    val *
                        (1 +
                            ((objStat['dmg%'] || 0) +
                                Math.floor(((objStat['dmg%/lvl'] || 0) * objItemCurrent.charlvl) / 8)) /
                                100.0)
                );
                val += (objStat['dmg-max'] || 0) + Math.floor(((objStat['dmg/lvl'] || 0) * objItemCurrent.charlvl) / 8);
                if (val2 >= val) {
                    val = val2 + 1;
                }
                implicit.colors.push(0);
                implicit.strings.push({ throw: 'Throw', '1hand': 'One-Hand', '2hand': 'Two-Hand' }[ikey] + ' Damage: ');
                implicit.colors.push(val2 > pre || val > pre2 ? 3 : 0);
                implicit.strings.push(val2 + ' to ' + val);
                break;
            case 'durability':
                val = baseTypes[objItemCurrent.classid][ikey];
                if (
                    !val ||
                    baseTypes[objItemCurrent.classid].stackable ||
                    baseTypes[objItemCurrent.classid].nodurability
                ) {
                    break;
                }
                if (objItemCurrent.ethereal) {
                    val = Math.floor(val / 2) + 1;
                }
                implicit.colors.push(0);
                implicit.strings.push(listLocale['ItemStats1d'] + ' ' + val + ' of ' + val);
                break;
            case 'class':
                if (!objItemCurrent.class) {
                    break;
                }
                implicit.colors.push(
                    listCodeClass.indexOf(objItemCurrent.class) === objItemCurrent.charclassid ? 0 : 1
                );
                implicit.strings.push('(' + listLocale['partychar' + objItemCurrent.class] + ' Only');
                break;
            case 'maxstack':
                val = baseTypes[objItemCurrent.classid][ikey];
                if (!val) {
                    break;
                }
                val += objStat['stack'] || 0;
                implicit.colors.push(0); // Always white, even with increased stack?
                implicit.strings.push(listLocale['ItemStats1i'] + ' ' + val);
                break;
            case 'socketable':
                if (objItemCurrent.types.indexOf('sock') === -1) {
                    break;
                }
                implicit.colors.push(0);
                implicit.strings.push(listLocale['ExInsertSockets']);
                break;
            case 'reqdex':
            case 'reqstr':
                val = baseTypes[objItemCurrent.classid][ikey];
                if (!val) {
                    break;
                }
                val = val - Math.floor(val * (Math.abs(objStat.ease || 0) / 100));
                if (objItemCurrent.ethereal) val -= 10;
                if (val < 1) {
                    break;
                }
                implicit.colors.push(0);
                implicit.strings.push(listLocale[{ reqstr: 'ItemStats1e', reqdex: 'ItemStats1f' }[ikey]] + ' ' + val);
                break;
            case 'charm':
                if (objItemCurrent.types.indexOf('char') === -1) {
                    break;
                }
                implicit.colors.push(0);
                implicit.strings.push(listLocale['Charmdes']);
                break;
            case 'levelreq':
                val = getItemLevelReq();
                if (!val) {
                    break;
                }
                implicit.colors.push(0);
                implicit.strings.push(listLocale['ItemStats1p'] + ' ' + val);
                break;
            case 'speed':
                if (objItemCurrent.classid > 305) {
                    break;
                }
                implicit.colors.push(0);
                implicit.strings.push(getWepClassDesc() + ' - ');
                val = (objStat['swing1'] || 0) + (objStat['swing2'] || 0) + (objStat['swing3'] || 0);
                implicit.colors.push(val ? 3 : 0);
                implicit.strings.push(getWepSpeedDesc(objItemCurrent.charclassid, val));
                break;
        }

        if (implicit.strings.length) {
            listImplicit.push(implicit);
        }
    }
}

function getExplicits() {
    // Special thanks to Nefarius @ d2mods.info - more about these calcs here https://d2mods.info/forum/kb/viewarticle?a=448
    let temp;

    setListExplicit([]);

    for (let i = 0; i < listStatOffense.length; i++) {
        let descstr = listLocale[listStatOffense[i].itemstat.descstrpos];
        listStatOffense[i].desc = '';

        switch (
            listStatOffense[i].modcode // Manual handling, fuck it!
        ) {
            case 'smod1':
            case 'smod2':
            case 'smod3':
                //listStatOffense[i].desc = "+" + listStatOffense[i].value + " to " + (listLocale[listStatOffense[i].skill.skill] || listStatOffense[i].skill.skill) + " (" + listLocale["partychar"+listStatOffense[i].skill.charclass] + " Only)";
                listStatOffense[i].desc =
                    '+' +
                    listStatOffense[i].value +
                    ' to ' +
                    listStatOffense[i].skill.name +
                    ' (' +
                    listLocale['partychar' + listStatOffense[i].skill.charclass] +
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
                listStatOffense[i].desc =
                    'Adds ' + listStatOffense[i].value + '-' + objStatDefense['cold-max'].value + ' cold damage';
                continue;
            case 'fire-min':
                listStatOffense[i].desc =
                    'Adds ' + listStatOffense[i].value + '-' + objStatDefense['fire-max'].value + ' fire damage';
                continue;
            case 'ltng-min':
                listStatOffense[i].desc =
                    'Adds ' + listStatOffense[i].value + '-' + objStatDefense['ltng-max'].value + ' lightning damage';
                continue;
            case 'dmg-pois':
                listStatOffense[i].desc =
                    '+' +
                    Math.round((listStatOffense[i].value * listStatOffense[i].modparam) / 256) +
                    ' poison damage over ' +
                    Math.round(listStatOffense[i].modparam / 25) +
                    ' seconds';
                continue;
            case 'pois-min': // Only appears on nec heads
                listStatOffense[i].desc =
                    'Adds ' +
                    Math.round((objStatDefense['pois-min'].value * objStatDefense['pois-len'].value) / 256) +
                    '-' +
                    Math.floor((objStatDefense['pois-max'].value * objStatDefense['pois-len'].value) / 256) +
                    ' poison damage over ' +
                    Math.floor(objStatDefense['pois-len'].value / 25) +
                    ' seconds';
                continue;
            case 'mana/lvl':
                listStatOffense[i].desc =
                    '+' +
                    Math.floor((listStatOffense[i].value / 8) * objItemCurrent.charlvl) +
                    ' to Mana ' +
                    listLocale['ModStre9c'];
                continue;
            case 'att%/lvl':
                listStatOffense[i].desc =
                    Math.floor((listStatOffense[i].value / 2) * objItemCurrent.charlvl) +
                    '% Bonus to Attack Rating ' +
                    listLocale['ModStre9c'];
                continue;
            case 'att/lvl':
                listStatOffense[i].desc =
                    '+' +
                    Math.floor((listStatOffense[i].value / 2) * objItemCurrent.charlvl) +
                    ' to Attack Rating ' +
                    listLocale['ModStre9c'];
                continue;
            case 'dmg/lvl':
                listStatOffense[i].desc =
                    Math.floor((listStatOffense[i].value / 8) * objItemCurrent.charlvl) +
                    ' to Maximum Damage ' +
                    listLocale['ModStre9c'];
                continue;
            case 'ac/lvl':
                listStatOffense[i].desc =
                    '+' +
                    Math.floor((listStatOffense[i].value / 8) * objItemCurrent.charlvl) +
                    ' Defense ' +
                    listLocale['ModStre9c'];
                continue;
            case 'skilltab':
                listStatOffense[i].desc = listLocale[listTabSkill[listStatOffense[i].modparam]].replace(
                    /%d/g,
                    listStatOffense[i].value
                );
                listStatOffense[i].desc += ' (' + listClass[Math.floor(listStatOffense[i].modparam / 3)] + ' Only)';
                continue;
            case 'sock':
                temp = Math.min(objItemCurrent.maxsockets, listStatOffense[i].value);
                if (temp) {
                    listStatOffense[i].desc = 'Socketed (' + temp + ')';
                }
                if (objItemCurrent.ethereal) {
                    listStatOffense[i].desc = 'Ethereal (Cannot be Repaired), ' + listStatOffense[i].desc;
                }
                continue;
            case 'res-all':
                listStatOffense[i].desc = descstr.replace('%d', listStatOffense[i].value);
                continue;
            case 'ease':
                listStatOffense[i].desc = descstr + ' ' + listStatOffense[i].value + '%';
                continue;
            case 'dmg-min': // Replace min and max damage with "Adds min-max damage" when min is < max.
                if (!objStatDefense['dmg-max'] || objStatDefense['dmg-min'].value >= objStatDefense['dmg-max'].value) {
                    break;
                }
                listStatOffense[i].desc =
                    'Adds ' + objStatDefense['dmg-min'].value + '-' + objStatDefense['dmg-max'].value + ' damage';
                continue;
            case 'dmg-max':
                if (objStatDefense['dmg-min'] && objStatDefense['dmg-min'].value < objStatDefense['dmg-max'].value) {
                    continue;
                }
                break;
        }

        if (descstr === undefined) {
            console.log('undefined descstr: ' + listStatOffense[i].modcode);
        }

        switch (listStatOffense[i].itemstat.descval) {
            case 0: // Don't add a value, it already exists or the value shouldn't be visible
                break;
            case 1: // Show the value before
                descstr = '%d ' + descstr;
                break;
            case 2: // Show the value after
                descstr = descstr + ' %d';
                break;
        }

        switch (listStatOffense[i].itemstat.descfunc) {
            case 1: // +[value] [string1]
                listStatOffense[i].desc = descstr.replace(/%d/g, '+' + listStatOffense[i].value);
                break;
            case 2: // [value]% [string1]
                listStatOffense[i].desc = descstr.replace(/%d/g, listStatOffense[i].value + '%');
                break;
            case 3: // [string1] [value]
                listStatOffense[i].desc = descstr.replace(/%d/g, listStatOffense[i].value);
                break;
            case 4: // +[value]% [string1]
                listStatOffense[i].desc = descstr.replace(/%d/g, '+' + listStatOffense[i].value + '%');
                break;
            case 5: // [value*100/128]% [string1]
                listStatOffense[i].desc = descstr.replace(
                    /%d/g,
                    Math.floor((listStatOffense[i].value * 100) / 128) + '%'
                );
                break;
            case 11: // Repairs 1 Durability In [100 / value] Seconds
                listStatOffense[i].desc =
                    'Repairs 1 durability in ' + Math.floor(100 / listStatOffense[i].value) + ' seconds';
                break;
            case 13: // +[value] to [class] Skill Levels
                descstr = descstr.replace(/%d/g, '+' + listStatOffense[i].value);
                listStatOffense[i].desc = descstr.replace('Amazon', listClass[listStatOffense[i].properties.val1]);
                break;
            case 15: // [chance]% to cast [slvl] [skill] on [event]
                descstr = descstr.replace('%d%', listStatOffense[i].modmin);
                descstr = descstr.replace('%d', listStatOffense[i].modmax);
                listStatOffense[i].desc = descstr.replace('%s', skills[listStatOffense[i].value].name);
                break;
            case 24: // Charged skills
                temp = Math.max(
                    1,
                    Math.floor(
                        (objItemCurrent.level - skills[listStatOffense[i].value].reqlevel) /
                            Math.floor(
                                (99 - skills[listStatOffense[i].value].reqlevel) / Math.abs(listStatOffense[i].modmax)
                            )
                    )
                );
                listStatOffense[i].desc = 'Level ' + temp + ' ';
                temp =
                    Math.floor((Math.abs(listStatOffense[i].modmin) * temp) / 8) + Math.abs(listStatOffense[i].modmin);
                listStatOffense[i].desc += skills[listStatOffense[i].value].name + ' ';
                listStatOffense[i].desc += descstr.replace(/%d/g, temp);
                break;
        }
    }

    for (let i = 0; i < listStatOffense.length; i++) {
        if (!listStatOffense[i].desc) {
            continue;
        }

        listExplicit.push(listStatOffense[i].desc);
    }

    if (objItemCurrent.ethereal && !objStatDefense.hasOwnProperty('sock')) {
        listExplicit.push('Ethereal (Cannot be Repaired)');
    }

    for (let i = 0; i < listExplicit.length; i++) {
        listExplicit[i] = { colors: [3], strings: [listExplicit[i]] };
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

    for (const stat in itemStatCost) {
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
    // S1 > S2 > S3 > P1 > P2 > P3
    objItemCurrent[equipped ? 'ecolor' : 'icolor'] = { name: 'none', id: 21 };
    if (objItemCurrent.quality === 8) {
        return true;
    }

    if (baseTypes[objItemCurrent.classid][equipped ? 'transform' : 'invtrans']) {
        for (let i = 0; i < listGroupAffix[1].length; i++) {
            if (objItemCurrent[listGroupAffix[1][i]] !== -1) {
                if (magicSuffix[objItemCurrent[listGroupAffix[1][i]]].transformcolor) {
                    objItemCurrent[equipped ? 'ecolor' : 'icolor'] =
                        objTableColor[magicSuffix[objItemCurrent[listGroupAffix[1][i]]].transformcolor];
                    return true;
                }
            }
        }
        for (let i = 0; i < listGroupAffix[0].length; i++) {
            if (objItemCurrent[listGroupAffix[0][i]] !== -1) {
                if (magicPrefix[objItemCurrent[listGroupAffix[0][i]]].transformcolor) {
                    objItemCurrent[equipped ? 'ecolor' : 'icolor'] =
                        objTableColor[magicPrefix[objItemCurrent[listGroupAffix[0][i]]].transformcolor];
                    return true;
                }
            }
        }
        if (objItemCurrent.autoaffix + 1 && autoMagic[objItemCurrent.autoaffix].transform) {
            objItemCurrent[equipped ? 'ecolor' : 'icolor'] =
                objTableColor[autoMagic[objItemCurrent.autoaffix].transformcolor];
        }
    }

    return true;
}

function getItemGambleable() {
    for (let i = 0; i < gamble.length; i++) {
        if (gamble[i].code === baseTypes[objItemCurrent.classid].code) {
            return 'yes';
        }
        if (!baseTypes[objItemCurrent.classid].hasOwnProperty('normcode')) {
            continue;
        }
        if (gamble[i].code === baseTypes[objItemCurrent.classid].normcode) {
            return 'yes';
        }
    }
    return 'no';
}

function getItemUpgradeable() {
    if (!objItemCurrent.expansion) {
        return 'no';
    }
    if (baseTypes[objItemCurrent.classid].code === baseTypes[objItemCurrent.classid].normcode) {
        return 'twice';
    }
    if (baseTypes[objItemCurrent.classid].code === baseTypes[objItemCurrent.classid].ubercode) {
        return 'once';
    }
    if (baseTypes[objItemCurrent.classid].code === baseTypes[objItemCurrent.classid].ultracode) {
        return 'no';
    }
    return 'no';
}

function getItemLevel() {
    let lvl = Math.max(
        //objItemCurrent.classid	=== -1 ? 0 : baseTypes[objItemCurrent.classid].level,
        objItemCurrent.p1 === -1 ? 0 : magicPrefix[objItemCurrent.p1].level,
        objItemCurrent.p2 === -1 ? 0 : magicPrefix[objItemCurrent.p2].level,
        objItemCurrent.p3 === -1 ? 0 : magicPrefix[objItemCurrent.p3].level,
        objItemCurrent.s1 === -1 ? 0 : magicSuffix[objItemCurrent.s1].level,
        objItemCurrent.s2 === -1 ? 0 : magicSuffix[objItemCurrent.s2].level,
        objItemCurrent.s3 === -1 ? 0 : magicSuffix[objItemCurrent.s3].level,
        objItemCurrent.autoaffix === -1 ? 0 : autoMagic[objItemCurrent.autoaffix].level
    );

    for (let i = 1; i < 99; i++) {
        if (getAffixLevel(i) >= lvl) {
            lvl = i;
            break;
        }
    }

    objItemCurrent.minlevel = lvl;
    return lvl;
}

function getItemLevelReq() {
    let rlvl = 0;

    rlvl = Math.max(
        objItemCurrent.classid === -1 ? 0 : baseTypes[objItemCurrent.classid].levelreq,
        objItemCurrent.p1 === -1 ? 0 : magicPrefix[objItemCurrent.p1].levelreq,
        objItemCurrent.p2 === -1 ? 0 : magicPrefix[objItemCurrent.p2].levelreq,
        objItemCurrent.p3 === -1 ? 0 : magicPrefix[objItemCurrent.p3].levelreq,
        objItemCurrent.s1 === -1 ? 0 : magicSuffix[objItemCurrent.s1].levelreq,
        objItemCurrent.s2 === -1 ? 0 : magicSuffix[objItemCurrent.s2].levelreq,
        objItemCurrent.s3 === -1 ? 0 : magicSuffix[objItemCurrent.s3].levelreq,
        objItemCurrent.autoaffix === -1 ? 0 : autoMagic[objItemCurrent.autoaffix].levelreq
    );

    if (objItemCurrent.quality === 8) {
        rlvl += 10 + objItemCurrent.anum * 3;
    }

    rlvl = Math.max(
        rlvl,
        objItemCurrent.smod1 === -1 ? 0 : skills[objItemCurrent.smod1].reqlevel,
        objItemCurrent.smod2 === -1 ? 0 : skills[objItemCurrent.smod2].reqlevel,
        objItemCurrent.smod3 === -1 ? 0 : skills[objItemCurrent.smod3].reqlevel
    );

    return Math.min(rlvl, 98);
}

const tables = {
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
    objItemCurrent.smodtier = 0;
    objItemCurrent.smodlevelreqs = [];

    if (!objItemCurrent.staffmods) {
        return;
    }

    const smodLevelReqs = [
        // Possible skills with X level req for each tier
        [1, 6], // smod tier 1
        [1, 6, 12], // smod tier 2
        [1, 6, 12, 18], // smod tier 3
        [6, 12, 18, 24], // smod tier 4
        [12, 18, 24, 30], // smod tier 5
    ];

    const smodTierOdds = [
        // Odds of getting a skill from smod groups 1-6 (1, 6, 12, 18, 24, 30) by item smod tier
        [81, 19, 0, 0, 0, 0], // Ex : 81% chance of getting a skill from smod group of level req 1 when item has smod tier 1
        [31, 50, 19, 0, 0, 0],
        [11, 20, 50, 19, 0, 0],
        [0, 11, 20, 50, 19, 0],
        [0, 0, 11, 20, 50, 19],
    ];

    const smods = {}; // lists of possible skills by required level
    const smodsf = {}; // lists of possible skills by required level THAT ARE FORBIDDEN

    for (let i = 0; i < skills.length; i++) {
        if (!skills[i].charclass) {
            continue;
        }
        if (skills[i].charclass !== objItemCurrent.staffmods) {
            continue;
        }

        if (!smods.hasOwnProperty(skills[i].reqlevel)) {
            smods[skills[i].reqlevel] = [];
        }
        if (!smodsf.hasOwnProperty(skills[i].reqlevel)) {
            smodsf[skills[i].reqlevel] = [];
        }
        smods[skills[i].reqlevel].push(i);

        if (
            (skills[i].itypea1 || skills[i].itypea2 || skills[i].itypea3) && //At least one itypea specifified AND (item doesn't have itypea1 && 2 && 3) aka is not in any of the allowed itypea's
            objItemCurrent.types.indexOf(skills[i].itypea1) === -1 &&
            objItemCurrent.types.indexOf(skills[i].itypea2) === -1 &&
            objItemCurrent.types.indexOf(skills[i].itypea3) === -1
        ) {
            smodsf[skills[i].reqlevel].push(i);
        }
    }

    if (objItemCurrent.level >= 1 && objItemCurrent.level <= 11) {
        objItemCurrent.smodtier = 1;
    }
    if (objItemCurrent.level >= 12 && objItemCurrent.level <= 18) {
        objItemCurrent.smodtier = 2;
    }
    if (objItemCurrent.level >= 19 && objItemCurrent.level <= 24) {
        objItemCurrent.smodtier = 3;
    }
    if (objItemCurrent.level >= 25 && objItemCurrent.level <= 36) {
        objItemCurrent.smodtier = 4;
    }
    if (objItemCurrent.level >= 37 && objItemCurrent.level <= 99) {
        objItemCurrent.smodtier = 5;
    }
    if (objItemCurrent.level >= 25 && !objItemCurrent.expansion) {
        objItemCurrent.smodtier = 4;
    }

    objItemCurrent.smodlevelreqs = smodLevelReqs[objItemCurrent.smodtier - 1];
    objItemCurrent.smodtierodds = smodTierOdds[objItemCurrent.smodtier - 1];
    objItemCurrent.smods = smods;
    objItemCurrent.smodsf = smodsf;
    return;
}

function getAffixProbability(imbued) {
    //Many thanks to @Tub from diablo3.ingame.de for his instrumental work on affix calculations without which this wouldn't be possible!
    let totalprefixchance;
    let totalsuffixchance;
    let extra = 1;
    let prefixfreq = 0;
    let suffixfreq = 0;
    const pgroups = [];
    const sgroups = [];
    let totalchance = 0;
    let chance = 1;

    const addPrefix = function (prenum, chance, prefixfreq) {
        if (prenum == 0) {
            for (let i = 0; i < pgroups.length; i++) {
                if (pgroups[i][4] == 1 && pgroups[i][3] == 0) return;
            }
            totalprefixchance += chance;
            return;
        }

        for (let i = 0; i < pgroups.length; i++) {
            const g = pgroups[i];
            if (g[3] == 0) {
                const newchance = (chance * g[1]) / prefixfreq;
                g[3] = 1;
                addPrefix(prenum - 1, newchance, prefixfreq - g[1]);
                g[3] = 0;
            }
        }
    };

    const addSuffix = function (sufnum, chance, suffixfreq) {
        if (sufnum == 0) {
            for (let i = 0; i < sgroups.length; i++) {
                if (sgroups[i][4] == 1 && sgroups[i][3] == 0) {
                    return;
                }
            }
            totalsuffixchance += chance;
            return;
        }

        for (let i = 0; i < sgroups.length; i++) {
            const g = sgroups[i];

            if (g[3] == 0) {
                const newchance = (chance * g[1]) / suffixfreq;
                g[3] = 1;
                addSuffix(sufnum - 1, newchance, suffixfreq - g[1]);
                g[3] = 0;
            }
        }
    };

    const addAffix = function (prenum, sufnum, chance) {
        totalprefixchance = 0;
        totalsuffixchance = 0;

        if (objItemCurrent.pnum > prenum) {
            return;
        }
        if (objItemCurrent.snum > sufnum) {
            return;
        }

        addPrefix(prenum, 1, prefixfreq);
        addSuffix(sufnum, 1, suffixfreq);

        totalchance += totalprefixchance * totalsuffixchance * chance;
    };

    if (objItemCurrent.smodnum) {
        const plus1 = Math.max(0, 60 - (imbued ? Math.floor(objItemCurrent.level / 2) : 0));
        const plus2 = Math.max(0, 30 + Math.min(0, 60 - (imbued ? Math.floor(objItemCurrent.level / 2) : 0)));
        const plus3 = Math.min(100, 10 + (imbued ? Math.floor(objItemCurrent.level / 2) : 0));

        const skill1 = Math.max(0, 40 + Math.min(0, 31 - (imbued ? objItemCurrent.level : 0)));
        const skill2 = Math.max(0, 20 + Math.min(0, 71 - (imbued ? objItemCurrent.level : 0)));
        const skill3 = Math.min(100, 9 + (imbued ? objItemCurrent.level : 0));

        const smods = [];

        let prob1;
        let prob2;
        let prob3;

        for (let i = 0; i < listGroupAffix[2].length; i++) {
            if (objItemCurrent[listGroupAffix[2][i]] === -1) {
                continue;
            } // no smod set
            const row = skills[objItemCurrent[listGroupAffix[2][i]]];
            const smod = {};

            smod.id = row.id;
            smod.reqlevel = row.reqlevel;
            smod.groupid = [1, 6, 12, 18, 24, 30].indexOf(row.reqlevel);
            smod.group = objItemCurrent.smods[row.reqlevel];
            smod.groupf = objItemCurrent.smodsf[row.reqlevel];
            //smod.groupchance = 100 / objItemCurrent.smodtierodds[smod.groupid];
            smod.groupchance = objItemCurrent.smodtierodds[smod.groupid] / 100;
            smod.forbidden = objItemCurrent.smodsf[row.reqlevel].indexOf(smod.id) !== -1;

            switch (objItemCurrent[listGroupAffix[2][i] + '-range1']) {
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
            objItemCurrent.smodnum // Switch sur le nombre de skills que le user a select
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
                prob2 = 0;
                prob3 = 0;

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

    if (objItemCurrent.autoaffix !== -1) {
        extra *= objItemCurrent.autoaffixtotalfreq / objItemCurrent.autoaffixfreq;
    }

    const addRange = function (min, max, val) {
        const r = Math.abs(min - max) + 1;
        const v = Math.abs(val - max) + 1;

        chance *= v / r;
    };

    // Calc chances of getting a value >= slider value
    for (let i = 1; i < 5; i++) {
        // 1-4 cause safety crafts have four ranges...
        if (objItemCurrent.hasOwnProperty('p1-range' + i))
            addRange(objItemCurrent['p1-min' + i], objItemCurrent['p1-max' + i], objItemCurrent['p1-range' + i]);
        if (objItemCurrent.hasOwnProperty('p2-range' + i))
            addRange(objItemCurrent['p2-min' + i], objItemCurrent['p2-max' + i], objItemCurrent['p2-range' + i]);
        if (objItemCurrent.hasOwnProperty('p3-range' + i))
            addRange(objItemCurrent['p3-min' + i], objItemCurrent['p3-max' + i], objItemCurrent['p3-range' + i]);
        if (objItemCurrent.hasOwnProperty('s1-range' + i))
            addRange(objItemCurrent['s1-min' + i], objItemCurrent['s1-max' + i], objItemCurrent['s1-range' + i]);
        if (objItemCurrent.hasOwnProperty('s2-range' + i))
            addRange(objItemCurrent['s2-min' + i], objItemCurrent['s2-max' + i], objItemCurrent['s2-range' + i]);
        if (objItemCurrent.hasOwnProperty('s3-range' + i))
            addRange(objItemCurrent['s3-min' + i], objItemCurrent['s3-max' + i], objItemCurrent['s3-range' + i]);
        if (objItemCurrent.hasOwnProperty('craft-range' + i))
            addRange(
                objItemCurrent['craft-min' + i],
                objItemCurrent['craft-max' + i],
                objItemCurrent['craft-range' + i]
            );
        if (objItemCurrent.hasOwnProperty('autoaffix-range' + i))
            addRange(
                objItemCurrent['autoaffix-min' + i],
                objItemCurrent['autoaffix-max' + i],
                objItemCurrent['autoaffix-range' + i]
            );
    }

    if (objItemCurrent.quality !== 4) {
        if (objItemCurrent.p1 !== -1) {
            chance *= objItemCurrent.p1freq / objItemCurrent.p1groupfreq;
        }
        if (objItemCurrent.p2 !== -1) {
            chance *= objItemCurrent.p2freq / objItemCurrent.p2groupfreq;
        }
        if (objItemCurrent.p3 !== -1) {
            chance *= objItemCurrent.p3freq / objItemCurrent.p3groupfreq;
        }
        if (objItemCurrent.s1 !== -1) {
            chance *= objItemCurrent.s1freq / objItemCurrent.s1groupfreq;
        }
        if (objItemCurrent.s2 !== -1) {
            chance *= objItemCurrent.s2freq / objItemCurrent.s2groupfreq;
        }
        if (objItemCurrent.s3 !== -1) {
            chance *= objItemCurrent.s3freq / objItemCurrent.s3groupfreq;
        }

        for (let i in objPrefix) {
            if (objItemCurrent.p1 !== -1 && objPrefix[i][0] === magicPrefix[objItemCurrent.p1].group) {
                objPrefix[i][4] = 1;
            }
            if (objItemCurrent.p2 !== -1 && objPrefix[i][0] === magicPrefix[objItemCurrent.p2].group) {
                objPrefix[i][4] = 1;
            }
            if (objItemCurrent.p3 !== -1 && objPrefix[i][0] === magicPrefix[objItemCurrent.p3].group) {
                objPrefix[i][4] = 1;
            }
            prefixfreq += objPrefix[i][1];
            pgroups.push(objPrefix[i]);
        }

        for (let i in objSuffix) {
            if (objItemCurrent.s1 !== -1 && objSuffix[i][0] === magicSuffix[objItemCurrent.s1].group) {
                objSuffix[i][4] = 1;
            }
            if (objItemCurrent.s2 !== -1 && objSuffix[i][0] === magicSuffix[objItemCurrent.s2].group) {
                objSuffix[i][4] = 1;
            }
            if (objItemCurrent.s3 !== -1 && objSuffix[i][0] === magicSuffix[objItemCurrent.s3].group) {
                objSuffix[i][4] = 1;
            }
            suffixfreq += objSuffix[i][1];
            sgroups.push(objSuffix[i]);
        }
    }

    switch (objItemCurrent.quality) {
        case 4:
            if (objItemCurrent.p1 !== -1) chance /= objItemCurrent.p1totalfreq / objItemCurrent.p1freq;
            if (objItemCurrent.p2 !== -1) chance /= objItemCurrent.p2totalfreq / objItemCurrent.p2freq;
            if (objItemCurrent.p3 !== -1) chance /= objItemCurrent.p3totalfreq / objItemCurrent.p3freq;
            if (objItemCurrent.s1 !== -1) chance /= objItemCurrent.s1totalfreq / objItemCurrent.s1freq;
            if (objItemCurrent.s2 !== -1) chance /= objItemCurrent.s2totalfreq / objItemCurrent.s2freq;
            if (objItemCurrent.s3 !== -1) chance /= objItemCurrent.s3totalfreq / objItemCurrent.s3freq;

            if (objItemCurrent.anum === 2) {
                chance *= 1 / 4; // 25% chance for 1 prefix 1 suffix
            } else {
                if (objItemCurrent.pnum === 1) chance *= 1 / 2; // 25% chance for 1 prefix, item only has one prefix specified so it could be either this or prefix1 prefix1 (25% + 25%)
                if (objItemCurrent.snum === 1) chance *= 3 / 4; // 50% chance for 1 suffix, so (25% + 50%)
            }

            return Math.round((1 / chance) * extra);

        case 6:
            if (objItemCurrent.amax === 6) {
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

            if (objItemCurrent.amax === 4) {
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
            if (objItemCurrent.level < 31) {
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

            if (objItemCurrent.level > 30 && objItemCurrent.level < 51) {
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

            if (objItemCurrent.level > 50 && objItemCurrent.level < 71) {
                addAffix(3, 0, ((1 / 8) * 4) / 5); // 3
                addAffix(2, 1, ((3 / 8) * 4) / 5); // 3
                addAffix(1, 2, ((3 / 8) * 4) / 5); // 3
                addAffix(0, 3, ((1 / 8) * 4) / 5); // 3
                addAffix(3, 1, ((5 / 16) * 1) / 5); // 4
                addAffix(2, 2, ((6 / 16) * 1) / 5); // 4
                addAffix(1, 3, ((5 / 16) * 1) / 5); // 4
            }

            if (objItemCurrent.level > 70) {
                addAffix(3, 1, 5 / 16); // 4
                addAffix(2, 2, 6 / 16); // 4
                addAffix(1, 3, 5 / 16); // 4
            }
    }

    return Math.round((1 / (chance * totalchance)) * extra);
}

function updateTables() {
    let t, index, val;

    const insert = function (label, value, tooltip) {
        const row = t.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = label;
        cell2.innerHTML = value;
        if (tooltip) {
            cell2.title = tooltip;
        }
        //cell2.id = label + "-tableval";
    };

    //console.log(objStat);
    setObjValueTable({});

    for (const tableName in tables) {
        t = document.getElementById(tableName + '-Table').tBodies[0];
        t.innerHTML = '';

        if (tableName === 'baseTypes') {
            index = objItemCurrent.classid;
        }

        for (const column in tables[tableName]) {
            switch (column) {
                case 'chance for affixes':
                    if (objItemCurrent.staffmods && objItemCurrent.quality === 6)
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
                    if (objItemCurrent.craft === -1) {
                        break;
                    }
                    val = Math.max((Math.max(objItemCurrent.minlevel) - Math.floor(objItemCurrent.charlvl / 2)) * 2, 1);
                    if (val > 99) {
                        val = 'not possible';
                    }
                    insert(
                        'min ingredient ilvl',
                        val,
                        'minimum item level of main recipe ingredient to craft this item at char level: ' +
                            objItemCurrent.charlvl
                    );
                    break;

                case 'ideal ingredient ilvl':
                    if (objItemCurrent.craft === -1) {
                        break;
                    }
                    val = Math.max(
                        Math.min(
                            (Math.max(objItemCurrent.minlevel, 71) - Math.floor(objItemCurrent.charlvl / 2)) * 2,
                            99
                        ),
                        1
                    );
                    insert(
                        'ideal ingredient ilvl',
                        val,
                        'Ideal item level of main recipe ingredient to craft this item at char level: ' +
                            objItemCurrent.charlvl
                    );
                    break;

                case 'min ilvl':
                    insert(
                        'min ilvl',
                        objItemCurrent.minlevel,
                        'minimum item level to make these affixes available on the specific base. for mob drops, the base will not drop unless base specific ilvl is met'
                    );
                    break;

                case 'level req':
                    insert('level req', getItemLevelReq(), 'with stats included');
                    break;

                case 'color (equipped)':
                    insert('color (equipped)', objItemCurrent.ecolor.name);
                    break;

                case 'color (inv)':
                    insert('color (inv)', objItemCurrent.icolor.name);
                    break;

                case 'gambleable':
                    insert('can be gambled', getItemGambleable());
                    break;

                case 'upgradeable':
                    insert('can be upped', getItemUpgradeable());
                    break;

                case 'affix level':
                    insert('affix level', objItemCurrent.alvl);
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
                    if (objItemCurrent.classid > 305) {
                        break;
                    }
                    val = baseTypes[objItemCurrent.classid][tables[tableName][column]];
                    if (!val) {
                        break;
                    }
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val * 1.5);
                    }
                    val = Math.floor(val * (1 + (objStat['dmg%'] || 0) / 100.0));
                    val += objStat['dmg-min'] || 0; //dmg/lvl is always for max damage
                    insert(column, val, 'with stats included');
                    break;

                case 'max dmg (total)':
                case 'max throw dmg (total)':
                case 'max 2h dmg (total)':
                    if (objItemCurrent.classid > 305) {
                        break;
                    }
                    val = baseTypes[objItemCurrent.classid][tables[tableName][column]];
                    if (!val) {
                        break;
                    }
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val * 1.5);
                    }
                    val = Math.floor(
                        val *
                            (1 +
                                ((objStat['dmg%'] || 0) +
                                    Math.floor(((objStat['dmg%/lvl'] || 0) * objItemCurrent.charlvl) / 8)) /
                                    100.0)
                    );
                    val +=
                        (objStat['dmg-max'] || 0) +
                        Math.floor(((objStat['dmg/lvl'] || 0) * objItemCurrent.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'min defense (total)':
                    val =
                        objStat['ac%'] || objStat['ac%/lvl']
                            ? baseTypes[objItemCurrent.classid].maxac + 1
                            : baseTypes[objItemCurrent.classid].minac;
                    if (!val) {
                        break;
                    }
                    if (
                        [91, 92, 93, 94].indexOf(objItemCurrent.craft) !== -1 &&
                        objStatDefense['ac%'].affix.hasOwnProperty('name')
                    ) {
                        val += 1; // Thanks @Kaylin
                    }
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val * 1.5);
                    }
                    val = Math.floor(
                        val *
                            (1 +
                                ((objStat['ac%'] || 0) +
                                    Math.floor(((objStat['ac%/lvl'] || 0) * objItemCurrent.charlvl) / 8)) /
                                    100.0)
                    );
                    val += (objStat.ac || 0) + Math.floor(((objStat['ac/lvl'] || 0) * objItemCurrent.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'max defense (total)':
                    val =
                        objStat['ac%'] || objStat['ac%/lvl']
                            ? baseTypes[objItemCurrent.classid].maxac + 1
                            : baseTypes[objItemCurrent.classid].maxac;
                    if (!val) {
                        break;
                    }
                    if (
                        [91, 92, 93, 94].indexOf(objItemCurrent.craft) !== -1 &&
                        objStatDefense['ac%'].affix.hasOwnProperty('name')
                    ) {
                        val += 1; // Thanks @Kaylin
                    }
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val * 1.5);
                    }
                    val = Math.floor(
                        val *
                            (1 +
                                ((objStat['ac%'] || 0) +
                                    Math.floor(((objStat['ac%/lvl'] || 0) * objItemCurrent.charlvl) / 8)) /
                                    100.0)
                    );
                    val += (objStat.ac || 0) + Math.floor(((objStat['ac/lvl'] || 0) * objItemCurrent.charlvl) / 8);
                    insert(column, val, 'with stats included');
                    break;

                case 'req strength (total)':
                case 'req dexterity (total)':
                    val = objStat[tables[tableName][column]] || 0;
                    val = val - Math.floor(val * (Math.abs(objStat.ease || 0) / 100));
                    if (!val) {
                        break;
                    }
                    insert(column, val, 'with stats included');
                    break;

                case 'reqstr':
                case 'reqdex':
                    val = window[tableName][index][column];
                    if (!window[tableName][index][column]) {
                        break;
                    }
                    if (objItemCurrent.ethereal) {
                        val -= 10;
                    }
                    insert(tables[tableName][column], val);
                    break;

                case 'gemsockets':
                    if (objItemCurrent.maxsockets) {
                        objValueTable[column] = objItemCurrent.maxsockets;
                        insert(tables[tableName][column], objItemCurrent.maxsockets, 'considers ilvl and basetype');
                    }
                    break;

                case 'durability':
                    val = window[tableName][index][column];
                    if (
                        !val ||
                        baseTypes[objItemCurrent.classid].stackable ||
                        baseTypes[objItemCurrent.classid].nodurability
                    )
                        break;
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val / 2) + 1;
                    }
                    objValueTable[column] = val;
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
                    if (!val) {
                        break;
                    }
                    if (objItemCurrent.ethereal) {
                        val = Math.floor(val * 1.5);
                    }
                    //objStat[column] = val;
                    objValueTable[column] = val;
                    insert(tables[tableName][column], val);
                    break;

                default:
                    if (window[tableName][index][column]) {
                        objValueTable[column] = window[tableName][index][column];
                        insert(tables[tableName][column], window[tableName][index][column]);
                    }
            }
        }
    }
}

function getItemCrafts() {
    objItemCurrent.crafts = [];

    for (let i = 0; i < cubeMain.length; i++) {
        if (cubeMain[i]['input 2'] !== 'jew' || cubeMain[i]['numinputs'] !== 4) {
            continue;
        } //Only check crafting recipes
        const craftBase = cubeMain[i]['input 1'].split(',')[0];

        if (
            (baseTypes[objItemCurrent.classid].hasOwnProperty('normcode') &&
                baseTypes[objItemCurrent.classid]['normcode'] === craftBase) ||
            objItemCurrent.types.indexOf(craftBase) > -1
        ) {
            objItemCurrent.crafts.push(i);
        }
    }
}

function getAffixFreqs() {
    objItemCurrent.p1freq = objItemCurrent.p1 === -1 ? 0 : magicPrefix[objItemCurrent.p1].frequency;
    objItemCurrent.p2freq = objItemCurrent.p2 === -1 ? 0 : magicPrefix[objItemCurrent.p2].frequency;
    objItemCurrent.p3freq = objItemCurrent.p3 === -1 ? 0 : magicPrefix[objItemCurrent.p3].frequency;

    objItemCurrent.s1freq = objItemCurrent.s1 === -1 ? 0 : magicSuffix[objItemCurrent.s1].frequency;
    objItemCurrent.s2freq = objItemCurrent.s2 === -1 ? 0 : magicSuffix[objItemCurrent.s2].frequency;
    objItemCurrent.s3freq = objItemCurrent.s3 === -1 ? 0 : magicSuffix[objItemCurrent.s3].frequency;

    objItemCurrent.autoaffixfreq = objItemCurrent.autoaffix === -1 ? 0 : autoMagic[objItemCurrent.autoaffix].frequency;
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

function getInvFile() {
    // invfile overrides
    switch (objItemCurrent.classid) {
        case 603: {
            // Small charm
            return 'invch1';
        }
        case 604: {
            // Large charm
            return 'invch2';
        }
        case 605: {
            // Grand charm
            return 'invch3';
        }
        case 643: {
            // Jewel
            return 'invjw5';
        }
    }

    return baseTypes[objItemCurrent.classid].invfile;
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

function getTitle() {
    let name = '';
    const base = listLocale[baseTypes[objItemCurrent.classid].namestr] || baseTypes[objItemCurrent.classid].name;
    if (objItemCurrent.quality === 4) {
        if (objItemCurrent.p1 !== -1) {
            name += listLocale[magicPrefix[objItemCurrent.p1].name] + ' ';
        }
        if (objItemCurrent.p2 !== -1) {
            name += listLocale[magicPrefix[objItemCurrent.p2].name] + ' ';
        }
        if (objItemCurrent.p3 !== -1) {
            name += listLocale[magicPrefix[objItemCurrent.p3].name] + ' ';
        }
        name += base;
        if (objItemCurrent.s1 !== -1) {
            name += ' ' + listLocale[magicSuffix[objItemCurrent.s1].name];
        }
        if (objItemCurrent.s2 !== -1) {
            name += ' ' + listLocale[magicSuffix[objItemCurrent.s2].name];
        }
        if (objItemCurrent.s3 !== -1) {
            name += ' ' + listLocale[magicSuffix[objItemCurrent.s3].name];
        }
    } else {
        name =
            listLocale[rarePrefix[objItemCurrent.namepre].name] +
            ' ' +
            listLocale[rareSuffix[objItemCurrent.namesuf].name] +
            ' ' +
            base;
    }
    objItemCurrent.title = name;
}

function saveImage(imgDiv) {
    const elA = document.createElement('a');
    elA.href = imgDiv.firstChild.toDataURL();
    elA.download = objItemCurrent.title;
    elA.click();
    return true;
}

function update(control) {
    if (!control) {
        control = { id: 'none-none' };
    }
    setObjStat({});
    setObjDefault({});

    objItemCurrent.quality = +document.getElementById('quality-Select').value;
    objItemCurrent.classid = +document.getElementById('classid-Select').value;
    objItemCurrent.namepre = +document.getElementById('namepre-Select').value;
    objItemCurrent.namesuf = +document.getElementById('namesuf-Select').value;
    objItemCurrent.ethereal = +document.getElementById('ethereal-Select').value;
    objItemCurrent.expansion = +document.getElementById('expansion-Select').value;
    objItemCurrent.level = +document.getElementById('level-Select').value;
    objItemCurrent.charlvl = +document.getElementById('charlvl-Select').value;
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
    updateTables();

    //console.log(objItemCurrent);
    //console.log(objStatDefense);
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
const middle = document.getElementById('middle');
middle.onclick = saveImage.bind(this, middle);
const clear = document.getElementById('clear');
clear.onclick = reload;
const save = document.getElementById('save');
save.onclick = saveD2i;
