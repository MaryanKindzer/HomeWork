import {LoremIpsum} from 'lorem-ipsum';

export const PORNO = 'porno';

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function has() {
    return Boolean(getRandomInt(1, 100) % 2)
}

const lorem = new LoremIpsum();

const generateUsers = () => {
    const users = [];
    Array.from(Array(getRandomInt(20,30))).forEach((_, index) => {
        const user = {
            id: index,
            firstName: lorem.generateWords(1),
            lastName: lorem.generateWords(1),
            age: getRandomInt(13, 22),
            videos: Array.from(Array(getRandomInt(2,5))).map(_ => lorem.generateWords(1))
        };
        if (has()) {
            user.videos.push(PORNO);
        }
        users.push(user);
    });
    return users;
};

let users = generateUsers();

const getResponse = (data, status = 200) => ( { data, status} );

const disconnectFromServer = reject => {
    if(!Boolean(getRandomInt(1, 100) % 7)) {
        reject('Disconnected: trapulas halepa');
    }
};


export const getUsers = () => {
    return new Promise((resolve, reject) => {
        disconnectFromServer(reject);
        setTimeout(()=>resolve(getResponse(users)), getRandomInt(1000, 2000))
    })
};

export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            disconnectFromServer(reject);
            if(!users.some(({ id }) => id === userId)) {
                resolve(getResponse({ message: `User id=${userId} does not exist`}, 404))
            }
            users = users.filter(({ id }) => !(userId === id));
            resolve(getResponse({ message: 'Deleted!' }))
        }, getRandomInt(1000, 2000))
    })
};

export const sendAlert = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            disconnectFromServer(reject);
            if(!users.some(({ id }) => id === userId)) {
                resolve(getResponse({ message: `User id=${userId} does not exist`}, 404))
            }
            const { videos } = users.find(u => u.id === userId);
            if(!videos.includes(PORNO)) {
                resolve(getResponse({ message: `User id=${userId} does not watch porno`}, 409))
            }
            resolve(getResponse({ message: 'Sent!' }))
        }, getRandomInt(1000, 2000))
    })
};
