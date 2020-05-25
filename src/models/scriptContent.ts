import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";


export type ScriptContnetDocument = mongoose.Document & {
    applicationId: string
    name: string
    url: string
    order: number
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
    }
}, { timestamps: true })


export class ScriptContentModel extends modelHelper {

    static async createScriptContent(): Promise<boolean> {
        return true
    }

    static async deleteScriptContentById(id: string): Promise<boolean> {

    }

    static async updateScriptContentById(id: string): Promise<boolean> {

    }

    static async getScriptContnetById(id: string): Promise<ScriptContnetDocument> {

    }

    static async getScriptContnetByScriptId(scriptId: string): Promise<Array<ScriptContnetDocument>> {

    }
}
export const ScriptContnet = mongoose.model<ScriptContnetDocument>("ScriptContnet", scriptContentSchema);
