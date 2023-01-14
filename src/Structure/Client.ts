import { Client, Collection, REST, Routes } from "discord.js";
import { Command } from "./Command";
import { readdirSync } from "node:fs";
import * as dotenv from "dotenv";
dotenv.config();

export class BaseClient extends Client {
    public commands: Collection<string, Command>;
    constructor(
        options = {
            fetchAllMembers: true,
            intents: 33409,
        }
    ) {
        super(options);
        this.setMaxListeners(15);
        this.commands = new Collection();

        this.loadBot(process.env.TOKEN, process.env.CLIENT_ID);
    }
    private loadBot(token: any, clientID: any) {
        this.login(token)
            .then(() => {
                console.log("[HANDLER] Connexion au bot réussie.");
            })
            .catch(() => {
                throw new Error("[HANDLER] Impossible de se connecter au bot");
            });

        try {
            this.loadCommand(token, clientID);
            console.log("[HANDLER] Toutes les commandes ont été chargés.");
        } catch (e) {
            console.log("[HANDLER] Erreur durant le chargement des commandes: " + e);
        }

        try {
            this.loadEvents();
            console.log("[HANDLER] Tous les events ont été chargés.");
        } catch (e) {
            console.log("[HANDLER] Erreur durant le chargement des events: " + e);
        }
    }
    private loadCommand(token: any, clientID: any) {
        let cmd: any[] = [];
        const subFolders = readdirSync("./src/Commands");
        for (const category of subFolders) {
            const commandFiles = readdirSync(`./src/Commands/${category}`).filter(
                (file) => file.endsWith(".ts")
            );
            for (const commandFile of commandFiles) {
                try {
                    //@ts-ignore
                    const Command = new (Object.values(
                        require(`../Commands/${category}/${commandFile}`)
                    )[0]);
                    cmd.push({
                        name: Command.name,
                        description: Command.description,
                        options: Command.options || null,
                    });
                    console.log("[COMMANDS] Commande " + Command.name + " chargée.");
                    this.commands.set(Command.name, Command);
                } catch (e) {
                    console.error(e);
                }
            }
        }

        const rest = new REST({
            version: "9",
        }).setToken(token);

        setTimeout(async () => {
            try {
                await rest.put(Routes.applicationCommands(clientID), {
                    body: cmd,
                });
            } catch (error) {
                console.error(error);
            }
        }, 5000);
    }

    private loadEvents() {
        const subFolders = readdirSync("./src/Events/");
        for (const category of subFolders) {
            const eventFiles = readdirSync(`./src/Events/${category}`).filter(
                (file) => file.endsWith(".ts")
            );
            for (const eventFile of eventFiles) {
                try {
                    //@ts-ignore
                    const Event = new (Object.values(
                        require(`../Events/${category}/${eventFile}`)
                    )[0]);
                    this.on(Event.name, (...args) => Event.run(this, ...args));
                    console.log("[EVENT] Event " + Event.name + " chargé.");
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}
