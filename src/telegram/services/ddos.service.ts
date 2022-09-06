import { Injectable } from '@nestjs/common';
import child_process, { exec } from 'child_process';  

@Injectable()
export class DdosService {
// 
    async start() {
        const child = exec('dir', (error, stdout, stderr) => {
            if (error) {
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
             }
             console.log('stdout: ' + stdout);
             console.log('stderr: ' + stderr);
        });

        child.on('exit', function (code) {
            console.log('Child process exited with exit code '+code);
         });
    }

}