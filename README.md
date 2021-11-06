# spanish-freq
Just messing around with spanish words
## Credit
All the data for this project was attained at [Wiktionary](#wiktionary).

## Propose
This project loaded the data from the above mentioned source and aggregated the [Lemma Forms](https://en.wikipedia.org/wiki/Lemma_(morphology)) for all the words.
For example, words like **"está", "estoy", & "estaba"** all have the same lemma, **"estar"**. This project combines all of those conjugations in a list to look like:

```
estar:
   está (stats on está)
   estoy ...
   estaba ...
   etc..
```

## Wiktionary

According to Wikitionary,

> "Top 10000 Spanish words from subtitles" ([source](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#Spanish)) were used to create a list of frequently used Spanish words. "This list has been generated from subtitles of movies and television series with a total of about 27.4 million words" [source](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000).
### Pages Used
#### Main page:
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists#Spanish

#### Pages for top 10,000:
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish1001-2000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish2001-3000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish3001-4000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish4001-5000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish5001-6000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish6001-7000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish7001-8000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish8001-9000
* https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/Spanish9001-10000

### Running Feature List
- [ ] Deploy app to Github pages
    * May need scully
- [ x ] Add routes for lemma/word list tabs
- [ ] Write Lemma Page
- [ ] Write Word page
- [ ] Write about page
- [ ] Write modal for multiple words on a lemma
- [ ] Add better character search