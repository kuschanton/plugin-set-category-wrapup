import '@twilio-labs/serverless-runtime-types'
import {
  Context,
  ServerlessCallback,
  ServerlessFunctionSignature,
} from '@twilio-labs/serverless-runtime-types/types'

const JWEValidator = require('twilio-flex-token-validator').functionValidator

type AddAttributeToTaskEvent = {
  Token: string,
  taskSid: string,
  attributeKey: string,
  attributeValue: string
}

type AddAttributeToTaskContext = {
  TWILIO_WORKSPACE_SID: string
}

export const handler: ServerlessFunctionSignature<AddAttributeToTaskContext, AddAttributeToTaskEvent> =
  JWEValidator(async function (
    context: Context<AddAttributeToTaskContext>,
    event: AddAttributeToTaskEvent,
    callback: ServerlessCallback
  ) {
    // set up twilio client
    const client = context.getTwilioClient()

    // setup a response object
    const response = new Twilio.Response()
    response.appendHeader('Access-Control-Allow-Origin', '*')
    response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST')
    response.appendHeader('Content-Type', 'application/json')
    response.appendHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With, User-Agent'
    )
    response.appendHeader('Vary', 'Origin')

    // parse data form the incoming http request
    const taskSid = event.taskSid
    const attributeKey = event.attributeKey
    const attributeValue = event.attributeValue

    // retrieve attributes of the original task
    let task = await client.taskrouter
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .tasks(taskSid)
      .fetch()
    let newAttributes = JSON.parse(task.attributes)

    newAttributes = Object.assign(newAttributes, {
      [attributeKey]: attributeValue
    })

    // update task
    await client.taskrouter
      .workspaces(context.TWILIO_WORKSPACE_SID)
      .tasks(taskSid)
      .update({
        attributes: JSON.stringify(newAttributes),
      })

    callback(null, response)
  })
