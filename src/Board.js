import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board 5 
 * - ncols: number of cols of board 5 
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard() 
    }
    this.createBoard = this.createBoard.bind(this);
    // this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    for(let y=0; y < this.props.nrows; y++) {
      let row = [];
      for( let x=0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row); 
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  flipCellsAround(coord) {
    console.log('flipping!')
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log(x, y)


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

   // TODO: flip this cell and the cells around it
    flipCell(y, x); // flip initial cell
    flipCell(y, x - 1); // flip left
    flipCell(y, x + 1); // flip right
    flipCell(y + 1, x); // flip above
    flipCell(y - 1, x); // flop below

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell))
    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */
  render() {

    return (
      this.state.hasWon ? 'YOU WON!' : 
      <div>
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Out</div>
        <table className='Board'>
        <tbody>
            {this.state.board.map((n, x) => (
              <tr key={x}>
              {n.map((v, y) => {
                const coord = `${x}-${y}`
                return (
                <Cell 
                    isLit={v} 
                    key={coord}
                    flipCellsAroundMe={() => this.flipCellsAround(coord)}
                  />)
              })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    )
  }
}


export default Board;
