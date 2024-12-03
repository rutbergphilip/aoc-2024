import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day3/data.txt');

  const instructions = input.match(/(?<=mul\()\d+,\d+(?=\))/gm);
  const sum = instructions!.reduce(
    (tot, instruction) =>
      (tot += instruction
        .split(',')
        .reduce((innerSum, num) => (innerSum *= parseInt(num)), 1)),
    0
  );

  console.log(sum);
}
