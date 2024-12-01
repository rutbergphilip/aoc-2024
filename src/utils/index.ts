import fs from 'fs';

export function readTxtFile(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}
