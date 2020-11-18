const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

console.log('Now');

sleep(1000)
.then(v => {
    console.log('After one second');
});


const doHomework = (homework) => {
    return new Promise((resolve, reject) => {
        if (homework === 'ITSS') {
            resolve('Do it now!');
        }
        reject('Do it later');
    });
}

doHomework('Node.js').then(result => console.log(result)).catch(v => console.log(v));


