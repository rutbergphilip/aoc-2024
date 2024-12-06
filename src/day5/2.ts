import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day5/data.txt');
  const pageOrderingRules = input.match(/(\d+\|\d+)/gm) as string[];
  const updateRows = input.match(/^(\d+(?:,\d+)*)$/gm) as string[];

  const incorrectlyOrderedPages = updateRows.reduce((incorrect, row) => {
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

    return !isCorrect ? [...incorrect, row] : incorrect;
  }, [] as string[]);

  const rulePriorities = pageOrderingRules.reduce((priorities, rule) => {
    const [first, second] = rule.split('|');
    if (!priorities[first]) priorities[first] = [];
    priorities[first].push(second);
    return priorities;
  }, {} as Record<string, string[]>);

  const correctlyOrderedPages = incorrectlyOrderedPages.map((row) => {
    const splitRow = row.split(',');

    const reordered: string[] = [];

    for (let i = 0; i < splitRow.length; i++) {
      const updateNum = splitRow[i];
      const possibleNextUpdates = rulePriorities[updateNum];
      const position = reordered.findIndex((update) => {
        return possibleNextUpdates.includes(update);
      });

      if (position !== -1) {
        reordered.splice(position, 0, updateNum);
      } else {
        reordered.push(updateNum);
      }
    }

    return reordered.join(',');
  });

  const sum = correctlyOrderedPages.reduce((acc, row) => {
    const numbers = row.split(',').map(Number);
    const center = numbers.at(Math.floor(numbers.length / 2))!;
    return acc + center;
  }, 0);

  console.log(sum);
}
