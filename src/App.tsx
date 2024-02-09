import { useEffect, useState } from 'react'
enum Choices {
  Rock = "Rock",
  Paper = "Paper",
  Scissors = "Scissors"
}
enum Winner {
  You = "You",
  Computer = "Computer",
  Tie = "Tie"
}

const choices: Choices[] = [Choices.Rock, Choices.Paper, Choices.Scissors];

const obj: { [key: string]: Choices } = { [Choices.Rock]: Choices.Paper, [Choices.Paper]: Choices.Scissors, [Choices.Scissors]: Choices.Rock };

function App() {
  const [userChoice, setUserChoice] = useState<Choices | ''>('');
  const [userChoiceCount, setUserChoiceCount] = useState<number>(0);
  const [computerChoice, setComputerChoice] = useState<Choices | ''>('');
  const [computerChoiceCount, setComputerChoiceCount] = useState<number>(0);
  const [winner, setWinner] = useState<Winner | ''>('');

  const makeChoice = (key: Choices) => {
    setUserChoice(key);
    makeComputerChoice();
  }

  const makeComputerChoice = () => {
    const rnd = Math.floor(Math.random() * 3);
    setComputerChoice(choices[rnd]);
  }

  const determineWinner = (userChoice: Choices, computerChoice: Choices): Winner => {
    if (obj[userChoice] === computerChoice) {
      setComputerChoiceCount(pre => pre + 1);
      return Winner.Computer;
    }
    if (obj[computerChoice] === userChoice) {
      setUserChoiceCount(pre => pre + 1);
      return Winner.You;
    }
    return Winner.Tie;
  }

  useEffect(() => {
    if (computerChoice && userChoice) {
      const result = determineWinner(userChoice, computerChoice);
      setWinner(result);
    }
  }, [computerChoice, userChoice]);

  const reset = () => {
    setUserChoice('');
    setComputerChoice('');
    setWinner('');
    setUserChoiceCount(0);
    setComputerChoiceCount(0);
  }
  return (
    <>
      <div className="container">
        <h1>Rock, Paper, Scissors</h1>
        <div className="score-board">
          <div className="player-score">Player: {userChoiceCount}</div>
          <div className="computer-score">Computer: {computerChoiceCount}</div>
        </div>
        <div className="choices">{
          choices.map((name, index) => (<button onClick={() => makeChoice(name)} className="choice" key={`${index}-${name}`}>{name}</button>))
        }
        </div>
        <div className="game-results">
          {userChoice && <p id="player-choice">You chose: {userChoice}</p>}
          {computerChoice && <p id="computer-choice">Computer chose: {computerChoice}</p>}
          {winner && <h2 id="result">Result: {winner}</h2>}
        </div>
        {
          winner && <button className="reset-button" onClick={reset} id="reset">Play Again</button>
        }
      </div>
    </>
  )
}

export default App
