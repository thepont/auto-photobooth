var jasmine = require('jasmine');
var testRunner = new jasmine();
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
require('app-module-path').addPath('./src');
require('babel-register')({
    presets: ['blueflag']
});
process.on('unhandledRejection', function(reason, p){
    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    process.exit(-1);
});
testRunner.addReporter(new SpecReporter());
testRunner.loadConfig({
    spec_dir: './src',
    spec_files: [
        '**/__tests__/*.spec.js'
    ]
});
testRunner.execute();