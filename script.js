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
        }, {once: true})            // slick way to make the event only fire after the first click
    };

    const playRound = (fieldIndex, target, sign) => {
        if (gameisOver) {
            return;
        }
        gameBoard.setField(fieldIndex, sign)
        if (checkForWin(fieldIndex)) {
            displayController.updateFieldDisplay(target, sign);
            displayController.updateScoreDisplay(sign)
            gameisOver = true
            return;

        }
        if (round < 9) {
            displayController.updateFieldDisplay(target, sign);
            round ++

        } else if (round === 9) {
            displayController.updateFieldDisplay(target, sign);
            console.log('draw')
            gameisOver = true
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
        return emptyFields;
    };

/*     const aiRandomChoices = (emptyFields) => {
        const aiSign = 'o'
        console.log(emptyFields)
        const randomMove = emptyFields[Math.floor(Math.random() * emptyFields.length)];
        const target = gameBoard.getFieldNode[parseInt(randomMove)]
        gameBoard.setField(parseInt(randomMove), aiSign)
        displayController.updateFieldDisplay(target, aiSign)
    } */
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
    const scoreDisplayP = document.getElementById('score')

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
    const updateScoreDisplay = (winner) => {
        scoreDisplayP.textContent = `${winner} wins!`
    }
    return {
        updateFieldDisplay,
        updateScoreDisplay,
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