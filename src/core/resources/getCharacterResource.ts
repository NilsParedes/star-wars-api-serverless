import {CharacterEntity} from "../domain/characterEntity";


export class GetCharacterResource {
    static toJson(character: CharacterEntity) {
        return {
            data: {
                nombre: character.name,
                altura: character.height,
                masa: character.mass,
                color_cabello: character.hair_color,
                color_piel: character.skin_color,
                color_ojos: character.eye_color,
                anio_nacimiento: character.birth_year,
                genero: character.gender
            },
        };
    }
}