import { Context as ContextTelegraf } from 'telegraf';

export interface MainContext extends ContextTelegraf {
    session: {
        action?: 'url' | 'time';
        typeDdos?: 'bombardier';
        url?: string;
        time?: number;
    };
}