/*








                        HI, IF YOU ARE HERE.
                        THEN PLEASE LEAVE
                            THERE IS SOMEONE CALLED 
                            AIZIK#5555
                            THAT WORKED ONE DAY FOR THAT BEUTIFULL SCRIPT
                            AND HE DOESN'T WANT SOMEBODY WILL TAKE HIS CREDIT.                      MADE BY AIZIK#5555
                                IF YOU WANT TO REMOVE CREDIT AT LEAST BE NICE MAN AND NOT THE "BAD ISRAELI" AS WE KNOWN,
                                AND TELL ME FIRST, I WILL ALWAYS AGREE I JUST WANT TO SEE WHOS USING MY CODE :)
                                    I HOPE THAT HELPS A LOT OF YOU EVEN WORLDWIDE.
                                            MADE                    MADE
                                            BY                      BY
                                            AIZIK                   AIZIK
                                            #5555                   #5555
                                            MADE                    MADE
                                            BY                      BY
                                            AIZIK                   AIZIK
                                            #5555                   #5555



                                            BTW I REALLY THINK I DREW HERE SOMETHING LOL
                                                        AND AS YOU KNOW:

                                                        MADE BY AIZIK#5555





























*/
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const { token, prefix, logo, hex_color, community_name, role_access_id, code_length, numbers_in_code, database_host, database_user, database_password, database_base } = require('./config.json');
var mysql = require('mysql')

var con = mysql.createConnection({
    host: database_host,
    user: database_user,
    password: database_password,
    database: database_base
})
con.connect(function(err) {
    if (err) throw err;
    console.log("MySQL connected!")
})

function createCode(code, type, amount) {
            var sql = "INSERT INTO codes (code, type, amount) VALUES('" + code + "', '" + type + "', '" + amount + "')";
            con.query(sql, function (result){
            if (result) { console.log(result) }
            console.log("Code Created Successfully")
    });
}

function sendSuccsess(fromUser, toUser, code, type, amount, chnl, toUserUN) {

    const MadePrivateEmbed = new Discord.MessageEmbed()
	.setColor(hex_color)
    .setTitle('The code has been successfully made.')
    .addFields(
		{ name: 'Code:', value: code},
        { name: 'Type:', value: type, inline: true },
        { name: 'Amount:', value: amount, inline: true },
	)
	.setAuthor(community_name + " Codes System", logo)
	.setTimestamp()
	.setFooter('Made By Aizik#5555', logo);
    toUser.send(MadePrivateEmbed);

    const MadeEmbed = new Discord.MessageEmbed()
	.setColor(hex_color)
    .setTitle('The code has been successfully made.')
	.setDescription(fromUser + ' Created a code to ' + toUserUN)
	.setAuthor(community_name + " Codes System", logo)
	.setTimestamp()
	.setFooter('Made By Aizik#5555', logo);
    chnl.send(MadeEmbed);
}

function randomString() {
    var result = '';
    var length = code_length;
    if (numbers_in_code) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    else {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

function sendusage(chnl) {
    const sendusage = new Discord.MessageEmbed()
	.setColor(hex_color)
	.setTitle('usage: !create <@user> <money/itemname> <amount>')
	.setAuthor(community_name + " Codes System", logo)
	.setTimestamp()
	.setFooter('Made By Aizik#5555', logo);
    chnl.send(sendusage);
}

client.on('ready', () => {
    console.log(community_name + "'s Reedem BOT has been loaded.");
    console.log("Made By Aizik#5555");
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command == "create") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        const toUser = message.mentions.members.first()
        const fromUser = message.author.username
        const toUserUN = message.mentions.users.first().username
        if (toUserUN == undefined)return sendusage(message.channel);
        if (args[1] == undefined)return sendusage(message.channel);
        const type = args[1].toLowerCase()
        const amount = parseInt(args[2])
        if (toUser == undefined) return sendusage(message.channel);
        if (type == undefined) return sendusage(message.channel);
        console.log(type)
        if (amount < 1) return sendusage(message.channel);
        var code = randomString();
        createCode(code, type, amount)
        sendSuccsess(fromUser, toUser, code, type, amount, message.channel, toUserUN)
    }
    if(command == "usage") {
        message.delete()
        if (!message.member.roles.cache.has(role_access_id)) return;
        sendusage(message.channel)
    }
})



client.login(token);