import {getCharacterHandler} from "../src/infrastructure/handlers/getCharacterHandler";
import {saveCharacterHandler} from "../src/infrastructure/handlers/saveCharacterHandler";

describe("getCharacterHandler", () => {
    const context: any = {};

    it("get character", async () => {
        const eventSaveCharacter: any = {
            body: JSON.stringify({
                nombre: "Luke Skywalker",
                altura: "1.72",
                masa: "77",
                color_cabello: "rubio",
                color_piel: "clara",
                color_ojos: "azul",
                anio_nacimiento: "1998",
                genero: "male"
            }),
        };

        const resultSaveCharacter = await saveCharacterHandler(eventSaveCharacter, context);
        const id = JSON.parse(resultSaveCharacter.body).data.id;

        const event: any = {
            pathParameters: {id},
        };

        const result = await getCharacterHandler(event, context);
        expect(result.statusCode).toBe(200);
    });

    it("get character that does not exist", async () => {
        const event: any = {
            pathParameters: {id: 123},
        };
        const result = await getCharacterHandler(event, context);
        expect(result.statusCode).toBe(404);
    });
});
