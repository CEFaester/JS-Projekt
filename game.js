// 1. Variabler og Typer
const secretWord = "CYKEL"; // String
const maxGuesses = 6;     // Number

// 6. Objekter
// Vi samler spillets status i et objekt for at holde orden
let gameState = {
    currentRow: 0,
    currentTile: 0,
    isGameOver: false,
    message: ""
};

// 3. Arrays
// Et array af arrays (2D array) der holder styr på alle gættene
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

// 7. DOM & 8. Funktioner
// Denne funktion bygger selve spillepladen (HTML'en)
function createBoard() {
    const gameBoard = document.getElementById('game-board');

    // 5. Kontrolstruktur (Loops)
    // Ydre loop: Laver 6 rækker
    for (let r = 0; r < 6; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row'); // Til styling (husk css)
        rowDiv.style.display = "flex"; // Hurtig styling fix
        rowDiv.style.justifyContent = "center";

        // Indre loop: Laver 5 brikker pr. række
        for (let c = 0; c < 5; c++) {
            const tile = document.createElement('div');
            // Vi giver hver brik et unikt ID: "row-0-tile-0", "row-0-tile-1" osv.
            tile.id = `row-${r}-tile-${c}`; 
            tile.classList.add('tile'); // Klassen fra CSS
            tile.style.border = "2px solid var(--tertiary-color)"; // Hurtig styling fix
            tile.style.width = "60px";
            tile.style.height = "60px";
            tile.style.margin = "2px";
            tile.style.display = "flex";
            tile.style.justifyContent = "center";
            tile.style.alignItems = "center";
            tile.style.fontSize = "30px";
            tile.style.fontWeight = "bold";
            tile.style.textTransform = "uppercase";

            rowDiv.appendChild(tile);
        }
        gameBoard.appendChild(rowDiv);
    }
}

// 8. Funktioner
// Dette er hoved-funktionen, som DIT tastatur kalder!
function updateGame(key) {
    // 9. Variable Scope
    // Vi bruger gameState variablen som er defineret globalt (i toppen)
    if (gameState.isGameOver) return;

    // 4. Kontrolstruktur (If-else)
    if (key === 'ENTER') {
        checkRow();
    } else if (key === '⌫') {
        deleteLetter();
    } else {
        addLetter(key);
    }
}

function addLetter(letter) {
    // 2. Operatorer (&&, <)
    if (gameState.currentTile < 5 && gameState.currentRow < 6) {
        // Opdater data i vores array
        guessRows[gameState.currentRow][gameState.currentTile] = letter;
        
        // Opdater DOM (vis det på skærmen)
        const tileID = `row-${gameState.currentRow}-tile-${gameState.currentTile}`;
        const tileElement = document.getElementById(tileID);
        tileElement.textContent = letter;
        
        // Gør klar til næste brik
        gameState.currentTile++; // Operator (++)
    }
}

function deleteLetter() {
    if (gameState.currentTile > 0) {
        gameState.currentTile--;
        guessRows[gameState.currentRow][gameState.currentTile] = '';
        
        const tileID = `row-${gameState.currentRow}-tile-${gameState.currentTile}`;
        const tileElement = document.getElementById(tileID);
        tileElement.textContent = '';
    }
}

function checkRow() {
    // 1. Tjek om rækken er fuld
    if (gameState.currentTile === 5) {
        const guess = guessRows[gameState.currentRow]; // Dette er et array: ['L', 'Y', 'K', 'K', 'E']
        const secretArray = secretWord.split('');      // ['C', 'Y', 'K', 'E', 'L']
        const tileStatuses = Array(5).fill('gray');    // Vi starter med at antage alt er gråt

        // PASS 1: Find alle de GRØNNE brikker først
        for (let i = 0; i < 5; i++) {
            if (guess[i] === secretArray[i]) {
                tileStatuses[i] = 'green';
                secretArray[i] = null; // "Fjern" bogstavet så det ikke tælles igen
            }
        }

        // PASS 2: Find de GULE brikker blandt de resterende
        for (let i = 0; i < 5; i++) {
            if (tileStatuses[i] === 'green') continue; // Spring over hvis den allerede er grøn

            const letterIndex = secretArray.indexOf(guess[i]);
            if (letterIndex !== -1) {
                tileStatuses[i] = 'yellow';
                secretArray[letterIndex] = null; // "Fjern" brikken så den er brugt
            }
        }

        // 2. Opdater DOM/Farver baseret på vores tileStatuses array
        for (let i = 0; i < 5; i++) {
            const tileID = `row-${gameState.currentRow}-tile-${i}`;
            const tile = document.getElementById(tileID);
            const status = tileStatuses[i];

            if (status === 'green') {
                tile.style.backgroundColor = 'var(--primary-green)';
                tile.style.borderColor = 'var(--primary-green)';
            } else if (status === 'yellow') {
                tile.style.backgroundColor = 'var(--primary-yellow)';
                tile.style.borderColor = 'var(--primary-yellow)';
            } else {
                tile.style.backgroundColor = 'var(--quinary-color)';
                tile.style.borderColor = 'var(--quinary-color)';
            }
            tile.style.color = "white"; // Sikrer at bogstaverne kan læses på farven
        }

        // 3. Tjek Win/Loss (samme som før)
        const guessString = guess.join('');
        if (guessString === secretWord) {
            alert('Du vandt!');
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
    } else {
        alert("Ikke nok bogstaver!");
    }
}

// 10. Events
// Vi lytter efter tastaturtryk på computeren (så man ikke SKAL klikke på skærmen)
document.addEventListener('keydown', function(event) {
    const key = event.key.toUpperCase();
    
    // Tjek om det er et bogstav, Enter eller Backspace
    if (key === 'ENTER' || key === 'BACKSPACE' || (key.length === 1 && key >= 'A' && key <= 'Å')) {
        let gameKey = key;
        if (key === 'BACKSPACE') gameKey = '⌫'; // Oversæt til vores symbol
        updateGame(gameKey);
    }
});

// Start spillet ved at bygge brættet
createBoard();