import express from "express";
import axios from "axios";

import { getAllBreads, getBreadImgUrl } from './controllers';

const routes: any = express.Router();

routes.get("/breads", getAllBreads);
routes.get("/bread/:bread", getBreadImgUrl);

export default routes;
