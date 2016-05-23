module.exports = function(commander) {
    var mainPath = './lib/'

    commander.command('helloworld')
        .description('A hello world seed command... doing nothing but echo your name if it exists')
        .arguments('[name]')
        .action(require(mainPath + 'helloworld'))

    commander.command('seed')
        .description('Update the seed project on an existing matriks-managed project, basically it update the folder of `_matriks_/seed/`')
        .option('-f, --force', 'Force re-clone the seed git repo')
        .option('-d, --dev <dev>', 'Checkout the dev branch of the seed project')
        .option('-v, --seed-version <version>', 'Checkout the version of the seed project')
        .action(require(mainPath + 'seed.js'))

    commander.command('update')
        .description('Easily pull the change from origin and update the seed project')
        .option('-d, --dev <dev>', 'Checkout the dev branch of the seed project')
        .option('-v, --seed-version <version>', 'Checkout the version of the seed project')
        .action(require(mainPath + 'update.js'))

    commander.command('reverse-update')
        .description('If you touch the seed related code on your owned project folder, you can also reverse update to the seed project')
        .action(require(mainPath + 'reverse-update.js'))

    commander.command('use')
        .description('Some dependencies are grouped as theme, e.g. a theme of react will group all the required dependencies and install them')
        .arguments('[themes...]')
        .option('-p', '--prod', 'Install only the production dependencies')
        .option('-f, --force', 'Force re-install all deps of a theme')
        .action(require(mainPath + 'use.js'))


    // "dest": "node ./seed-related/servers/dest.js",
    //     "profile": "node ./seed-related/servers/profile.js",
    //     "dev": "node ./seed-related/servers/server.dev.js",
    //     "server": "node ./seed-related/servers/prod-server-only.js"

    commander.command('dev')
        .description('Start up a dev server')
        .option('-p, --port <port>', 'The port number for the dev server, you can also specify on config adaptor')
        .action(function(opts) {
            require('../servers/server.dev.js')({
                port: opts.port
            })
        })

    commander.command('prod')
        .description('Build the assets in production mode, and start a server to see the result')
        .action(function() {
            require('../servers/server.prod.js')
        })

    commander.command('dest')
        .description('Just build the assets for production. Please see the build note under `project/tmp/`')
        .action(function() {
            require('../servers/dest.js')
        })

    commander.command('server')
        .description('Start up an server run on the production built assets ')
        .action(function() {
            require('../servers/prod-server-only.js')
        })

    commander.command('profile')
        .description('Build the assets in production mode and do benchmarking. Please see the build note under `project/tmp/`')
        .action(function() {
            require('../servers/profile.js')
        })
}