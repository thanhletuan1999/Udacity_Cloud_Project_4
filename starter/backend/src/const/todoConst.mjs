import AWS from 'aws-sdk'
import AWSXRAY from 'aws-xray-sdk'
import { createLogger } from '../utils/logger.mjs'
const instanceAWS = new AWSXRAY.captureAWS(AWS)
const dynamoDBClient = new instanceAWS.DynamoDB.DocumentClient()
const s3 = new instanceAWS.S3({ signatureVersion: 'v4' })
const bukketName = process.env.S3_BUCKET
const todoTableName = process.env.TODOS_TABLE
const log = createLogger(instanceAWS)

export { instanceAWS, dynamoDBClient, s3, bukketName, todoTableName, log }