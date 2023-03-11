# Wordle Assistant
---

A React application that helps the user solve [Wordle](https://www.nytimes.com/games/wordle/index.html) puzzles. The user enters the feedback (colors) from each Wordle guess, in order to see a filtered list of all remaining words.

## Use

1. **Type or select your starting word**. You may also click "RANDOM", to choose a word at random from the list of 2,309 answers.
3. **Set the color of each letter to match Wordle's output, by clicking them.** Each time you click a letter, its color will change, from gray, to yellow, to green, and back to gray.
4. **Hit "ENTER" to filter the list of remaining words.** 
5. **Repeat until solved**, or until all six guesses are used.

## Source data

The complete 14,855 word list of every word the game will accept as valid can be found in the Wordle client-side JavaScript code. 

However, the set of words from which solutions are actually drawn is much smaller. Answers are said to be determined for every day through 10/20/2027 ([https://www.cnet.com/culture/how-to-download-wordle-and-play-offline-for-the-next-5-years](https://www.cnet.com/culture/how-to-download-wordle-and-play-offline-for-the-next-5-years)), making a much shorter list of 2,309.

The same single long array contains both the solutions as well as all the other acceptable words. However, the app seems to be getting the solution for each specific day from the NYTimes API, by using the endpoint `https://www.nytimes.com/svc/wordle/v2/{YYYY}-{MM}-{DD}.json`. As of this time (11/2022), I am only able to get answers through the API for as far ahead as 01/07/2023. It presently returns `undefined` for any later date (though this will obviously change as time passes). 

Fortunately, the first 12,546 words of the array appear to be alphabetized, while the last 2,309 words, starting with "cigar" (which was the first Wordle) are not. I used these last 2,309 words as my source list.

Because it seemed to be ordered by date, I re-sorted it alphbetically instead. My goal was not to make a page that displays the current day's answer, but to make an interactive app that allows the user to see the list of possible answers dwindle in response to their guesses.


## Note
This project is primarily an exercise in web development, and I do not actually recommend that you make a habit of cheating at Wordle, as it is a lot less fun than trying to solve the puzzle in earnest (and it is also a bit silly to cheat at a game you play against yourself).

---

#### Copyright © 2022 [Dennis Hodges](https://dennis-hodges.com) 

## License

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