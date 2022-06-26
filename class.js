class Grass {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiplay = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        this.multiplay++
        if (this.multiplay >= 0.5 && foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 1
            let gr1 = new Grass(x, y)
            grassArr.push(gr1)
            this.multiplay = 0
        }
    }
}
class GrassEater {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 7
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        this.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])

                }
            }
        }
        return found;
    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 2
            let gr1 = new GrassEater(x, y)
            grassEaterArr.push(gr1)
            this.energy = 7
        }
    }
    move() {
        this.energy--
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand && this.energy > 0) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
        else {
            this.die()
        }
    }
    eat() {
        let found = this.search(1)
        let foundRand = random(found)
        if (foundRand) {
            this.energy++
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 7.5) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
class Msaker {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 7
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        this.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        } return found;
    }
    eat() {
        let found = this.search(2)
        let foundRand = random(found)
        this.energy++
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            } if (this.energy >= 10) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 3
            let gr2 = new Msaker(x, y)
            msakerArr.push(gr2)
            this.energy = 7
        }
    }
    move() {
        this.energy -= 1.7
        let found = this.search(0)
        let foundRand = random(found)
        let found1 = this.search(1)
        let foundRand1 = random(found1)
        if (foundRand && this.energy > 0) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
        else if (foundRand1 && this.energy > 0) {
            let x = foundRand1[0]
            let y = foundRand1[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 1
            this.x = x
            this.y = y
        }
        else {
            this.die()
        }

    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in msakerArr) {
            if (this.x == msakerArr[i].x && this.y == msakerArr[i].y) {
                msakerArr.splice(i, 1)
            }
        }
    }
}
class Amenaker {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 1
        this.directions = []
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        this.getNewCoordinates()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }

        } return found;
    }
    eat() {
        let found = this.search(1)
        let foundRand = random(found)
        let found1 = this.search(2)
        let foundRand1 = random(found1)
        let found2 = this.search(3)
        let foundRand2 = random(found2)
        this.energy++
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            if (this.energy >= 25) {
                this.mul()
            }
        } else if (foundRand1) {
            let x = foundRand1[0]
            let y = foundRand1[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            for (let i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
            if (this.energy >= 25) {
                this.mul()
            }
        } else if (foundRand2) {
            let x = foundRand2[0]
            let y = foundRand2[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.y = y
            this.x = x
            for (let i in msakerArr) {
                if (x == msakerArr[i].x && y == msakerArr[i].y) {
                    msakerArr.splice(i, 1)
                    break;
                }
            }
            if (this.energy >= 25) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 4
            let gr2 = new Amenaker(x, y)
            amenakerArr.push(gr2)
            this.energy = 1
        }
    }
    move() {
        this.energy -= 1.7
        let found = this.search(0)
        let foundRand = random(found)
        if (this.energy > 0 && foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        }
        else {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in amenakerArr) {
            if (this.x == amenakerArr[i].x && this.y == amenakerArr[i].y) {
                amenakerArr.splice(i, 1)
                break;
            }
        }
    }
}
class Bomb {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    boom() {
        matrix[this.y][this.x] = 0
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            for (let j in grassArr) {
                if (x == grassArr[j].x && y == grassArr[j].y) {
                    let x = grassArr[j].x
                    let y = grassArr[j].y
                    matrix[y][x] = 0
                    grassArr.splice(j, 1)
                    break;
                }
            }
            for (let j in grassEaterArr) {
                if (x == grassEaterArr[j].x && y == grassEaterArr[j].y) {
                    let x = grassEaterArr[j].x
                    let y = grassEaterArr[j].y
                    matrix[y][x] = 0
                    grassEaterArr.splice(j, 1)
                    break;
                }
            }
            for (let j in msakerArr) {
                if (x == msakerArr[j].x && y == msakerArr[j].y) {
                    let x = msakerArr[j].x
                    let y = msakerArr[j].y
                    matrix[y][x] = 0
                    msakerArr.splice(j, 1)
                    break;
                }
            }
            for (let j in amenakerArr) {
                if (x == amenakerArr[j].x && y == amenakerArr[j].y) {
                    let x = amenakerArr[j].x
                    let y = amenakerArr[j].y
                    matrix[y][x] = 0
                    amenakerArr.splice(j, 1)
                    break;
                }
            }
        }
        }}class Shataker {
            constructor(x, y) {
                this.x = x
                this.y = y
                this.energy = 1
                this.directions = []
            }
            getNewCoordinates() {
                this.directions = [
                    [this.x - 1, this.y - 1],
                    [this.x, this.y - 1],
                    [this.x + 1, this.y - 1],
                    [this.x - 1, this.y],
                    [this.x + 1, this.y],
                    [this.x - 1, this.y + 1],
                    [this.x, this.y + 1],
                    [this.x + 1, this.y + 1]
                ];
            }
            search(char) {
                this.getNewCoordinates()
                let found = []
                for (let i in this.directions) {
                    let x = this.directions[i][0]
                    let y = this.directions[i][1]
                    if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                        if (matrix[y][x] == char) {
                            found.push(this.directions[i])
                        }
                    }
        
                } return found;
            }
            eat() {
                let found = this.search(1)
                let foundRand = random(found)
                let found1 = this.search(2)
                let foundRand1 = random(found1)
                let found2 = this.search(3)
                let foundRand2 = random(found2)
                let found3 = this.search(4)
                let foundRand3 = random(found3)
                let found4 = this.search(5)
                let foundRand4 = random(found4)
                this.energy++
                if (foundRand) {
                    let x = foundRand[0]
                    let y = foundRand[1]
                    matrix[y][x] = 6
                    matrix[this.y][this.x] = 0
                    this.x = x
                    this.y = y
                    for (let i in grassArr) {
                        if (x == grassArr[i].x && y == grassArr[i].y) {
                            grassArr.splice(i, 1)
                            break;
                        }
                    }
                    
                } else if (foundRand1) {
                    let x = foundRand1[0]
                    let y = foundRand1[1]
                    matrix[y][x] = 6
                    matrix[this.y][this.x] = 0
                    this.y = y
                    this.x = x
                    for (let i in grassEaterArr) {
                        if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1)
                            break;
                        }
                    }
                    
                } else if (foundRand2) {
                    let x = foundRand2[0]
                    let y = foundRand2[1]
                    matrix[y][x] = 6
                    matrix[this.y][this.x] = 0
                    this.y = y
                    this.x = x
                    for (let i in msakerArr) {
                        if (x == msakerArr[i].x && y == msakerArr[i].y) {
                            msakerArr.splice(i, 1)
                            break;
                        }
                    }
                }
                    
                    else if (foundRand3) {
                        let x = foundRand3[0]
                        let y = foundRand3[1]
                        matrix[y][x] = 6
                        matrix[this.y][this.x] = 0
                        this.y = y
                        this.x = x
                        for (let i in amenakerArr) {
                            if (x == amenakerArr[i].x && y == amenakerArr[i].y) {
                                amenakerArr.splice(i, 1)
                                break;
                            }
                        }
                    }
                        
                        else if (foundRand4) {
                            let x = foundRand4[0]
                            let y = foundRand4[1]
                            matrix[y][x] = 6
                            matrix[this.y][this.x] = 0
                            this.y = y
                            this.x = x
                            for (let i in bombArr) {
                                if (x == bombArr[i].x && y == bombArr[i].y) {
                                    bombArr.splice(i, 1)
                                    break;
                                }
                            }
                            
                } else {
                    this.move()
                }
            }
            
            
           move() {
                this.energy -= 1.7
                let found = this.search(0)
                let foundRand = random(found)
                if (this.energy > 0 && foundRand) {
                    let x = foundRand[0]
                    let y = foundRand[1]
                    matrix[y][x] = 6
                    matrix[this.y][this.x] = 0
                    this.x = x
                    this.y = y
                }
                else {
                    this.die()
                }
            } die() {
                matrix[this.y][this.x] = 0
                for (let i in shatakerArr) {
                    if (this.x == shatakerArr[i].x && this.y == shatakerArr[i].y) {
                        shatakerArr.splice(i, 1)
                        break;
                    }
                }
            }
        }
            
            
    
    
        