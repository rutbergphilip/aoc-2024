import { readTxtFile } from '../utils';

export function run() {
  const input = readTxtFile('src/day6/data.txt');
  const matrix = input.split('\n').map((line) => line.split(''));

  const guardPosition = matrix.reduce((coords, row, y) => {
    if (!row.includes('^')) return coords;
    return { y, x: row.indexOf('^') };
  }, {} as Record<'y' | 'x', number>);

  const setNextPos = (pos: Record<'y' | 'x', number>, direction: number) => {
    switch (direction) {
      case 0:
        return { y: pos.y - 1, x: pos.x };
      case 1:
        return { y: pos.y, x: pos.x + 1 };
      case 2:
        return { y: pos.y + 1, x: pos.x };
      case 3:
        return { y: pos.y, x: pos.x - 1 };
      default:
        return { y: pos.y, x: pos.x };
    }
  };

  let direction = 0;
  let currentPos = { ...guardPosition };
  let nextPos = setNextPos(currentPos, direction);

  const visited = new Set<string>();
  visited.add(`${currentPos.x},${currentPos.y}`);

  while (matrix[nextPos!.y]?.[nextPos!.x]) {
    if (matrix[nextPos!.y][nextPos!.x] === '#') {
      direction = (direction + 1) % 4;
      nextPos = setNextPos(currentPos, direction);
      continue;
    } else {
      currentPos = { ...(nextPos ?? {}) };
      visited.add(`${currentPos.x},${currentPos.y}`);
      nextPos = setNextPos(currentPos, direction);
    }
  }

  console.log(visited.size);
}
