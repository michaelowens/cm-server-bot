import {
  ApplicationCommandOptionTypes,
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from '../../deps.ts'
import { AcServerManager } from '../../manager.ts'
import { createCommand } from './mod.ts'

createCommand({
  name: 'acstart',
  description: 'Start the server',
  options: [
    {
      name: 'preset',
      description: 'Which preset to start',
      type: ApplicationCommandOptionTypes.String,
      required: true,
    },
  ],
  type: ApplicationCommandTypes.ChatInput,
  scope: 'Global',
  execute: async (bot, interaction) => {
    const option = interaction.data?.options?.find((o) => o.name === 'preset')
    if (!option) {
      return
    }

    const manager = AcServerManager.getInstance()
    const presets = await manager.getPresets()
    const preset = option.value as string

    if (!presets.includes(preset as string)) {
      await bot.helpers.sendInteractionResponse(
        interaction.id,
        interaction.token,
        {
          type: InteractionResponseTypes.ChannelMessageWithSource,
          data: {
            content: `Invalid preset! Available options are: ${presets.join(
              ', '
            )}`,
          },
        }
      )
      return
    }

    await bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `Starting server with **${preset}** preset!`,
        },
      }
    )

    manager.startServer(preset)
  },
})
