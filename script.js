const tileDisplay = document.querySelector('#game-board');
const keyboard = document.querySelector('#keyboard-container');

// Det ord man skal gætte (du kan ændre det her, eller lave en liste)
const wordle = 'NUMSE'; 

const keys = [
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å',
    'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Æ', 'Ø',
    'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'
];

// Opsætning af spillet
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// 1. Byg brættet
guessRows.forEach((guessRow, guessRowIndex) => {
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div');
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex);
        tileElement.classList.add('tile');
        tileDisplay.append(tileElement);
    });
});

// 2. Byg tastaturet
// (For simpelhedens skyld laver vi bare en liste af knapper her, opdelt lidt groft)
const row1 = keys.slice(0, 11);
const row2 = keys.slice(11, 22);
const row3 = keys.slice(22);

[row1, row2, row3].forEach(rowKeys => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('keyboard-row');
    
    rowKeys.forEach(key => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', key);
        buttonElement.classList.add('key');
        if (key === 'ENTER' || key === '⌫') {
            buttonElement.classList.add('key-wide');
        }
        buttonElement.addEventListener('click', () => handleClick(key));
        rowElement.append(buttonElement);
    });
    keyboard.append(rowElement);
});

// 3. Håndter klik
const handleClick = (key) => {
    if (isGameOver) return;

    if (key === '⌫') {
        deleteLetter();
        return;
    }
    if (key === 'ENTER') {
        checkRow();
        return;
    }
    addLetter(key);
};

// Tilføj bogstav
const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = letter;
        guessRows[currentRow][currentTile] = letter;
        tile.setAttribute('data', letter);
        currentTile++;
    }
};

// Slet bogstav
const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
        guessRows[currentRow][currentTile] = '';
        tile.setAttribute('data', '');
    }
};

// Tjek om ordet er rigtigt
const checkRow = () => {
    const guess = guessRows[currentRow].join('');
    
    if (currentTile > 4) {
        flipTiles();
        if (wordle == guess) {
            showMessage('Tillykke! Du gættede ordet!');
            isGameOver = true;
            return;
        } else {
            if (currentRow >= 5) {
                isGameOver = true;
                showMessage('Spillet er slut. Ordet var: ' + wordle);
                return;
            }
            if (currentRow < 5) {
                currentRow++;
                currentTile = 0;
            }
        }
    }
};

const showMessage = (message) => {
    setTimeout(() => alert(message), 500);
};

// Farv brikkerne
const flipTiles = () => {
    const rowTiles = document.querySelector('#game-board').childNodes;
    const guess = guessRows[currentRow];
    
    guess.forEach((guessLetter, index) => {
        const tileID = 'guessRow-' + currentRow + '-tile-' + index;
        const tile = document.getElementById(tileID);
        const letterColor = getFlipColor(guessLetter, index);
        
        setTimeout(() => {
            tile.classList.add(letterColor);
        }, 500 * index);
    });
};

const getFlipColor = (letter, index) => {
    if (letter === wordle[index]) {
        return 'correct'; // Grøn
    }
    if (wordle.includes(letter)) {
        return 'present'; // Gul
    }
    return 'absent'; // Grå
};