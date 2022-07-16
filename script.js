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
    const fieldNodeList = document.querySelectorAll('.square')
    const assignNodeToBoard = () => {
        for (let i=0; i <= (fieldNodeList.length -1); i++) {   // iterate across the nodeList and make a new array to be manipulated
            _board[i] = fieldNodeList[i]                        // without breaking the nodelist
        }   return _board
    }
    /**
    * @param {int} fieldIndex - index of targeted square
    */
    const getFieldNode = (fieldIndex) => {return _board[fieldIndex]}   // get's the individual square by index when referenced.
    return {                    // needs to return anything to be used outside of the fn
        fieldNodeList,
        assignNodeToBoard,
        getFieldNode
    }
})();

const gameController = (() => {
    // this object will initialize players, and check win states
})();

const displayController = (() => {
    // this object will add listeners to each button and update the display with X or O based on which button is clicked and 
    // which player is playing.
    const assignListeners = () => {
        const xSignButton = document.getElementById('x')
        const ySignButton = document.getElementById('y')
        const aiButton = document.getElementById('ai')

        xSignButton.addEventListener('click', () => {
            xSignButton.className = 'active'
            playerFactory('x')
        })
        ySignButton.addEventListener('click', () => {
            ySignButton.className = 'active'
            playerFactory('y')
        })
        for (let i=0; i<= gameBoard.fieldNodeList.length - 1; i++) {
            gameBoard.fieldNodeList[i].addEventListener('click', () => {
                console.log(`clicked ${i}`)
            })
        }
    }
    return {
        assignListeners
    }
})();

displayController.assignListeners()

/**
 * @param {string} currentSign - Players selected sign, X or O
 */
const Player = (currentSign) => {       
    let _sign = currentSign
    const selectedSign = () => _sign
    const changeSign = (_sign) => {
        if (_sign === 'x') {
            return _sign = 'y'
        } else if (_sign === 'y') {
            return _sign = 'x'
        }
    } 
    return {
        selectedSign,
        changeSign
    }
}
console.log(Player('x').changeSign('y'))
