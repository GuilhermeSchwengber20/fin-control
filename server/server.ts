import express from   'express';
import router from './src/routes';
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use("/api", router);
server.listen(process.env.PORT || 3030);