// Lavet ved hjælp af Gemini AI

const keyboardContainer = document.getElementById('keyboard-container');

const specialKeys = {
    'ENTER': { class: 'key-wide', action: 'submit' },
    '⌫': { class: 'key-wide', action: 'delete' }
};

const keyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Å'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Æ', 'Ø'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
];

function initKeyboard() {
    console.log("Starter tastatur...");

    for (let i = 0; i < keyLayout.length; i++) {
        
        let currentRow = keyLayout[i];
        
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');

        currentRow.forEach(key => {
            
            const button = document.createElement('button');
            button.textContent = key;
            button.classList.add('key');

            if (specialKeys[key]) {

                button.classList.add(specialKeys[key].class);
            }

            button.addEventListener('click', function() {
                handleKeyPress(key);
            });

            rowDiv.appendChild(button);
        });

        keyboardContainer.appendChild(rowDiv);
    }
}

function handleKeyPress(selectedKey) {
    console.log("Du trykkede på: " + selectedKey);


    if (typeof updateGame === "function") {
        updateGame(selectedKey);
    } else {
        console.warn("Funktionen 'updateGame' findes ikke endnu. Vent på din gruppemakker!");
    }
}

initKeyboard();