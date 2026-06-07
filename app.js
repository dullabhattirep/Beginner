let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;   // ← Important: Track moves

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear them
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Show Winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! The Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Show Draw
const showDraw = () => {
    msg.innerText = `Game was a Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;        // Winner found
            }
        }
    }
    return false;   // No winner
};

// Reset Game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Main Game Logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        // Check if someone won
        let isWinner = checkWinner();

        // If no winner and 9 moves → Draw
        if (!isWinner && count === 9) {
            showDraw();
        }
    });
});

// Button listeners
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);