import {Event} from "../../Structure/Event";
import {CommandInteraction} from "discord.js";
import {BaseClient} from "../../Structure/Client";

export default class extends Event {
    constructor() {
        super({
            name: 'interactionCreate'
        });
    }

    async run(client: BaseClient, interaction: CommandInteraction) {
        if (!interaction.isChatInputCommand()) return;
        if (!interaction.guild) return;
        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`[ERROR] Aucune commande ${interaction.commandName} trouvée.`);
            interaction.reply({content: "Une erreur est survenue, veuillez réessayer plus tard.", ephemeral: true});
            return;
        }

        try {
            await command.run(client, interaction);
            console.log(`[COMMAND] ${interaction.guild.name || "Unknown guild"} | ${command.name} | ${interaction.user.tag}`)
        } catch (e) {
            await interaction.reply({content: "ne erreur est survenue, veuillez réessayer plus tard.", ephemeral: true});
            console.error(`[ERROR] Une erreur est survenue au lancement de la commande ${interaction.commandName} : ${e}`)
        }
    }
}