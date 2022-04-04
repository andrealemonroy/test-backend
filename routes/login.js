const express = require("express");
const UsersService = require("../services/users");

const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  userLocationSchema,
} = require("../utils/schemas/users");

const validationHandler = require("../utils/middleware/validationHandler");

function usersApi(app) {
  const router = express.Router();
  app.use("/api/users", router);

  const usersService = new UsersService();

  router.get("/", async function (req, res, next) {
    const { tags } = req.query;
    console.log('in')
    try {
      const users = await usersService.getUsers({ tags });
      console.log(users);
      res.status(200).json({
        data: users,
        message: "users listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:userId',
    async function (req, res, next) {
      const { userId } = req.params;

      try {
        const users = await usersService.getUser({ userId });
        res.status(200).json({
          data: users,
          message: 'user retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createUserSchema),
    async function (req, res, next) {
      const { body: user } = req;
      try {
        const createdUserId = await usersService.createUser({ user });

        res.status(201).json({
          data: {id:createdUserId, documentNumber: user.documentNumber, carNumber: user.carNumber},
          message: 'user created',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = usersApi;
