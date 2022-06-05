let matrix = []
let side = 12;
let grassArr = []
let grassEaterArr = []
let msakerArr = []
let amenakerArr = []
let bombArr = []
/*function generate(matLen, gr, grEat, msaker, amenaker) {
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < msaker; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < amenaker; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
}*/
function createMatrix(m, n) {
    for (let i = 0; i < m; i++) {
        matrix[i] = []
        for (let j = 0; j < n; j++) {
            matrix[i][j] = 0
        }
    }
}
createMatrix(40,40)

function addGrass(){
    let x = Math.floor(Math.random() * 40)
    let y = Math.floor(Math.random() * 40)
    if(matrix[y][x] == 0){
        matrix[y][x] = 1
        let gr = new Grass(x,y)
        grassArr.push(gr)
    }
    else{
        addGrass()
    }
}

function addGrassEater(){
    let x = Math.floor(Math.random() * 40)
    let y = Math.floor(Math.random() * 40)
    if(matrix[y][x] == 1){
        matrix[y][x] = 2
        let grEat = new GrassEater(x,y)
        grassEaterArr.push(grEat)
    }
    else{
        addGrassEater()
    }
}
function addMsaker(){
    let x = Math.floor(Math.random() * 40)
    let y = Math.floor(Math.random() * 40)
    if(matrix[y][x] == 2){
        matrix[y][x] = 3
        let gr = new Msaker(x, y)
        msakerArr.push(gr)
    }
    else{
        addMsaker()
    }
}
function addAmenaker(){
    let x = Math.floor(Math.random() * 40)
    let y = Math.floor(Math.random() * 40)
    if(matrix[y][x] == 1){
        matrix[y][x] = 4
        let gr = new Amenaker(x,y)
        amenakerArr.push(gr)
    }
    else if(matrix[y][x] == 2){
        matrix[y][x] = 4
        let gr = new Amenaker(x,y)
        amenakerArr.push(gr)
    }
    else if(matrix[y][x] == 3){
        matrix[y][x] = 4
        let gr = new Amenaker(x,y)
        amenakerArr.push(gr)
    }
    else{
        addAmenaker()
    }
}
function addBomb(){
    let x = Math.floor(Math.random() * 40)
    let y = Math.floor(Math.random() * 40)
    if(matrix[y][x] == 1){
        matrix[y][x] = 5
        let gr = new Bomb(x, y)
        bombArr.push(gr)
    }
    else if(matrix[y][x] == 2){
        matrix[y][x] = 5
        let gr = new Bomb(x, y)
        bombArr.push(gr)
    }
    else if(matrix[y][x] == 3){
        matrix[y][x] = 5
        let gr = new Bomb(x, y)
        bombArr.push(gr)
    }
    else if(matrix[y][x] == 4){
        matrix[y][x] = 5
        let gr = new Bomb(x, y)
        bombArr.push(gr)
    }
}
//generate(55, 400, 85, 20, 7)

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                let gr = new Msaker(x, y)
                msakerArr.push(gr)
            }
            else if (matrix[y][x] == 4) {
                let gr = new Amenaker(x, y)
                amenakerArr.push(gr)
            }
            else if (matrix[y][x] == 5){
                let gr = new Bomb(x,y)
                bombArr.push(gr)
            }
        }
    }
}
function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("blue")
            }
            else if (matrix[y][x] == 5){
                fill("black")
            }
            rect(x * side, y * side, side, side);
        }
    }
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in msakerArr) {
        msakerArr[i].eat()
    }
    for (let i in amenakerArr) {
        amenakerArr[i].eat()
    }
    for(let i in bombArr){
        bombArr[i].boom()
    }
} 