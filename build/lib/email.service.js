"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mandrill = require("mandrill-api");
const config = require("../config/client-config");
const templateMapper_1 = require("../mapper/templateMapper");
if (config.getMandrillApiKey() === '')
    throw new Error('No Mandrill api key provided');
const client = new mandrill.Mandrill(config.getMandrillApiKey(), process.env.LOG_LEVEL === 'debug');
function sendEmailWithTemplate(mailInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const mailingRequest = templateMapper_1.mapTemplateEmail(mailInfo);
            client.messages.sendTemplate(mailingRequest, (result) => {
                console.log(result);
                resolve(result);
            }, (error) => {
                console.log(error);
                reject(error);
            });
        });
    });
}
exports.sendEmailWithTemplate = sendEmailWithTemplate;
