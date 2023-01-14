import {Command} from "../../Structure/Command";
import {BaseClient} from "../../Structure/Client";
import {CommandInteraction} from "discord.js";

export default class extends Command {
    constructor() {
        super({
            name: 'ping',
            description: 'Pong!'
        });
    }

    async run (client: BaseClient, interaction: CommandInteraction) {
        interaction.reply("Pong!")
    }
}