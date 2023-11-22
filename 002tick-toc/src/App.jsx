import "./App.css";
import PropTypes from "prop-types";
import { useState } from "react";

//Esta funcion square lo que es, es un "template", un componente predefinido el cual esta fabricado para recibir los props al momento
//de cuando se llama, y cuando se llama ejecuta las acciones con los props enviados, justo como una funcion normal que se manda
//a llamar. Un componente es una funcion cuyos parametros son llamados props y que retorna HTML.
function Square({ value, onSquareClick }) {
  Square.propTypes = {
    value: PropTypes.string.isRequired,
    onSquareClick: PropTypes.func.isRequired,
  };

  function handleClickConsole() {
    console.log("clicked!");
  }

  function handleClickWrapper() {
    //aqui estoy utilizando lo mismo de abajo para que no se repita el click al darle mas de una vez
    if (value) {
      return;
    } else {
      handleClickConsole();
    }
    onSquareClick();
  }

  return (
    <button className="square" onClick={handleClickWrapper}>
      {value}
    </button>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  Board.propTypes = {
    xIsNext: PropTypes.bool.isRequired,
    squares: PropTypes.array.isRequired,
    onPlay: PropTypes.func.isRequired,
  };

  function handleClick(i) {
    //Este if es una forma de detener un state, si el state se cumple solo return.
    if (squares[i] || calculateWinner(squares)) {
      //El ultimo pedacito con || se agrega para chekear si hay ganador o no
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[c];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  //Cada numero en el handleclick es una posicion del array squares
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);

  }

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = "Go to move #" + index;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
