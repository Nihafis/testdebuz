import { pool } from "../config/db";

const db = pool;

const subScribeModel = {
    create: async (url: string, secret: string) => {
        const [result] = await db.query("INSERT INTO subscriber (url, secret) VALUES (?, ?)", [url, secret]);
        return result;
    },
    delete: async (sub_id: string) => {
        const [result] = await db.query("DELETE FROM subscriber WHERE sub_id = ?", [sub_id]);
        return result;
    },
    getSubscribers: async () => {
        const [result] = await db.query("SELECT * FROM subscriber");        
        return result;
    }
}

export default subScribeModel;