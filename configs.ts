import { dotEnvLoad } from './deps.ts'

await dotEnvLoad({ export: true })
export const BOT_TOKEN = Deno.env.get('BOT_TOKEN') || ''
export const BOT_ID = BigInt(atob(BOT_TOKEN.split('.')[0]))
export const AC_SERVER_PATH = Deno.env.get('AC_SERVER_PATH') || ''
export const AC_SERVER_EXEC = Deno.env.get('AC_SERVER_EXEC') || ''
