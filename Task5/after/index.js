require("babel-core/register");
require("babel-polyfill");


import {deleteUser, getUsers, PORNO, sendAlert} from '../helpers';


(async () => {
   try {
        const {data: users, status=200} = await getUsers();
        const promises = [];
       users.map((user, i) => {
           promises.push(parseUsersAll(user, i));
       });
       const usr = await Promise.all(promises).catch(()=>console.log("piszda"));
   } catch (message) {
       console.log("[...] SERVER ISSUE WHILE GETTING USERS");
   }
})();

const parseUsersAll = async (user, i) => {
        const {age, videos} = user;
        if (age < 18) {
            try {
                const {data: {message:answer}, status} = await deleteUser(i);
                console.log(answer);
            } catch (message) {
                console.log(message);
                throw Error("U SERVERA HALEPA1");
            }
        } else {
            if (videos.includes(PORNO)) {
                try {
                    const {data: {message:answer}, status} = await sendAlert(i);
                    console.log(answer);
                } catch (message) {
                    console.log(message);
                    throw Error("U SERVERA HALEPA22");
                }
            }
        }
    return 1;
};
