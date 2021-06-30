export interface Config {
  //   readonly AUTH: {
  //     readonly TOKEN_SECRET: string
  //     readonly TOKEN_EXPIRATION_TIME: string
  //   }
  readonly DB: {
    // readonly AUDIT_SCHEMA: string
    // readonly MAIN_SCHEMA: string
    readonly HOST: string
    readonly NAME: string
    readonly PASSWORD: string
    readonly PORT: number
    readonly USER: string
  }
  //   readonly LOGGING: {
  //     readonly TYPE: string
  //     readonly LEVEL: string
  //     readonly ERROR_FILE: string
  //     readonly COMBINED_FILE: string
  //   }
  readonly NODE_ENV: string
  readonly SERVER_PORT: number
}