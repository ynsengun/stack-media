import {Media} from "../Model/Media/Media";

class MediaMapping{
    public map(mediaModel): Media {
        if(!mediaModel) return null;
        return {
            mediaId: mediaModel.mediaId || null,
            publishUsername: mediaModel.publishUsername || null,
            name: mediaModel.name || null,
            description: mediaModel.description || null,
            path: mediaModel.path || null,
            duration: mediaModel.duration || null,
            uploadDate: mediaModel.uploadDate || null,
            seasonNumber: mediaModel.seasonNumber || null,
            episodeNumber: mediaModel.episodeNumber || null,
            emmyAward: mediaModel.emmyAward || null,
            oscarAward: mediaModel.oscarAward || null
        };
    }
}

export default new MediaMapping();