import * as dotEnvSafe from 'dotenv-safe'
import * as path from 'path'

import { Config } from '../types'

if (process.env.NODE_ENV !== 'production') {
  let envPath = '.env'
  
  if (process.env.NODE_ENV) {
    envPath = `${envPath}.${process.env.NODE_ENV}`
  }
  
  dotEnvSafe.config({
    allowEmptyValues: true,
    example: path.resolve(__dirname, '../../.env.example'),
    path: path.resolve(process.cwd(), envPath),
  })
}

const {
  AUTH_TOKEN_EXPIRATION_TIME,
  AUTH_TOKEN_SECRET,
  DB_HOST,
  DB_AUDIT_SCHEMA,
  DB_MAIN_SCHEMA,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  LOGGING_COMBINED_FILE,
  LOGGING_ERROR_FILE,
  LOGGING_LEVEL,
  LOGGING_TYPE,
  NODE_ENV,
  SERVER_PORT,
} = process.env

const config: Config = {
  //   AUTH: {
  //     TOKEN_EXPIRATION_TIME: AUTH_TOKEN_EXPIRATION_TIME,
  //     TOKEN_SECRET: AUTH_TOKEN_SECRET,
  //   },
  DB: {
    // AUDIT_SCHEMA: DB_AUDIT_SCHEMA,
    // MAIN_SCHEMA: DB_MAIN_SCHEMA,
    HOST: DB_HOST || "localhost",
    NAME: DB_NAME || "crawlspace",
    PASSWORD: DB_PASSWORD || "new_password",
    PORT: parseInt(<string>DB_PORT, 10) || 5432,
    USER: DB_USERNAME || "root",
  },
  //   LOGGING: {
  //     COMBINED_FILE: LOGGING_COMBINED_FILE,
  //     ERROR_FILE: LOGGING_ERROR_FILE,
  //     LEVEL: LOGGING_LEVEL,
  //     TYPE: LOGGING_TYPE,
  //   },
  NODE_ENV: NODE_ENV || "development",
  SERVER_PORT: parseInt(<string>SERVER_PORT, 10) || 3000,
}

export default config