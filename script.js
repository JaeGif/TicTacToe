// will need a few objs. 1st the board is a module that is made 1 time. 
// players will be made via simple factory
// board should be an array of area 9, best option for AI I think.
// logic for checking win might be difficult but I beleive in us lol.

// first, the board obj made as an IFFE
// IFFE syntax; const nameOfFn = (function(param) {function stuff}(param)); final parenthesis set and semicolon are required!

// this is an immediately invoked function. It is run as soon as it is accessed.
// makes the array and ties the individual squares to an index in the array

const gameBoard = (() => {
    let board = new Array(9).fill(null)  // board is an array of 9 spaces
    const fieldNodeList = document.querySelectorAll('.square');

    const setField = (indexID, sign) => {
        board[indexID] = sign
        gameController.updateEmptyFields()
        console.log(board)
    }
    
    /**
    * @param {int} fieldIndex - index of targeted square
    */
    const getFieldNode = (fieldIndex) => {return board[fieldIndex]};   // get's the individual square by index when referenced.
    
    const xSignButton = document.getElementById('x')
    const oSignButton = document.getElementById('o')
    const aiButton = document.getElementById('ai')

    xSignButton.addEventListener('click', () => {
        xSignButton.className = 'active';
        oSignButton.className = 'inactive';
        const humanPlayer = Player('x');
        const aiPlayer = Player('o');
        boardInitialized(humanPlayer);

        return {
            humanPlayer,
            aiPlayer
        };
    })
    oSignButton.addEventListener('click', () => {
        oSignButton.className = 'active';
        xSignButton.className = 'inactive';
        const humanPlayer = Player('o');
        const aiPlayer = Player('x');
        boardInitialized(humanPlayer);
        return {
            humanPlayer,
            aiPlayer
        };
    })
    const boardInitialized = (player) => {
        for (let i=0; i<= fieldNodeList.length - 1; i++) {
            fieldNodeList[i].addEventListener('click', (e) => {
                fieldNodeList[i].id = `${i}`;
                fieldNodeList[i].classList.add(`${player.playerSign()}`);
                setField(i, player.playerSign());
                displayController.updateFieldDisplay(e, player);
        
                })
            }
    }
    return {                   
        boardInitialized,
        board,
        fieldNodeList,
        getFieldNode,
    };
})();

const displayController = (() => {
    // updates the display with X or O based on which button is clicked and 
    // which player is playing.
    const updateFieldDisplay = (field, player) => {
        const _player = player
        const _currentSign = _player.playerSign()
        field.target.firstChild.textContent = `${_currentSign}`         // currently updates the fields. childNodes requires an index because                                                                         // it returns a list. firstChild works well here as there's only 1 node.
    }  
    return {
        updateFieldDisplay,
    }
})();

const gameController = (() => {
    // this object will keep track of field states, and check win states
    // function to track empty fields in an array

    const updateEmptyFields = () => {
        const emptyFields = []
        gameBoard.board.filter((element, index) => {
            if (element === null) {
                emptyFields.push(index)
            }
        })
        console.log(emptyFields)
    };
    return {
        updateEmptyFields,

    }
})();



/**
 * @param {string} currentSign - Players selected sign, X or O
 */
const Player = (currentSign) => {       // _sign is a private variable that is not returned, but it's value is occassionally returned
    let _sign = currentSign;
    const playerSign = () => {
        return _sign
    };
    const changeSign = (_sign) => {
        if (_sign === 'x') {
            return _sign = 'o'
        } else if (_sign === 'o') {
            return _sign = 'x'
        }
    };
    return {
        playerSign,
        changeSign
    };
};
const aiLogic = () => {
    const randomField = Math.floor(Math.random() * 9);      // selects random int from 0 to 8

}