import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class DependenciesService {

    async checkAllDependencies(chatID: number) {
        const resultDocker = await this.checkDocker();
        const resultScreen = await this.checkScreen();
        console.log(resultDocker);
        console.log(resultScreen);
        if(resultDocker) {
            this.startDocker();
        }

        return resultDocker && resultScreen;

    }


    checkDocker() {
        return new Promise(resolve => {
            exec('docker -v', async (err, stdout, stderr) => {
                console.log('docker check ' + err)
                if (err === null) {
                    resolve(true);
                } else {
                    const resultDownloadScreen = await this.downloadDocker();
                    if (resultDownloadScreen) {
                        const result = await this.checkDocker();
                        resolve(result);
                    } else {
                        resolve(false);
                    }
                }
            })
        })
    }

    checkScreen() {
        return new Promise(resolve => {
            exec('screen -v', async (err, stdout, stderr) => {
                console.log('docker check ' + err)
                if (err === null) {
                    resolve(true);
                } else {
                    const resultDownloadScreen = await this.downloadScreen();
                    if (resultDownloadScreen) {
                        const result = await this.checkScreen();
                        resolve(result);
                    } else {
                        resolve(false);
                    }
                }
            })
        })
    }


    async downloadScreen() {
        return new Promise((resolve, reject) => {
            exec('sudo apt install screen', async (err, stdout, stderr) => {
                console.log('downlaod ' + err)
                if (err === null) resolve(true);
                resolve(false);
            })
        })
    }

    async downloadDocker() {
        return new Promise((resolve, reject) => {
            exec('curl -fsSL https://get.docker.com -o get-docker.sh', async (err, stdout, stderr) => {
                console.log('downlaod ' + err)
                if (err === null) {
                    const resultInstall = await this.installDocker();
                    resolve(resultInstall);
                }
                resolve(false);
            })
        })
    }

    async installDocker() {
        return new Promise((resolve, reject) => {
            exec('sudo sh get-docker.sh', async (err, stdout, stderr) => {
                console.log('install ' + err)
                if (err === null) resolve(true);
                resolve(false);
            })
        })
    }

    async startDocker() {
        return new Promise((resolve, reject) => {
            exec('pgrep -f docker > /dev/null || sudo dockerd', async (err, stdout, stderr) => {
                console.log('start docker ' + err)
                if (err === null) resolve(true);
                resolve(false);
            })
        })
    }

}