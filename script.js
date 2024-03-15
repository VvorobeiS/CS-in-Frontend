const fizzBuzz = () => {
  let i = 1n;

  let next = () => {
    let result = i;

    if (i % 3n == 0n && i % 5n == 0n) {
      result = 'FizzBuzz';
    } else if (i % 3n == 0n) {
      result = 'Fizz';
    } else if (i % 5n == 0) {
      result = 'Buzz';
    }

    i++;

    return result;
  };

  return { next };
};

const myFizzBuzz = fizzBuzz();

for (let i = 0n; i < 50n; i++) {
  console.log(myFizzBuzz.next());
}
