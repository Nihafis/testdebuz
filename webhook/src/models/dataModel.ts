import { pool } from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const db = pool;

interface DataRow extends RowDataPacket {
  tx_id: number;
  message: string;
  created_at: Date;
}

interface CreateResult extends ResultSetHeader {
  insertId: number;
  affectedRows: number;
}

const dataModel = {
  create: async (message: string): Promise<CreateResult> => {
    const [result] = await db.query<CreateResult>(
      "INSERT INTO subscribe_data (message) VALUES (?)",
      [message]
    );
    return result;
  },
  get: async (tx_id: number): Promise<DataRow | null> => {
    const [rows] = await db.query<DataRow[]>(
      "SELECT * FROM subscribe_data WHERE tx_id = ?",
      [tx_id]
    );
    return rows[0] || null;
  },
};

export default dataModel;
