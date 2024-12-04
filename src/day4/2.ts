import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day4/data.txt');
  const matrix = input.split('\n');

  const occurrences = matrix.reduce((count, row, index) => {
    const [oneUp, oneDown] = [
      (matrix[index - 1] || '').split(''),
      (matrix[index + 1] || '').split(''),
    ];

    for (let i = 0; i < row.length; i++) {
      const character = row[i];
      if (character !== 'A') continue;

      const upLeft = oneUp[i - 1];
      const upRight = oneUp[i + 1];
      const downRight = oneDown[i + 1];
      const downLeft = oneDown[i - 1];

      const match = [
        upLeft + character + downRight,
        upRight + character + downLeft,
      ].every((str) => str === 'MAS' || str === 'SAM')
        ? 1
        : 0;
      count += match;
    }

    return count;
  }, 0);

  console.log(occurrences);
}
