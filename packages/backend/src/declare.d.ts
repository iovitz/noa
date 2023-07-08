declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV?: 'development' | 'production';
    APP_PORT?: string;
  }
}

export interface LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: string, context: string): any;
  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]): any;
  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]): any;
  /**
   * Write a 'debug' level log.
   */
  debug?(message: any, ...optionalParams: any[]): any;
  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: any, ...optionalParams: any[]): any;
  /**
   * Set log levels.
   * @param levels log levels
   */
  setLogLevels?(levels: LogLevel[]): any;
}
