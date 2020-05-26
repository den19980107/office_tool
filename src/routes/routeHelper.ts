import express from 'express';
export default class RouterHelper {
    /** 發送 Response Data  */
    public static sendResponseData(res: express.Response, actionMessage: string = 'Success.', data: any = {}, enableLog: boolean = false) {
        let responseData: { status: number, message: string, data: any };
        let message = `${actionMessage} Success.`;

        responseData = {
            status: 200,
            message,
            data: data
        };

        res.status(responseData.status).send(responseData);
        res.end();
    }

    /** 發送 Error Response */
    public static sendErrorResponse(res: express.Response, status: number, actionMessage: string, errorMessage: string = '', data: any = {}, enableLog: boolean = true) {
        let message = errorMessage || '';
        // 建立 Message
        if (actionMessage != undefined && actionMessage.trim() !== '') {
            if (errorMessage != undefined && errorMessage.trim() !== '') {
                message = `${actionMessage} fail, ${errorMessage}`;
            }
            else {
                message = `${actionMessage} fail.`;
            }
        }

        // 寫Log
        if (enableLog) {
            switch (status) {
                case 400:
                case 401:
                case 404:
                    break;
                case 500:
                    break;
                default:
                    break;
            }
        }

        // 回傳 Response
        res.status(200).send({ status: status, message: message, data: data });
        res.end();
    }

    /** 發送 Exception Response */
    public static sendExceptionResponse(res: express.Response, actionMessage: string, error?: Error, enableLog: boolean = true) {
        let errorMessage = `${actionMessage} fail`;
        res.status(500).send({ status: 500, message: errorMessage, data: {} });
        res.end();
    }
}