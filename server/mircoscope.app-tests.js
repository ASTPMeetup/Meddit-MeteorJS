/**
 * Created by Piero on 7/7/2017.
 */
Package.onTest(function (api) {
    api.use('practicalmeteor:mocha');

    // Add any files with mocha tests.
    api.addFiles('posts.tests.js');
});