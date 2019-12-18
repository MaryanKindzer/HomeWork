const colors = ["red", "orange", "yellow", "green", "light-blue", "blue", "violet"];

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getShapes = () => {
    const shapes = [];
    Array.from(Array(getRandomInt(5,10))).forEach(() => {
        shapes.push(new RightTriangle(colors[Math.floor(Math.random()*colors.length)], getRandomInt(5,10), getRandomInt(5,10)));
        shapes.push(new EquilateralTriangle(colors[Math.floor(Math.random()*colors.length)], getRandomInt(5,10)));
        shapes.push(new Circle(colors[Math.floor(Math.random()*colors.length)],  getRandomInt(5,10)));
        shapes.push(new Square(colors[Math.floor(Math.random()*colors.length)], getRandomInt(5,10)));
        shapes.push(new Diamond(colors[Math.floor(Math.random()*colors.length)], getRandomInt(5,10), getRandomInt(5,10)));
    });
    return shapes;
};

export const testShapes = () => {
    return [new TestShape("b", 10, 25),
            new TestShape("c", 10, 15),
            new TestShape("ada", 11, 35),
            new TestShape("aara", 11, 15),
            new TestShape("apop", 9,  15),]
};

export function Figure(color) {
    this.color = color;
    this.P = null;
    this.S = null;
}

function TestShape(color, P, S) {
    Figure.call(this, color);
    this.P = P;
    this.S = S;
}

function RightTriangle(color, firstCatheter, secondCatheter) {
    Figure.call(this, color);
    const hypotenuse = (firstCatheter, secondCatheter) => Math.sqrt(firstCatheter**2+secondCatheter**2);
    const getPerimeter = ((firstCatheter, secondCatheter, getHypotenuse)=> {
        return firstCatheter+secondCatheter+getHypotenuse(firstCatheter, secondCatheter);
    });
    const getArea = ((firstCatheter, secondCatheter)=> {
        return firstCatheter*secondCatheter/2;
    });

    this.P = getPerimeter(firstCatheter, secondCatheter, hypotenuse);
    this.S = getArea(firstCatheter, secondCatheter);
}
function EquilateralTriangle(color, side) {
    Figure.call(this, color);

    const getPerimeter = ((side)=> {
        return 3*side;
    });

    const getArea = ((side)=> {
        return Math.sqrt(3)*(side**2)/4;
    });

    this.P = getPerimeter(side);
    this.S = getArea(side);
}
function Circle(color, radius) {
    Figure.call(this, color);

    const getPerimeter = ((radius)=> {
        return 2*Math.PI*radius;
    });

    const getArea = ((radius)=> {
        return Math.PI*(radius**2);
    });

    this.P = getPerimeter(radius);
    this.S = getArea(radius);
}
function Square(color, side) {
    Figure.call(this, color);

    const getPerimeter = ((side)=> {
        return 4*side;
    });

    const getArea = ((side)=> {
        return side**2;
    });

    this.P = getPerimeter(side);
    this.S = getArea(side);
}
function Diamond(color, firstDiagonal, secondDiagonal) {
    Figure.call(this, color);
    const side = (firstDiagonal, secondDiagonal) => Math.sqrt(Math.pow(firstDiagonal/2, 2) + Math.pow(secondDiagonal/2, 2));
    const getPerimeter = ((firstDiagonal, secondDiagonal, getSide)=> {
        return 4*getSide(firstDiagonal, secondDiagonal);
    });
    const getArea = ((firstDiagonal, secondDiagonal, getSide)=> {
        return Math.pow(getSide(firstDiagonal, secondDiagonal), 2);
    });

    this.P = getPerimeter(firstDiagonal, secondDiagonal, side);
    this.S = getArea(firstDiagonal, secondDiagonal, side);
}
