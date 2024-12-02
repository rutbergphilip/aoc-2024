import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day2/data.txt');
  const reports = input.split('\n');

  const safeReports = reports.reduce((count, report) => {
    const sequence = report.split(' ').map(Number);

    const allIncreasing = sequence.every(
      (num, i, arr) => i === arr.length - 1 || num > arr[i + 1]
    );
    const allDecreasing = sequence.every(
      (num, i, arr) => i === arr.length - 1 || num < arr[i + 1]
    );

    if (!allIncreasing && !allDecreasing) return count;

    const isSafe = sequence.reduce((safe, num, index, arr) => {
      if (index === arr.length - 1 || !safe) return safe;

      const nextNum = arr[index + 1];
      if (num === nextNum) return false;

      const diff = Math.abs(num - nextNum);
      if (diff >= 1 && diff <= 3) return true;

      return false;
    }, true);

    return isSafe ? count + 1 : count;
  }, 0);

  console.log(safeReports);
}
