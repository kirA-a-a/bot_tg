const { Telegraf, Markup, Scenes, session, Composer} = require('telegraf');

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const myTasksScene = new Scenes.WizardScene("myTasksWizard", startStep)
module.exports = myTasksScene