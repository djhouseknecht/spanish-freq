export interface IFreqSchema {
  [word: string]: IWordSchema;
}

export interface IWordSchema extends IWord {
  rank: number;
  occurrences: number;
  lemma_forms: Array<IWord>;
}

export interface IWord {
  word: string;
  wiktionary_href?: string;
  spanish_dict_href?: string;
}

export interface ILemmaSchema {
  [lemma_form: string]: ILemmaFormAgg;
}

export interface ILemmaFormAgg extends IWord {
  rank: number;
  total_conjugated_occurrences: number;
  conjugations: Array<IWord>;
}