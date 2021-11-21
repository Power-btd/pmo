const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("هیچ اهنگی برای پخش کردن دوباره نیست").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ اهنگ دوباره پخش شد`).catch(console.error);
    }

    return message.reply("اهنگ تاحالا وایساده نشده.").catch(console.error);
  }
};
