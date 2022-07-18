const gameBoard = (() => {
    let board = new Array(9).fill(null)  // board is an array of 9 spaces
    const fieldNodeList = document.querySelectorAll('.square');

    const setField = (indexID, sign) => {
        board[indexID] = sign
        gameController.updateEmptyFields()
   }
    const getFieldNode = (fieldIndex) => {return board[fieldIndex]};  
    
    const xSignButton = document.getElementById('x')
    const oSignButton = document.getElementById('o')
    const aiButton = document.getElementById('ai')

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

    const boardInitialized = (takeTurns) => {
        for (let i=0; i<= fieldNodeList.length - 1; i++) {
            fieldNodeList[i].addEventListener('click', (e) => {
                fieldNodeList[i].id = `${i}`;
                playRound(i, e, takeTurns());
            })
        }
    };


    return {                   
        boardInitialized,
        board,
        fieldNodeList,
        getFieldNode,
        setField,
    };
})();

const gameController = (() => {

    let round = 1;
    const playRound = (fieldIndex, target, sign) => {
        gameBoard.setField(fieldIndex, target, sign)
        round ++
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
            return 'o';
        } else {
            return 'x';
        }
    }
    return {
        updateEmptyFields,
        takeTurns,
        playRound
    }
})();





const displayController = (() => {
    const updateFieldDisplay = (field, player) => {
        const _player = player
        const _currentSign = _player.playerSign()
        field.target.firstChild.textContent = `${_currentSign}`         // currently updates the fields. childNodes requires an index because                                                                         // it returns a list. firstChild works well here as there's only 1 node.
    }
    
    return {
        updateFieldDisplay,
    }
})();





 const Player = (currentSign) => {
    let _sign = currentSign;
    const playerSign = () => {
        return _sign
    };
    return {
        playerSign,
    };
};