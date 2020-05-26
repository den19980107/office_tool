import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";
import { postScriptContent } from "./script";


export type ScriptContnetDocument = mongoose.Document & {
    applicationId: string
    name: string
    url: string
    order: number
    belongScriptId: string
};

let scriptContentSchema = new mongoose.Schema({
    applicationId: {
        type: String
    },
    name: {
        type: String
    },
    url: {
        type: String
    },
    order: {
        type: Number
    },
    belongScriptId: {
        type: String
    }
}, { timestamps: true })


export class ScriptContentModel extends modelHelper {

    static async createScriptContent(scriptId: string, contents: Array<postScriptContent>): Promise<boolean> {
        try {
            for (let i = 0; i < contents.length; i++) {
                let content = new ScriptContnet({
                    applicationId: contents[i].applicationId,
                    name: contents[i].name,
                    url: contents[i].url,
                    order: contents[i].order,
                    belongScriptId: scriptId
                })
                await this.create(content, ScriptContnet);
            }
            return true
        } catch (err) {
            console.log(err);
        }
    }


    static async deleteScriptContentByScriptId(id: string): Promise<boolean> {
        try {
            await ScriptContnet.deleteMany({ belongScriptId: id });
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    }

    static async getScriptContnetByScriptId(scriptId: string): Promise<Array<ScriptContnetDocument>> {
        try {
            let scriptContents = await ScriptContnet.find({ belongScriptId: scriptId });
            return scriptContents
        } catch (err) {
            console.log(err);
            return null
        }
    }
}
export const ScriptContnet = mongoose.model<ScriptContnetDocument>("ScriptContnet", scriptContentSchema);
