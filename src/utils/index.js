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

// export function getFile(path, binary = false) {
//     return new Promise(function (resolve, reject) {
//         let file = new XMLHttpRequest();
//         if (binary) file.responseType = 'arraybuffer';
//         file.onreadystatechange = function () {
//             if (file.readyState === 4) {
//                 if (file.status === 200) {
//                     //console.log("Loaded file " + path);
//                     if (binary) {
//                         resolve(new Uint8Array(file.response));
//                     } else {
//                         resolve(file.responseText);
//                     }
//                 }
//             }
//         };
//         file.open('GET', path, true);
//         file.send();
//     });
// }

export function parseTable(table, mode = false) {
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
