import axios from 'axios';
import {CharacterEntity} from "../../core/domain/characterEntity";
import {IExternalApiService} from "../../core/ports/externalApi";

const SWAPI_URL = 'https://swapi.py4e.com/api'

export class SwapiClient implements IExternalApiService {

    async getCharacterById(id: number): Promise<CharacterEntity | null> {
        try {
            const response = await axios.get(`${SWAPI_URL}/people/${id}`);
            const data = response.data;

            return new CharacterEntity(
                data.name,
                data.height,
                data.mass,
                data.hair_color,
                data.skin_color,
                data.eye_color,
                data.birth_year,
                data.gender,
                new Date(),
                new Date(),
                id,
            );
        } catch (error) {
            console.error("Error fetching character from SWAPI:", error);
            return null;
        }
    }
}