import {Command} from "../../Structure/Command";
import {BaseClient} from "../../Structure/Client";
import {CommandInteraction} from "discord.js";

export class Ping extends Command {
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