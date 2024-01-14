import React, { useState } from 'react'
import "./App.css"
import Board from "./components/Board";

function App() {
  const [history, setHistory] = useState([{squares:Array(9).fill(null)}])
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);  //init state 0 부터 시작하니까 숫자

  const calculateWinner = (squares) => {
    //이기는 경우의 수
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let index = 0; index < lines.length; index++) {
        const [a,b,c] = lines[index];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]; //O가 라인을 만들면 O를 리턴, X가 만들었으면 X를 리턴
        }
    }
    return null;
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;
    
  if(winner){
      status = 'Winner : '+winner;
  }else{
      status = `Next player ${xIsNext ? 'X' : 'O'}`; //`를 써야 javascript 문법 쓸수있음
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0,stepNumber+1);
    const newCurrent = newHistory[newHistory.length-1];
    const newSquares = newCurrent.squares.slice(); //slice는 원본을 지키고 복사본을 만들어서 수정 -> 불변성을 지켜줌

    if(calculateWinner(newSquares) || newSquares[i]){ // 위너가 있거나 이미 클릭을 했거나
        return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares:newSquares}]); //전개연산자도 원본을 지키고 복사본을 만들어서 넣어줌
    setXIsNext(current => !current); //setXIsNext(!xIsNext); 보다는 이 문법이 더 정확

    setStepNumber(newHistory.length);
}

const moves = history.map((step, move) => {
  const desc = move? 'Go to move #' + move : 'Go to game start';
  return (
    <li key={move}>
      <button className='move-button' onClick={() => jumpTo(move)}>{desc}</button>
    </li>
  )
})

const jumpTo = (step) => {
  setStepNumber(step);
  setXIsNext((step % 2 ) === 0);
  
}

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)} //부모(APP)에서 자식(board)으로 내려줘야함
        />
      </div>
      <div className="game-info">
        <div className='status'>{status}</div>
        <ol>{moves}</ol>
      </div>      
    </div>
  );
}

export default App;