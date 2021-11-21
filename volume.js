const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("هیچ اهنگی پخش نیست").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("باید جوین یه وویس چنل بشی").catch(console.error);

    if (!args[0]) return message.reply(`🔊 صدای اهنگ شد: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("لطفا یک عدد را بنویسید بعد کامند").catch(console.error);
    if (Number(args[0]) > 100 || Number(args[0]) < 0 )
      return message.reply("یک عدد از بین 0 تا 100 انتخاب کنید").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`صدای اهن شد: **${args[0]}%**`).catch(console.error);
  }
};
