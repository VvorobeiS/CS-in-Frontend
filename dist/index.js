"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
function binary(num) {
    return console.log(num.toString(2).padStart(64, '0'));
}
// function flipInt(n: number) {
//   var digit,
//     result = 0;
//   while (n) {
//     digit = n % 10; //  Get right-most digit. Ex. 123/10 → 12.3 → 3
//     result = result * 10 + digit; //  Ex. 123 → 1230 + 4 → 1234
//     n = (n / 10) | 0; //  Remove right-most digit. Ex. 123 → 12.3 → 12
//   }
//   return result;
// }
// console.log(flipInt(543));
class BCD {
    numbers = [];
    lengthFullNam = 0;
    lengthLastNum = 0;
    isNegative = false;
    constructor(num) {
        this.isNegative = Math.sign(num) == -1;
        this.lengthFullNam = (0, helpers_1.calcNumberLength)(num) + 1; // оставляем место для знака
        let bigIntNum = BigInt(Math.abs(num));
        let acc = this.lengthFullNam;
        let res = 0n;
        let i = 0n;
        while (acc > 0) {
            let digit = bigIntNum % 10n;
            if (this.isNegative && acc == 1) {
                res |= 1n << 24n;
            }
            else {
                bigIntNum = bigIntNum / 10n;
                res |= digit << (i * 4n);
            }
            if (acc % 7 == 1) {
                if (!this.numbers.length) {
                    this.lengthLastNum = Number(i + 1n);
                }
                this.numbers.push(Number(res));
                res = 0n;
                i = 0n;
            }
            else {
                i++;
            }
            acc--;
        }
        this.numbers.reverse();
    }
    getDigit(idx) {
        if (idx < 0) {
            idx = this.lengthFullNam + idx;
        }
        else {
            idx += 1;
        }
        let idxNumber = Math.floor(idx / 7);
        let number = this.numbers[idxNumber];
        let digitIdx = 6 - (idx % 7); // индекс полубайта
        let digitPosition = 28 - digitIdx * 4; // позиция полубайта
        let digitShift = 28 - digitPosition; // сдвиг полубайта на 0-ю позицию
        if (idxNumber == this.numbers.length - 1) {
            number <<= 28 - this.lengthLastNum * 4;
        }
        return (number & ((~0 << 28) >>> digitPosition)) >>> digitShift;
    }
    valueOf() {
        if (this.numbers.length == 1)
            return BigInt(this.numbers[0]);
        let result = 0n;
        let shift = 0n;
        for (let i = this.numbers.length - 1; i >= 0; i--) {
            let num = this.numbers[i];
            result |= BigInt(num) << shift;
            shift = i == this.numbers.length - 1 ? BigInt(this.lengthLastNum * 4) : 28n;
        }
        return result;
    }
    get sign() {
        return this.isNegative;
    }
}
const n = new BCD(-123);
/*
n.get(0); // 1
n.get(1); // 2
n.get(2); // 3
n.get(3); // 4
n.get(4); // 5
n.get(5); // 6
n.get(6); // 7
n.get(7); // 8
n.get(8); // 9
*/
binary(9 ^ 5);
binary(8 & 3);
console.log((9 ^ 5) + 6);
//# sourceMappingURL=index.js.map