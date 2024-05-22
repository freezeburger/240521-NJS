const getDataCallback = require('./file-reader.js').getDataCallback

/* 
//9.245ms
console.time('Sync API 100');
for (let index = 0; index < 100; index++) {
    fns.getDataSync();
}
console.timeEnd('Sync API 100');

//61.078ms
console.time('Sync API 1000');
for (let index = 0; index < 1000; index++) {
    fns.getDataSync();
}
console.timeEnd('Sync API 1000');

//253.4ms
console.time('Sync API 5000');
for (let index = 0; index < 5000; index++) {
    fns.getDataSync();
}
console.timeEnd('Sync API 5000'); */

//7.205ms
/* console.time('Callback API 100');
for (let index = 0; index <= 100; index++) {
    fns.getDataCallback(()=> {
        if(index === 100 ) console.timeEnd('Callback API 100');
    })
} */

//46.303ms
/* console.time('Callback API 1000');
for (let index = 0; index <= 1000; index++) {
    fns.getDataCallback(()=> {
        if(index === 1000 ) console.timeEnd('Callback API 1000');
    })
}
 */

// 204.117ms
/* console.time('Callback API 5000');
for (let index = 0; index <= 5000; index++) {
    fns.getDataCallback(()=> {
        if(index === 5000 ) console.timeEnd('Callback API 5000');
    })
} */



// 10.833ms
/* console.time('Promise API 100');
for (let index = 0; index <= 100; index++) {
    fns.getDataPromise().then(()=> {
        if(index === 100 ) console.timeEnd('Promise API 100');
    })
}
 */

// 70.781ms
/* console.time('Promise API 1000');
for (let index = 0; index <= 1000; index++) {
    fns.getDataPromise().then(()=> {
        if(index === 1000 ) console.timeEnd('Promise API 1000');
    })
}
 */

// 298.409ms
/* console.time('Promise API 5000');
for (let index = 0; index <= 5000; index++) {
    fns.getDataPromise().then(()=> {
        if(index === 5000 ) console.timeEnd('Promise API 5000');
    })
}
 */

// 24.649ms
/* console.time('Event API 100');
for (let index = 0; index <= 100; index++) {
    fns.getDataStreamEvent().on('complete',()=> {
        if(index === 100 ) console.timeEnd('Event API 100');
    })
}
 */


// 114.048ms
/* console.time('Event API 1000');
for (let index = 0; index <= 1000; index++) {
    fns.getDataStreamEvent().on('complete',()=> {
        if(index === 1000 ) console.timeEnd('Event API 1000');
    })
}
 */

// 393.438ms
/* console.time('Event API 5000');
for (let index = 0; index <= 5000; index++) {
    fns.getDataStreamEvent().on('complete',()=> {
        if(index === 5000 ) console.timeEnd('Event API 5000');
    })
}
 */


console.time('Callback API 100000');
for (let index = 0; index <= 2500; index++) {
    setTimeout(()=>{
        getDataCallback(()=> {
            if(index === 2500 ) console.timeEnd('Callback API 100000');
        })
    }, index * 0.1 )
} 
