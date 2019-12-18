import { getEmployees } from "../helpers";

const employees = getEmployees();

const groupByUniversities = employees.reduce((acc, item) => {
    const {withUniversities, other} = acc;
    const {education: education} = item;
    if (typeof(education) != "undefined") {
        const {university: university} = education;
        if (typeof(university) != "undefined") {
            withUniversities.push(item)
        } else {
            other.push(item);
        }
    } else {
        other.push(item);
    }
    return {withUniversities, other};
}, {withUniversities:[], other:[]});

const sortByNames = function ({firstName: firstName, lastName: lastName}, {firstName: firstName1, lastName: lastName1}) {
    if (firstName[0]>firstName1[0]) {
        return 1;
    }
    if (firstName[0]<firstName1[0]) {
        return -1;
    }
    if (lastName>lastName1) {
        return 1;
    }
    if (lastName<lastName1) {
        return -1;
    }
    return 0;
};

const startsWithA = (arr) => {
    const res = arr.filter( ({firstName: firstName, lastName: lastName})=>{
        return firstName.startsWith('a') || lastName.startsWith('a');
    });
    console.log('[...] TASK 1: EMPLOYEES WHOSE FIRST OR LAST NAME START WITH a:');
    console.log(res);
};

const sortEmployees = ({withUniversities: withUniversities, other: other}) => {
    withUniversities.sort(function ({education: {univerisity: a}}, {education: {univerisity: b}}) {
        return a-b;
    });
    other.sort(sortByNames);
    const result = withUniversities.concat(other);
    console.log('[...] TASK 2: SORTED EMPLOYEES BY UNIVERSITIES:');
    console.log(result);
};

const allUniversities = (arr) => {
    console.log('[...] TASK 3: ALL UNIVERSITIES:');
    arr.forEach(({education: {university: item}}) => {
        console.log(item);
    })
};


const salaries = (arr) => {
    let above = 0, below = 0;
    const el = arr.reduce((acc, {salary: salary, age: age})=> {
        let {above20av, below20av, above20max, below20max} = acc;
        if (age>20) {
            (salary>above20max) && (above20max=salary);
            above20av+=salary;
            above++;
        } else {
            (salary>below20max) && (below20max=salary);
            below20av+=salary;
            below++;
        }
        return {above20av, below20av, above20max, below20max};
    }, {above20av:0, below20av:0, above20max:0, below20max:0});
    const {above20av:above20av, below20av:below20av, below20max:below20max, above20max:above20max} = el;
    console.log(`[...] TASK 4: ALL SALARIES: average under 20 = ${below20av/below},
                max under 20 = ${below20max}, average above 20 = ${above20av/above},
                max above 20 = ${above20max},`);
};

startsWithA(employees);
sortEmployees(groupByUniversities);
allUniversities(groupByUniversities.withUniversities);
salaries(employees);
