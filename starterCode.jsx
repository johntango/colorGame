const Square = ({ id, newState }) => {
    const [color, setColor] = React.useState("green");
    const [status, setStatus] = React.useState(null);
    const xo = ["O", "X"];
  
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
          let col = getRandomColor(); // needed to use below
          setColor(col);
          let nextPlayer = newState({ id: id, color: col });
          setStatus(nextPlayer);
          e.target.style.background = col;
        }}
      >
        <h1>{xo[status]}</h1>
      </button>
    );
  };
  
  const Board = () => {
    const [player, setPlayer] = React.useState(0);
    const [state, setState] = React.useState([]);
    // set state here
    let status = `Player ${player}`;
  
    // define newState function
    const newState = ob => {
      let nextplayer = (player + 1) % 2;
      setPlayer(nextplayer);
      setState([...state, ob]);
      console.log(`adding state ${JSON.stringify(state)}`);
      status = `Player ${nextplayer}`;
      return nextplayer;
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
        <div id="info">
          <button>Show/Hide Row</button>
          <button>Re-render</button>
          <h1> Turn of player {player} </h1>
        </div>
      </div>
    );
  };
  // ========================================
  ReactDOM.render(<Board />, document.getElementById("root"));
  