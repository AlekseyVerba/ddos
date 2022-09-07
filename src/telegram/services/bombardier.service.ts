import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { NotificationService } from './notification.service';

@Injectable()
export class BombardierService {

    constructor(
        private notificationService: NotificationService
    ) {}
    
    connections = 30
    repeat = 3;

    async start(url: string, time: number, idUser: number) {
        // const startScreenResult = await this.startScreen();
        const startBomdardierResult = await this.startBomdardiers(url, time);
        this.notificationService.finishBombardier(idUser, url, time, this.repeat, startBomdardierResult);
    }

    // async startScreen(): Promise<boolean> {
    //     return new Promise(resolve => {
    //         exec('screen -d -m', async (err, stdout, stderr) => {
    //             console.log('start screen ' + err)
    //             console.log('stderr ' + stderr)
    //             console.log('stdout ' + stdout)
    //             if (err === null) {
    //                 resolve(true);
    //             } else {
    //                 resolve(false);
    //             }
    //         })
    //     })
    // }

    async startBomdardiers(url: string, time: number): Promise<boolean[]>{
        return new Promise(async resolve => {
            const resultArr = []
            for (let i = 0; i < this.repeat; i++) {
                const result = await this.startBomdardier(url, time);
                resultArr.push(result);
            }
            resolve(resultArr)
        })
    }

    async startBomdardier(url: string, time: number): Promise<boolean> {
        return new Promise(resolve => {
            exec(`sudo docker run alpine/bombardier -c ${this.connections} -d ${time}s -l ${url}`, async (err, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr)
                if (err === null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
        })
    }
}