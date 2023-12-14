import todosAccess from '../dataLayer/todosAccess.mjs'
import attachmentUtils from '../fileStorage/attachmentUtils.mjs'
import { log } from '../const/todoConst.mjs'
import { uuid } from 'uuidv4'

const todosAccessIns = new todosAccess()
const attachmentUtilsIns = new attachmentUtils()

const getTodos = async (userId) => {
  log.info('Get todos:')
  return await todosAccessIns.getTodoByUserId(userId).then((result) => result)
}

const createTodo = async (todo, userId) => {
  log.info('Create todo:')
  const fullTodo = {
    ...todo,
    todoId: uuid(),
    userId: userId,
    attachmentUrl: null,
    createdAt: new Date().toISOString(),
    done: false
  }
  return await todosAccessIns.createTodo(fullTodo).then((result) => result)
}

const updateTodo = async (userId, todoId, updateTodoItem) => {
  log.info('Update todo:')
  return await todosAccessIns.updateTodoById(userId, todoId, updateTodoItem)
}

const deleteTodo = async (userId, todoId) => {
  log.info('Delete todo:')
  return await todosAccessIns.deleteTodoById(userId, todoId)
}

const createAttachmentUrl = async (todoId, userId) => {
  log.info('Create Attachment Url')

  const attachmentUrl = attachmentUtilsIns.getAttachmentUrl(todoId)

  // create update item todo
  await todosAccessIns.updateTodoUrlById(todoId, userId, attachmentUrl)

  return attachmentUtilsIns.getUploadUrl(todoId)
}

export { getTodos, createTodo, updateTodo, deleteTodo, createAttachmentUrl }
