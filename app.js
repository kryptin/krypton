import express from 'express';
import log4js from './shared/logger';
import {environment, serverConf} from './config';
import {createServer} from "http";
import './config/db';
import middlewares from './config/middlewares';

var logger = log4js.getLogger();
const app = express();


middlewares(app);
const graphQLServer = createServer(app);

graphQLServer.listen(serverConf.SERVER_PORT,
    () => {
        logger.info('##########################################################');
        logger.info('#####               STARTING SERVER                  #####');
        logger.info('##########################################################\n');
        logger.info(`App running on ${environment.toUpperCase()} mode and listening on port ${serverConf.SERVER_PORT} ...`);
    });






