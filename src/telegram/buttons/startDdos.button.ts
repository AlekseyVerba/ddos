import { Markup } from 'telegraf';

export function startDdos(typeDdos: string) {
    return Markup.inlineKeyboard([
        Markup.button.callback('💣 Start', `ddos:${typeDdos}`)
    ]);
}