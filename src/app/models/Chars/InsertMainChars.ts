import { connection } from "../../../configs/connection";
import { CharsInterface } from "../../../configs/interfaces";

export const createMainCharacters = async (data: CharsInterface) => {
    try {
        const query = `
        INSERT INTO mainchars 
        (name, first_episode, last_episode, voice, abilities, age, born, ocuppation, inspiration, likes, dislikes, description, image) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const values = [
            data.name, 
            data.first_episode, 
            data.last_episode, 
            data.voice, 
            data.abilities,
            data.age, 
            data.born, 
            data.ocuppation, 
            data.inspiration, 
            data.likes, 
            data.dislikes, 
            data.description, 
            data.image]

        return await connection.promise().query(query, values);

    } catch (err) {
        console.error('Erro ao executar consulta:', err);
    }
}