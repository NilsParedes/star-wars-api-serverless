import { CharacterEntity } from "../domain/characterEntity";

export interface CharacterServiceInterface {

    getCharacter(id: number): Promise<CharacterEntity | null>

    saveCharacter(CharacterData: CharacterEntity): Promise<CharacterEntity>

}