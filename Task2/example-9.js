//1. Get first name of first student
//2. Get letter 'i' from first name of second student
const kpi = {
    fpm: {
        kv: {
            group1: [
                {
                    firstName: 'stud1',
                    lastName: 'dod'
                },

                {
                    firstName: 'stud2',
                    lastName: 'did'
                }
            ]
        },

    }
};

const {fpm: {kv: {group1: [{firstName: Name}, {lastName: [,secondLetter]}]}}} = kpi;
console.log(`First name of student = ${Name}, found letter ${secondLetter}`);
