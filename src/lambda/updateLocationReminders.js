// /.netlify/functions/updateLocationReminders
import got from 'got'

const createLocationReminders = (itemId) => {
  return [{
    'type': 'reminder_add',
    'temp_id': '7ad9609d-579f-4828-95c5-3600acdb2c81',
    'uuid': '830cf409-daba-479c-a624-68eb0c07d01c',
    'args': {
      'item_id': itemId,
      'service': 'email',
      'type': 'location',
      'name': 'Publix — Bluffs',
      'loc_lat': '26.893893428777858',
      'loc_long': '-80.0616267433865',
      'loc_trigger': 'on_enter',
      'radius': 100
    }
  }]
}

export async function handler (event, context, callback) {
  console.log('received event', event)

  const item = JSON.parse(event.body)

  const response = await got('https://api.todoist.com/sync/v8/sync', {
    searchParams: {
      token: 'c689d97f498bb98a0fc6ffe903edcb0fb9ae1463',
      commands: JSON.stringify(createLocationReminders(item.event_data.id))
    }
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(response),
  })
}

