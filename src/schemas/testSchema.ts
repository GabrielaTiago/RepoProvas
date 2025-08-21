import joi from 'joi';

export const testSchema = joi.object({
    name: joi.string().max(50).trim().required().messages({
        'string.empty': 'Name can not be empty',
        'any.required': 'Name is required',
    }),
    pdfUrl: joi.string().uri().trim().required().messages({
        'string.uri': 'Invalid PDF URL format',
        'string.empty': 'PDF URL can not be empty',
        'any.required': 'PDF URL is required',
    }),
    categoryId: joi.number().integer().strict().required().messages({
        'number.base': 'Category ID must be a number',
        'any.required': 'Category ID is required',
    }),
    disciplineId: joi.number().integer().strict().required().messages({
        'number.base': 'Discipline ID must be a number',
        'any.required': 'Discipline ID is required',
    }),
    teacherId: joi.number().integer().strict().required().messages({
        'number.base': 'Teacher ID must be a number',
        'any.required': 'Teacher ID is required',
    }),
});
