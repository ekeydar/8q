// code.js
"use strict";
var SIDE = 0;
var CTX = null;
var SIZE = 8;

function start() {
    console.log("starting...");
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    SIDE = c.width / SIZE;
    CTX = ctx;
    var positions = [];
    for (var col = 0 ; col < SIZE ; col++) {
        positions[col] = -1
    }
    find_solution(positions,0);
    console.log("done");
}

function find_solution(positions, col) {
    for (var row = 0 ; row < SIZE ; row++) {
        positions[col] = row;
        if (col < SIZE-1) {
             var res = find_solution(positions, col+1);
             if (res) {
                return res;
             }
        } else {
            if (isLegal(positions)) {
                refresh(positions);
                return true;
            } else {
                return false;
            }
        }
    }
}

function drawBoard() {
    var ctx = CTX;
    for (var i = 0 ; i < SIZE ; i++) {
        ctx.moveTo(0, SIDE*i);
        ctx.lineTo(SIDE*SIZE, SIDE*i);
        ctx.stroke();
    }
    for (var i = 0 ; i < SIZE ; i++) {
        ctx.moveTo(SIDE*i, 0);
        ctx.lineTo(SIDE*i, SIDE*SIZE);
        ctx.stroke();
    }
}

function refresh(positions) {
    var ctx = CTX;
    ctx.clearRect(0, 0, SIDE*SIZE, SIDE*SIZE);
    drawBoard(ctx);
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
    ctx.beginPath();
    ctx.arc(col*SIDE + SIDE/2, row*SIDE+SIDE/2, SIDE/3, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();
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

