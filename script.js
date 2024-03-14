const instructions = {
  'SET A': 0,
  'PRINT A': 1,
  'IFN A': 2,
  RET: 3,
  'DEC A': 4,
  JMP: 5
};

/**
 * 1. instructions['SET A'] - cтавим значения аккумулятора в 10
 * 2. instructions['PRINT A'] - выводим значение на экран
 * 3. instructions['IFN A'] - если A равно 0
 * 4. instructions['RET'] - программа завершается и возвращает значение 0
 * 5. instructions['DEC A'] - уменьшаем A на 1
 * 6. instructions['JMP'] - устанавливаем курсор выполняемой инструкции в значение 2
 */

const program = [
  instructions['SET A'],
  10,
  instructions['PRINT A'],
  instructions['IFN A'],
  instructions['RET'],
  0,
  instructions['DEC A'],
  instructions['JMP'],
  2
];

const execute = (program) => {
  let i = 0;
  let condition = true;
  let acc;

  while (condition) {
    switch (program[i]) {
      case 0: // SET A
        acc = program[i + 1];
        i += 2;
        break;
      case 1: // PRINT A
        console.log(acc);
        i++;
        break;
      case 2: // IFN A
        if (acc === 0) {
          i++;
        } else {
          i += 3;
        }
        break;
      case 3: // RET
        condition = program[i + 1];
        break;
      case 4: // DEC A
        acc--;
        i++;
        break;
      case 5: // JMP
        i = program[i + 1];
        break;
    }
  }

  return condition;
};

execute(program);
