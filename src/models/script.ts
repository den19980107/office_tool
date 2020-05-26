import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
import { ScriptContnetDocument, ScriptContentModel, ScriptContnet } from "./scriptContent";

export type postScriptData = {
    name: string,
    contents: Array<postScriptContent>
}
export type postScriptContent = {
    applicationId: string
    name: string
    url: string
    order: number
}

export type ScriptDocument = mongoose.Document & {
    name: string
    userId: string
};

let scriptSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userId: {
        type: String
    }
}, { timestamps: true })


export class ScriptModel extends modelHelper {

    static async createScript(userId: string, data: postScriptData): Promise<boolean> {
        let contents = data.contents;
        try {
            let script = await new Script({
                name: data.name,
                userId: userId
            }).save()
            await ScriptContentModel.createScriptContent(script.id, contents);

            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async deleteScript(id: string): Promise<boolean> {
        try {
            await ScriptContentModel.deleteScriptContentByScriptId(id);
            await this.deleteById(id, Script);
        } catch (err) {
            return false;
        }
    }

    static async updateScript(id: string, data: postScriptData): Promise<boolean> {
        try {
            let contents = data.contents;
            await ScriptContentModel.deleteScriptContentByScriptId(id);
            await ScriptContentModel.createScriptContent(id, contents);
            return true
        } catch (err) {
            return false
        }
    }

    static async getScriptById(id: string): Promise<postScriptData> {
        try {
            let script: ScriptDocument = await this.getById(id, Script);
            let scriptContent = await ScriptContentModel.getScriptContnetByScriptId(id);
            let scriptData: postScriptData = {
                name: script.name,
                contents: scriptContent
            }
            return scriptData
        } catch (err) {
            return null
        }
    }

    static async getScriptByUserId(userId: string): Promise<Array<postScriptData>> {
        let scripts = await Script.find({ userId });
        let scriptDatas: Array<postScriptData> = [];
        for (let i = 0; i < scripts.length; i++) {
            scriptDatas.push(await this.getScriptById(scripts[i].id))
        }
        return scriptDatas;
    }
}
export const Script = mongoose.model<ScriptDocument>("Script", scriptSchema);
