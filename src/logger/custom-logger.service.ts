import { LoggerService } from '@nestjs/common';
import { Logger } from 'tslog';

export class CustomLoggerService implements LoggerService {
  private logger: Logger<CustomLoggerService>;

  constructor() {
    this.logger = new Logger<CustomLoggerService>({});
  }

  private getMessage(
    message: any,
    level: 'error' | 'info' | 'warn',
    context?: string,
  ): any {
    return JSON.stringify({
      context,
      msg: message,
      level,
      time: new Date().toISOString(),
    });
  }

  log(message: any, context?: string): void {
    this.logger.info(this.getMessage(message, 'info', context));
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(this.getMessage(message, 'error', context));
    if (trace) {
      this.logger.error(trace);
    }
  }

  warn(message: any, context?: string): void {
    this.logger.warn(this.getMessage(message, 'warn', context));
  }

  debug?(message: any, context?: string): void {
    this.logger.debug(this.getMessage(message, 'info', context));
  }

  verbose?(message: any, context?: string): void {
    this.logger.debug(this.getMessage(message, 'info', context));
  }

  fatal?(message: any, context?: string): void {
    this.logger.fatal(this.getMessage(message, 'error', context));
  }
}
