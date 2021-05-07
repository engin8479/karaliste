const discord = require('discord.js');
const { Database } = require('nukleon');
const db = new Database("plasmic.json");
const ayarlar = require('../ayarlar.json')
exports.run = async(client, message, args) => {
    if(message.author.id !== "649169975269130275") return message.channel.send('Bu komut bot sahibine özeldir!')
    let prefix = ayarlar.prefix
    const yardım = new discord.MessageEmbed()
    .setTitle('Kara Liste Sistemi')
    .setDescription(`${prefix}kara-liste ekle @kişi \n \n ${prefix}kara-liste çıkar @kişi`)
    if(!args[0]) return message.channel.send(yardım)
    if(args[0] == "ekle") {
    let engin = message.mentions.users.first() || client.users.cache.get(args[1])
    if(!engin) return message.channel.send('Lütfen kara listeye alınacak kişiyi etiketleyiniz ve ya idini giriniz!')
    let kontrol = db.fetch(`karaliste_${engin.id}`)
    if(kontrol) return message.channel.send('Bu kişi zaten karalistede!')
    if(!kontrol) {
    db.set(`karaliste_${engin.id}`, engin.id)
    const embed = new discord.MessageEmbed()
    .setTitle(engin.username + " adlı kişi karalisteye alındı")
    .setDescription('Sahibim başarı ile kişiyi karalisteye aldım!')
    return message.channel.send(embed)
    }
    }
    if(args[0] == "çıkar") {
    let engin = message.mentions.users.first()
    if(!engin) return message.channel.send('Lütfen kara listeden çıkarılacak ')
    let kontrol = db.fetch(`karaliste_${engin.id}`)
    if(!kontrol) return message.channel.send('Bu kişi zaten karalistede değil!')
    if(kontrol) {
    db.remove(`karaliste_${engin.id}`)
    const embed = new discord.MessageEmbed()
    .setTitle(engin.username + " kişi karalisteden çıkarıldı")
    .setDescription(`Sahibim başarı ile kişiyi karalisteden çıkardım!`)
    return message.channel.send(embed)
    }
    }
}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["karaliste"]
}
exports.help = {
name: "kara-liste"
}
//komutlara
	if (db.fetch(`karaliste_${message.author.id}`)) return message.channel.send('Kara listede olduğun için bu komutu kullanamazsın!')
//message.js dosyanıza
