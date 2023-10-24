import dotenv from 'dotenv';

import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { loadServices } from './services';

dotenv.config();
const isSentryEnabled = process.env.SENTRY_DSN !== undefined;

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

if (isSentryEnabled) {
  Sentry.init({
    debug: true,
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
      new ProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

loadServices(app, prisma);

if (isSentryEnabled) {
  app.use(Sentry.Handlers.errorHandler());
}

app.listen(3003, () => {
  console.log(`🚀 Server ready at: http://localhost:3003`);
  if (isSentryEnabled) {
    console.log('🚀 and Sentry is ready');
  }
});
