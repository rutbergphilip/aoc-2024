import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day4/data.txt');
  const matrix = input.split('\n');

  const occurrences = matrix.reduce((count, row, index) => {
    const [threeUp, twoUp, oneUp, curr, oneDown, twoDown, threeDown] = [
      matrix[index - 3] || '',
      matrix[index - 2] || '',
      matrix[index - 1] || '',
      row.split(''),
      matrix[index + 1] || '',
      matrix[index + 2] || '',
      matrix[index + 3] || '',
    ];

    for (let i = 0; i < row.length; i++) {
      const character = row[i];
      if (character !== 'X') continue;

      const left = curr[i - 1] + curr[i - 2] + curr[i - 3];
      const upLeft = oneUp[i - 1] + twoUp[i - 2] + threeUp[i - 3];
      const up = oneUp[i] + twoUp[i] + threeUp[i];
      const upRight = oneUp[i + 1] + twoUp[i + 2] + threeUp[i + 3];
      const right = curr[i + 1] + curr[i + 2] + curr[i + 3];
      const downRight = oneDown[i + 1] + twoDown[i + 2] + threeDown[i + 3];
      const down = oneDown[i] + twoDown[i] + threeDown[i];
      const downLeft = oneDown[i - 1] + twoDown[i - 2] + threeDown[i - 3];

      const matches = [
        left,
        upLeft,
        up,
        upRight,
        right,
        downRight,
        down,
        downLeft,
      ].reduce((acc, curr) => (curr === 'MAS' ? (acc += 1) : acc), 0);
      count += matches;
    }

    return count;
  }, 0);

  console.log(occurrences);
}
