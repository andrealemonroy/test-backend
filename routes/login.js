const express = require('express');
const UsersService = require('../services/users');

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  userLocationSchema
} = require('../utils/schemas/users');

const validationHandler = require('../utils/middleware/validationHandler');


router.post(
    '/',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        const createdUserId = await usersService.createUser({ user });

        res.status(201).json({
          data: createdUserId,
          message: 'user created',
        });
      } catch (err) {
        next(err);
      }
    }
  );