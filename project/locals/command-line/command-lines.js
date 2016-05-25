module.exports = function(commander) {
    commander.command('helloworld-local')
        .arguments('[name]')
        .action(require('./lib/helloworld-local'))
}