import {LoremIpsum} from 'lorem-ipsum';

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function has() {
    return Boolean(getRandomInt(1, 100) % 2)
}

const lorem = new LoremIpsum();

export const getEmployees = () => {
    const employees = [];
    Array.from(Array(getRandomInt(10,20))).forEach(() => {
       employees.push({
           firstName: lorem.generateWords(1),
           lastName: lorem.generateWords(1),
           age: getRandomInt(18, 22),
           education: has() ? {
               school: lorem.generateWords(2),
               university: has() ? lorem.generateWords(2) : undefined
           } : undefined,
           salary: getRandomInt(5000, 10000)
       });
    });
    return employees;
};
