import React, { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {

  const [chosenLevel, setChosenLevel] = useState('2')
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)

  const getRandomWords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/results',
      params: { level: chosenLevel, area: 'sat' },
      
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      setWords(response.data)
    }).catch((error) => {
      console.error(error);
    })

  }

  console.log(words);

  useEffect(() => {
    if (chosenLevel) getRandomWords()
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    console.log(optionIndex, correctAnswer)
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    } else {
      setScore((score) => score - 1)
    }
    setClicked([...clicked, option])
  }

  console.log('Correct Answers: ', correctAnswers)
  console.log('clicked: ', clicked)

  return (
    <div className="App">

      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select you level to start</p>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>select a level</option>
          <option value="1"> level 1</option>
          <option value="2"> level 2</option>
          <option value="3"> level 3</option>
          <option value="4"> level 4</option>
          <option value="5"> level 5</option>
          <option value="6"> level 6</option>
        </select>
      </div>}

      {chosenLevel && words && <div className="question-area">
        <h1>Welcome To Level: {chosenLevel}</h1>
        <h3>Your score is: {score}</h3>

        <div className="questions">
          {words.quizlist.map((question, _questionIndex) => (
            <div key={_questionIndex} className="question-box">

              {question.quiz.map((tip, _index) => (
                <p key={_index}>{tip}</p>
              ))}

              <div className={"questions-buttons"}>
                {question.option.map((option, optionIndex) => (
                  <div key={optionIndex} className="question-button">
                    <button
                      disabled={clicked.includes(option)}
                      onClick={() => checkAnswer(option, optionIndex + 1, question.correct)}>
                      {option}</button>
                    {correctAnswers.includes(option) && <p>correct!</p>}
                  </div>
                ))}

              </div>

            </div>))}

        </div>

        <button onClick={() => setChosenLevel(null)} > Go Back</button>
      </div>}

    </div>
  );
}

export default App;
