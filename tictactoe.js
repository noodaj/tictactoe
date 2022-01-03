const player = (sign) => {
    this.sign = sign;

    let getSign = () => {
        return sign;
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

    return {changePos, getPos, clearBoard}
})()

const gameFunctions = (() => {
    let box = document.querySelectorAll('.box')
    let restart = document.getElementById('restart')
    
    restart.addEventListener('click', () => {
        board.clearBoard();
        gameOperations.reset();
        setMessage('X')
    })

    box.forEach(boxes => {
        boxes.addEventListener('click', (e) => {
            let index = e.currentTarget.getAttribute('data-index')
            let num = Number(index)
            if(gameOperations.getIsOver() || box[num].textContent != ''){
                return
            }
            gameOperations.playRound(num)
            showCurBoard();
        })
    })

    let showCurBoard = () => {
        if(restart.onclick = () => {
            for(let i = 0; i < 9; i++)
                box[i].textContent = ''
        })

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

    let setMessage = (sign) => {
        header.textContent = `Player ${sign}'s turn`
    }

    return {setMessage, setWinnerMessage}
})()


const gameOperations = (() => {
    let round = 1
    let p1 = player('X')
    let p2 = player('O')
    let gameOver = false

    let playRound = (index) => {
        gameFunctions.setMessage(getTurn())
        board.changePos(getTurn(), index)

        if(checkGameOver(index)){
            gameFunctions.setWinnerMessage(getTurn())
            gameOver = true
            return
        }

        if(round == 9){
            gameOver = true
            gameFunctions.setMessage('Draw')
            return
        }
        round++
    }   

    let getTurn = () => {
        return round % 2 ? p1.getSign() : p2.getSign();
    }

    let checkGameOver = (fieldIndex) => {
        
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        let res = winConditions
        .filter((combinations) => combinations
        .includes(fieldIndex))
        .some((combinations) => combinations
        .every((index) => board.getPos(index) === getTurn()))
        
        return res
    }

    let getIsOver = () => {
        return gameOver
    }

    let reset = () => {
        round = 1
        gameOver = false
    }

    return {playRound, reset, getIsOver}
})()
