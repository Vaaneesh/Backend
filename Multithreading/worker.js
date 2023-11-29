let {parentPort}=require('worker_threads');

let count=0
for(i=0;i<20_000_000_000;i++){
    count++
}
parentPort.postMessage(count);