import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "discord.js";
import * as dotenv from 'dotenv';

import memeCommand from "./Command/meme";
import { memeHandler } from "./Handler/CommandHandler";
import { memberAddHandler, readyHandler } from "./Handler/Handler";

dotenv.config();
const TOKEN = process.env.TOKEN as string;
const CLIENT_ID = process.env.CLIENT_ID as string;

const yuyuyuBot = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
]});
const commands = [
    memeCommand
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

yuyuyuBot.once('ready', readyHandler);

yuyuyuBot.on("guildMemberAdd", memberAddHandler);

yuyuyuBot.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    switch(interaction.commandName) {
        case "meme":
            memeHandler(interaction);
            break;
        default:
            break;
    }
});

(async () => {
    try {
        console.log('Started refreshing app (/) commands.');
        await rest.put(
            Routes.applicationCommands(CLIENT_ID), 
            { body: commands }
        );
        
        yuyuyuBot.login(TOKEN);
    } catch (err) {
        console.error(err);
    }
})();