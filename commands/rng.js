module.exports.run = async(client, message, args) => {
    let rng

    if (args[0]) {
        rng = Math.round(Math.random() * args[0])
    } else {
        rng = Math.round(Math.random().toString())
    }
    
    message.channel.send(rng)
}

module.exports.help = {
    name: "rng",
    desc: "Generates a random number | As suggested by L375",
    usage: "!RNG <max number>",
    hidden: false,
    mod: false
}
