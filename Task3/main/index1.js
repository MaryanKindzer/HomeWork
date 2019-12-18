import {getShapes} from '../shapes';

const shapes = getShapes();


const sortIdentifiersTest1 = ["color", "P", "S"];
const sortIdentifiersTest2 = ["color", "S"];
const sortIdentifiersTest3 = ["color"];
const sortIdentifiersTest4 = ["P", "color"];



console.log(shapes[0]["color"]);

function Sorter(shapes, rules) {
    this.shapes = shapes;
    const [firstRule, secondRule, thirdRule] = rules;

    const With = ((rule, next)=> {
        const get = (obj, rule) => obj[rule];
        return ((a, b)=> {
            const first  = get(a, rule);
            const second = get(b, rule);
            if (first<second) {
                return -1
            } else if (first > second) {
                return 1;
            } else {
                if (typeof next === "function") {
                    return next(a, b);
                }
                return 0;
            }
        });
    });

    if (firstRule && secondRule && thirdRule) {
        this.shapes.sort(With(firstRule, With(secondRule, With(thirdRule,null))));
    } else if (firstRule && secondRule) {
        this.shapes.sort(With(firstRule, With(secondRule, null)));
    } else if (firstRule) {
        this.shapes.sort(With(firstRule, null));
    } else {
        return Error("No rules to sort")
    }

}

const {shapes: color} = new Sorter(shapes, sortIdentifiersTest4);
console.log(color);
