"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
exports.getAllBreads = (req, res) => {
    try {
        axios_1.default.get("https://dog.ceo/api/breeds/list/all").then((rsp) => {
            const result = rsp.data.message;
            let breedsRes = [];
            for (let breedName in result) {
                const breed = result[breedName];
                if (breed.length === 0) {
                    let breedObjNoSub = Object.assign({});
                    breedObjNoSub['breed'] = breedName;
                    breedsRes.push(breedObjNoSub);
                }
                else if (breed.length > 0) {
                    breed.forEach((subbreedName) => {
                        let breedObjHasSub = Object.assign({});
                        breedObjHasSub['breed'] = breedName;
                        breedObjHasSub['subbreed'] = subbreedName;
                        breedsRes.push(breedObjHasSub);
                    });
                }
            }
            res.status(200).send({
                result: breedsRes,
                message: 'Get breeds successfully',
                success: true
            });
        });
    }
    catch (error) {
        res.status(500).send({
            result: error,
            message: 'Get breeds failed',
            success: false
        });
    }
};
//# sourceMappingURL=getAllBreads.js.map