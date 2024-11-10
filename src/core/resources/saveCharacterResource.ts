import {CharacterEntity, CharacterSpanish} from "../domain/characterEntity";

export class SaveCharacterResource {
    static mapSpanishToEnglish(character: CharacterSpanish): CharacterEntity {
        return {
            name: character.nombre,
            height: character.altura,
            mass: character.masa,
            hair_color: character.color_cabello,
            skin_color: character.color_piel,
            eye_color: character.color_ojos,
            birth_year: character.anio_nacimiento,
            gender: character.genero,
        };
    }

    static toJson(character: CharacterEntity) {
        return {
            data: {
                id: character.id,
                nombre: character.name,
                altura: character.height,
                masa: character.mass,
                color_de_cabello: character.hair_color,
                color_de_piel: character.skin_color,
                color_de_ojos: character.eye_color,
                ano_de_nacimiento: character.birth_year,
                genero: character.gender,
                creado: character.created,
                editado: character.edited,
            }
        };
    }
}
