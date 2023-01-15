import {Command} from "../../Structure/Command";
import {BaseClient} from "../../Structure/Client";
import {ChatInputCommandInteraction} from "discord.js";

export default class extends Command {
    constructor() {
        super({
            name: 'ping',
            description: 'Pong!'
        });
    }

    async run (client: BaseClient, interaction: ChatInputCommandInteraction) {
        interaction.reply("Pong!")
    }
}