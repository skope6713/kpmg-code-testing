import express from "express";
import cors from "cors";

import routes from "./routes";

const app: express.Application = express();
const port: number = 8080; // default port to listen

app.use(cors());

// define a route handler for the default home page
app.use( "/healthcheck", ( req, res ) => {
    res.send( "App seems to be running" );
});

app.use('/api', routes);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
