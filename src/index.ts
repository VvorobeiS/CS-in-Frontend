class BCD {
  private numbers: number[] = [];

  constructor(num: number) {
    let arr = Array.from(num.toString());
    let charNumber = 1;

    arr.reduce((acc, value, i) => {
      let end = charNumber % 7 == 0;

      console.log(end);
      // console.log(acc, this.binary(value << (charNumber * 4)));

      let result = this.binary(acc | this.binary(value << (charNumber * 4)));

      if (!end) {
        charNumber++;
      } else if (end) {
        console.log(i);
        charNumber = 1;
        this.numbers.push(result);
      }

      return result;
    }, this.binary(0));

    // console.log(this.numbers);
  }

  get(idx: number) {}

  private binary(num: number) {
    return num.toString(2).padStart(28, '0');
  }
}

const n = new BCD(65536);

// function binary(num: number) {
//   return num.toString(2).padStart(28, '0');
// }

// let bin1 = binary(0);
// let bin2 = binary(1);
// console.log(binary(bin1 | bin2));
