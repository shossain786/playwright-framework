import {
    Reporter,
    TestCase,
    TestResult,
    FullResult,
    Suite,
} from '@playwright/test/reporter';
import { logger } from './logger';
import * as fs from 'fs';
import * as path from 'path';

interface TestSummary {
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  failures: {
    test: string;
    error: string;
  }[];
}

class CustomReporter implements Reporter {
   private summary: TestSummary = {
    total: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    duration: 0,
    failures: [],
  };

  private startTime: number = Date.now();

  onBegin(config: unknown, suite: Suite): void {
    this.startTime = Date.now();
    logger.info(`Starting test run — Total tests: ${suite.allTests().length}`);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    this.summary.total++;

    switch (result.status) {
      case 'passed':
        this.summary.passed++;
        logger.info(`✅ PASSED: ${test.title}`);
        break;
      case 'failed':
        this.summary.failed++;
        logger.error(`❌ FAILED: ${test.title}`);
        this.summary.failures.push({
          test: test.title,
          error: result.error?.message || 'Unknown error',
        });
        break;
      case 'skipped':
        this.summary.skipped++;
        logger.warn(`⏭️  SKIPPED: ${test.title}`);
        break;
    }
  }

  onEnd(result: FullResult): void {
    this.summary.duration = Date.now() - this.startTime;

    const report = {
      ...this.summary,
      duration: `${(this.summary.duration / 1000).toFixed(2)}s`,
      status: result.status,
      timestamp: new Date().toISOString(),
    };

    logger.info('========== TEST RUN SUMMARY ==========');
    logger.info(`Total:    ${report.total}`);
    logger.info(`Passed:   ${report.passed}`);
    logger.info(`Failed:   ${report.failed}`);
    logger.info(`Skipped:  ${report.skipped}`);
    logger.info(`Duration: ${report.duration}`);
    logger.info(`Status:   ${report.status}`);

    if (this.summary.failures.length > 0) {
      logger.error('---------- FAILURES ----------');
      this.summary.failures.forEach(f => {
        logger.error(`Test: ${f.test}`);
        logger.error(`Error: ${f.error}`);
      });
    }

    logger.info('======================================');

    // Save summary to JSON file
    const reportsDir = path.resolve(process.cwd(), 'reports');
    if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(
      path.join(reportsDir, 'test-summary.json'),
      JSON.stringify(report, null, 2)
    );

    logger.info('Test summary saved to reports/test-summary.json');
  }
}
export default CustomReporter;