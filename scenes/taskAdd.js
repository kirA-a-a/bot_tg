const { Telegraf, Markup, Scenes, session, Composer} = require('telegraf');

const taskList = []

const startStep = new Composer()
startStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data = {}
        await ctx.replyWithHTML("<b>Привет, какие задачи мне нужно запомнить?</b>")
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const titleStep = new Composer()
titleStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        await ctx.replyWithHTML(`<b>Ты действиетльно хочешь добавить</b> <i>"${ctx.message.text}"?</i>`)
        await ctx.replyWithHTML(`<b>Ответь <i>да</i> или <i>нет</i>.</b>`)
            taskList.unshift(ctx.message.text)
        return ctx.wizard.next()
    } catch (e) {
        console.error(e)
    }
})

const answerStep = new Composer()
answerStep.on("text", async (ctx) => {
    try {
        ctx.wizard.state.data.title = ctx.message.text
        if (ctx.message.text === "да") {
            await ctx.replyWithHTML(`<b>Хорошо, я запомнил</b>`)
        } else {
            taskList.splice(0,1)
            ctx.replyWithHTML(`<b>Хорошо, я не стал это запонимать</b>`)
        }
        return ctx.scene.leave()
    } catch (e) {
        console.error(e)
    }
})

const addTasksScene = new Scenes.WizardScene("addTasksWizard", startStep, titleStep, answerStep)
module.exports = addTasksScene
module.exports.taskList = taskList