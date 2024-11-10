import {CharacterEntity} from "../domain/characterEntity";
import {CharacterRepositoryInterface} from "../ports/repositories";
import {CharacterServiceInterface} from "../ports/services";
import {SwapiClient} from "../../infrastructure/external/swapiClient";

export class CharacterService implements CharacterServiceInterface {

    private repository: CharacterRepositoryInterface;
    private swapiClient: SwapiClient;

    constructor(repository: CharacterRepositoryInterface, swapiClient: SwapiClient) {
        this.repository = repository;
        this.swapiClient = swapiClient;
    }

    async getCharacter(id: number): Promise<CharacterEntity | null> {
        try {
            let character = await this.repository.getCharacter(id);
            if (!character) {
                character = await this.swapiClient.getCharacterById(id);
                if (character) {
                    await this.saveCharacter(character);
                }
            }
            return character;
        } catch (error) {
            throw error;
        }
    }

    async saveCharacter(characterData: CharacterEntity): Promise<CharacterEntity> {
        try {
            return await this.repository.saveCharacter(characterData);
        } catch (error) {
            throw error;
        }
    }

}