import joi from "joi";

export const testSchema = joi.object({
    name: joi.string().max(50).trim().required(),
    pdfUrl: joi.string().uri().trim().required(),
    categoryId: joi.number().integer().strict().required(),
    disciplineId: joi.number().integer().strict().required(),
    teacherId: joi.number().integer().strict().required()
});