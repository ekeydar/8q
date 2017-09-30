// code.js
"use strict";
var global = {
    side: 0,
    ctx: null,
    size: 8,
    maxSize: 10,
    setSize: function(s) {
        if (s < 1 || s > this.maxSize) {
            return;
        }
        this.size = s;
        this.recompute();
    },
    setWidth: function(w) {
        this.width = w;
        this.recompute();
    },
    recompute: function() {
        if (this.width && this.size) {
            this.side = this.width / this.size;
        }
    }
}

function resize(c) {
    global.setSize(global.size+c);
    restart();
}

function init() {
    var c = document.getElementById("board");
    var ctx = c.getContext("2d");
    global.setSize(8);
    global.setWidth(c.width);
    global.ctx = ctx;
    restart();
}

function restart() {
    var restartBtn = document.getElementById("restart");
    restartBtn.disabled = true;
    restartBtn.innerHTML = "מחפש...";
    document.getElementById("board").className += " wip";
    clear();
    document.getElementById("size").innerHTML = global.size;
    document.getElementById("button-plus").disabled = global.size >= global.maxSize;
    document.getElementById("button-minus").disabled = global.size <= 1;
    window.setTimeout(function() {
        restartImp();
    }, 100);
}

function restartImp() {
    //console.log(global.size);
    var positions = [];
    for (var col = 0 ; col < global.size ; col++) {
        positions[col] = -1
    }
    find_solution(positions,0);
    var restartBtn = document.getElementById("restart");
    restartBtn.disabled = false;
    restartBtn.innerHTML = "אחר";
    document.getElementById("board").className = "";
}

function find_solution(positions, col,startFrom) {
    var startFrom = Math.floor(Math.random()*global.size)
    // if (col == 0) {
    //     console.log(startFrom);
    // }
    if (col == global.size) {
        if (isLegal(positions)) {
            drawQueens(positions);
            return true;
        } 
        return false;
    }
    for (var i = 0 ; i < global.size ; i++) {
        var row = (i + startFrom)%global.size;
        positions[col] = row;
        var res = find_solution(positions, col+1);
        if (res) {
            return true;
        }
    }
}

function drawBoard() {
    var ctx = global.ctx;
    ctx.beginPath();
    for (var i = 0 ; i < global.size ; i++) {
        ctx.moveTo(0, global.side*i);
        ctx.lineTo(global.width, global.side*i);
    }
    for (var i = 0 ; i < global.size ; i++) {
        ctx.moveTo(global.side*i, 0);
        ctx.lineTo(global.side*i, global.width);
    }
    ctx.stroke()
    ctx.closePath();
}

function clear() {
    global.ctx.clearRect(0, 0, global.width, global.width);
    drawBoard();
}

function drawQueens(positions) {
    for (var col = 0 ; col < positions.length ; col++) {
        var row = positions[col];
        if (row >= 0) {
            drawCircle(col, row)
        }
    }
}

function drawCircle(col, row) {
    if (col >= global.size || row >= global.size) {
        alert("Illegal col/row " + col + '/' + row);
        return;
    }
    var x = col*global.side + global.side/2;
    var y = row*global.side + global.side/2;
    var r = global.side/4;
    //console.log(col, row,x,y,r);
    var ctx = global.ctx;
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


