import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day3/data.txt');

  const reducedInstructions = input.match(
    /(don\'t\(\)|mul\(\d+,\d+\)|do\(\))/gm
  ) as string[];
  const allowedInstructions = reducedInstructions
    .join('')
    .match(
      /(?<=do\(\))(mul\(\d+,\d+\))+(?=don\'t\(\))|^(mul\(\d+,\d+\))+|(?<=do\(\))(mul\(\d+,\d+\))+(?=do\(\))/gm
    ) as string[];
  const instructions = allowedInstructions
    .join('')
    .match(/(?<=mul\()\d+,\d+(?=\))/gm);

  const sum = instructions!.reduce(
    (tot, instruction) =>
      (tot += instruction
        .split(',')
        .reduce((innerSum, num) => (innerSum *= parseInt(num)), 1)),
    0
  );

  console.log(sum);
}
