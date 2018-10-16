module.exports.run = async(client, message, args) => {
    let min = +args[0], max = +args[1] || (min = 0, +args[0] || 1)

    message.channel.send(args.some(s => isNaN(s || 0)) ? NaN : Math.floor(Math.random() * (max - min + 1)) + min)
}

module.exports.help = {
    name: "rng",
    desc: "Generates a random number",
    usage: `${process.env.prefix}rng [min number] <max number>`,
    hidden: false,
    mod: false
}
