import { Request, Response } from "express";
import { QueryResult, sql } from "@vercel/postgres";
import { CreateWeirdCreatures } from "../../models/creatures/Weirdmageddon";
import Decipher from "../../../middlewares/token";
require('dotenv').config();

class WeirmagedomController {
    public async ViewWeirdmageddon(req: Request, res: Response) {
        try {
            const query = 'SELECT * FROM weirdmageddoncreatures';
            const { rows } = await sql.query(query);
            return res.status(200).json(rows);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    public async InsertWeirdmageddon(req: Request, res: Response) {
        try {
            const token: any = req.headers['x-acess-token']
        
            if(Decipher(token) === process.env.SECRET){
                const { ...data } = req.body;
                await CreateWeirdCreatures(data);
                
                const query = 'SELECT * FROM weirdmageddoncreatures';
                const { rows } = await sql.query(query);

                return res.status(200).json(rows);
            } else {
                return res.status(401).json({
                  "errorMessage": "usuario não autorizado a fazer esta operação"
                })
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    }

    public async ViewSpecifyCreature(req: Request, res: Response) {
        try {
            const { name } = req.params;

            const query = "SELECT * FROM weirdmageddoncreatures WHERE name LIKE $1"
      
            const values = [name]
      
            sql.query(query, values, (err: Error, result: QueryResult<any>) => {
              if (err) {
                return res.status(500).json(err);
              }
              return res.status(200).json(result.rows);
            });

        } catch (err) {
            return res.status(500).json(err);
        }
    }

}

export default new WeirmagedomController();
