import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { DdosService } from './services/ddos.service';

@Module({
    providers: [
        TelegramUpdate,
        DdosService
    ]
})
export class TelegramModule {}