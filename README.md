# MockBot6000
A discord bot that mocks recent posts by a user, or your own custom text!

## How to use
1. Install NodeJS on your host computer by going to this URL and installing the build for your system/server. https://nodejs.org/en/
2. Set up a bot on Discord's Developer portal here: https://discord.com/developers/applications
3. Clone the build into a folder on your server.
4. Build a config.json file with:
  - clientId (this is the ApplicationID of your application obtained from the Discord Dev Portal)
  - guildId (this is the ID of the server you will be adding the commands to)
  - token (this is the token that links your code to the Discord Developer API)
5. Add the bot to the server you want.
6. Run command `npm install` while CD'd in the directory to install all the required packages.
7. Run command `node deploy-commands.js` to push the commands to the server.
8. Run command `node index.js` to begin hosting the bot!
