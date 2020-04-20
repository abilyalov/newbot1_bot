const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1248579291:AAEnWQq1CRBpGRsxBk8ONEuBbJQmBMbFoAo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var someObject = require('./kurs.json');

// Matches "/echo [whatever]"
bot.onText(/\/curse/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Выберите валюту', {
      reply_markup: {
          inline_keyboard: [
              [{
                  text: 'USD',
                  callback_data: 'USD'
              },
              {
                  text: 'RUB',
                  callback_data: 'RUB'
              }]
          ]
      }
  });
});

bot.on('callback_query', query => {
    const id = query.message.chat.id;
    
    
    request('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function(error, response, body) {
        console.log(someObject);
        const data = JSON.parse(body);
        const result = data.filter(item => item.ccy === query.data)[0]; 
        let md = `
        ${result.ccy} => ${result.base_ccy}
        Buy: _${result.buy}_
        `;
        bot.sendMessage(id, md, {parse_mode: 'Markdown'});
    }) 
    
    
});