import {Command} from "../../Structure/Command";
import {BaseClient} from "../../Structure/Client";
import {ChatInputCommandInteraction} from "discord.js";

export default class extends Command {
    constructor() {
        super({
            name: 'say',
            description: 'Make the bot say something!',
            options: [{
                name: 'message',
                description: 'The message the bot will say',
                type: 3,
                required: true
            }]
        });
    }

    async run (client: BaseClient, interaction: ChatInputCommandInteraction) {
        if (!interaction.channel) return;
        let msg = interaction.options.getString("message")
        if (!msg) return;   
        interaction.reply({content: "Envoie du messsage...", ephemeral: true})
        interaction.channel.send({content: msg})
    }
}