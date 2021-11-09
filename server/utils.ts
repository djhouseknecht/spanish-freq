export const rootDir = 'src/assets';
export const rawDir = rootDir + '/raw_data';
export const aggDir = rootDir + '/agg_data';


function sanitizeSpanishChars () {
  function replacer (match: string,
    p1: string,
    p2: string,
    p3: string,
    p4: string,
    p5: string,
    p6: string,
    p7: string,
    offset: string,
    string: string
  ) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
  }
  let newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
  console.log(newString);  // abc - 12345 - #$*%
}

const map = new Map<string, string>([
  ['ñ', 'n'],
  ['á', 'a'],
  ['é', 'e'],
  ['í', 'i'],
  ['ó', 'o'],
  ['ú', 'u'],
  ['ü', 'u']
]);