import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramMessageService {

    finishBombardier(url: string, time: number, repeat: number, result: boolean[]): string {
        const successAttack = result.filter(attack => attack).length;
        const failAttack = result.filter(attack => !attack).length;
        return `
        Bombardier
            Url: ${url} 
            Time: ${time}
            Repeat: ${repeat}
            Success attack: ${successAttack}
            Fail attack: ${failAttack}
        `
    }

}