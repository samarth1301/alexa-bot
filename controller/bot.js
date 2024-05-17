const dialogflow = require('dialogflow');
const config = require('../config/devKey');

const projectId = config.googleProjectId;
const sessionId = config.dfSessionId;
const creds = {
    client_email : config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId, credentials : creds});


const query = async(userText = "Hi",userId="123")=>{
   
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
    const request = {
        session: sessionPath,
        queryInput:{
            text: {
                text:userText,
                languageCode: config.dfLang
            }
        }
    }
    try {
        const response = await sessionClient.detectIntent(request);
        return response;
    } catch (error) {
        console.log('this is error',error);
    }
}

module.exports = {query};