import fs from 'fs';

import { IFreqSchema, ILemmaSchema, ILemmaFormAgg } from '../src/app/shared/interfaces';
import { aggDir } from './config';

function loadRawData (): IFreqSchema {
  return JSON.parse(fs.readFileSync(`${aggDir}/Spanish1-10000.json`).toString());
}

function saveOutput (filename: string, data: ILemmaSchema): void {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`  successfully wrote to file`, { filename, rows: Object.keys(data).length });
}

function generateLemmaSchema (freqSchema: IFreqSchema): ILemmaSchema {
  const lemmaSchema: ILemmaSchema = {};

  Object.values(freqSchema).forEach(word => {
    word.lemma_forms.forEach(lemma => {
      /* set to default */
      if (!lemmaSchema[lemma.word]) {
        lemmaSchema[lemma.word] = {
          rank: 0,
          total_conjugated_occurrences: 0,
          conjugations: [],
          word: lemma.word,
          wiktionary_href: lemma.wiktionary_href,
          spanish_dict_href: lemma.spanish_dict_href
        };
      }

      const lemmaValue = lemmaSchema[lemma.word];
      lemmaValue.total_conjugated_occurrences += word.occurrences;
      lemmaValue.conjugations.push(word);
    });
  });

  return lemmaSchema;
}

function sortByOccurrences (lemmaSchema: ILemmaSchema): Array<ILemmaFormAgg> {
  const agg: Array<ILemmaFormAgg> = Object.values(lemmaSchema);
  agg.sort((a, b) => b.total_conjugated_occurrences - a.total_conjugated_occurrences);
  return agg;
}

function rankLemmas (lemmas: Array<ILemmaFormAgg>): ILemmaSchema {
  const lemmaSchema: ILemmaSchema = {};

  let rank = 1;
  for (let i = 0; i < lemmas.length; i++) {
    const lemma = lemmas[i];

    /* if we have a previous index */
    if (i > 0) {
      /* if the rank matches, we don't advance our rank */
      const prevLemma = lemmas[i - 1];
      if (prevLemma.total_conjugated_occurrences !== lemma.total_conjugated_occurrences) {
        rank++;
      }
    }

    lemma.rank = rank;
    lemmaSchema[lemma.word] = lemma;
  }

  return lemmaSchema;
}

function run () {
  /* load the data */
  const freqSchema = loadRawData();
  console.log(`Loaded data. Rows: ${Object.keys(freqSchema).length}`);

  // const wordsToAgg = [
  //   "está",
  //   "estoy",
  //   "estaba", // should reduce down to one lemma
  //   "tengo",
  //   "como", // should show up in two lemmas (como and comer)
  //   "come"
  // ];

  /* this is just to test. Remove once we really start */
  // const tempSchema: IFreqSchema = {};
  // wordsToAgg.forEach(w => {
  //   tempSchema[w] = data[w];
  // });

  /* switch with `data` once ready */
  const lemmaSchema: ILemmaSchema = generateLemmaSchema(freqSchema);
  const sortedSchema = sortByOccurrences(lemmaSchema);
  const rankedSchema = rankLemmas(sortedSchema);

  saveOutput(`${aggDir}/SpanishLemmasAgg.json`, rankedSchema);
  // console.log('finished with schema and sorting', rankedSchema);

  // for (let i = 0; i < wordsToAgg.length; i++) {
  //   const w = wordsToAgg[i];
  // const word

  // }
}

run();