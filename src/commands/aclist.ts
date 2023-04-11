import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts'
import { AcServerManager } from '../utils/acservermanager.ts'
import { createCommand } from './mod.ts'

createCommand({
  name: 'aclist',
  description: 'List all the server presets',
  type: ApplicationCommandTypes.ChatInput,
  scope: 'Global',
  execute: async (bot, interaction) => {
    const manager = AcServerManager.getInstance()
    const presets = await manager.getPresets()

    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Available presets: ${presets.join(', ')}`,
        },
      }
    )
  },
})
