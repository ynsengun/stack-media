import {Media} from "../Model/Media/Media";

class MediaMapping{
    public map(mediaModel): Media {
        if(!mediaModel) return null;
        return {
            mediaId: mediaModel.mediaId || null,
            publishUserId: mediaModel.publishUserId || null,
            name: mediaModel.name || null,
            description: mediaModel.description || null,
            path: mediaModel.path || null,
            duration: mediaModel.duration || null,
            uploadDate: mediaModel.uploadDate || null
        };
    }
}

export default new MediaMapping();