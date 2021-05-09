import "./style.css"
const CROSS = "X"
const CIRCLE = "O"

let turn = CROSS
let winner = false

// Rx.Observable.fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));

const handleClick = (boxId: string) => () => {
  const box = document.getElementById(boxId)
  if (!box) {
    return
  }
  if (!box.innerText && !winner) {
    box.innerText = turn
    turn = turn === CROSS ? CIRCLE : CROSS
    checkWinner()
  }
}

function renderBoard() {
  const app = document.getElementById("app")

  const button = document.createElement("button")
  button.onclick = resetBoard
  button.innerText = "Reset"
  app?.appendChild(button)

  const board = document.createElement("div")
  board.className = "board"
  app!.appendChild(board)

  for (let i = 1; i <= 9; i++) {
    const box = document.createElement("div")
    box.className = "box"
    box.id = "box" + i
    box.addEventListener("click", handleClick(box.id))
    board.appendChild(box)
  }
}

function resetBoard() {
  for (let i = 1; i <= 9; i++) {
    const box = document.getElementById("box" + i)
    box!.innerText = ""
    box!.className = "box"
    winner = false
  }
}

function checkWinner() {
  checkLine([1, 2, 3])
  checkLine([4, 5, 6])
  checkLine([7, 8, 9])
  checkLine([1, 4, 7])
  checkLine([2, 5, 8])
  checkLine([3, 6, 9])
  checkLine([1, 5, 9])
  checkLine([3, 5, 7])
}

function checkLine(boxes: number[]) {
  const b1 = document.getElementById("box" + boxes[0])
  const b2 = document.getElementById("box" + boxes[1])
  const b3 = document.getElementById("box" + boxes[2])
  if (
    b1!.innerText &&
    b2!.innerText &&
    b3!.innerText &&
    b1!.innerText === b2!.innerText &&
    b2!.innerText === b3!.innerText
  ) {
    b1!.className = b1!.className + " win"
    b2!.className = b2!.className + " win"
    b3!.className = b3!.className + " win"
    winner = true
    return true
  }
  return false
}

renderBoard()
