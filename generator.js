// create grid
// get list of words
// get random letters
// pick random word transformation to perform on the strings
// -- nothing, reverse, diagonal, diagonal reverse, down, down reverse, up, up reverse
// break words by letters
// insert letters into grid
// check every index of the grid and find 0s
// if there is a blank string, replace it with a random letter

function createGrid(x, y) {
    let gridArray = []
    // create array of length x
    for (var n = 0; n < x; n++) {
        // create array of length y inside array x
        gridArray[n] = []
        for (var m = 0; m < y; m++) {
            gridArray[n][m] = ''
        }
    }
    return gridArray
}

function stringToArray(string) {
    // build array from a string, seperating each index by letters
    let counter = 0
    let array = []
    while (counter < string.length) {
        array.push(string[counter])
        counter++
    }
    return array
}

function stringArrayToUpperCase(lowerCaseArray) {
    // convert every word in an array to uppercase
    for (let i = 0; i < lowerCaseArray.length; i++) {
        lowerCaseArray[i] = lowerCaseArray[i].toUpperCase()
    }
    // return array sorted by length
    return lowerCaseArray.sort((a, b) => a.length - b.length);
}

function getRandomLetter() {
    // convert string of uppercase alphabet
    let letters = stringToArray("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
    // pick random letter via getRandomWord function
    return letters[~~(Math.random() * letters.length)]
}

function checkDimensionsAgainstWords(wordList, dimensions = { x, y }) {
    const numberOfCells = dimensions.x * dimensions.y
    const wordLengths = wordList.map(word => word.length)
    const longestWord = Math.max(...wordLengths)

    // Check if any word is longer than the grid length or height
    if (longestWord > Math.max(dimensions.x, dimensions.y)) {
        console.warn("One of the words in the list is too long. Please make the grid bigger or choose a different word.")
        return false
    }

    // Check if the grid is big enough for all the words
    const totalWordLength = wordLengths.reduce((acc, length) => acc + length, 0)
    if (totalWordLength > numberOfCells) {
        console.warn("The number of words has to be less, or your grid must be bigger")
        return false
    }

    return true
}

function getRandomDirection() {
    const directions = [
        [0, 1], // right
        [0, -1], // left
        [1, 0], // down
        [-1, 0], // up
        [1, 1], // diagonal down-right
        [-1, 1], // diagonal up-right
        [1, -1], // diagonal down left
        [-1, -1] // diagonal up left
    ];
    return directions[Math.floor(Math.random() * directions.length)];
}

function canPlaceWord(word, row, col, direction, matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const len = word.length;
    const endRow = row + direction[0] * (len - 1);
    const endCol = col + direction[1] * (len - 1);

    if (endRow < 0 || endRow >= rows || endCol < 0 || endCol >= cols) {
        return false;
    }

    for (let i = 0; i < len; i++) {
        const char = word[i];
        const newRow = row + direction[0] * i;
        const newCol = col + direction[1] * i;
        if (matrix[newRow][newCol] !== '' && matrix[newRow][newCol] !== char) {
            return false;
        }
    }
    return true;
}

function placeWordsInGrid(words, matrix, maxAttempts = 100) {
    for (const word of words) {
        let attempts = 0;
        let placed = false;

        while (!placed && attempts < maxAttempts) {
            attempts++;

            const direction = getRandomDirection();
            const startX = Math.floor(Math.random() * matrix.length);
            const startY = Math.floor(Math.random() * matrix[0].length);

            if (canPlaceWord(word, startX, startY, direction, matrix)) {
                placed = true;

                for (let i = 0; i < word.length; i++) {

                    const char = word[i];
                    const newRow = startX + direction[0] * i;
                    const newCol = startY + direction[1] * i;

                    matrix[newRow][newCol] = char;
                }
            }
        }

        if (!placed) {
            console.warn(`Could not place word "${word}" in the grid after ${maxAttempts} attempts.`);
        }
    }
    return matrix;
}

function fillRandomLetters(matrix) {
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            matrix[x][y] = matrix[x][y] == '' ? getRandomLetter() : matrix[x][y]
        }
    }
    return matrix
}

export class wordSearch {
    constructor(wordList, gridHeight, gridLength) {
        let grid = createGrid(gridHeight, gridLength)
        let words = stringArrayToUpperCase(wordList)
        let wordsFit = checkDimensionsAgainstWords(words, { x: grid.length, y: grid[0].length })

        if (wordsFit) {
            let wordsInGrid = placeWordsInGrid(words, grid)
            let finishedGrid = fillRandomLetters(wordsInGrid)
            return finishedGrid
        }
    }
}