import { useState } from 'react'
import data from './data'
import Card from './components/Card'

function App() {
  let tempArr = new Array(data.length);
  tempArr.fill(0);
  tempArr = randomize(tempArr);
  const [indices, setIndices] = useState(tempArr);
  const [index, setIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true)
  const [answerResponse, setAnswerResponse] = useState("");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [guessed, setGuessed] = useState(false);
  const [lastClickedRight, setLastClickedRight] = useState(false);

  function randomize(currIndices) {
    let trackIndices = new Set();
    let newIndices = currIndices.map(() => {
      let randomNum = -1;
      do {
        randomNum = Math.floor(Math.random() * data.length);
      }
      while (trackIndices.has(randomNum))
      trackIndices.add(randomNum);
      return randomNum;
    });
    return newIndices;
  }

  const handleNextButton = () => {
    setLastClickedRight(true);
    setIndex(index == indices.length - 1 ? 0 : index + 1);
    setShowQuestion(true);
    setGuessed(false);
    setAnswerResponse("");
  }

  const handlePrevButton = () => {
    setLastClickedRight(false);
    setIndex(index == 0 ? indices.length - 1 : index - 1);
    setShowQuestion(true);
    setGuessed(false);
    setAnswerResponse("");
  }

  const handleRandomizerButton = () => {
    setIndices(randomize(indices));
    setIndex(0);
    setShowQuestion(true);
    setGuessed(false);
    setAnswerResponse("");
  }
  console.log(indices);

  const handleMasteredButton = () => {
    tempArr = indices;
    tempArr[index] = -1;
    setIndices(tempArr);
    handleNextButton();
  }

  const handleClickQuestion = () => {
    setShowQuestion(!showQuestion);
  }

  const handleGuess = () => {
    if (!guessed && answerResponse !== "") {
      if (answerResponse.toLowerCase() === data[indices[index]].answer.toLowerCase()) {
        setStreak(streak + 1);
      } else {
        setLongestStreak(streak > longestStreak ? streak : longestStreak);
        setStreak(0);
      }
      setGuessed(true);
    }
  }

  if (indices[index] == -1) {
    if (lastClickedRight) {
      handleNextButton();
    } else {
      handlePrevButton();
    }
  }

  return (
    <div>
      <h1>The Ultimate Oceanographer</h1>
      <h4>How good of an oceanographer are you? Test your ocean knowledge here!</h4>
      <h6>Number of Cards: {indices.reduce((acc, num) => num != -1 ? acc + 1 : acc, 0)}</h6>
      <h6>Streak: {streak} Longest Streak: {longestStreak}</h6>
      <Card handleClick={handleClickQuestion} currState={showQuestion} {...data[indices[index]]} />
      <form>
        <h4 style={{display: "inline"}}>Guess the answer here: </h4>
        <input style={{borderColor: `${guessed ? (streak > 0 ? "blue" : "red") : "transparent"}`}}
          value={answerResponse}
          onChange={e => setAnswerResponse(e.target.value)}
        />
        <button type="button" onClick={handleGuess}>Submit Guess</button>
      </form>
      <button onClick={handlePrevButton}>←</button>
      <button onClick={handleNextButton}>→</button>
      <button onClick={handleRandomizerButton}>Randomize</button>
      <button onClick={handleMasteredButton}>Mastered Card</button>
    </div>
  )
}

export default App
