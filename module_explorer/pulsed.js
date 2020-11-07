const Pulser = require('./pulser');

const pulser = new Pulser();

pulser.on('pulse', () => {
    console.log('Pulse triggered');
});

pulser.start();