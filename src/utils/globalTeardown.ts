import { FullConfig } from "@playwright/test";
import { logger } from "./logger";
import * as fs from 'fs';
import * as path from 'path';

const AUTH_FILE = path.resolve(process.cwd(), 'src/data/authState.json');

async function globalTeardown(config: FullConfig): Promise<void> {
  logger.info('Running global teardown...');

  try{
    if(fs.existsSync(AUTH_FILE)) {
        fs.unlinkSync(AUTH_FILE);
        logger.info('Authentication file removed.');
    }

    const reportsDir = path.resolve(process.cwd(), 'reports');
    if (fs.existsSync(reportsDir)) {
      const tempFiles = fs.readdirSync(reportsDir).filter(f => f.endsWith('.tmp'));
      tempFiles.forEach(file => {
        fs.unlinkSync(path.join(reportsDir, file));
        logger.info(`Removed temp file: ${file}`);
      });
    }

    logger.info('Global teardown completed.')
  } catch (error) {
    logger.error(`Global teardown failed: ${error}`);
    throw error;
  }
}

export default globalTeardown;