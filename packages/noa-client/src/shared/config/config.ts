export class Environment {
  isProd = import.meta.env.MODE === 'production'
  get logLevel() { return import.meta.env.MODE === 'production' ? 'info' : 'trace' }
}

export const env = new Environment()
