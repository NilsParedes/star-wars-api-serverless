import {CharacterEntity} from "../domain/characterEntity";

export interface CharacterRepositoryInterface {

    getCharacter(id: number): Promise<CharacterEntity | null>

    saveCharacter(CharacterData: CharacterEntity): Promise<CharacterEntity>

}