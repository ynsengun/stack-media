export interface Comment{
    commentId: string
    username: string
    mediaId: string
    timeStamp: string
    text: string
    subComments: Comment[]
    parentId: string
}