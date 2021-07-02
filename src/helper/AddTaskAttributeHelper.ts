export const addTaskAttribute = (token: string, taskSid: string, key: string, value: any) => {
  const body = {
    Token: token,
    taskSid: taskSid,
    attributeKey: key,
    attributeValue: value,
  }
  console.log(body)

  return fetch(`https://${process.env.FLEX_APP_PLUGIN_RUNTIME_DOMAIN}/add-task-attribute`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((t) => console.log(`addTaskAttribute: Response status ${t.status}`))
    .catch((e) => {
      console.log(`addTaskAttribute: Error while adding task attribute: ${e}`)
    })
}