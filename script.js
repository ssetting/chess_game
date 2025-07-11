let container = document.getElementById('bordContainer')
let clickPieceCol = null
let clickPieceRow = null
let arr = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];
let currentMatch = JSON.parse(JSON.stringify(arr))

function createChessboard() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement('div')
            if ((i + j) % 2 == 0) {
                cell.classList.add('white')
            }
            else {
                cell.classList.add('black')
            }
    
            let pieceCode = currentMatch[i][j];
            if (pieceCode !== '') {
                let img = document.createElement('img');
                img.src = `images/${pieceCode}.png`;
    
                img.classList.add('piece');
                cell.appendChild(img);
            }
            cell.dataset.row = i
            cell.dataset.col = j
            cell.addEventListener("click", handleClick)
            cell.classList.add('cell')
            container.appendChild(cell)
            clearHighlight()
        }
    }
}

createChessboard()


function handleClick(e) {
    let cellList = document.querySelectorAll('.cell');
    clickPieceCol = null
    clickPieceRow = null
    let cell = e.currentTarget;
    let row = parseInt(cell.dataset.row);
    let col = parseInt(cell.dataset.col);
    if (currentMatch[row][col] == '') {
        clickPieceCol = col
        clickPieceRow = row
        console.log(row,col);
        
    }
    if( cellList[row*8 + col].classList.contains('highlight')){
        movePiece(row, col, clickPieceRow, clickPieceCol)
        console.log('1362ergaed');
        
    }
    clearHighlight()

    

    if (currentMatch[row][col] === 'bp' || currentMatch[row][col] === 'wp') {
        showPawnMoves(row, col)
    } if (currentMatch[row][col] === 'bn' || currentMatch[row][col] === 'wn') {
        showKnightMoves(row, col)
    } if (currentMatch[row][col] === 'br' || currentMatch[row][col] === 'wr') {
        showRookMoves(row, col)
    } if (currentMatch[row][col] === 'bb' || currentMatch[row][col] === 'wb') {
        showBishopMoves(row, col)
    } if (currentMatch[row][col] === 'bq' || currentMatch[row][col] === 'wq') {
        showQueenMoves(row, col)
    } if (currentMatch[row][col] === 'bq' || currentMatch[row][col] === 'wq') {
        showKingMoves(row, col)
    }



} function isBound(row, col) {
    if (row >= 0 && col >= 0 && row <= 7 && col <= 7) {
        return true
    }
    return false
} function showPawnMoves(row, col) {
    let pieceType = currentMatch[row][col]
    let directionRow = (pieceType === 'bp') ? 1 : (pieceType === 'wp') ? -1 : undefined
    let startRow = (pieceType === 'bp') ? 1 : (pieceType === 'wp') ? 6 : undefined
    let nextRow = row + directionRow
    if (startRow === row) {
        highlightCell((pieceType === 'bp') ? row + 2 : (pieceType === 'wp') ? row - 2 : undefined, col)
    }
    highlightCell(nextRow, col)
} function showRookMoves(row, col) {
    for (let r = row - 1; r >= 0; r--) {
        if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        } else {
            break
        }
    }
    for (let r = row + 1; r < 8; r++) {
        if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        } else {
            break
        }
    }
    for (let c = col - 1; c >= 0; c--) {
        if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        } else {
            break
        }
    }
    for (let c = col + 1; c < 8; c++) {
        if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        } else {
            break
        }
    }
} function showKnightMoves(row, col) {
    ;
    let knightMoves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]]
    for (let i = 0; i < knightMoves.length; i++) {
        let newRow = row + knightMoves[i][0]
        let newCol = col + knightMoves[i][1]
        if (isBound(newRow, newCol) && currentMatch[newRow][newCol] === '') {
            highlightCell(newRow, newCol)
        }
    }
} function showBishopMoves(row, col) {
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    for (let i = 0; i < directions.length; i++) {
        let directionR = row + directions[i][0];
        let directionC = col + directions[i][1];

        while (isBound(directionR, directionC)) {
            if (currentMatch[directionR][directionC] == '') {
                highlightCell(directionR, directionC)
            } else {
                break
            }
            directionR += directions[i][0]
            directionC += directions[i][1]
        }
    }
} function showQueenMoves(row, col) {
    for (let r = row - 1; r >= 0; r--) {
        if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        } else { break }
    }
    for (let r = row + 1; r < 8; r++) {
        if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        } else { break }
    }
    for (let c = col - 1; c >= 0; c--) {
        if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        } else { break }
    }
    for (let c = col + 1; c < 8; c++) {
        if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        } else { break }
    }
    let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    for (let i = 0; i < directions.length; i++) {
        let directionR = row + directions[i][0];
        let directionC = col + directions[i][1];
        while (isBound(directionR, directionC)) {
            if (currentMatch[directionR][directionC] == '') {
                highlightCell(directionR, directionC)
            } else { break }
            directionR += directions[i][0]
            directionC += directions[i][1]
        }
    }
} function showKingMoves(row, col) {
        if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        }if (currentMatch[r][col] === '') {
            highlightCell(r, col);
        }if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        }if (currentMatch[row][c] === '') {
            highlightCell(row, c);
        }
}
function movePiece(row, col, clickPieceRow, clickPieceCol) {
    console.log(row,col)
    console.log(clickPieceRow, clickPieceCol,currentMatch[row][col])
    if (currentMatch[row][col] == ''){
            currentMatch[row][col] = currentMatch[clickPieceRow][clickPieceCol]
            currentMatch[clickPieceRow][clickPieceCol] = ''
            container.innerHTML = "";
            createChessboard()
            console.log(clickPieceRow , clickPieceCol,'43dfghytf')
    }
}function highlightCell(row, col) {
    let index = row * 8 + col
    let cells = document.querySelectorAll('.cell')
    if (cells[index]) {
        cells[index].classList.add('highlight')
    }
}function clearHighlight() {
    document.querySelectorAll('.cell.highlight').forEach(cell => {
        cell.classList.remove('highlight');
    });
}
