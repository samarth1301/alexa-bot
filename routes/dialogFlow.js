const express = require('express');

const router = express.Router();
const bot = require('../controller/bot');
router.get('/test', async (req, res) => {
    return res.json({ response: "this is test response for df" });
})



const responseJSON = (text)=>{
    return {
        "version": "1.0",

        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": text,
            },
        },
        "reprompt": {
            "outputSpeech": {
              "type": "PlainText",
              "text": "Sorry I did not get you, please go again.",
              "playBehavior": "REPLACE_ENQUEUED"             
            }
          },
       
          "shouldEndSession": false
    }
}

/*
METHOD: POST
PATH: /df/bot
DESC: make request to Dialog flow and return fullfilment text.

*/
router.post('/bot', async (req, res) => {
    
    try {


        // console.log(req.body.request);
        const request = req.body.request
        const { type } = request;
        if (type === 'LaunchRequest') {
            return res.json(
                            responseJSON('Welcome to Test, How can I help you?')
            )
        }
        if (type === 'SessionEndedRequest' || request?.intent?.name == 'AMAZON.StopIntent') {
            return res.json(
                responseJSON('Thank you for using Test, Have a great day.')
            )
        }

        const { value: text } = request?.intent?.slots?.text;
        const userId = request.requestId
        const result = await bot.query(text, userId);
        const { queryResult } = result[0];
        const { fulfillmentText } = queryResult;
        return res.json(
            responseJSON(fulfillmentText)
        );
    } catch (error) {
        console.log(error);
        return res.json(
           responseJSON("Internal Server Error, Please try again later.")
        );
    }
})

module.exports = router;