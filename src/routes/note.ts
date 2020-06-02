import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import config from '../config/default'

import { ScriptModel, postScriptData } from '../models/script';
import RouterHelper from './routeHelper';
import applications from '../config/applications';
// model
import { User, UserDocument } from '../models/user';
const router = express.Router();
const CLIENT_HOME_PAGE_URL = config.clientUrl;


router.get("/", (req, res) => {
    RouterHelper.sendResponseData(res, "get script list success", applications)
})


export = router;
