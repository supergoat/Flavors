module.exports = function(app) {

    // ******* SERVER ROUTES *******
    // handle things like api calls
    // authentication routes

    // sample api route
    // app.get('/api/nerds', function(req, res) {
    //     // use mongoose to get all nerds in the database
    //     Nerd.find(function(err, nerds) {

    //         // if there is an error retrieving, send the error. 
    //                         // nothing after res.send(err) will execute
    //         if (err)
    //             res.send(err);

    //         res.json(nerds); // return all nerds in JSON format
    //     });
    // });

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // ******* FRONTEND ROUTES *******
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(process.cwd() + '/public/views/index.html'); // load our public/index.html file
    });

};