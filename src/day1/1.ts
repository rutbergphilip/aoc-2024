import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day1/data.txt');
  const leftCol = input
    .match(/([\d]+ )/g)
    ?.map(Number)
    .sort((a, b) => a - b);
  const rightCol = input
    .match(/\d+(\n|$)/g)
    ?.map(Number)
    .sort((a, b) => a - b);

  const totalDistance = leftCol!.reduce((acc, curr, index) => {
    return (acc += Math.abs(curr - rightCol![index]));
  }, 0);

  console.log(totalDistance);
}
