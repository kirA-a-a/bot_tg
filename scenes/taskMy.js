const { Telegraf, Markup, Scenes, session, Composer} = require('telegraf');

const taskList = require("./taskAdd.js")

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        ctx.replyWithHTML(`Твои задачи: `)
        ctx.replyWithHTML(`${taskList.taskList}`)
        console.log(taskList.taskList)
        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }
})

const myTasksScene = new Scenes.WizardScene("myTasksWizard", startStep)
module.exports = myTasksScene