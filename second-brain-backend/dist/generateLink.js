"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const generate = (len) => {
    const random = "wertyufghjklkjhgertyuiucvblkjhgdfgdhfb73482p";
    const length = random.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += random[Math.floor(Math.random() * length)];
    }
    return ans;
};
exports.generate = generate;
