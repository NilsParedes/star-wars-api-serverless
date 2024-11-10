import {CharacterService} from "../../core/services/characterService";
import {SaveCharacterResource} from "../../core/resources/saveCharacterResource";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context,} from "aws-lambda";
import {CharacterEntity} from "../../core/domain/characterEntity";
import {CharacterRepository} from "../database/characterRepository";
import {SwapiClient} from "../external/swapiClient";
import {saveCharacterValidator} from "../validators/saveCharacterValidator";

const characterRepository = new CharacterRepository();
const swaoiClient = new SwapiClient()
const characterService = new CharacterService(characterRepository, swaoiClient);

export async function saveCharacterHandler(
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> {
    try {
        const body = JSON.parse(event.body!);
        const {error} = saveCharacterValidator.validate(body);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Validation failed',
                    details: error.details,
                }),
            };
        }
        const data = SaveCharacterResource.mapSpanishToEnglish(body);
        const character: CharacterEntity = await characterService.saveCharacter(data);
        return {
            statusCode: 201,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(SaveCharacterResource.toJson(character)),
        };
    } catch (e: any) {
        return {
            statusCode: 500,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({error: e.message}),
        };
    }
}
