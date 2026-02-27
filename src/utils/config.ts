import * as dotenv from 'dotenv';
import * as path from 'path';

const environment = process.env.ENVIRONMENT || 'staging';

dotenv.config({ path: path.resolve(process.cwd(), `.env.${environment}`) });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  baseURL: process.env.BASE_URL || '',
  apiURL: process.env.API_URL || '',
  credentials: {
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
  },
  environment,
  timeouts: {
    default: 30000,
    api: 10000,
    element: 5000,
  },
};

export type Config = typeof config;