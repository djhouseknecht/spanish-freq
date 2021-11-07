import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, switchMap } from 'rxjs';

import {
  IFreqSchema,
  ILemmaSchema,
  IWordSchema,
  ILemmaFormAgg,
  IWord
} from '../shared/interfaces';

interface ICache {
  wordsSchema: IFreqSchema | null;
  searchableWords: IFreqSchema | null;
  wordsArray: IWordSchema[];
  lemmasSchema: ILemmaSchema | null;
  searchableLemmas: ILemmaSchema | null;
  lemmasArray: ILemmaFormAgg[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private lemmaUrl = 'assets/agg_data/SpanishLemmasAgg.json';
  private wordsUrl = 'assets/agg_data/Spanish1-10000.json';
  private cache: ICache = {
    wordsSchema: null,
    searchableWords: null,
    wordsArray: [],
    lemmasSchema: null,
    searchableLemmas: null,
    lemmasArray: []
  };

  constructor (private http: HttpClient) { }

  getWords$ (search?: string | null): Observable<IWordSchema[]> {
    return this._getSpanishWords$().pipe(
      map(words => this._filter(words, search))
    )
  }

  getLemmas$ (search?: string | null): Observable<ILemmaFormAgg[]> {
    return this._getSpanishLemmas$().pipe(
      map(lemmas => this._filter(lemmas, search))
    )
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
    if (this.cache.wordsSchema) {
      return of(this.cache.wordsArray);
    }
    return this.http.get<IFreqSchema>(this.wordsUrl).pipe(
      tap(schema => {
        this.cache.wordsSchema = schema;
        this.cache.wordsArray = Object.values(schema);
      }),
      map(_ => this.cache.wordsArray)
    );
  }

  private _getSpanishLemmas$ (): Observable<ILemmaFormAgg[]> {
    if (this.cache.lemmasSchema) {
      return of(this.cache.lemmasArray);
    }
    return this.http.get<ILemmaSchema>(this.lemmaUrl).pipe(
      tap(schema => {
        this.cache.lemmasSchema = schema;
        this.cache.lemmasArray = Object.values(schema);
      }),
      map(_ => this.cache.lemmasArray)
    );
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

  sanitizeSpanishChars () {
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

  private map = new Map<string, string>([
    ['ñ', 'n'],
    ['á', 'a'],
    ['é', 'e'],
    ['í', 'i'],
    ['ó', 'o'],
    ['ú', 'u'],
    ['ü', 'u']
  ]);
}
