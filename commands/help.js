const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    fs.readdir("./commands/", (err, files) => {
        if(err) console.error(err);

        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        if(jsfiles.length <= 0) {
            console.log("No commands to load!");
            return;
        }

        var namelist = "";
        var desclist = "";
        var usage = "";
        let embed = new Discord.RichEmbed();
        
        // send help text
        if (message.content === '!help') {
            let result = jsfiles.forEach((f, i) => {
                let props = require(`./${f}`);
                
                if (props.help.hidden === true) return;

                namelist = props.help.name;
                desclist = props.help.desc;
                usage = props.help.usage;

                if (props.help.mod === true) {
                    embed.addField(`**${namelist} <:modBadge_01_001:490524330464378900>**`, usage, true);
                } else {
                    embed.addField(`**${namelist}**`, usage, true);
                }
            });
        } else {
            let cmdtohelp = args[0];
            let props2 = require(`./${cmdtohelp}.js`);

            namelist = props2.help.name;
            desclist = props2.help.desc;
            usage = props2.help.usage;

            embed.addField(`**${namelist}**`, `${desclist}\nUsage: ${usage}`, true);
        }
        message.channel.send(embed);
    })
}

module.exports.help = {
    name: "help",
    desc: "show all commands information",
    usage: "!help [command name]",
    hidden: false,
    mod: false
}
