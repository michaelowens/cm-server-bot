import * as path from 'https://deno.land/std@0.182.0/path/mod.ts'
import { AC_SERVER_EXEC, AC_SERVER_PATH } from './configs.ts'
import { delay } from './deps.ts'

export class AcServerManager {
  process: Deno.Process | null = null

  static instance: AcServerManager
  static getInstance(): AcServerManager {
    if (!AcServerManager.instance) {
      AcServerManager.instance = new AcServerManager()
    }

    return AcServerManager.instance
  }

  isRunning(): boolean {
    return this.process !== null
  }

  async startServer(preset: string) {
    if (this.isRunning()) {
      this.killServer()
      await delay(2000)
    }

    const execPath = path.join(AC_SERVER_PATH, AC_SERVER_EXEC)
    const iniFilename = path.join(
      AC_SERVER_PATH,
      'presets',
      preset,
      'server_cfg.ini'
    )
    const entryIniFilename = path.join(
      AC_SERVER_PATH,
      'presets',
      preset,
      'entry_list.ini'
    )

    this.process = Deno.run({
      cmd: [execPath, '-c', iniFilename, '-e', entryIniFilename],
      cwd: AC_SERVER_PATH,
    })
  }

  killServer() {
    if (!this.isRunning()) {
      return
    }
    this.process?.kill()
    this.process?.close()
    this.process = null
  }

  async getPresets(): Promise<string[]> {
    const presetPath = path.join(AC_SERVER_PATH, 'presets')
    const presets = []
    for await (const dirEntry of Deno.readDir(presetPath)) {
      presets.push(dirEntry.name)
    }
    return presets
  }
}
