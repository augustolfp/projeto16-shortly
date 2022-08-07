import joi from 'joi';

export const newUrlSchema = joi.object({
    url: joi.string().uri().required()
});
