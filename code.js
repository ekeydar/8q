// code.js
"use strict";
var SIDE = 0;
var CTX = null;
var SIZE = 8;

function init() {
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    SIDE = c.width / SIZE;
    CTX = ctx;
}

function restart() {
    console.log("restart");
    clear();
    var positions = [];
    for (var col = 0 ; col < SIZE ; col++) {
        positions[col] = -1
    }
    find_solution(positions,0);
    console.log("done");
}

function find_solution(positions, col,startFrom) {
    var startFrom = Math.floor(Math.random()*8)
    if (col == 0) {
        console.log(startFrom);
    }
    for (var i = 0 ; i < SIZE ; i++) {
        var row = (i + startFrom)%8;
        positions[col] = row;
        if (col < SIZE-1) {
             var res = find_solution(positions, col+1);
             if (res) {
                return res;
             }
        } else {
            if (isLegal(positions)) {
                drawQueens(positions);
                return true;
            } else {
                return false;
            }
        }
    }
}

function drawBoard() {
    var ctx = CTX;
    ctx.beginPath();
    for (var i = 0 ; i < SIZE ; i++) {
        ctx.moveTo(0, SIDE*i);
        ctx.lineTo(SIDE*SIZE, SIDE*i);
    }
    for (var i = 0 ; i < SIZE ; i++) {
        ctx.moveTo(SIDE*i, 0);
        ctx.lineTo(SIDE*i, SIDE*SIZE);
    }
    ctx.stroke()
    ctx.closePath();
}

function clear() {
    var x = SIDE*SIZE;
    var y = SIDE*SIZE;
    console.log("clear ",x,y);
    var ctx = CTX;
    ctx.clearRect(0, 0, x,y);
    drawBoard();
}

function drawQueens(positions) {
    var ctx = CTX;
    for (var col = 0 ; col < positions.length ; col++) {
        var row = positions[col];
        if (row >= 0) {
            drawCircle(ctx, col, row)
        }
    }
}

function drawCircle(ctx, col, row) {
    if (col >= SIZE || row >= SIZE) {
        alert("Illegal col/row " + col + '/' + row);
        return;
    }
    var x = col*SIDE + SIDE/2;
    var y = row*SIDE+SIDE/2;
    var r = SIDE/4;
    console.log(col, row,x,y,r);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2); 
    ctx.fill();
    ctx.closePath();
}

function isLegal(positions) {
    for (var col1 = 0 ; col1 < positions.length ; col1++) {
        for (var col2 = col1+1 ; col2 < positions.length ; col2++) {
            var row1 = positions[col1];
            var row2 = positions[col2];
            if (row1 == row2) {
                return false;
            }
            if (row1-col1 == row2-col2) {
                return false;
            }
            if (row1+col1==row2+col2) {
                return false;
            }
        }
    }
    return true;
}


