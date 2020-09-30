import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticate';
import UsersController from '../controllers/UsersController';
import UserAvatarControlers from '../controllers/UserAvatarControlers';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const userAvatarControlers = new UserAvatarControlers();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarControlers.update,
);

export default usersRouter;
