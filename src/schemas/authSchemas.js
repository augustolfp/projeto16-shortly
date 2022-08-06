import joi from 'joi';

export const newUserSchema = joi.object({
    name: joi.string().required().messages({
      'string.empty': "Todos os campos são obrigatórios",
      'any.required': "Todos os campos são obrigatórios",}),
    email: joi.string().email().required().messages({
      'string.empty': "Todos os campos são obrigatórios",
      'string.email': "Digite um endereço de e-mail válido",
      'any.required': "Todos os campos são obrigatórios",}),
    password: joi.string().required().min(6).messages({
      'string.empty': "Todos os campos são obrigatórios",
      'any.required': "Todos os campos são obrigatórios",
      'string.min': "Sua senha deve ter pelo menos 6 caracteres",}),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
      'string.empty': "Todos os campos são obrigatórios",
      'any.required': "Todos os campos são obrigatórios",
      'any.only': "A confirmação de senha não confere!",}),
  });

  export const authUserSchema = joi.object({
    email: joi.string().email().required().messages({
      'string.email': "Digite um endereço de e-mail válido",
      'any.required': "Todos os campos são obrigatórios",}),
    password: joi.string().required().messages({
      'string.empty': "Todos os campos são obrigatórios",
      'any.required': "Todos os campos são obrigatórios",})
  });