import { useState } from 'react'
import data from './data'
import Card from './components/Card'

function App() {
  const [index, setIndex] = useState(1);
  const [showQuestion, setShowQuestion] = useState(true)

  const filteredCard = data.filter(card => card.id == index);

  const handleClickButton = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * 10 + 1)
    }
    while(newIndex == index);
    setIndex(newIndex);
    setShowQuestion(true);
  }

  const handleClickQuestion = () => {
    setShowQuestion(!showQuestion);
  }

  return (
    <div>
      <h1>The Ultimate Oceanographer</h1>
      <h4>How good of an oceanographer are you? Test your ocean knowledge here!</h4>
      <h6>Number of Cards: {data.length}</h6>
      <Card handleClick={handleClickQuestion} currState={showQuestion} {...filteredCard[0]} />
      <button onClick={handleClickButton}>→</button>
    </div>
  )
}

export default App
