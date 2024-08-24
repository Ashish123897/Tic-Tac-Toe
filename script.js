const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status');
const restartBtn = document.querySelector('#restart');
let currentPlayer = 'O';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
const handleCellClick = (event) => 
{
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    if (boardState[clickedCellIndex] !== '' || !gameActive) 
    {
        return;
    }
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
};
const checkResult = () => 
{
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) 
    {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') 
        {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) 
        {
            roundWon = true;
            break;
        }
    }
    if (roundWon) 
    {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (!boardState.includes('')) 
    {
        statusText.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};
const restartGame = () => 
{
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
};
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
