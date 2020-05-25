import mongoose from "mongoose";
import { ObjectID } from 'mongodb';
import { modelHelper } from "./modelHelper";


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

    static async createScript(): Promise<boolean> {
        return true
    }

    static async deleteScript(): Promise<boolean> {

    }

    static async updateScript(): Promise<boolean> {

    }

    static async getScriptById(id: string): Promise<ScriptDocument> {

    }

    static async getScriptByUserId(userId: string): Promise<Array<ScriptDocument>> {

    }
}
export const Script = mongoose.model<ScriptDocument>("Script", scriptSchema);
