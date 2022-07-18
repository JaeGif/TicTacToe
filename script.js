const gameBoard = (() => {
    let board = new Array(9).fill(null)  // board is an array of 9 spaces

    const setField = (indexID, sign) => {
        board[indexID] = sign
        console.log(board)
   }
    const getFieldNode = (fieldIndex) => {return board[fieldIndex]};  

    return {
        setField,
        getFieldNode,
        board
    }
})();


const gameController = (() => {
    let gameisOver = false
    let round = 1;
    const fieldNodeList = document.querySelectorAll('.square');

    for (let i=0; i<= fieldNodeList.length - 1; i++) {
        fieldNodeList[i].addEventListener('click', (e) => {
            fieldNodeList[i].id = `${i}`;
            playRound(i, e, takeTurns());
            updateEmptyFields();
            console.log('passed')
        })
    };

    const playRound = (fieldIndex, target, sign) => {
        gameBoard.setField(fieldIndex, sign)

        if (checkForWin(fieldIndex)) {
            displayController.updateFieldDisplay(target, sign);
            console.log('GG')
            return;
        }
        if (round < 9) {
            displayController.updateFieldDisplay(target, sign);
            round ++
        } else if (round === 9) {
            displayController.updateFieldDisplay(target, sign);
            console.log('draw')
        }
    }
    
    const checkForWin = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
      
          return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
              possibleCombination.every(
                (index) => gameBoard.getFieldNode(index) === takeTurns()
              )
            );
    }

    const updateEmptyFields = () => {
        const emptyFields = []
        gameBoard.board.filter((element, index) => {
            if (element === null) {
                emptyFields.push(index)
            }
        })
        console.log(emptyFields)
    };

    const takeTurns = () => {
        if (round % 2 === 1) {
            return 'x';
        } else {
            return 'o';
        }
    }
    return {
        updateEmptyFields,
        takeTurns,
        playRound
    }
})();






const displayController = (() => {

    const xSignButton = document.getElementById('x')
    const oSignButton = document.getElementById('o')
    xSignButton.addEventListener('click', () => {
        xSignButton.className = 'active';
        oSignButton.className = 'inactive';
        const playerX = Player('x');
        const playerO = Player('o');
        return {
            playerX,
            playerO
        };
    });

    oSignButton.addEventListener('click', () => {
        oSignButton.className = 'active';
        xSignButton.className = 'inactive';
        const playerO = Player('o');
        const playerX = Player('x');
        return {
            playerX,
            playerO
        };
    });
    const updateFieldDisplay = (eventTarget, sign) => {
        eventTarget.target.firstChild.textContent = `${sign}`;
    }
    return {
        updateFieldDisplay,
    }
})();


const Player = (sign) => {
    const playerSign = () => {
        return sign
    };
    return {
        playerSign,
    };
};