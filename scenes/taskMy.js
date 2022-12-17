const { Telegraf, Markup, Scenes, session, Composer} = require('telegraf');

const taskList = require("./taskAdd.js")
const {WizardScene} = require("telegraf/scenes");

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        ctx.replyWithHTML(`${taskList}`)
        console.log(taskList)
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const myTasksScene = new Scenes.WizardScene("myTasksWizard", startStep)
module.exports = myTasksScene