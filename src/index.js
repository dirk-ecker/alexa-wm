const Alexa = require('alexa-sdk');
const vocable = require('./vocable');
const APP_ID = 'amzn1.ask.skill.254735c4-7d9e-462a-92d6-70bdccf861d7';

const languageStrings = {
    'de-DE': {
        'translation': {
            'SKILL_NAME': 'Vokabeln des Tages',
            'HELP_MESSAGE': "Hallo und willkommen bei Vokabeln des Tages. Vokabeln des Tages liest Dir einfach nur jeden Tag drei neue Vokabeln vor. So lernst Du von Tag zu Tag mehr englische Vorkabeln.",
            'STOP_MESSAGE': 'Tschüss '
        }
    }
};

const requestHandler = function(event, context, callback) {
    console.log('event', JSON.stringify(event));
    console.log('context', JSON.stringify(context));
    const applicationId = event.session.application.applicationId;
    if (applicationId !== APP_ID) {
      callback('Ungültige Application ID');
    }
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
      this.emit('GetVocable');
    },

    'GetVocable': function() {
        let speechOutput = 'Die drei Vokabeln von heute sind <break time="500ms"/>';
        let cardOutput = 'Die drei Vokabeln von heute sind:\n';
        vocable.getActual().then(text => {
          // console.log(text);
          const entries = text.entries();
          let next;
          let i = text.size;
          while((next = entries.next(), i--, !next.done)) {
            const value = next.value;
            const last = (i === 0);
            // console.log(i, last, value)
            speechOutput += last ? ' und <break time="500ms"/>' : '';
            speechOutput += `${value[0]} <break time="1000ms"/> ${value[1]} `;
            speechOutput += last ? '<break time="1000ms"/>Das wars.' : '<break time="2000ms"/>';

            cardOutput += last ? 'und ' : '';
            cardOutput += `${value[0]} bedeutet ${value[1]}\n`;
          }
          this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), cardOutput);
        });
    },

    'AMAZON.HelpIntent': function () {
        this.emit(':tell', this.t('HELP_MESSAGE'));
        this.emit('GetVocable');
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function() {
        this.emit(':ask',
            'Entschuldigung, ich habe Dich nicht verstanden.',
            'Kannst Du das nochmal wiederholen?');
    }
};

exports.handler = requestHandler;