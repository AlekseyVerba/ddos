import { Module } from '@nestjs/common';
import { TelegramUpdate } from './telegram.update';
import { DependenciesService } from './services/dependencies.service';
import { BombardierService } from './services/bombardier.service';
import { TelegramUtilService } from './services/telegram.util.service';
import { TelegramMessageService } from './services/telegramMessage.service';
import { NotificationService } from './services/notification.service';

@Module({
    providers: [
        TelegramUpdate,
        DependenciesService,
        BombardierService,
        TelegramUtilService,
        TelegramMessageService,
        NotificationService
    ]
})
export class TelegramModule {}