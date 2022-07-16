// will need a few objs. 1st the board is a module that is made 1 time. 
// players will be made via simple factory
// board should be an array of area 9, best option for AI I think.
// logic for checking win might be difficult but I beleive in us lol.

// first, the board obj made as an IFFE
// IFFE syntax; const nameOfFn = (function(param) {function stuff}(param)); final parenthesis set and semicolon are required!

// this is an immediately invoked function. It is run as soon as it is accessed.
// makes the array and ties the individual squares to an index in the array

const gameBoard = (() => {
    let _board = new Array(9)  // board is an array of 9 spaces
    const fieldNodeList = document.querySelectorAll('.square');
    const boardNodes = () => {
        for (let i=0; i <= (fieldNodeList.length -1); i++) {   // iterate across the nodeList and make a new array to be manipulated
            _board[i] = fieldNodeList[i]                        // without breaking the nodelist
        }   return _board
    };
    
    /**
    * @param {int} fieldIndex - index of targeted square
    */
    const getFieldNode = (fieldIndex) => {return _board[fieldIndex]};   // get's the individual square by index when referenced.
    
    const xSignButton = document.getElementById('x')
    const oSignButton = document.getElementById('o')
    const aiButton = document.getElementById('ai')

    xSignButton.addEventListener('click', () => {
        xSignButton.className = 'active';
        oSignButton.className = 'inactive';
        const humanPlayer = Player('x');
        const aiPlayer = Player('o');
        console.log(humanPlayer, aiPlayer);
    })
    oSignButton.addEventListener('click', () => {
        oSignButton.className = 'active';
        xSignButton.className = 'inactive';
        const humanPlayer = Player('o');
        const aiPlayer = Player('x');
        console.log(humanPlayer, aiPlayer);
    })
    for (let i=0; i<= fieldNodeList.length - 1; i++) {
        fieldNodeList[i].addEventListener('click', () => {
            console.log(i)
            return i
            })
        }
    return {                   
        fieldNodeList,
        boardNodes,
        getFieldNode
    };
})();

const displayController = (() => {
    // updates the display with X or O based on which button is clicked and 
    // which player is playing.
})();

const gameController = (() => {
    // this object will keep track of field states, and check win states
    // function to track empty fields in an array
    const _boardNodes = gameBoard.boardNodes(); 
    let _emptyFields = _boardNodes;

    const clickedField = () => {
        if (_fields) {
            console.log(_fields)
        }
        //pass
    };
    const updateEmptyFields = () => {
        // take clicked field from displayControllers listeners
    };
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