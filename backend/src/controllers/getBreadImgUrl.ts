import express from "express";
import axios from "axios";

export const getBreadImgUrl = (req: express.Request, res: express.Response) => {

    const bread: string = req.params.bread;
    let breadName: string;
    let subbreadName: string;
    let url: string;

    if(bread.includes('&')) {
        breadName = bread.split('&')[0];
        subbreadName = bread.split('&')[1];
    } else {
        breadName = bread.split('&')[0];
    }

    if(subbreadName) {
        url = `https://dog.ceo/api/breed/${breadName}/${subbreadName}/images/random`;
    } else {
        url = `https://dog.ceo/api/breed/${breadName}/images/random`;
    }

    try {
        axios.get(url).then((rsp) => {
            const result = rsp.data.message;


            res.status(200).send({
                result: result,
                message: 'Get breed image url successfully',
                success: true
            });
        });

    } catch(error) {
        res.status(500).send({
            result: error,
            message: 'Get breed image url failed',
            success: false
        });
    }
};