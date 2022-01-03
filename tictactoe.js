const player = (sign) => {
    this.sign = sign;

    let getSign = () => {
        return this.sign;
    }

    return { getSign }
}

const board = (() => {
    const array = ['', '', '', '', '', '', '', '', '']

    let changePos = (sign, index) => {
        if (index > array.length) return
        array[index] = sign;
    }

    let getPos = (index) => {
        if (index > array.length) return
        return array[index]
    }

    let clearBoard = () => {
        for (let i = 0; i < array.length; i++) {
            array[i] = ''
        }
    }
    console.log(array)

    return {changePos, getPos, clearBoard}
})()

const gameFunctions = (() => {
    let box = document.querySelectorAll('.box')

    let restart = document.getElementById('restart').addEventListener('click', () => {
        board.clearBoard();
        gameFunctions.reset();
        setMessage()
    })

    box.forEach(boxes => {
        boxes.addEventListener('click', (e) => {
            let index = e.currentTarget.getAttribute('data-index')
            if(index.textContent !== '') return;
            index = Number(index)
            gameOperations.playRound(Number(index))
            showCurBoard();
        })
    })

    let showCurBoard = () => {
        for (let i = 0; i < 9; i++) {
            box[i].textContent = board.getPos(i);
        }
    }
    let header = document.querySelector('.curPlayer')

    let setWinnerMessage = (winner) => {
        if (winner == 'Draw') {
            header.textContent = "It's a tie!"
        }
        else header.textContent = `Player ${winner} has won!`
    }

    let setMessage = (player) => {
        header.textContent = `Player ${player.getSign()}'s turn`
    }
    return {setMessage, setWinnerMessage}
})()


const gameOperations = (() => {
    let round = 1
    let p1 = player('X')
    let p2 = player('O')
    let gameOver = false

    let playRound = (index) => {
        console.log(index)
        if(checkGameOver()){
            messageFunctions.setMessage()
        }
        let player = getTurn(round)
        board.changePos(player.getSign(), index)
        round++
    }

    let getTurn = (round) => {
        return round % 2 ? p1 : p2;
    }

    const winConditions = [
        [0, 1, 2],
        [4, 5, 6],
        [7, 8, 9],
        [0, 4, 7],
        [1, 5, 8],
        [2, 6, 9],
        [0, 5, 9],
        [2, 5, 7]
    ]

    let checkGameOver = () => {
        if(round == 9){
            gameOver = true
            messageFunctions.setMessage('Draw')
        }
        if(winConditions){
            
        }
    }

    let winner = (winner) => {
        if (winner) {
            messageFunctions.setMessage(winner)
        }
    }

    let reset = () => {
        round = 1
        gameOver = false
    }
    return {playRound, reset}
})()
