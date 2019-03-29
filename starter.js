const https = require('https');
const schedule = require('node-schedule');

function restartServiceHttp () {
    console.log('restarting through http notification server..')

    var rule = new schedule.RecurrenceRule(); //create scheduling rule -> on the days monday, wednesday, friday and saturday at 5:00 utc (which corresponds with 9:00am PST)
    rule.minute = [30,35,40,45,50,55];
    rule.hour = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,0];

    j = schedule.scheduleJob(rule, function(){
        console.log('restarted through http notification server..')
        https.get('https://us-central1-eeneentwee-11449.cloudfunctions.net/app/restart/notifcations', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data));
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
        });
    })


    // setInterval(function() {


    //     console.log('restarted through http notification server..')
    //     https.get('https://us-central1-eeneentwee-11449.cloudfunctions.net/app/restart/notifcations', (resp) => {
    //     let data = '';

    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //     });

    //     // The whole response has been received. Print out the result.
    //     resp.on('end', () => {
    //         console.log(JSON.parse(data));
    //     });

    //     }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    //     });


    // }, 30 * 60 * 1000);
}

restartServiceHttp ()