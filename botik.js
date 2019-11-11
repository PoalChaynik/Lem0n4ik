const discord = require ('discord.js');

var client = new discord.Client();

const token = "NjQzMTI1Mzk1MjMwNTU2MTcx.Xcg7mA.zYyK28mONtK-MsjRDkvr4fSbzBI";

client.on ("ready", () => {
    console.log ("ready!");

    client.user.setGame ("Хентай с лимоном!");
});

const fs = require("fs");
client.msgs = require ("./msgs.json")


client.on ("guildMemberAdd", member => {

    var role = member.guild.roles.find ("name", "😑(ಥ﹏ಥ) Просто Чел😑");
    member.addRole (role);
}) 

client.on ("guildMemberRemove", member => {

})




const prefix = "/";
client.on ("message", (message) => {

    if (message.author.bot) return;
    
    msg = message.content.toLowerCase();

    if (msg.startsWith (prefix + "привет")) {
        message.reply ('Привет')
    }

    if (message.content.startsWith ("👊")) {
        message.channel.send (":scream_cat:");
    }

    if (msg.startsWith ("/cat")) {
        message.channel.send ("Через силу через боль просыпаюсь в 07:00",{files: ["./images/cat.jpg"]});
    }

    if (msg.startsWith ("write")) {
        editmessage = message.content.slice (6);

        client.msgs [message.author.username] = {
            message: editmessage
        }
        fs.writeFile ("./msgs.json", JSON.stringify (client.msgs, null, 4), err => {
            if (err) throw err;
            message.channel.send ("Сообщение записано");
        });
    }

    if (msg.startsWith ("/get")) {
        let _message = client.msgs[message.author.username].message;
        message.channel.send ("Сообщение: " +_message);
    }

    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.sendMessage('Pong! Ваш пинг `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    }

    if (msg.startsWith ("/full")) {
        message.channel.send ("Фулла не будет, можешь успокоить своего змея!");
    }

    if (msg.startsWith ("/version")) {
        message.channel.send ("Версия:2.0.0");
    }

    if (msg.includes (prefix + "commands")) {
        embed = new discord.RichEmbed ()
            .setAuthor("Комманды")
            .setDescription ("Список всех комманд бота")
            .setFooter ("Создатель бота: PoAl Chan")
            .addField ("/ping","Отображает пинг")
            .addField ("/full","Фулл хочешь?")
            .addField ("/serverinfo","Информация о сервере")
            .addField ("/userinfo","Информация о пользователе")
            .addField ("/version","Отображает версию бота")
            .addField ("/commands","Список Комманд бота")
            .setColor ("ff00f2")
            .setThumbnail(message.guild.iconURL)
        message.channel.send (embed);
    }
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    if (msg.includes (prefix + "serverinfo")) {
        embed = new discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .addField("Название Сервера", message.guild.name, true)
            .addField("ID Сервера", message.guild.id, true)
            .addField("Создатель", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
            .addField("Кол-Во участников | Люди | Боты", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
            .addField("Кол-Во каналов", message.guild.channels.size, true)
            .addField("Кол-Во ролей", message.guild.roles.size, true)
            .setColor ("00ffc7")
            .setThumbnail(message.guild.iconURL)
            .addField("Регион", region[message.guild.region], true)
            .addField("Уровень Верификации", verifLevels[message.guild.verificationLevel], true)
        message.channel.send({embed});
    }

    if (message.content.startsWith(prefix + "userinfo")) {
        let user = message.mentions.users.first() || message.author;

        let a = message.author
        embed = new discord.RichEmbed()
        .setAuthor("Информация о пользователе")
        .setColor('#ff0000')
        .addField("Имя",a.username)
        .addField("Тег",a.tag)
        .addField("Дискриминатор",a.discriminator)
        .addField("Создание аккаунта",a.createdAt)
        .addField("ID",a.id)
        .addField("Вы бот?",a.bot)
        .setThumbnail(a.avatarURL)

        message.channel.send({embed});
    }
    

});

client.login (token);