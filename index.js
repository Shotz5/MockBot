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

    if (commandName == 'mock-text') {
        await interaction.reply(mock(interaction.options.getString('text')))
    } else if (commandName == 'mock-user') {
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
                let dummyMessage = "<@" + user.id + "> is stupid.\n\n" + mock(recentmsg.content)
                interaction.reply(dummyMessage)
                
            }
        })
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