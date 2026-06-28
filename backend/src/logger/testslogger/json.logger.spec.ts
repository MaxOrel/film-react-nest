import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log message in JSON format', () => {
    logger.log('Test message');
    const logged = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    expect(logged.level).toBe('log');
    expect(logged.message).toBe('Test message');
    expect(logged.timestamp).toBeDefined();
  });

  it('should error message in JSON format', () => {
    logger.error('Error message');
    const logged = JSON.parse(consoleErrorSpy.mock.calls[0][0]);
    expect(logged.level).toBe('error');
    expect(logged.message).toBe('Error message');
  });

  it('should include context in JSON', () => {
    logger.log('Context message', 'MyContext');
    const logged = JSON.parse(consoleLogSpy.mock.calls[0][0]);
    // optionalParams приходит как массив массивов
    expect(logged.context).toEqual([['MyContext']]);
  });
});