import {Channel} from "../Model/Channel/Channel";

class ChannelMapping{
    public map(channelModel): Channel {
        if(!channelModel) return null;
        return {
            channelId: channelModel.channelId || null,
            title: channelModel.title || null,
            username: channelModel.username || null
        };
    }
}

export default new ChannelMapping();