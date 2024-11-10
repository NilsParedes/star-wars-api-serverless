import {saveCharacterHandler} from "../src/infrastructure/handlers/saveCharacterHandler";

describe("saveCharacterHandler", () => {

    let characterData = {
        nombre: "Luke Skywalker",
        altura: "1.72",
        masa: "77",
        color_cabello: "rubio",
        color_piel: "clara",
        color_ojos: "azul",
        anio_nacimiento: "1998",
        genero: "male"
    };

    const context: any = {};

    it("save character successfully", async () => {
        const event: any = {
            body: JSON.stringify(characterData),
        };

        const result = await saveCharacterHandler(event, context);
        expect(result.statusCode).toBe(201);
    });

    it("Save character with wrong data", async () => {
        const event: any = {
            body: JSON.stringify({}),
        };

        const result = await saveCharacterHandler(event, context);
        expect(result.statusCode).toBe(400);
    });
});
