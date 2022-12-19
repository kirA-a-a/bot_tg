const {
  Telegraf, Markup, Scenes, session,
} = require('telegraf');
require('dotenv').config();

const myTasksScene = require('./scenes/taskMy.js');
const addTasksScene = require('./scenes/taskAdd.js');
const weatherScene = require('./scenes/wheatherInfo.js');

const bot = new Telegraf('5807669918:AAHsVaJlpxasAMciEAhpBA8DkEF22ZLfnqA');

const stage = new Scenes.Stage([myTasksScene, addTasksScene, weatherScene]);
bot.use(session());
bot.use(stage.middleware());

bot.hears('Мои задачи', (ctx) => ctx.scene.enter('myTasksWizard'));
bot.hears('Добавить задачу', (ctx) => ctx.scene.enter('addTasksWizard'));
bot.hears('Узнать погоду', (ctx) => ctx.scene.enter('weatherWizard'));

bot.start(async (ctx) => {
  try {
    await ctx.reply('Что ты хочешь сделать?', Markup.keyboard([
      ['Мои задачи', 'Добавить задачу'],
      ['Узнать погоду'],
    ]).oneTime().resize());
  } catch (e) {
    console.error(e);
  }
});

bot.launch();
