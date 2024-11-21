export class Environment {
  isProd = import.meta.env.MODE === 'production'
  get logLevel() { return this.isProd ? 'info' : 'trace' }
}

export const env = new Environment()
