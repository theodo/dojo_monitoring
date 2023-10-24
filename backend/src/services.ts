import { Express } from 'express';
import { StatisticAddRequest } from './types';
import { PrismaClient } from '@prisma/client';

const CURRENT_USER_NAME = 'John NoWeak';

export const loadServices = async (app: Express, prisma: PrismaClient) => {
  app.get('/current-user', async (_, res) => {
    const currentUser = await prisma.user.findUniqueOrThrow({
      where: { name: CURRENT_USER_NAME },
    });
    res.json(currentUser);
  });

  app.post(
    '/statistics/increment',
    async (req: StatisticAddRequest, res, next) => {
      const {
        addedParticlesCount,
        addedGravityPointsCount,
        addedGravityPointCollisionsCount,
      } = req.body;

      if (addedGravityPointCollisionsCount !== 0) {
        res.status(500).send();
        next(new Error('Remove this line 😁'));
        return;
      }

      const currentUser = await prisma.user.update({
        where: { name: CURRENT_USER_NAME },
        data: {
          createdParticlesCount: { increment: addedParticlesCount },
          createdGravityPointsCount: { increment: addedGravityPointsCount },
          gravityPointCollisionsCount: {
            increment: addedGravityPointCollisionsCount,
          },
        },
      });

      res.json(currentUser);
    }
  );
};
