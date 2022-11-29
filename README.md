# Wordle Assistant
---

A React application that helps the user solve [Wordle]("https://www.nytimes.com/games/wordle/index.html") puzzles. The user enters the feedback (colors) from each Wordle guess, in order to see a filtered list of all remaining words.

## Use

1. **Type or select a word.** You may also click "RANDOM" to select a random word from the list.
2. **Set the color of each letter to match Wordle's output, by clicking them.** Each time you click a letter, its color will change, from gray (letter is not present in solution) to yellow (letter is present, but not in current position) to green (letter is in correct position), and back to gray.
3. **Hit "ENTER" to filter the list of remaining words.** 
4. **Repeat until solved**, or until all six guesses are used.

## Source

The complete 14,855 word list of every word the game will accept as valid can be found in the Wordle client-side JavaScript code. 

However, the set of words from which solutions are drawn is much smaller. With the url "https://www.nytimes.com/svc/wordle/v2/{YYYY}-{MM}-{DD}.json", it is possible to get the solution for a specific date using the NYTimes API. Unfortunately, as of this time (11/28/2022), I can only get solutions as far ahead as 01/07/2023.

Solutions are said to exist for every day through 10/20/2027 ([https://www.cnet.com/culture/how-to-download-wordle-and-play-offline-for-the-next-5-years](https://www.cnet.com/culture/how-to-download-wordle-and-play-offline-for-the-next-5-years)), though.

I am using a much shorter list of 2,315 words, said to be the complete list of solutions. It is sourced from [here](https://github.com/LaurentLessard/wordlesolver/blob/main/solutions_nyt.txt), although the same list can be found in many places around the internet. Apparently, the complete list of solutions used to be defined in the client side code. Since this is no longer the case, I cannot independently verify the authenticity or completeness of this list.

---
## License

#### Copyright © 2022 [Dennis Hodges](https://github.com/fermentationist) 


__The MIT License__

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.