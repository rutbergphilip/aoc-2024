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

  const similarityScore = leftCol!.reduce((acc, curr) => {
    const appearances = rightCol!.filter((num) => num === curr).length;
    return (acc += curr * appearances);
  }, 0);

  console.log(similarityScore);
}
