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
    objStatD,
    listStatOffense,
    setListStatOffense,
    listImplicit,
    objItemCurrent,
    listTabSkill,
    listExplicit,
    setListExplicit,
    setListImplicit,
} from '../data/index.js';

export class CHandlerBinary {
    bitpos = 0;

    constructor() {
        this.buffer = new Uint8Array(256);
    }

    write8(value) {
        this.buffer[this.bitpos >> 3] = value;
        this.bitpos += 8;
    }

    write16(value) {
        const idx = this.bitpos >> 3;
        this.buffer[idx] = value;
        this.buffer[idx + 1] = value >> 8;
        this.bitpos += 16;
    }

    write32(value) {
        const idx = this.bitpos >> 3;
        this.buffer[idx] = value;
        this.buffer[idx + 1] = value >> 8;
        this.buffer[idx + 2] = value >> 16;
        this.buffer[idx + 3] = value >> 24;
        this.bitpos += 32;
    }

    string(str, length) {
        for (let i = 0; i < str.length; ++i) {
            this.write8(str.charCodeAt(i));
        }

        for (let i = str.length; i < length; ++i) {
            this.write8(0);
        }
    }

    seek(pos) {
        this.bitpos = pos << 3;
    }

    skip(bytes) {
        this.bitpos += bytes << 3;
    }

    align() {
        this.bitpos = (this.bitpos + 7) & ~7;
    }

    bits(value, count) {
        let shift = 0;

        while (count) {
            const byte = this.bitpos >> 3;
            const bit = this.bitpos & 7;
            const write = Math.min(count, 8 - bit);
            this.buffer[byte] |= ((value >> shift) & ((1 << write) - 1)) << bit;
            shift += write;
            count -= write;
            this.bitpos += write;
        }
    }

    bit(value) {
        this.buffer[this.bitpos >> 3] |= (value & 1) << (this.bitpos & 7);
        this.bitpos += 1;
    }

    skipbits(count) {
        this.bitpos += count;
    }

    finish() {
        return this.buffer.subarray(0, this.bitpos >> 3);
    }
}

export const parseTable = (table, mode = false) => {
    let string = table.replace(/_|"/g, ''); //.toLowerCase(),
    let lines = string.split('\n');
    let columns = lines.shift().toLowerCase().split('\t'); // Column names lowercased ONLY
    let rows = !mode ? [] : {};
    let row = {};
    let expansion = string.indexOf('Expansion') === -1 ? 1 : 0;
    let rowData;
    let i;
    lines.pop();
    for (i = 0; i < lines.length; i++) {
        rowData = lines[i].split('	');
        if (rowData[0] == 'Expansion') {
            expansion = 1;
            continue;
        }
        row = {};
        for (let n = 0; n < rowData.length; n++) {
            if (row[columns[n]]) {
                continue;
            }
            row[columns[n]] = isNaN(+rowData[n]) ? rowData[n] : +rowData[n];
        }
        row.expansion = expansion;
        if (!mode) rows.push(row);
        if (mode) rows[rowData[0]] = row;
    }
    console.log('Parsed table with ' + (rows.length || Object.keys(rows).length) + ' rows');
    //console.log(rows);
    return rows;
};

const readCString = (dr, offset) => {
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
};

const parseLocale = (bytestream) => {
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
};

export const parseLocales = () => {
    // string.tbl > expansionstring.tbl > patchstring.tbl
    parseLocale(window.stringtbl.buffer);
    parseLocale(window.expansionstringtbl.buffer);
    parseLocale(window.patchstringtbl.buffer);
    listLocale['strModEnhancedDamage'] = 'Enhanced Damage';
    listLocale['skillname61'] = listLocale['skillsname61'];
    listLocale['Skillname223'] = 'Poison Creeper';
    console.log('Parsed listLocale (' + LANGUAGE_CURRENT + ')');
    //console.log(listLocale);
};

export const getItemTypes = () => {
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
};

export const getMaxAffixCount = () => {
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
};

export const getAffixCount = () => {
    objItemCurrent.pnum = [objItemCurrent.p1, objItemCurrent.p2, objItemCurrent.p3].filter((k) => k !== -1).length;
    objItemCurrent.snum = [objItemCurrent.s1, objItemCurrent.s2, objItemCurrent.s3].filter((k) => k !== -1).length;
    objItemCurrent.anum = objItemCurrent.pnum + objItemCurrent.snum;
    objItemCurrent.smodnum = [objItemCurrent.smod1, objItemCurrent.smod2, objItemCurrent.smod3].filter(
        (k) => k !== -1
    ).length;
};

export const getAvoidGroups = (affix) => {
    for (let i = 0; i < listGroupAffix.length; i++) {
        if (listGroupAffix[i].indexOf(affix) > -1) {
            return listGroupAvoid[i][listGroupAffix[i].indexOf(affix)];
        }
    }

    return [];
};

export const setAvoidGroups = () => {
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
};

export const affixOverCap = (affix) => {
    if (affix === 'p3' && objItemCurrent.pmax <= 2) {
        return true;
    }
    if (affix === 'p2' && objItemCurrent.pmax <= 1) {
        return true;
    }

    if (affix === 's3' && objItemCurrent.smax <= 2) {
        return true;
    }
    if (affix === 's2' && objItemCurrent.smax <= 1) {
        return true;
    }

    if (objItemCurrent.anum > objItemCurrent.amax) {
        if (affix === 's2' && objItemCurrent.pnum >= 3) {
            return true;
        }
        if (affix === 's3' && objItemCurrent.pnum >= 2) {
            return true;
        }

        if (affix === 'p2' && objItemCurrent.snum >= 3) {
            return true;
        }
        if (affix === 'p3' && objItemCurrent.snum >= 2) {
            return true;
        }
    }

    return false;
};

export const getAffixLevel = (lvl) => {
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
};

export const getCompositeStats = () => {
    if (
        objStatD.hasOwnProperty('res-all') &&
        (objStatD.hasOwnProperty('res-fire') ||
            objStatD.hasOwnProperty('res-cold') ||
            objStatD.hasOwnProperty('res-ltng') ||
            objStatD.hasOwnProperty('res-pois'))
    ) {
        const composite = ['res-fire', 'res-cold', 'res-ltng', 'res-pois'];

        for (let i = 0; i < composite.length; i++) {
            if (objStatD.hasOwnProperty(composite[i])) {
                objStatD[composite[i]].value += objStatD['res-all'].value;
                continue;
            }

            objStatD[composite[i]] = {};
            objStatD[composite[i]].value = objStatD['res-all'].value;
            objStatD[composite[i]].modcode = composite[i];
            objStatD[composite[i]].properties = properties[composite[i]];
            objStatD[composite[i]].itemstat = itemStatCost[modcodeToItemStat(composite[i])];
            objStatD[composite[i]].descprio = objStatD[composite[i]].itemstat.descpriority; // Add a shorthand...
        }

        delete objStatD['res-all'];
    }
};

export const getStatOrder = () => {
    setListStatOffense([]);

    function byDescPrio(a, b) {
        return b.descprio - a.descprio;
    }

    for (const stat in objStatD) {
        listStatOffense.push(objStatD[stat]);
    }

    listStatOffense.sort(byDescPrio);
};

const getWepClassDesc = () => {
    // Thanks to Doug "the best programmer" for getting this info!
    if (objItemCurrent.types.indexOf('staf') !== -1) {
        return 'Staff Class';
    }
    if (objItemCurrent.types.indexOf('axe') !== -1) {
        return 'Axe Class';
    }
    if (objItemCurrent.types.indexOf('swor') !== -1) {
        return 'Sword Class';
    }
    if (objItemCurrent.types.indexOf('knif') !== -1) {
        return 'Dagger Class';
    }
    if (objItemCurrent.types.indexOf('jave') !== -1) {
        return 'Javelin Class';
    }
    if (objItemCurrent.types.indexOf('spea') !== -1) {
        return 'Spear Class';
    }
    if (objItemCurrent.types.indexOf('bow') !== -1) {
        return 'Bow Class';
    }
    if (objItemCurrent.types.indexOf('pole') !== -1) {
        return 'Polearm Class';
    }
    if (objItemCurrent.types.indexOf('xbow') !== -1) {
        return 'Crossbow Class';
    }
    if (objItemCurrent.types.indexOf('h2h') !== -1) {
        return 'Claw Class';
    }
    if (objItemCurrent.types.indexOf('orb') !== -1) {
        return 'Staff Class';
    }
    if (objItemCurrent.types.indexOf('wand') !== -1) {
        return 'Staff Class';
    }
    if (objItemCurrent.types.indexOf('thro') !== -1) {
        return 'Equip to Throw';
    }
    if (objItemCurrent.types.indexOf('blun') !== -1) {
        return 'Mace Class';
    }
    return 'Unknown Class';
};

const getWepSpeedDesc = (classId = 1, ias = 0) => {
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
};

export const getImplicits = () => {
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
                    objStatD['ac%'].affix.hasOwnProperty('name')
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
};

export const getExplicits = () => {
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
                    'Adds ' + listStatOffense[i].value + '-' + objStatD['cold-max'].value + ' cold damage';
                continue;
            case 'fire-min':
                listStatOffense[i].desc =
                    'Adds ' + listStatOffense[i].value + '-' + objStatD['fire-max'].value + ' fire damage';
                continue;
            case 'ltng-min':
                listStatOffense[i].desc =
                    'Adds ' + listStatOffense[i].value + '-' + objStatD['ltng-max'].value + ' lightning damage';
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
                    Math.round((objStatD['pois-min'].value * objStatD['pois-len'].value) / 256) +
                    '-' +
                    Math.floor((objStatD['pois-max'].value * objStatD['pois-len'].value) / 256) +
                    ' poison damage over ' +
                    Math.floor(objStatD['pois-len'].value / 25) +
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
                if (!objStatD['dmg-max'] || objStatD['dmg-min'].value >= objStatD['dmg-max'].value) {
                    break;
                }
                listStatOffense[i].desc =
                    'Adds ' + objStatD['dmg-min'].value + '-' + objStatD['dmg-max'].value + ' damage';
                continue;
            case 'dmg-max':
                if (objStatD['dmg-min'] && objStatD['dmg-min'].value < objStatD['dmg-max'].value) {
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

    if (objItemCurrent.ethereal && !objStatD.hasOwnProperty('sock')) {
        listExplicit.push('Ethereal (Cannot be Repaired)');
    }

    for (let i = 0; i < listExplicit.length; i++) {
        listExplicit[i] = { colors: [3], strings: [listExplicit[i]] };
    }
};

export const modcodeToItemStat = (code) => {
    return propertyToItemStat(modcodeToProperty(code));
};

const modcodeToProperty = (code) => {
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
};

const propertyToItemStat = (prop) => {
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
};

export const updateItemStatCost = () => {
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
};

export const getItemColor = (equipped) => {
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
};

export const getItemGambleable = () => {
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
};

export const getItemUpgradeable = () => {
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
};

export const getItemLevel = () => {
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
};

export const getItemLevelReq = () => {
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
};

export const getStaffTiers = () => {
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
};

export const getAffixProbability = (imbued) => {
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
};

export const getItemCrafts = () => {
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
};

export const getAffixFreqs = () => {
    objItemCurrent.p1freq = objItemCurrent.p1 === -1 ? 0 : magicPrefix[objItemCurrent.p1].frequency;
    objItemCurrent.p2freq = objItemCurrent.p2 === -1 ? 0 : magicPrefix[objItemCurrent.p2].frequency;
    objItemCurrent.p3freq = objItemCurrent.p3 === -1 ? 0 : magicPrefix[objItemCurrent.p3].frequency;

    objItemCurrent.s1freq = objItemCurrent.s1 === -1 ? 0 : magicSuffix[objItemCurrent.s1].frequency;
    objItemCurrent.s2freq = objItemCurrent.s2 === -1 ? 0 : magicSuffix[objItemCurrent.s2].frequency;
    objItemCurrent.s3freq = objItemCurrent.s3 === -1 ? 0 : magicSuffix[objItemCurrent.s3].frequency;

    objItemCurrent.autoaffixfreq = objItemCurrent.autoaffix === -1 ? 0 : autoMagic[objItemCurrent.autoaffix].frequency;
};

export const getInvFile = () => {
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
};

export const getTitle = () => {
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
};
