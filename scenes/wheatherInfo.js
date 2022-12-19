const {
  Scenes, Composer,
} = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const startStep = new Composer();
startStep.on('text', async (ctx) => {
  try {
    ctx.wizard.state.data = {};
    await ctx.replyWithHTML('<b>Отправь мне свою геолокацию</b>');
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const geoStep = new Composer();
geoStep.on('message', async (ctx) => {
  try {
    ctx.wizard.state.data.title = ctx.message.location;
    if (ctx.message.location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ctx.message.location.latitude}&lon=${ctx.message.location.longitude}&appid=___&units=metric`;
      const response = await axios.get(url);
      ctx.reply(`${response.data.name}: ${response.data.main.temp} °C`);
    } else {
      ctx.reply('Что-то это не похоже на геолокацию, попробуй еще раз, пожалуйста. \n'
                + '\np.s. Геолокацию нужно скидывать из самого телеграма.\n\n'
                + 'нажав на скрепочку => геолокация');
    }
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const weatherScene = new Scenes.WizardScene('weatherWizard', startStep, geoStep);
module.exports = weatherScene;
