import {CharacterEntity} from "../domain/characterEntity";

export interface IExternalApiService {
    getCharacterById(id: number): Promise<CharacterEntity | null>;
}