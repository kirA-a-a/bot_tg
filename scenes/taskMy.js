const {
  Scenes, Composer,
} = require('telegraf');

const taskList = require('./taskAdd.js');

const startStep = new Composer();
startStep.on('text', async (ctx) => {
  try {
    if (taskList.taskList.length === 0) {
      ctx.replyWithHTML('<b>Ты пока не просил запомнить меня какие-то задачи</b>');
    } else if (taskList.taskList.length !== 0) {
      ctx.replyWithHTML(`Список твоих задач: ${taskList.taskList}.`);
    }
    return ctx.scene.leave();
  } catch (e) {
    console.error(e);
  }
});

const myTasksScene = new Scenes.WizardScene('myTasksWizard', startStep);
module.exports = myTasksScene;
