import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day2/data.txt');
  const reports = input.trim().split('\n');

  const sequenceIsSafe = (sequence: number[]) => {
    const isStrictlyAscending = sequence.every(
      (num, i, arr) =>
        i === 0 ||
        (num > arr[i - 1] && num - arr[i - 1] >= 1 && num - arr[i - 1] <= 3)
    );

    const isStrictlyDescending = sequence.every(
      (num, i, arr) =>
        i === 0 ||
        (num < arr[i - 1] && arr[i - 1] - num >= 1 && arr[i - 1] - num <= 3)
    );

    return isStrictlyAscending || isStrictlyDescending;
  };

  const safeReports = reports.reduce((count, report) => {
    const sequence = report.split(' ').map(Number);

    if (sequenceIsSafe(sequence)) {
      return count + 1;
    }

    for (let i = 0; i < sequence.length; i++) {
      const sequenceWithoutLevel = sequence.filter((_, index) => index !== i);
      if (sequenceIsSafe(sequenceWithoutLevel)) {
        return count + 1;
      }
    }

    return count;
  }, 0);

  console.log(safeReports);
}
