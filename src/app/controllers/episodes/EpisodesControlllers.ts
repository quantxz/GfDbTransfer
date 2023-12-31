import { Request, Response } from "express";
import { QueryResult, sql } from "@vercel/postgres";
import { CreateEpisode } from "../../models/episodes/insertEpisodesModel";
import Decipher from "../../../middlewares/token";
require('dotenv').config();

class EpisodeController {
    public async ViewEpisode(req: Request, res: Response) {
        try {
            const query = 'SELECT * FROM episodes';
            const { rows } = await sql.query(query);
            
            return res.status(200).json(rows);

        } catch (err) {
            return res.status(500).json(err);
        }
    }
    
    public async insertEpisode(req: Request, res: Response) {
        try {        
            const token: any = req.headers['x-acess-token']
            
            if(Decipher(token) === process.env.SECRET){
                const { ...data } = req.body;
                await CreateEpisode(data);
        
                const query = 'SELECT * FROM episodes';
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
    
    public async ViewSpecifyEpisodeById(req: Request, res: Response) {
        try {
            const { id } = req.params

            const query = "SELECT * FROM episodes WHERE id = $1"
  
            const values = [id]
    
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
    
    public async ViewSpecifyEpisodeByName(req: Request, res: Response) {
        try {
            const { title } = req.params;

            const query = "SELECT * FROM episodes WHERE title LIKE $1"
      
            const values = [title]
      
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

export default new EpisodeController();
