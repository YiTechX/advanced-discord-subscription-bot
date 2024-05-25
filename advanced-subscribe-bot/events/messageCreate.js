const Tesseract = require('tesseract.js');
const fs = require('fs');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    name: 'messageCreate',
    async execute(message, client, config) {
        if (message.channel.id !== config.kanal || message.author.bot || !message.attachments.size) return;

        const attachment = message.attachments.first();
        const imagePath = path.join(__dirname, 'images', `${attachment.id}.png`);

        try {
            
            const response = await fetch(attachment.url);
            const buffer = await response.buffer();
            fs.writeFileSync(imagePath, buffer);

            // Process the image using Tesseract
            const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');

            
            const member = await message.guild.members.fetch(message.author.id);
            if (member.roles.cache.has(config.aboneRolü)) {
                await message.reply('Zaten abone rolüne sahipsiniz!');
            } else if (text.includes('Subscribed') || text.includes('Abone Olundu')) {
                await member.roles.add(config.aboneRolü);

                const embed = new EmbedBuilder()
                    .setTitle('Abone Rolü Verildi')
                    .setDescription(`${message.author} kullanıcısına abone rolü verildi.`)
                    .setColor('VIOLET')
                    .setTimestamp();

                const logChannel = message.guild.channels.cache.get(config.logKanal);
                if (logChannel) {
                    await logChannel.send({ embeds: [embed] });
                }

                await message.reply('Abone rolü başarıyla verildi!');
            } else {
                await message.reply('Abone rolü verilemedi. Lütfen doğru kanalın ekran görüntüsünü gönderin.');
            }
        } catch (error) {
            console.error('Error processing image:', error);
            await message.reply('Ekran görüntüsü işlenirken bir hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            
            fs.unlink(imagePath, (err) => {
                if (err) console.error('Error deleting image file:', err);
            });
        }
    },
};

