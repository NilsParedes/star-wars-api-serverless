export class CharacterEntity {

    constructor(
        public name: string,
        public height: string,
        public mass: string,
        public hair_color: string,
        public skin_color: string,
        public eye_color: string,
        public birth_year: string,
        public gender: string,
        public created?: Date,
        public edited?: Date,
        public id?: number,
    ) {
    }

}

export interface CharacterSpanish {
    nombre: string;
    altura: string;
    masa: string;
    color_cabello: string;
    color_piel: string;
    color_ojos: string;
    anio_nacimiento: string;
    genero: string;
}