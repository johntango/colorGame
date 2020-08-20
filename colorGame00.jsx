const Square = ({ id, player, newState }) => {
  const [color, setColor] = React.useState([]);
  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];
  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });
  // keep track of state of the Square
  return (
    <button
      onClick={e => {
        let col = getRandomColor();
        setColor(col);
        newState({ id: id, color: col });
        e.target.style.background = col;
      }}
    >
      <h1>{id}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [random, setRandom] = React.useState(0);
  const [state, setState] = React.useState([]);
  let status = `Player ${player}`;
  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandom(Math.random());

  const newState = newState => {
    setState([...state, newState]);
    console.log(`Update state ${JSON.stringify(newState)}`);
  };

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button onClick={reRender}>Re-render</button>
        <h1> Turn of player {player} </h1>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Board />, document.getElementById("root"));
