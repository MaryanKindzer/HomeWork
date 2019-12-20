'use strict';

function Temperature(degrees) {
    this.degrees = degrees;
}

const freezing = new Temperature(32);

freezing[Symbol.toPrimitive] = (h) => {
    if (h === "number") {
        return freezing["degrees"];
    } else if (h === "string") {
        return `${freezing["degrees"]}${String.fromCharCode(176)}`;
    } else {
        return `${freezing["degrees"]} degrees`;
    }
};

console.log(freezing/2); // NaN → // 16
console.log(freezing + '!'); // [object Object]! → // 32 degrees!
console.log(String(freezing)); // [object Object] → // 32°
