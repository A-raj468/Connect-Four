/**@type {HTMLTableElement}*/
var table = document.getElementById('game');

const M = 6;
const N = 7;

var tiles = new Array(M);

var turn = 1;
var empty = N*M;

/**
 * @param {HTMLTableElement} table
 * @param {HTMLTableCellElement[][]} tiles
 * @param {number} M
 * @param {number} N
 */
board_initialize = function(table, M, N, tiles){
    for(let i=0; i<M; i++){
        tiles[i] = new Array(N);
        var tr = table.insertRow();
        for(let j=0; j<N; j++){
            var td = tr.insertCell();
            var img = document.createElement('img');
            td.occupied = 0;
            td.appendChild(img);
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
            td.draw();
            tiles[i][j] = td;
        }
    }
}

board_initialize(table, M, N, tiles);