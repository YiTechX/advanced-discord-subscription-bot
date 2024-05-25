const Tesseract = require('tesseract.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client, config) {
        if (message.channel.id !== config.kanal || message.author.bot || !message.attachments.size) return;

        const attachment = message.attachments.first();
        const imagePath = `./images/${attachment.id}.png`;

        const response = await fetch(attachment.url);
        const buffer = await response.buffer();
        fs.writeFileSync(imagePath, buffer);

        Tesseract.recognize(imagePath, 'eng').then(({ data: { text } }) => {
            if (text.includes(config.ytKanalAdi)) {
                const member = message.guild.members.cache.get(message.author.id);
                member.roles.add(config.aboneRolü);

                const embed = new EmbedBuilder()
                    .setTitle('Abone Rolü Verildi')
                    .setDescription(`${message.author} kullanıcısına abone rolü verildi.`)
                    .setColor('VIOLET')
                    .setTimestamp();

                const logChannel = message.guild.channels.cache.get(config.logKanal);
                logChannel.send({ embeds: [embed] });

                message.reply('Abone rolü başarıyla verildi!');
            } else {
                message.reply('Abone rolü verilemedi. Lütfen doğru kanalın ekran görüntüsünü gönderin.');
            }

            fs.unlinkSync(imagePath);
        }).catch(err => {
            console.error(err);
            message.reply('Ekran görüntüsü işlenirken bir hata oluştu.');
        });
    },
};
