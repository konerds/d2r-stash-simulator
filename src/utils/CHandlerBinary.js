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
