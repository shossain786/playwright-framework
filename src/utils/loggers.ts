import * as fs from 'fs'
import * as path from 'path'

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'

const getTimestamp = (): string => new Date().toISOString();

const formatMessage = (level: LogLevel, message: string) => {
    return `[${getTimestamp()}] [${level}]: ${message}`
}

const writeToFile = (message: string): void => {
  const logDir = path.resolve(process.cwd(), 'reports');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  fs.appendFileSync(path.join(logDir, 'test.log'), message + '\n');
};

export const logger = {
  info: (message: string): void => {
    const formatted = formatMessage('INFO', message);
    console.log(formatted);
    writeToFile(formatted);
  },

  warn: (message: string): void => {
    const formatted = formatMessage('WARN', message);
    console.warn(formatted);
    writeToFile(formatted);
  },

  error: (message: string): void => {
    const formatted = formatMessage('ERROR', message);
    console.error(formatted);
    writeToFile(formatted);
  },

  debug: (message: string): void => {
    if (process.env.DEBUG) {
      const formatted = formatMessage('DEBUG', message);
      console.log(formatted);
      writeToFile(formatted);
    }
  },
}