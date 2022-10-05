let { GiveawayManager } = require("discord-giveaways");
let { giveawaySchema } = require("../models");
class ShirokoGiveawayManager extends GiveawayManager {
  async getAllGiveaways() {
    return await giveawaySchema.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await giveawaySchema.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await giveawaySchema.updateOne({ messageId }, giveawayData).exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await giveawaySchema.deleteOne({ messageId });
    return true;
  }
}

module.exports = ShirokoGiveawayManager;
