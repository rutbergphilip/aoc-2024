import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day5/data.txt');
  const pageOrderingRules = input.match(/(\d+\|\d+)/gm) as string[];
  const updateRows = input.match(/^(\d+(?:,\d+)*)$/gm) as string[];

  const correctlyOrderedPages = updateRows.reduce((correct, row) => {
    const splitRow = row.split(',');
    const isCorrect = splitRow.every((updateNum, index) => {
      let isOk = true;
      for (let i = index; i < splitRow.length - 1; i++) {
        const comparator = `${updateNum}|${splitRow[i + 1]}`;
        if (!pageOrderingRules.includes(comparator)) {
          isOk = false;
          break;
        }
      }
      return isOk;
    });

    return isCorrect ? [...correct, row] : correct;
  }, [] as string[]);

  const sum = correctlyOrderedPages.reduce((acc, row) => {
    const numbers = row.split(',').map(Number);
    const center = numbers.at(Math.floor(numbers.length / 2))!;
    return acc + center;
  }, 0);

  console.log(sum);
}
