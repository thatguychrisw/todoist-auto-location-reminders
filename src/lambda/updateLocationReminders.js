// /.netlify/functions/updateLocationReminders
export function handler(event, context, callback) {
  console.log('received event', event)

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(event),
  })
}

