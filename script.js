/**@type {HTMLTableElement}*/
var table = document.getElementById('game');

const M = 6;
const N = 7;

var tiles = new Array(M);

var turn = 1;
var empty = N*M;

place_chip = function(col, turn){
    for(let i=5; i>=0; i--){
        if(tiles[i][col].occupied == 0){
            tiles[i][col].occupied = turn;
            tiles[i][col].draw();
            if(check_for_win(tiles[i][col])){
                setTimeout(function(){
                    var text = turn == 1? "Red": "Yellow";
                    alert(text + " won!");
                }, 0)
            }
            return true;
        }
    }
    return false;
}

check_for_win = function(td){
    var row = td.parentNode.rowIndex;
    var col = td.cellIndex;
    var count = 1;
    var occ = td.occupied;

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

for(let i=0; i<M; i++){
    tiles[i] = new Array(N);
    var tr = table.insertRow();
    for(let j=0; j<N; j++){
        var td = tr.insertCell();
        var img = document.createElement('img');
        td.occupied = 0;
        td.draw = function(){
            var image = this.getElementsByTagName('img')[0];
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
                if(place_chip(this.cellIndex, turn)){
                    turn = -turn;
                    empty--;
                }
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