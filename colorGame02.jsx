// Squares are the Children of Board Component
// Squares track their mark = ('X' or 'O') and color
const Square = ({ id, newState }) => {
  const [color, setColor] = React.useState("green");
  const [mark, setMark] = React.useState("-"); // track who marked this square
  const XorO = ["O", "X"];

  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
  // useEffect is not needed by used to track "render" and "unmount"
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });
  // all the work is done in the onClick of Button
  return (
    <button
      onClick={e => {
        let presentPlayer = status;
        let col = getRandomColor();
        setColor(col);
        let thePlayer = newState(id);
        setMark(thePlayer); //
        e.target.style.background = col;
      }}
    >
      <h1>{XorO[mark]}</h1>
    </button>
  );
};
// The Board is the Parent and Squares are its Children
// The Board keeps track of the "state" of the game
// Player X starts the game
const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  // set state here
  var status = `Next player is ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins `;

  // newState is called by Square when player clicks on
  // Square passes its id up to Board (its parent)
  // Board passes back to Child the player who clicked
  const newState = idOfSquare => {
    let presentPlayer = player; // get from useState
    state[idOfSquare] = presentPlayer; // commit the move
    setState(state);
    let nextplayer = (player + 1) % 2; // set next player
    setPlayer(nextplayer); // update useState
    return presentPlayer; // return to Square presentPlayer
  };

  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <button>Show/Hide Row</button>
        <button>Re-render</button>
        <h1> {status} </h1>
      </div>
    </div>
  );
};

// ========================================
ReactDOM.render(<Board />, document.getElementById("root"));
