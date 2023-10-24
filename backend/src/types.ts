import { Request } from 'express';

export interface StatisticAddRequest extends Request {
  body: {
    addedParticlesCount: number;
    addedGravityPointsCount: number;
    addedGravityPointCollisionsCount: number;
  };
}
