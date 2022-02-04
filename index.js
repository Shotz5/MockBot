const { Client, Intents, MessageEmbed } = require("discord.js")
const auth = require("./config.json")

const myIntents = new Intents()
myIntents.add(Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES)

const bot = new Client({ intents: myIntents })

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction

    if (commandName == 'text-mock') {
        await interaction.reply(mock(interaction.options.getString('text')))
    } else if (commandName == 'user-mock') {
        user = interaction.options.getUser('user')
        bot.guilds.cache.get(interaction.guildId).channels.cache.get(interaction.channelId).messages.fetch({
            limit: 50
        }).then(messages => {
            recentmsg = ""
            messages.forEach(m => {
                if (m.author.id == user.id) {
                    if ((m.createdTimestamp > recentmsg.createdTimestamp && m.content != '') || (recentmsg == "" && m.content != "")) {
                        recentmsg = m
                    }
                }
            })

            if (recentmsg.content == "" || recentmsg == "") {
                interaction.reply("User hasn't sent any messages recently!")
            } else {
                let dummyMessage = "<@" + user.id + ">\n\n" + mock(recentmsg.content)
                interaction.reply(dummyMessage)
                
            }
        })
    } else if (commandName == 'vertical-mock') {
        dummyMessage = interaction.options.getString('text')
        targetUser = interaction.options.getUser('user')
        if (dummyMessage.length > 20) {
            interaction.reply({ content: "Sorry! Your message is too long, keep it to below 20 characters please.", ephemeral: true })
        } else {
            if (targetUser) {
                message = "<@" + targetUser.id + ">\n\n" + dummyMessage.split('').join('\n').toUpperCase()
            } else {
                message = dummyMessage.split('').join('\n').toUpperCase()
            }
            interaction.reply(message)
        }
    } else if (commandName == 'reverse-string') {
        dummyMessage = interaction.options.getString('text')
        reversed = dummyMessage.split('').reverse().join('')
        interaction.reply(reversed)
    }
})

function mock(stringgything) {
    newString = ""
    for (i = 0; i < stringgything.length; i++) {
        if (i % 2 == 0) {
            newString = newString + stringgything[i].toUpperCase()
        } else {
            newString = newString + stringgything[i]
        }
    }
    return newString
}

bot.login(auth.token)