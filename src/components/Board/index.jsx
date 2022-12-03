import { useState, useEffect, useRef } from "react";
import Square from "../Square";
import Keyboard from "../Keyboard";
import wordList from "./words.js";
import { getRemainingWords } from "./wordle.js";
import { getRandomArrayMembers } from "../../util/helpers";
import {
  InputRows,
  Container,
  Row,
  RowContainer,
  WordsSection,
  Title,
  WordsContainer,
  WordButton,
  EnterButton,
  ResetButton,
  DeleteButton,
  KeyboardContainer,
} from "./styledBoardComponents.jsx";

const MIN_SWIPE_DISTANCE = 60;

const Board = ({ wordLength = 5, numTries = 6 }) => {
  const [gameOver, setGameOver] = useState(false);
  const [refreshNum, setRefreshNum] = useState(Math.random());
  const [solved, setSolved] = useState(false);
  const [showRowDelete, setShowRowDelete] = useState(false);
  const [xDown, setXDown] = useState(null);
  const [yDown, setYDown] = useState(null);
  const emptyRow = Array(wordLength).fill(null);
  const emptyColorRow = Array(wordLength).fill("gray");
  const currentIndex = useRef(0);
  const appliedFilters = useRef([]);
  // "overriding" setPossibleWords because you cannot access the most current state from within an event handler
  const [possibleWords, _setPossibleWords] = useState(wordList);
  const possibleWordsRef = useRef(wordList);
  const setPossibleWords = (newState) => {
    possibleWordsRef.current = newState;
    _setPossibleWords(newState);
  };
  // "overriding" setRows because you cannot access the most current state from within an event handler
  const [rows, _setRows] = useState([[...emptyRow]]);
  const rowsRef = useRef([[...emptyRow]]);
  const setRows = (newState) => {
    rowsRef.current = newState;
    _setRows(newState);
  };
  const colorRowsRef = useRef([[...emptyColorRow]]);

  useEffect(() => {
    const wordsSection = document.getElementById("words-container");
    if (gameOver === true) {
      window.removeEventListener("keydown", onKeyDown);
      wordsSection.removeEventListener("click", onWordClick);
      wordsSection.style.display = "none";
    } else {
      window.addEventListener("keydown", onKeyDown);
      wordsSection.addEventListener("click", onWordClick);
      wordsSection.style.display = "block";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wordsSection.removeEventListener("click", onWordClick);
    };
  }, [gameOver]);

  const rowIsComplete = (row) => {
    return !row.some((char) => char === null);
  };

  const getNewFilterFromRow = () => {
    const filterMap = rowsRef.current[currentIndex.current].reduce(
      (map, char, index) => {
        const filter = {
          index,
          color: colorRowsRef.current[currentIndex.current][index],
        };
        if (!(char in map)) {
          map[char] = [filter];
        } else {
          map[char].push(filter);
        }
        return map;
      },
      {}
    );
    appliedFilters.current.push(filterMap);
  };

  const filterWords = () => {
    const filters = [...appliedFilters.current];
    let remaining = [...wordList];
    while (filters.length) {
      let nextFilter = filters.shift();
      remaining = getRemainingWords(remaining, nextFilter);
    }
    setPossibleWords(remaining);
  };

  const addNewRow = () => {
    currentIndex.current++;
    const rowsCopy = [...rowsRef.current];
    rowsCopy[currentIndex.current] = [...emptyRow];
    setRows(rowsCopy);
    const colorRowsCopy = [...colorRowsRef.current];
    colorRowsCopy[currentIndex.current] = [...emptyColorRow];
    colorRowsRef.current = colorRowsCopy;
  };

  const handleEnter = () => {
    setShowRowDelete(false);
    const currentRowIsComplete = rowIsComplete(
      rowsRef.current[currentIndex.current]
    );
    if (currentRowIsComplete && currentIndex.current < numTries - 1) {
      getNewFilterFromRow();
      filterWords();
      if (possibleWordsRef.current.length >= 1) {
        addNewRow();
      }
      if (possibleWordsRef.current.length === 1) {
        selectWord(possibleWordsRef.current[0]);
        setSolved(true);
        setGameOver(true);
      }
    }
  };

  const handleDelete = () => {
    const deleteIndex =
      rowsRef.current[currentIndex.current].indexOf(null) === -1
        ? rowsRef.current[currentIndex.current].length - 1
        : rowsRef.current[currentIndex.current].indexOf(null) - 1;
    if (deleteIndex >= 0) {
      const rowsCopy = [...rowsRef.current];
      const rowCopy = [...rowsRef.current[currentIndex.current]];
      rowCopy[deleteIndex] = null;
      rowsCopy[currentIndex.current] = rowCopy;
      setRows(rowsCopy);
      return;
    }
  };

  const handleChar = (char) => {
    const nextCharIndex = rowsRef.current[currentIndex.current].indexOf(null);
    if (nextCharIndex !== -1) {
      // if there is a blank space available
      const rowsCopy = [...rowsRef.current];
      const currentRow = [...rowsRef.current[currentIndex.current]];
      currentRow[nextCharIndex] = char.toUpperCase();
      rowsCopy[currentIndex.current] = currentRow;
      setRows(rowsCopy);
    }
  };

  const onKeyDown = (event) => {
    // onKeyDown event listener
    if (event.key === "Enter") {
      // ENTER
      event.preventDefault();
      handleEnter();
    }
    if (event.key === "Delete" || event.key === "Backspace") {
      // DELETE
      handleDelete();
    }
    const allowedChars = /^[a-zA-Z]$/;
    if (allowedChars.test(event.key)) {
      // VALID LETTER
      handleChar(event.key.toUpperCase());
    }
  };

  const onWordClick = (event) => {
    if (event.target.dataset.word) {
      selectWord(event.target.dataset.word);
    }
  };

  const colorChangeCallback = (index, color) => {
    const rowsCopy = [...colorRowsRef.current];
    const rowCopy = rowsCopy[currentIndex.current];
    rowCopy[index] = color;
    rowsCopy[currentIndex.current] = rowCopy;
    colorRowsRef.current = rowsCopy;
  };

  const selectWord = (word) => {
    const rowsCopy = [...rowsRef.current];
    rowsCopy[currentIndex.current] = word.toUpperCase().split("");
    setRows(rowsCopy);
  };

  const resetBoard = () => {
    setGameOver(false);
    setSolved(false);
    setPossibleWords(wordList);
    currentIndex.current = 0;
    colorRowsRef.current = [[...emptyColorRow]];
    setRefreshNum(Math.random());
    setRows([[...emptyRow]]);
    appliedFilters.current = [];
    setShowRowDelete(false);
  };

  const onVirtualKeypress = (key) => {
    if (!gameOver) {
      switch (key) {
        case "{enter}":
          return handleEnter();
        case "{bksp}":
          return handleDelete();
        default:
          return handleChar(key);
      }
    }
  };

  const chooseRandom = () => {
    const [word] = getRandomArrayMembers(possibleWordsRef.current, 1);
    selectWord(word);
  };

  const getTouchCoords = (event) => {
    const [touch] = event.touches;
    return { x: touch.clientX, y: touch.clientY };
  };

  const onTouchStart = (event) => {
    const { x, y } = getTouchCoords(event);
    setXDown(x);
    setYDown(y);
  };

  const onTouchMove = (event) => {
    if (!xDown || !yDown) {
      return;
    }
    const { x, y } = getTouchCoords(event);
    const xDiff = x - xDown;
    const yDiff = y - yDown;
    const isHorizontal = Math.abs(xDiff) > Math.abs(yDiff);
    const isLargeEnoughSwipe = Math.abs(xDiff) > MIN_SWIPE_DISTANCE;
    if (isHorizontal && isLargeEnoughSwipe && !gameOver) {
      // is horizontal swipe
      if (xDiff < 0) {
        // left swipe
        setShowRowDelete(true);
      } else {
        // right swipe
        setShowRowDelete(false);
      }
    }
  };

  const deletePreviousRow = () => {
    // reduce currentIndex by one, unless there are no possible words (meaning the last row is the row to be deleted)
    currentIndex.current = possibleWordsRef.current.length < 1 ? currentIndex.current : currentIndex.current - 1;

    // remove current row and previous row
    const rowsCopy = rowsRef.current.slice(0, currentIndex.current);
    // add new empty row
    rowsCopy.push([...emptyRow]);
    // reset colors of empty row to gray
    setRefreshNum(Math.random());
    setRows(rowsCopy);

    // remove current and previous color rows
    const colorRowsCopy = colorRowsRef.current.slice(0, currentIndex.current);
    // add new emtpy color row
    colorRowsCopy.push([...emptyColorRow]);
    colorRowsRef.current = colorRowsCopy;

    const currentFilters = [...appliedFilters.current];
    // remove last filter
    currentFilters.pop();
    appliedFilters.current = currentFilters;
    // re-apply remaining filters
    filterWords();

    // hide delete button
    setShowRowDelete(false);
  };

  const onRowClick = () => {
    // clicking will show delete button on desktop only
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (mediaQuery.matches) {
      setShowRowDelete(!showRowDelete);
    }
  };

  //conditionals to be used in showing/hiding buttons below
  const prevRowShouldHaveDelete = (rowsIndex) =>
    rowsIndex === currentIndex.current - 1 &&
    rowsRef.current.length &&
    possibleWordsRef.current.length > 1;
  const currentRowShouldHaveDelete = (rowsIndex) =>
    rowsIndex === currentIndex.current &&
    possibleWordsRef.current.length <= 1;

  const showEnterButton = () => rowIsComplete(rowsRef.current[currentIndex.current]) &&
  currentIndex.current < numTries - 1 &&
  possibleWordsRef.current.length > 1 &&
  !gameOver;

  return (
    <Container shiftLeft={showRowDelete}>
      <InputRows>
        {rows.map((row, rowsIndex) => {
          return (
            <RowContainer key={`row-${rowsIndex}`}>
              <Row
                id="input-rows"
                onTouchStart={
                  prevRowShouldHaveDelete(rowsIndex) ||
                  currentRowShouldHaveDelete(rowsIndex)
                    ? onTouchStart
                    : null
                }
                onTouchMove={
                  prevRowShouldHaveDelete(rowsIndex) ||
                  currentRowShouldHaveDelete(rowsIndex)
                    ? onTouchMove
                    : null
                }
                onClick={
                  prevRowShouldHaveDelete(rowsIndex) ||
                  currentRowShouldHaveDelete(rowsIndex)
                    ? onRowClick
                    : null
                }
              >
                {row.map((char, index) => {
                  return (
                    <Square
                      char={char}
                      key={`row-${rowsIndex}-square-${index}`}
                      callback={colorChangeCallback.bind(null, index)}
                      active={currentIndex.current === rowsIndex && !gameOver}
                      startColor={solved ? "green" : "gray"}
                      holdColor={currentIndex.current > rowsIndex}
                      refreshNum={refreshNum}
                    />
                  );
                })}
                {(currentRowShouldHaveDelete(rowsIndex) && showRowDelete) ||
                (prevRowShouldHaveDelete(rowsIndex) && showRowDelete)? (
                  <DeleteButton onClick={deletePreviousRow}>✕</DeleteButton>
                ) : null}
              </Row>
            </RowContainer>
          );
        })}
        <div>
          {possibleWords.length > 1 ? (
            <>
              <ResetButton onClick={chooseRandom}>RANDOM</ResetButton>
            </>
          ) : null}
          {showEnterButton() ? (
            <EnterButton onClick={handleEnter} key="enter-button">
              ENTER
            </EnterButton>
          ) : null}
          <ResetButton onClick={resetBoard}>RESET</ResetButton>
        </div>
      </InputRows>
      <KeyboardContainer>
        <Keyboard onKeyPress={onVirtualKeypress} />
      </KeyboardContainer>
      <WordsSection>
        <Title>
          {possibleWords.length === 1
            ? ""
            : `${possibleWords.length} POSSIBLE WORDS`}
        </Title>
        <WordsContainer
          id="words-container"
          numGuessRows={rowsRef.current.length}
        >
          {possibleWords.map((word, index) => {
            return (
              <WordButton key={index} data-word={word}>
                {word}
              </WordButton>
            );
          })}
        </WordsContainer>
      </WordsSection>
    </Container>
  );
};

export default Board;
