// 1. Variabler og Typer
const secretWord = "CYKEL"; // String
const maxGuesses = 6;     // Number

// 6. Objekter
let gameState = {
    currentRow: 0,
    currentTile: 0,
    isGameOver: false,
    message: ""
};

// 3. Arrays
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

// 7. DOM & 8. Funktioner
function createBoard() {
    const gameBoard = document.getElementById('game-board');

    // 5. Kontrolstruktur (Loops)
    for (let r = 0; r < 6; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.style.display = "flex";
        rowDiv.style.justifyContent = "center";

        for (let c = 0; c < 5; c++) {
            const tile = document.createElement('div');
            tile.id = `row-${r}-tile-${c}`; 
            tile.classList.add('tile');
            // Basis styling
            tile.style.border = "2px solid #3a3a3c";
            tile.style.width = "60px";
            tile.style.height = "60px";
            tile.style.margin = "2px";
            tile.style.display = "flex";
            tile.style.justifyContent = "center";
            tile.style.alignItems = "center";
            tile.style.fontSize = "30px";
            tile.style.fontWeight = "bold";
            tile.style.textTransform = "uppercase";
            tile.style.color = "white";

            rowDiv.appendChild(tile);
        }
        gameBoard.appendChild(rowDiv);
    }
}

// 8. Funktioner - Modtager input fra tastaturet
function updateGame(key) {
    if (gameState.isGameOver) return;

    if (key === 'ENTER') {
        checkRow();
    } else if (key === '⌫') {
        deleteLetter();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    if (gameState.currentTile < 5 && gameState.currentRow < 6) {
        guessRows[gameState.currentRow][gameState.currentTile] = letter;
        
        const tileID = `row-${gameState.currentRow}-tile-${gameState.currentTile}`;
        const tileElement = document.getElementById(tileID);
        tileElement.textContent = letter;
        tileElement.style.borderColor = "#565758"; // Lille visuel effekt
        
        gameState.currentTile++;
    }
}

function deleteLetter() {
    if (gameState.currentTile > 0) {
        gameState.currentTile--;
        guessRows[gameState.currentRow][gameState.currentTile] = '';
        
        const tileID = `row-${gameState.currentRow}-tile-${gameState.currentTile}`;
        const tileElement = document.getElementById(tileID);
        tileElement.textContent = '';
        tileElement.style.borderColor = "#3a3a3c";
    }
}

function checkRow() {
    // 1. Tjek om rækken er fuld
    if (gameState.currentTile === 5) {
        const guess = guessRows[gameState.currentRow];
        const secretArray = secretWord.split('');
        const tileStatuses = Array(5).fill('absent'); // Start med at tro alt er forkert ('absent')

        // PASS 1: Find alle de GRØNNE brikker først
        for (let i = 0; i < 5; i++) {
            if (guess[i] === secretArray[i]) {
                tileStatuses[i] = 'correct'; // Grøn
                secretArray[i] = null; // Fjern bogstavet så det ikke tælles igen
            }
        }

        // PASS 2: Find de GULE brikker blandt de resterende
        for (let i = 0; i < 5; i++) {
            if (tileStatuses[i] === 'correct') continue;

            const letterIndex = secretArray.indexOf(guess[i]);
            if (letterIndex !== -1) {
                tileStatuses[i] = 'present'; // Gul
                secretArray[letterIndex] = null;
            }
        }

        // 2. Opdater DOM (Brættet) og Tastaturet
        // Her var din fejl før: Vi gør det nu inde i samme loop!
        for (let i = 0; i < 5; i++) {
            const tileID = `row-${gameState.currentRow}-tile-${i}`;
            const tile = document.getElementById(tileID);
            const letter = guess[i];
            const status = tileStatuses[i]; // 'correct', 'present' eller 'absent'

            // Farv BRÆTTET
            if (status === 'correct') {
                tile.style.backgroundColor = 'var(--primary-green)'; // Grøn
                tile.style.borderColor = 'var(--primary-green)';
            } else if (status === 'present') {
                tile.style.backgroundColor = 'var(--primary-yellow)'; // Gul
                tile.style.borderColor = 'var(--primary-yellow)';
            } else {
                tile.style.backgroundColor = 'var(--quinary-color)'; // Grå
                tile.style.borderColor = 'var(--quinary-color)';
            }

            // Farv TASTATURET (Kalder din funktion!)
            if (typeof updateKeyColor === "function") {
                updateKeyColor(letter, status);
            }
        }

        // 3. Tjek Win/Loss
        const guessString = guess.join('');
        
        // Vi venter lidt med at vise beskeden, så farverne når at opdatere
        setTimeout(() => {
            if (guessString === secretWord) {
                alert('Tillykke! Du vandt!');
                gameState.isGameOver = true;
            } else {
                if (gameState.currentRow >= 5) {
                    alert('Spillet slut! Ordet var: ' + secretWord);
                    gameState.isGameOver = true;
                } else {
                    gameState.currentRow++;
                    gameState.currentTile = 0;
                }
            }
        }, 100);

    } else {
        alert("Ikke nok bogstaver!");
    }
}

// 10. Events
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    
    // Regex der tillader A-Z samt Æ, Ø og Å
    const isLetter = /^[A-ZÆØÅ]$/.test(key);

    if (key === 'ENTER') {
        updateGame('ENTER');
    } else if (key === 'BACKSPACE') {
        updateGame('⌫');
    } else if (isLetter) {
        updateGame(key);
    }
});

// Start spillet
createBoard();