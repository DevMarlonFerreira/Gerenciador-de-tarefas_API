process.on('unhandledRejection', async err => {
    console.error('Unhandled rejection', err);
    return false
});

process.on('uncaughtException', async err => {
    console.error('Uncaught exception', err);
    return false
});