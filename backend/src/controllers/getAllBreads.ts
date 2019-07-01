import express from "express";
import axios from "axios";

export const getAllBreads = (req: express.Request, res: express.Response) => {

    try {
        axios.get("https://dog.ceo/api/breeds/list/all").then((rsp) => {
            const result = rsp.data.message;
            let breedsRes: Array<object> = [];

            for(let breedName in result) {
                const breed = result[breedName];
                if(breed.length === 0) {
                    let breedObjNoSub = Object.assign({});

                    breedObjNoSub['breed'] = breedName;
                    breedsRes.push(breedObjNoSub);
                } else if(breed.length > 0) {
                    breed.forEach((subbreedName: string) => {
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

    } catch(error) {
        res.status(500).send({
            result: error,
            message: 'Get breeds failed',
            success: false
        });
    }
};
