import { UserData } from './types';

export const getCurrentUser = async (): Promise<UserData> => {
  return fetch(`${import.meta.env.VITE_API_URL}/current-user`).then(
    (response) => response.json()
  );
};

export const incrementUserStatistics = async (data: {
  particlesCount?: number;
  gravityPointsCount?: number;
  gravityPointCollisionsCount?: number;
}): Promise<UserData> => {
  return fetch(`${import.meta.env.VITE_API_URL}/statistics/increment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      addedParticlesCount: data.particlesCount ?? 0,
      addedGravityPointsCount: data.gravityPointsCount ?? 0,
      addedGravityPointCollisionsCount: data.gravityPointCollisionsCount ?? 0,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error(
        'Something went wrong! Fortunately, I have distributed tracing!.'
      );
    }
    return response.json();
  });
};
