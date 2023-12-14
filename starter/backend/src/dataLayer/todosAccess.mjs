import { dynamoDBClient, todoTableName, log } from '../const/todoConst.mjs'

class todosAccess {
  /**
   * Get Todo by user id
   * @param userId
   * @returns todo
   */
  async getTodoByUserId(userId) {
    log.info(`=== Get todo by userid:${userId} ===`)
    //set param for query
    let param = {
      TableName: todoTableName,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId }
    }
    // use query method to get todo
    const data = await dynamoDBClient.query(param).promise()
    return data.Items
  }

  /**
   * Create new a Todo
   * @param todo
   * @returns todo
   */
  async createTodo(todo) {
    log.info('=== Create new a Todo Item ===')
    // set param for put
    let param = {
      TableName: todoTableName,
      Item: todo
    }
    // save toto item
    await dynamoDBClient.put(param).promise()
    return todo
  }

  /**
   * Update a todo
   * @param userId
   * @param todoId
   * @param updateTodoItem
   * @returns updateTodoItem
   */
  async updateTodoById(userId, todoId, updateTodoItem) {
    log.info(
      `=== Update Todo Item has todoId:${todoId} by userId:${userId} ===`
    )
    // set param for update
    let param = {
      TableName: todoTableName,
      Key: { todoId, userId },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeNames: { '#name': 'name' },
      ExpressionAttributeValues: {
        ':name': updateTodoItem.name,
        ':dueDate': updateTodoItem.dueDate,
        ':done': updateTodoItem.done
      },
      ReturnValues: 'UPDATED_NEW'
    }

    // Update todo item
    await dynamoDBClient.update(param).promise()

    return updateTodoItem
  }

  /**
   * Update url todo
   * @param updateTodoUrl
   * @returns updateTodoUrl
   */
  async updateTodoUrlById(todoId, userId, attachmentUrl) {
    log.info(`=== Update Url Todo Item has todoId:${todoId} ===`)

    // Set param
    let param = {
      TableName: todoTableName,
      Key: { todoId: todoId, userId: userId },
      UpdateExpression: 'set #attachmentUrl  = :attachmentUrl',
      ExpressionAttributeNames: { '#attachmentUrl': 'attachmentUrl' },
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      },
      ReturnValues: 'UPDATED_NEW'
    }

    // Update url todo item
    await dynamoDBClient.update(param).promise()
  }

  /**
   * Delete a todo
   * @param userId
   * @param todoId
   * @returns response
   */
  async deleteTodoById(userId, todoId) {
    log.info(
      `=== Delete Todo Item has todoId:${todoId} by userId:${userId} ===`
    )

    // Set param
    let param = {
      TableName: todoTableName,
      Key: { todoId, userId }
    }

    // Delete todo item
    return await dynamoDBClient.delete(param).promise()
  }
}

export default todosAccess
