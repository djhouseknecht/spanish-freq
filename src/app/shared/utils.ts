export function santize (word: string): string {
  return word.replace(convertRegex, replacer);
}

function replacer (match: string): string {
  return convertMap.get(match) as string;
}

export const convertMap = new Map<string, string>([
  ['ñ', 'n'],
  ['á', 'a'],
  ['é', 'e'],
  ['í', 'i'],
  ['ó', 'o'],
  ['ú', 'u'],
  ['ü', 'u'],
  ['Ñ', 'N'],
  ['Á', 'A'],
  ['É', 'E'],
  ['Í', 'I'],
  ['Ó', 'O'],
  ['Ú', 'U'],
  ['Ü', 'U']
]);

export const convertRegex = new RegExp(`[${[...convertMap.keys()].join('|')}]`, 'gm');