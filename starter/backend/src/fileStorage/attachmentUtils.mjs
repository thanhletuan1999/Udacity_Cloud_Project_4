import { s3, bukketName } from '../const/todoConst.mjs'

export default class attachmentUtils {
  /**
   * Get attachment url
   * @param todoId
   * @returns url
   */
  getAttachmentUrl(todoId) {
    return `https://${bukketName}.s3.amazonaws.com/${todoId}`
  }

  /**
   * Get attachment
   * @param todoId
   * @returns attachment
   */
  getUploadUrl(todoId) {
    return s3.getSignedUrl('putObject', {
      Bucket: bukketName,
      Key: todoId,
      Expires: 300
    })
  }
}
