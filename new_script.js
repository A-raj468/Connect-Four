/**@type {HTMLTableElement}*/
let board = document.getElementById('game');

const M = 6;
const N = 7;

let tiles = new Array(M);

let turn = 1;
let empty = N*M;

/**
 * @param {HTMLTableCellElement[][]} tiles
 * @param {number} x
 * @param {number} y
 */
checkWin = function(tiles, x, y){
    // row checking
    for(let i=0; i<4; i++){
        let total = 0;
        for(let j=0; j<4; j++){
            let r = x;
            let c = y+i-j;
            if((c<0 || c>=N) || (r<0 || r>=M)) break;
            total += tiles[r][c].occupied;
        }
        if(total == 4 || total == -4){
            console.log("Row win!");
            return tiles[x][y].occupied;
        }
    }

    // col checking
    for(let i=0; i<4; i++){
        let total = 0;
        for(let j=0; j<4; j++){
            let r = x+i-j;
            let c = y;
            if((c<0 || c>=N) || (r<0 || r>=M)) break;
            total += tiles[r][c].occupied;
        }
        if(total == 4 || total == -4){
            console.log("Col win!");
            return tiles[x][y].occupied;
        }
    }

    // primDiag checking
    for(let i=0; i<4; i++){
        let total = 0;
        for(let j=0; j<4; j++){
            let r = x+i-j;
            let c = y+i-j;
            if((c<0 || c>=N) || (r<0 || r>=M)) break;
            total += tiles[r][c].occupied;
        }
        if(total == 4 || total == -4){
            console.log("PriDiag win!");
            return tiles[x][y].occupied;
        }
    }
    
    // secDiag checking
    for(let i=0; i<4; i++){
        let total = 0;
        for(let j=0; j<4; j++){
            let r = x+i-j;
            let c = y-i+j;
            if((c<0 || c>=N) || (r<0 || r>=M)) break;
            total += tiles[r][c].occupied;
        }
        if(total == 4 || total == -4){
            console.log("SecDiag win!");
            return tiles[x][y].occupied;
        }
    }

    return 0;
}

/**
 * @param {HTMLTableElement} table
 * @param {HTMLTableCellElement[][]} tiles
 * @param {number} M
 * @param {number} N
 */
board_initialize = function(table, M, N, tiles){
    for(let i=0; i<M; i++){
        tiles[i] = new Array(N);
        let tr = table.insertRow();
        for(let j=0; j<N; j++){
            let td = tr.insertCell();
            let img = document.createElement('img');
            img.draggable = false;
            td.occupied = 0;
            td.appendChild(img);
            td.draw = function(){
                let image = this.querySelector('img');
                if(this.occupied == -1){
                    image.src = "Img/yellow.png";
                }
                else if(this.occupied == 0){
                    image.src = "Img/black.png";
                }
                else if(this.occupied == 1){
                    image.src = "Img/red.png";
                }
            }
            td.addEventListener('click', function(event){
                event.preventDefault();
                let col = this.cellIndex;
                for(let r=M; r>0; r--){
                    if(turn != 0){
                        let currtd = tiles[r-1][col];
                        if(currtd.occupied == 0){
                            currtd.occupied = turn;
                            currtd.draw();
                            turn = -turn;
                            let w = checkWin(tiles, r-1, col);
                            if(w != 0){
                                turn = 0;
                                let msz = "Player " + (w == 1? "1":"2") + " wins!";
                                console.log(msz);
                                document.querySelector('#msz').innerHTML = msz;
                                toggle_popup();
                            }
                            break;
                        }
                    }
                }
            });
            td.addEventListener('drag', function(event){event.preventDefault();});
            td.draw();
            tiles[i][j] = td;
        }
    }
}

toggle_popup = function(){
    document.getElementById('popup').classList.toggle('active');
}