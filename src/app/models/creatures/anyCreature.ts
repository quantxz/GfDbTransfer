import { connection } from "../../../configs/connection"
import { AnyCreatureInterface } from "../../../configs/interfaces"

export const CreateAnyCreature = async (data: AnyCreatureInterface) => {
    try {
        const query = `INSERT INTO AnyCreature 
        (name, first_episode, last_episode, mentions, no_lines, voice, species,
        abilities, inspiration, fate, quote, description, image) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const values = [
            data.name,
            data.first_episode,
            data.last_episode,
            data.mentions,
            data.no_lines,
            data.voice,
            data.species,
            data.abilities,
            data.inspiration,
            data.fate,
            data.quote,
            data.description,
            data.image
        ]

        const queryReslut = await connection.promise().query(query, values)

        return console.log(queryReslut)

    } catch(err) {
        return console.log(err)
    }
} 