import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { MainContext } from 'src/interfaces/context.interface';
import { Telegraf } from 'telegraf';
import { TelegramMessageService } from './telegramMessage.service';

@Injectable()
export class NotificationService {
    constructor(
        @InjectBot() private bot: Telegraf<MainContext>,
        private telegramMessageService: TelegramMessageService
    ) {}

    finishBombardier(id: number, url: string, time: number, repeat: number, result: boolean[]) {
        const message = this.telegramMessageService.finishBombardier(url, time, repeat, result);
        this.bot.telegram.sendMessage(id, message)
    }

    checkAllDependenciesForBombardier(id: number, result) {
        if (result) {
            this.bot.context.session.typeDdos = 'bombardier';
            this.bot.context.session.action = 'url';
            this.bot.telegram.sendMessage(id, 'Everything is good! Provide a website\'s url');
        } else {
            this.bot.telegram.sendMessage(id,'An error has occurred! try later');
        }
    }



}