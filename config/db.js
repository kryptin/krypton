/* eslint-disable no-console */

import mongoose from 'mongoose';

import constants from './constants';
import log4js from "../shared/logger";
var logger = log4js.getLogger();
mongoose.Promise = global.Promise;

mongoose.set('debug', true); // debug mode on

try {
    mongoose.connect(constants.DB_URL);
} catch (err) {
    mongoose.createConnection(constants.DB_URL);
}

mongoose.connection
    .once('open', () => {
        logger.info('MongoDB Running yo!')
    })
    .on('error', e => {
        throw e;
    });