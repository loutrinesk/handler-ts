import {Client, Collection, REST, Routes} from "discord.js";
import {Command} from "./Command";
import {readdirSync} from 'node:fs';
import * as dotenv from "dotenv";
import {Ping} from "../Commands/misc/ping";

dotenv.config();
export class BaseClient extends Client {
    public commands: Collection<string, Command>
    constructor(options = {
        fetchAllMembers: true,
        intents: 33409
    }) {
        super(options);
        this.setMaxListeners(15);
        this.commands = new Collection();

        this.loadBot(process.env.TOKEN, process.env.CLIENT_ID)
    }
    private loadBot(token: any, clientID: any) {
        this.login(token).then(() => {
            console.log("Connexion au bot réussie")
        }).catch(() => {
            throw new Error("Impossible de se connecter au bot")
        });

        this.loadCommand(token, clientID);
    }
    private loadCommand(token: any, clientID: any) {
        let cmd: any[] = [];
        const subFolders = readdirSync('./src/Commands');
        for (const category of subFolders) {
            const commandFiles = readdirSync(`./src/Commands/${category}`).filter(file => file.endsWith(".ts"));
            for (const commandFile of commandFiles) {
                try {
                    //@ts-ignore
                    const Command = new (Object.values(require(`../Commands/${category}/${commandFile}`))[0])(this);
                    cmd.push({
                        name: Command.name,
                        description: Command.description,
                        options: Command.options || null
                    })
                    console.log(Command.name)
                    this.commands.set(Command.name, Command);
                } catch(e) {
                    console.error(e);
                }
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(token);

        setTimeout(async () => {
            try {
                await rest.put(Routes.applicationCommands(clientID), {
                    body: cmd
                });
            } catch (error) {
                console.error(error);
            }
        }, 5000);
    }
}
