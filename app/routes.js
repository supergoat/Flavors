module.exports = function(app) {

    // ******* SERVER ROUTES *******
    // handle things like api calls
    // authentication routes

    // ******* FRONTEND ROUTES *******
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(process.cwd() + '/public/views/index.html'); // load our public/index.html file
    });

};