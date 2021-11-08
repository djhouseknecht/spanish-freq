
import rp from 'request-promise';
import $ from 'cheerio';
import fs from 'fs';
import { IWordSchema, IFreqSchema, IWord } from '../src/app/shared/interfaces';
import { aggDir, rawDir } from './config';

const wiktionaryOrigin = 'https://en.wiktionary.org';
const spanishDictOrigin = 'https://www.spanishdict.com';
const htmlPages = [
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1001-2000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish2001-3000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish3001-4000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish4001-5000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish5001-6000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish6001-7000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish7001-8000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish8001-9000',
  'https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish9001-10000'
];

async function fetchHtmlPage (url: string): Promise<string> {
  const html = await rp(url);
  console.log(`  successfully fetched url: ${url}`);
  return html;
}

function sanitizeText (text: string): string {
  return text.replace(/\.|\\[n]|\n|\r/, '');
}

function getInt (text: string): number {
  return parseInt(sanitizeText(text));
}

function parseAnchor (el: cheerio.Element): IWord {
  const anchor = $(el);
  const text = sanitizeText(anchor.text());
  const word: IWord = {
    wiktionary_href: `${wiktionaryOrigin}${anchor.attr('href')}`,
    spanish_dict_href: `${spanishDictOrigin}/translate/${text}`,
    word: text
  };
  return word;
}

function parseAnchorTags (td: cheerio.Element): Array<IWord> {
  const anchors: IWord[] = [];

  $(td).each((i, d) => {
    $(d).children().each((i, a) => {
      anchors.push(parseAnchor(a));
    })
  });
  return anchors;
}

function parsePageData (html: string): IFreqSchema {
  const table = $('tbody', html);
  const output: IFreqSchema = {};

  table.children().each((i, _row) => {
    if (i === 0) return;

    const row = $(_row);
    const child: IWordSchema = {} as any;
    row.children().each((i, td) => {
      if (i === 0) {
        child.rank = getInt($(td).text());
      } else if (i === 1) {
        Object.assign(child, parseAnchorTags(td)[0]);
        // child.word = sanitizeText($(td).text());
      } else if (i === 2) {
        child.occurrences = getInt($(td).text());
      } else if (i === 3) {
        child.lemma_forms = parseAnchorTags(td);
      }
    });

    output[child.word] = child;
  });

  return output;
}

function saveOutput (filename: string, data: IFreqSchema): void {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`  successfully wrote to file`, { filename, rows: Object.keys(data).length });
}

async function run () {
  const runningOutput: IFreqSchema = {};

  for (let i = 0; i < htmlPages.length; i++) {
    // if (i !== 0) return;

    const url = htmlPages[i];
    const count = `${i + 1}`.padStart(2, '0');
    console.log(`${count}: processing url: ${url}`);

    /* GET the html */
    const html = await fetchHtmlPage(url);
    /* parse the data from the page */
    const output = parsePageData(html);

    /* save the data to file */
    const name = url.split('/').slice(-1)[0];
    saveOutput(`${rawDir}/${name}.json`, output);

    /* add to our running list */
    Object.assign(runningOutput, output);
    console.log(`${count}: ✅ process successful\n\n`, /* { count: `${count}/${htmlPages.length}`, url, name } */);
  }

  /* save the final list */
  saveOutput(`${aggDir}/Spanish1-10000.json`, runningOutput);
}

run();