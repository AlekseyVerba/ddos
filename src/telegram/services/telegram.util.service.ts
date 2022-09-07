import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramUtilService {

    checkUrl(url: string) {
        const RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
        return RegExp.test(url);
    }

    checkTime(time: string): number | false {
        const numberTime = +time;

        if (numberTime !== NaN && typeof numberTime === 'number') return numberTime;
        
        return false;
    }
}