import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, switchMap, Subject, ReplaySubject, take } from 'rxjs';

import {
  IFreqSchema,
  ILemmaSchema,
  IWordSchema,
  ILemmaFormAgg,
  IWord
} from '../shared/interfaces';

interface ICache {
  wordsSchema: IFreqSchema | null;
  wordsArray: IWordSchema[];
  wordsObs$: Subject<IWordSchema[]> | null;
  lemmasSchema: ILemmaSchema | null;
  lemmasArray: ILemmaFormAgg[];
  lemmasObs$: Subject<ILemmaFormAgg[]> | null;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private lemmaUrl = 'assets/agg_data/SpanishLemmasAgg.json';
  private wordsUrl = 'assets/agg_data/Spanish1-10000.json';
  private cache: ICache = {
    wordsSchema: null,
    wordsArray: [],
    wordsObs$: null,
    lemmasSchema: null,
    lemmasArray: [],
    lemmasObs$: null
  };

  constructor (private http: HttpClient) { }

  getWords$ (search?: string | null): Observable<IWordSchema[]> {
    return this._getSpanishWords$().pipe(
      map(words => this._filter(words, search)),
      take(1)
    )
  }

  getLemmas$ (search?: string | null): Observable<ILemmaFormAgg[]> {
    return this._getSpanishLemmas$().pipe(
      map(lemmas => this._filter(lemmas, search)),
      take(1)
    );
  }

  getWord$ (word: string): Observable<IWordSchema> {
    return this.getWords$().pipe(
      switchMap(_ => of(this.cache.wordsSchema![word]))
    );
  }

  getLemma$ (lemma: string): Observable<ILemmaFormAgg> {
    return this.getLemmas$().pipe(
      switchMap(_ => of(this.cache.lemmasSchema![lemma]))
    );
  }

  private _getSpanishWords$ (): Observable<IWordSchema[]> {
    if (this.cache.wordsObs$) {
      return this.cache.wordsObs$.asObservable();
    }

    this.cache.wordsObs$ = new ReplaySubject(1);

    // return this._getSpanishLemmas$().pipe(
    //   tap(lemma => {
    //     const schema = this._mapLemmasBackToIndividualWords(lemma);
    //     this.cache.wordsSchema = schema;
    //     this.cache.wordsArray = Object.values(schema);
    //     this.cache.wordsObs$?.next(this.cache.wordsArray);
    //   }),
    //   switchMap(_ => this.cache.wordsObs$!.asObservable())
    // );

    /* make the actual request */
    return this.http.get<IFreqSchema>(this.wordsUrl).pipe(
      tap(schema => {
        this.cache.wordsSchema = schema;
        this.cache.wordsArray = Object.values(schema);
        this.cache.wordsObs$?.next(this.cache.wordsArray);
      }),
      switchMap(_ => this.cache.wordsObs$!.asObservable())
    );
  }

  private _getSpanishLemmas$ (): Observable<ILemmaFormAgg[]> {
    if (this.cache.lemmasObs$) {
      return this.cache.lemmasObs$.asObservable();
    }

    this.cache.lemmasObs$ = new ReplaySubject(1);

    return this.http.get<ILemmaSchema>(this.lemmaUrl).pipe(
      tap(schema => {
        this.cache.lemmasSchema = schema;
        this.cache.lemmasArray = Object.values(schema);
        this.cache.lemmasObs$?.next(this.cache.lemmasArray)
      }),
      switchMap(_ => this.cache.lemmasObs$!.asObservable())
    );
  }

  private _convertLemmaAggToIWord (lemma: ILemmaFormAgg): IWord {
    return {
      word: lemma.word,
      spanish_dict_href: lemma.spanish_dict_href,
      wiktionary_href: lemma.wiktionary_href
    }
  }

  private _filter<T extends IWord> (d: T[], search?: string | null): T[] {
    if (!search) return d;

    // TODO: add character replacement
    const filterValue = search.toLowerCase();
    return d
      .filter(word => word.word.includes(filterValue))
      .sort((aWord, bWord) => {
        const a = aWord.word;
        const b = bWord.word;
        if (a === filterValue) {
          return -1;
        }

        if (b === filterValue) {
          return 1;
        }

        if (a.startsWith(filterValue)) {
          return -1;
        }

        if (b.startsWith(filterValue)) {
          return 1;
        }

        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }

        return 0;
      });
  }

  private _mapLemmasBackToIndividualWords (lemmas: ILemmaFormAgg[]): IFreqSchema {
    const schema: IFreqSchema = {};
    const map = new Map<string, IWordSchema>();

    lemmas.forEach(lemma => {
      lemma.conjugations.forEach(conj => {
        const existingValue = map.get(conj.word);
        if (existingValue) {
          existingValue.lemma_forms.push(this._convertLemmaAggToIWord(lemma));
        } else {
          map.set(conj.word, {
            ...conj,
            lemma_forms: [this._convertLemmaAggToIWord(lemma)]
          });
        }
      });
    });

    const wordsArray: IWordSchema[] = [...map.values()]
      .sort((a, b) => a.rank - b.rank)

    wordsArray.forEach(word => {
      schema[word.word] = word;
    });

    return schema;
  }
}
