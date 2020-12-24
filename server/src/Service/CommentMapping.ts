import {Comment} from "../Model/Comment/Comment";

class CommentMapping{
    public map(commentModel): Comment {
        if(!commentModel) return null;
        return {
            commentId: commentModel.commentId || null,
            username: commentModel.username || null,
            mediaId: commentModel.mediaId || null,
            timeStamp: commentModel.timeStamp || null,
            text: commentModel.text || null,
            subComments: commentModel.subComments || null,
            parentId: commentModel.parentId || null
        };
    }
}

export default new CommentMapping();