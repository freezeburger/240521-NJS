
console.log('Main')

// NodeJS support l'import synchrone de fichiers .json
const pkg = require('../package.json');
console.dir(pkg.version);

// Si true alors il s'agit du module principal (le premier chargé dans le process)
console.log(module === require.main);


// Un getter est une fonction d'accès à une propriété d'objet
const obj = {
    //name:'obj'
    get name() {
        console.log('Accessing "name" property')
        return 'obj'
    }
}
console.log(obj.name)

// Le mot clef debugger permet la création d'un ppoint d'arrêt depuis le code
// Alternativement : https://nodejs.org/en/learn/diagnostics/live-debugging/using-inspector
debugger


// Une instance nodeJS est un process
console.log(process.pid, /* process */)
process.title = "NodeJS App"


// console.log est similiaire à "process.stdout.write"
const message = "Output Message"
console.log(message);
process.stdout.write(message);

/*
// Les streams sont évennementiels
process.stdin.on('data', function(chunk) {
    process.stdout.write(chunk);
});
*/


// Il est possible de combiner "pipe" les streams en lecture/écriture
const fws = require('fs').createWriteStream('./src/data.txt')
process.stdin.pipe(process.stdout)
process.stdin.pipe(fws)


// console.time ou l'API performance permettent la mesure de l'éxécution d'un code
performance.mark('DATA CREATION START')
//console.time('DATA CREATION')
const SIZE = 10000;
const SUFFIX ='!!!'
const data = new Array(SIZE).fill(true).map(() => ({ code: Math.random() + SUFFIX }));

console.log(data.length)
//console.timeEnd('DATA CREATION')
performance.mark('DATA CREATION END')
console.log(
performance.measure('DATA CREATION START','DATA CREATION END')
)



const assert = require('node:assert/strict');
//assert(Math.random() > 0.5,'OK!')


/* 
Asynchronous Programming

* callback
* Event
* Promise
* (Custom) Observable ?
*/


// Un process NodeJS ne se termine que lorsqu'aucun callback n'est en attente (ou un signal de fin est reçu)
// setTimeout(()=>false,300000)


