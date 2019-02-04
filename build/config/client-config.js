"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let config = {
    mandrillApiKey: 'YY5pkBrTRAXKodN-0CL38g',
};
function getMandrillApiKey() {
    return config.mandrillApiKey;
}
exports.getMandrillApiKey = getMandrillApiKey;
function setMandrillApiKey(key) {
    config.mandrillApiKey = key;
}
exports.setMandrillApiKey = setMandrillApiKey;
