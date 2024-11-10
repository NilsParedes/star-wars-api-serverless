import {CharacterService} from "../../core/services/characterService";
import {GetCharacterResource} from "../../core/resources/getCharacterResource";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {CharacterRepository} from "../database/characterRepository";
import {SwapiClient} from "../external/swapiClient";

const characterRepository = new CharacterRepository()
const swaoiClient = new SwapiClient()
const characterService = new CharacterService(characterRepository, swaoiClient)

export async function getCharacterHandler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

    try {
        const {id} = event.pathParameters || {};
        const regex = /^[1-9]\d*$/;

        if (!id || !regex.test(id)) {
            return {
                statusCode: 400,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({message: 'ID is not valid'}),
            };
        }

        const character = await characterService.getCharacter(Number(id))
        if (!character) {
            return {
                statusCode: 404,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({error: 'Character Not Found'}),
            };
        }

        return {
            statusCode: 200,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(GetCharacterResource.toJson(character)),
        };

    } catch (e: any) {
        return {
            statusCode: 500,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({error: e.message},),
        };
    }
}