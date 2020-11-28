import {Comment} from "../Model/Comment/Comment";

class CommentMapping{
    public map(commentModel): Comment {
        if(!commentModel) return null;
        return {
            commentId: commentModel.commentId || null,
            userId: commentModel.userId || null,
            mediaId: commentModel.mediaId || null,
            timeStamp: commentModel.timeStamp || null,
            text: commentModel.text || null
        };
    }
}

export default new CommentMapping();