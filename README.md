# Spanish-freq
Just messing around with spanish words

# Try It Out
The app is hosted here:
> [https://djhouseknecht.github.io/spanish-freq/](https://djhouseknecht.github.io/spanish-freq/)
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
- [x] Deploy app to Github pages
    * May need scully
- [x] Add routes for lemma/word list tabs
- [x] Write Lemma Page
  - [x] link to it from lemma list
- [x] Write Word page
  - [x] link to lemma from word page
  - [x] link to it from word page
- [x] Write about page
- [x] ~~Write modal for multiple words on a lemma~~
  * Going to use a whole page now
- [x] fix routing
- [x] new favicon
- [x] Combine Word and Lemma page...
- [x] Add titles
- [x] ~~remove need for second API request for total 10,000 words. Just process the Lemma Aggs~~
  - Code is written, but not turned on
- [x] Scroll to top of page after routing
- [x] Add a back/home button to lemmas and/or header
- [x] Add better character search
- [x] Message when no search results
- [x] Add loading spinner
- [ ] Maybe add verb tense charts
  * https://ultralingua.com/developers#ulapi-http
    * (`server/examples/ser.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=conjugations&source=es&text=ser
    * (`server/examples/chair.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=en&target=es&text=chair
    * (`server/examples/them.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=en&target=es&text=them
    * (`server/examples/los.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=es&target=en&text=los
    * (`server/examples/to_sit.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=en&target=es&text=to%20sit
    * (`server/examples/seat.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=en&target=es&text=seat
    * (`server/examples/silla.json`) https://ulod.ultralingua.com/api//squarespace.php?tool=definitions&source=es&target=en&text=silla

- [ ] Maybe export lemma as csv...