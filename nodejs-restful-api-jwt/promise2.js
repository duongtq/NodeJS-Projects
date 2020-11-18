const jeffBuysCake = (cakeType) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (cakeType === 'black forest') {
                resolve('black forest cake!');
            } else {
                reject('No cake!');
            }
        }, 1000);
    });
}

const promise = jeffBuysCake('black forest');

promise.then(cake => console.log(cake)).catch(cake => console.log(cake));
