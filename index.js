let os = require("os")
const mqtt = require('mqtt');
const mosquittoClient = mqtt.connect('mqtt://test.mosquitto.org:1883');

// Fixed amount
let osMessage
let start = 0
let end = 10000

// Data from os library
let [{ model, speed }] = os.cpus()
let freeMem = os.freemem()
let totalMem = os.totalmem()

// Callback function, where broadcasting msg every 1,5seconds
let intervalFunction = function () {


    if (start < end) {
        start++

        [{ model, speed }] = os.cpus()
        freeMem = os.freemem()
        totalMem = os.totalmem()

        osLog()
        console.log("Packet nro: " + start)

        osMessage = { model, speed, freeMem, totalMem }

        //Current Topic + msg
        mosquittoClient.publish('/cpu-broadcaster/test', JSON.stringify(osMessage))


    } else {

        console.log("End of transmission")
        clearInterval(sendingInterval)
    }
}

// Referencing to variable & calling setInterval every 1,5s
let sendingInterval = setInterval(intervalFunction, 1500)

function osLog() {
    console.log(os.cpus())
    console.log(os.freemem()) //test
    console.log(os.totalmem())
}