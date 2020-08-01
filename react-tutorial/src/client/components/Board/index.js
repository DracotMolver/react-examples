import React, { useState } from 'react';
// components
import Square from './../Square';
// others
import { calculateWinner } from './../../utils';

const Board = () => {
  const [state, setState] = useState(() => ({
    squares: [null, null, null, null, null, null, null, null, null],
    xIsNext: true
  }));


  function handleClickChangeSquareState(event) {
    event.persist();

    const { position } = event.currentTarget.dataset;
    const squares = state.squares.slice();

    if (!calculateWinner(squares) || !squares[position]) {
      squares[position] = state.xIsNext ? 'X' : 'O'
      setState({
        squares: squares,
        xIsNext: !state.xIsNext
      });
    }

  }

  const winner = calculateWinner(state.squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${state.xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={state.squares[0]}
          onClick={handleClickChangeSquareState}
          dataSet="0"
        />
        <Square
          value={state.squares[1]}
          onClick={handleClickChangeSquareState}
          dataSet="1"
        />
        <Square
          value={state.squares[2]}
          onClick={handleClickChangeSquareState}
          dataSet="2"
        />
      </div>
      <div className="board-row">
        <Square
          value={state.squares[3]}
          onClick={handleClickChangeSquareState}
          dataSet="3"
        />
        <Square
          value={state.squares[4]}
          onClick={handleClickChangeSquareState}
          dataSet="4"
        />
        <Square
          value={state.squares[5]}
          onClick={handleClickChangeSquareState}
          dataSet="5"
        />
      </div>
      <div className="board-row">
        <Square
          value={state.squares[6]}
          onClick={handleClickChangeSquareState}
          dataSet="6"
        />
        <Square
          value={state.squares[7]}
          onClick={handleClickChangeSquareState}
          dataSet="7"
        />
        <Square
          value={state.squares[8]}
          onClick={handleClickChangeSquareState}
          dataSet="8"
        />
      </div>
    </div>
  )
};

export default Board;
