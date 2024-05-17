const express = require('express');

const router = express.Router();
const bot = require('../controller/bot');
router.get('/test', async (req, res) => {
    return res.json({ response: "this is test response for df" });
})


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
                {
                    "version": "1.0",

                    "response": {
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": 'Welcome to Test, How can I help you?',
                        },
                    }
                }
            )
        }
        if (type === 'SessionEndedRequest' || request?.intent?.name == 'AMAZON.StopIntent') {
            return res.json(
                {
                    "version": "1.0",

                    "response": {
                        "outputSpeech": {
                            "type": "PlainText",
                            "text": 'Thank you for using Test, Have a great day.',
                        },
                    }
                }
            )
        }

        const { value: text } = request?.intent?.slots?.text;
        const userId = request.requestId
        const result = await bot.query(text, userId);
        const { queryResult } = result[0];
        const { fulfillmentText } = queryResult;
        return res.json(
            {
                "version": "1.0",

                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": fulfillmentText,
                    },
                }
            }
        );
    } catch (error) {
        console.log(error);
        return res.json(
            {
                "version": "1.0",
                "response": {
                    "outputSpeech": {
                        "type": "PlainText",
                        "text": "Internal Server Error, Please try again later.",
                    },
                }
            }
        );
    }
})

module.exports = router;