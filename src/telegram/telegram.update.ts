import { Update, Start } from 'nestjs-telegraf';
import { MainContext } from '../interfaces/context.interface';
import { DdosService } from './services/ddos.service';

@Update()
export class TelegramUpdate {

    constructor(
        private ddosService: DdosService
    ){}

    @Start()
    async start(ctx: MainContext) {
        ctx.reply('hello');
        this.ddosService.start();
    }
}