const Discord = require('discord.js');
const cfg = require('./config.json');
const fs = require('fs');
const gdclient = require('node-geometry-dash');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const GD = new gdclient();

fs.readdir('./commands/', (err, files) => {
  if(err) console.error(err);

  let cmds = files.filter(f => f.split('.').pop() === 'js');
  
  if(cmds.lenght <= 0) {
    return console.log('No command files found...');
  }

  console.log(`Loading ${files.length} commands...`);

  cmds.forEach((f, i) => {
    const command = require(`./commands/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    client.commands.set(command.help.name, command);
  }); 
});

client.on('ready', () => {
    console.log(`Ready! logged in as ${client.user.tag}`);
    client.user.setActivity(`${client.users.size} People building`, {
        type: 'WATCHING'
    })
});

client.on('message', message => {
    let args = message.content.slice(cfg.prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.channel.id === "431522258452742191" || message.channel.id === "445538420945584148") {
        message.react("453605515302535189").then(mesg => {
            message.react("476469165675249674")
        });
    }

    if (message.author.bot) return;

    let entrylevel = message.content.split('\n');
    // Suggestion / vote channel
    if (message.channel.id === "451869794401255454" || message.channel.id === "466408542862180352") {
        if (/*!message.content.startsWith("<:blobcouncil:445538308483842048>") || */!message.content.startsWith("<:blobcouncil:470636117021163531>")) {
            message.delete();
            message.reply("Please start with your message with <:blobcouncil:470636117021163531>").then(msg => {
                msg.delete(5000)
            });
            return;
        }
    
        message.react("453605515302535189").then(mesg => {
            message.react("476469165675249674")
        });
    }

    // Entries channel
    if (message.channel.id === "490545711797108776" || message.channel.id === "486773034490003457") {
        if (message.author.bot) return;

        if (!isNaN(entrylevel[1])) {
            let lvlID = entrylevel[1];
            console.log(lvlID);

            GD.levels(lvlID).then(level => {
                console.log(level);
                let embed = new Discord.RichEmbed()
                    .addField(`**${level[0].name} - ${level[0].author.name}**`, `${level[0].description}`)
                    .setFooter(`${level[0].coins} coins, ${level[0].length}, ${level[0].downloads} downloads, ${level[0].likes} likes`, message.author.avatarURL);

                client.channels.get("431522258452742191").send(embed)
            })
            return;
        } else {
            return;
        }
    }

    if (!message.content.startsWith(cfg.prefix)) return;

    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)]

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        message.channel.send(`Sorry, ${cmd} is not an invalid command or there has been an error, The owner of this bot has been notified of this error and will be fixing it later`);
        console.log(e.stack);

        let clonto = message.channel.client;
        let Alten = clonto.fetchUser('184061887212814336')
        .then(Alten => {
            Alten.send(`fix this you fuck \n\`\`\`js\n${e.stack}\`\`\``)
        })
    }
})

client.login(cfg.token);