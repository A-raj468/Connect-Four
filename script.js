/**@type {HTMLTableElement}*/
var table = document.getElementById('game');

const M = 6;
const N = 7;

var tiles = new Array(M);

var turn = 1;
var empty = N*M;

generate_moves = function(mode){
    switch(mode){
        // Random moves mode
        case 0:
            return Math.floor(Math.random()*7);
    }
}

minimax = function(board, turn){
    for(let i=0; i<7; i++){
        var td = null;
        for(let i=5; i>=0; i--){
            if(tiles[i][col].occupied == 0){
                td = tiles[i][col];
            }
        }
        if(td != null){
            win = check_for_win(td);
        }
    }
}

place_chip = function(col){
    for(let i=5; i>=0; i--){
        if(tiles[i][col].occupied == 0){
            tiles[i][col].occupied = turn;
            tiles[i][col].draw();
            if(check_for_win(tiles[i][col])){
                var text = turn == 1? "Red": "Yellow";
                document.getElementById('msz').innerText = text + " won!";
                toggle_popup();
            }
            turn = -turn;
            return tiles[i][col];
        }
    }
    return null;
}

check_for_win = function(td){
    var row = td.parentNode.rowIndex;
    var col = td.cellIndex;
    var count = 1;
    var occ = turn;

    for(let i=1; i<4; i++){
        if(col-i>=0 && tiles[row][col-i].occupied == occ) count++;
        else{
            break;
        }
    }
    if(count == 4){
        return true;
    }
    else{
        count = 1;
    }
    for(let i=1; i<4; i++){
        if(row+i<6 && col-i>=0 && tiles[row+i][col-i].occupied == occ) count++;
        else{
            break;
        }
    }
    if(count == 4){
        return true;
    }
    else{
        count = 1;
    }
    for(let i=1; i<4; i++){
        if(row+i<6 && tiles[row+i][col].occupied == occ) count++;
        else{
            break;
        }
    }
    if(count == 4){
        return true;
    }
    else{
        count = 1;
    }
    for(let i=1; i<4; i++){
        if(row+i<6 && col+i<7 && tiles[row+i][col+i].occupied == occ) count++;
        else{
            break;
        }
    }
    if(count == 4){
        return true;
    }
    else{
        count = 1;
    }
    for(let i=1; i<4; i++){
        if(col+i<7 && tiles[row][col+i].occupied == occ) count++;
        else{
            count = 1;
            break;
        }
    }
    if(count == 4){
        return true;
    }
    return false;
}

init_board = function(){
    for(let i=0; i<M; i++){
        tiles[i] = new Array(N);
        var tr = table.insertRow();
        for(let j=0; j<N; j++){
            var td = tr.insertCell();
            var img = document.createElement('img');
            td.occupied = 0;
            td.draw = function(){
                var image = this.querySelector('img');
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
            td.addEventListener('click', function(){
                if(empty > 0){
                    var cell = place_chip(this.cellIndex);
                    if(cell != null){
                        empty--;
                    }
                    setTimeout(function(){
                        var opp = place_chip(generate_moves(0));
                        while(opp == null){
                            opp = place_chip(generate_moves(0));
                        }
                        empty--;
                    }, 0);
                }
                else{
                    alert("Board is full! Please restart the game.")
                }
            });
            td.appendChild(img);
            td.draw();
            tiles[i][j] = td;
        }
    }
}

init_board();

toggle_popup = function(){
    document.getElementById('popup').classList.toggle('active');
}