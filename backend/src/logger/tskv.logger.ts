import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatValue(value: string): string {
    if (!value) return '';
    return value.replace(/[\n\t]/g, ' ');
  }

  private toFieldString(value: unknown): string {
    if (typeof value === 'string') {
      return value;
    }
    if (value instanceof Error) {
      return value.stack ?? value.message;
    }
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const date = new Date().toISOString();
    const messageStr =
      typeof message === 'string' ? message : JSON.stringify(message);
    let result = `timestamp=${date}\tlevel=${level}\tmessage=${this.formatValue(messageStr)}`;

    optionalParams.forEach((param, index) => {
      result += `\tp${index}=${this.formatValue(this.toFieldString(param))}`;
    });

    return result + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, ...optionalParams));
  }
  error(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('error', message, ...optionalParams));
  }
  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, ...optionalParams));
  }
  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.formatMessage('debug', message, ...optionalParams));
  }
  verbose(message: any, ...optionalParams: any[]) {
    console.log(this.formatMessage('verbose', message, ...optionalParams));
  }
  fatal(message: any, ...optionalParams: any[]) {
    console.error(this.formatMessage('fatal', message, ...optionalParams));
  }
}