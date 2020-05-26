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


router.get("/applications", (req, res) => {
    RouterHelper.sendResponseData(res, "get script list success", applications)
})

router.post("/create", async function (req: Request, res: Response) {
    req.checkBody('name', '腳名稱不得為空').notEmpty()
    let errors = req.validationErrors();
    if (errors) {
        RouterHelper.sendErrorResponse(res, 500, errors[0], "新增失敗")
    }
    try {
        let userId = req.user.id;
        let data: postScriptData = req.body;
        if (!data.contents || data.contents.length === 0) {
            RouterHelper.sendErrorResponse(res, 500, "腳本內容不得為空", "新增失敗")
        }
        let isSuccess = await ScriptModel.createScript(userId, data);
        if (isSuccess) {
            RouterHelper.sendResponseData(res, "create script success")
        } else {
            RouterHelper.sendErrorResponse(res, 500, "create script error", "新增失敗")
        }
    } catch (err) {
        RouterHelper.sendExceptionResponse(res, "create script exception", err);
    }
})

router.get("/user", async (req: Request, res: Response) => {
    try {
        let userId = req.user.id;
        let scriptDatas = await ScriptModel.getScriptByUserId(userId);
        if (scriptDatas) {
            RouterHelper.sendResponseData(res, "get user script success", scriptDatas)
        }
    } catch (err) {
        RouterHelper.sendExceptionResponse(res, "get user script exception", err);
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        let scriptId = req.params.id;
        let isSuccess = await ScriptModel.deleteScript(scriptId);
        if (isSuccess) {
            RouterHelper.sendResponseData(res, "delete script success")
        } else {
            RouterHelper.sendErrorResponse(res, 500, "delete script error", "新增失敗")
        }
    } catch (err) {
        RouterHelper.sendExceptionResponse(res, "delete script exception", err);
    }
})


router.get("/:id", async (req: Request, res: Response) => {
    try {
        let scriptId = req.params.id;
        let scriptData = await ScriptModel.getScriptById(scriptId);
        if (scriptData) {
            RouterHelper.sendResponseData(res, "get script success", scriptData)
        } else {
            RouterHelper.sendErrorResponse(res, 404, "no script", "無此腳本")
        }
    } catch (err) {
        RouterHelper.sendExceptionResponse(res, "get script exception", err);
    }
})



router.put("/:id", async (req: Request, res: Response) => {
    try {
        let scriptId = req.params.id;
        let data = req.body;
        let isSuccess = await ScriptModel.updateScript(scriptId, data);
        if (isSuccess) {
            RouterHelper.sendResponseData(res, "update script success")
        } else {
            RouterHelper.sendErrorResponse(res, 404, "update script error", "更新失敗")
        }
    } catch (err) {
        RouterHelper.sendExceptionResponse(res, "get user script exception", err);
    }
})

export = router;
