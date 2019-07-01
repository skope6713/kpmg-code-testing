"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.getBreadImgUrl = (req, res) => {
    const bread = req.params.bread;
    let breadName;
    let subbreadName;
    let url;
    if (bread.includes('&')) {
        breadName = bread.split('&')[0];
        subbreadName = bread.split('&')[1];
    }
    else {
        breadName = bread.split('&')[0];
    }
    if (subbreadName) {
        url = `https://dog.ceo/api/breed/${breadName}/${subbreadName}/images/random`;
    }
    else {
        url = `https://dog.ceo/api/breed/${breadName}/images/random`;
    }
    try {
        axios_1.default.get(url).then((rsp) => {
            const result = rsp.data.message;
            res.status(200).send({
                result: result,
                message: 'Get breed image url successfully',
                success: true
            });
        });
    }
    catch (error) {
        res.status(500).send({
            result: error,
            message: 'Get breed image url failed',
            success: false
        });
    }
};
//# sourceMappingURL=getBreadImgUrl.js.map