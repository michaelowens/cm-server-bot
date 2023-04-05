import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts'
import { AcServerManager } from '../../manager.ts'
import { createCommand } from './mod.ts'

createCommand({
  name: 'acstop',
  description: 'Stop the server',
  type: ApplicationCommandTypes.ChatInput,
  scope: 'Global',
  execute: async (bot, interaction) => {
    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Stopping the server!`,
        },
      }
    )

    const manager = AcServerManager.getInstance()
    manager.killServer()
  },
})
