import {CharacterRepositoryInterface} from "../../core/ports/repositories";
import {CharacterEntity} from "../../core/domain/characterEntity";
import {Database} from "./database";

export class CharacterRepository implements CharacterRepositoryInterface {
    private readonly db: Promise<Database>;

    constructor() {
        this.db = Database.getInstance();
    }

    public async getCharacter(id: number): Promise<CharacterEntity | null> {
        try {
            const db = await this.db;

            const result = await db.query(
                `SELECT id,
                        name,
                        height,
                        mass,
                        hair_color,
                        skin_color,
                        eye_color,
                        birth_year,
                        gender,
                        created,
                        edited
                 FROM characters
                 WHERE id = ?`,
                [id]
            );

            const rows = result as any[];
            if (rows.length === 0) {
                return null;
            }

            const row = rows[0];
            return new CharacterEntity(
                row.name,
                row.height,
                row.mass,
                row.hair_color,
                row.skin_color,
                row.eye_color,
                row.birth_year,
                row.gender,
                new Date(row.created),
                new Date(row.edited),
                row.id,
            );
        } catch (error) {
            console.error("Error fetching character by ID:", error);
            throw error;
        }
    }

    public async saveCharacter(character: CharacterEntity): Promise<CharacterEntity> {
        try {
            const db = await this.db;
            await db.startTransaction();

            let query: string;
            let values: (string | number)[];

            if (character.id) {
                query = `INSERT INTO characters
                         (id, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                values = [
                    character.id,
                    character.name,
                    character.height,
                    character.mass,
                    character.hair_color,
                    character.skin_color,
                    character.eye_color,
                    character.birth_year,
                    character.gender,
                ];
            } else {
                query = `INSERT INTO characters
                         (name, height, mass, hair_color, skin_color, eye_color, birth_year, gender)
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                values = [
                    character.name,
                    character.height,
                    character.mass,
                    character.hair_color,
                    character.skin_color,
                    character.eye_color,
                    character.birth_year,
                    character.gender,
                ];
            }

            const result = await db.query(query, values);
            const insertResult = result as { insertId: number };

            await db.commitTransaction();
            character.id = character.id || insertResult.insertId;
            console.log("Character saved successfully with ID:", character.id);
            return character;
        } catch (error) {
            const db = await this.db;
            await db.rollbackTransaction();
            console.error("Failed to save character:", error);
            throw error;
        }
    }

}
