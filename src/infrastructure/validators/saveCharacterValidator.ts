import Joi from 'joi';

export const saveCharacterValidator = Joi.object({
    nombre: Joi.string().min(3).max(100).required().messages({
        "string.base": "El nombre debe ser una cadena de texto",
        "string.empty": "El nombre es obligatorio",
        "string.min": "El nombre debe tener al menos 3 caracteres",
        "string.max": "El nombre debe tener menos de 100 caracteres",
    }),
    altura: Joi.string().min(1).required().messages({
        "string.base": "La altura debe ser una cadena de texto",
        "string.empty": "La altura es obligatoria",
    }),
    masa: Joi.string().min(1).required().messages({
        "string.base": "La masa debe ser una cadena de texto",
        "string.empty": "La masa es obligatoria",
    }),
    color_cabello: Joi.string().min(3).required().messages({
        "string.base": "El color de cabello debe ser una cadena de texto",
        "string.empty": "El color de cabello es obligatorio",
    }),
    color_piel: Joi.string().min(3).required().messages({
        "string.base": "El color de piel debe ser una cadena de texto",
        "string.empty": "El color de piel es obligatorio",
    }),
    color_ojos: Joi.string().min(3).required().messages({
        "string.base": "El color de ojos debe ser una cadena de texto",
        "string.empty": "El color de ojos es obligatorio",
    }),
    anio_nacimiento: Joi.string().length(4).pattern(/^\d{4}$/).required().messages({
        "string.base": "El año de nacimiento debe ser una cadena de texto",
        "string.empty": "El año de nacimiento es obligatorio",
        "string.pattern.base": "El año de nacimiento debe ser un año válido de 4 dígitos",
    }),
    genero: Joi.string().valid('male', 'female').required().messages({
        "string.base": "El género debe ser una cadena de texto",
        "string.empty": "El género es obligatorio",
        "any.only": "El género debe ser uno de los siguientes valores: male, female",
    }),
});