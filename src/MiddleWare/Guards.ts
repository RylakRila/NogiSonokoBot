import { ChatInputCommandInteraction } from "discord.js";
import mongoose, { Document } from "mongoose";
import Config from "../Model/Config";

/** 
*   This function is used to check if the guild has a config document in the database.
*   If the guild has a config document, return the document.
*   If the guild doesn't have a config document, create a new one and return it.
*   @param interaction: the interaction object with the command
*   @param configDocument: the config document of the guild, possibly null
*/
export const configGuard = async (
    interaction: ChatInputCommandInteraction, 
    configDocument: (Document & { 
        _id: mongoose.Types.ObjectId, configs: {}[] 
    }) | null
) => {
    if (configDocument) return configDocument;
    
    return await Config.create({
        guildId: interaction.guildId,
        configs: []
    });
}