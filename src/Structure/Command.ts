import {BaseClient} from "./Client";
import {CommandInteraction} from "discord.js";

export class Command {
    public enabled: boolean;
    public name: string;
    public devOnly: boolean;
    public description: string;
    public permission: string;

    constructor(options: any) {
        this.name = options.name;
        this.description = options.description;
        this.permission = options.permission;
        this.devOnly = options.devOnly;
        this.enabled = options.enabled;
    }

    async run (client: BaseClient, interaction: CommandInteraction) {}
}