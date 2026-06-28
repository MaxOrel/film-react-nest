import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('TSKV line format', () => {
    it('emits tab-separated key=value pairs ending with newline', () => {
      logger.log('ping');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const line = consoleLogSpy.mock.calls[0][0] as string;
      expect(line.endsWith('\n')).toBe(true);
      const pairs = line.trimEnd().split('\t');
      
      // Игнорируем timestamp
      const filteredPairs = pairs.filter(p => !p.startsWith('timestamp='));
      expect(filteredPairs).toEqual(['level=log', 'message=ping']);
    });

    it('maps extra params to p0, p1, ... as string values', () => {
      logger.log('m', 'a', 2);
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const line = consoleLogSpy.mock.calls[0][0] as string;
      const trimmed = line.trimEnd();
      const pairs = trimmed.split('\t');
      const filteredPairs = pairs.filter(p => !p.startsWith('timestamp='));
      
      const map = Object.fromEntries(
        filteredPairs.map((kv) => {
          const eqIdx = kv.indexOf('=');
          return [kv.slice(0, eqIdx), kv.slice(eqIdx + 1)];
        }),
      );

      expect(map.level).toBe('log');
      expect(map.message).toBe('m');
      expect(map.p0).toBe('a');
      expect(map.p1).toBe('2');
    });

    it('replaces tab and newline inside values with spaces', () => {
      logger.log('a\tb\nc');
      expect(consoleLogSpy).toHaveBeenCalledTimes(1);
      const line = consoleLogSpy.mock.calls[0][0] as string;
      const messagePair = line
        .trimEnd()
        .split('\t')
        .find((p) => p.startsWith('message='));
      expect(messagePair).toBeDefined();
      expect(messagePair).toBe('message=a b c');
    });
  });
});