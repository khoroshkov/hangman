import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Notification from "./components/Notification";
import PopupWindow from "./components/PopupWindow";
import { showNotification as show } from "./helpers/helpers";
import KeyBoard from "./components/KeyBoard";

const words = [
  "maxx",
  "detochka",
  "steckel",
  "atlanta",
  "odin",
  "sparky",
  "gizmo",
  "kyle",
  "jake",
  "preston",
  "photography",
  "kvitochka",
  "leshik",
  "toyota",
  "runningmaxx",
  "magicmaxx",
  "jakejake",
  "metallica",
  "blade",
  "lionking",
  "iseeyou",
  "tracy",
  "stake",
  "spiders",
  "usa",
  "ukraine",
  "smile",
  "coffe",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setshowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setshowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  const handleClick = (e) => {
    const letter = e.target.textContent.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters((currentLetters) => [...currentLetters, letter]);
      } else {
        show(setshowNotification);
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
      } else {
        show(setshowNotification);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="witch"></div>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <KeyBoard handleClick={handleClick} />
      </div>
      <PopupWindow
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
