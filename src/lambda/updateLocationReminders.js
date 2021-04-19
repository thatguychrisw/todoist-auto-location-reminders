// /.netlify/functions/updateLocationReminders
import got from 'got'
import { v4 as uuidv4 } from 'uuid'

const createLocationReminders = (item) => {
  return [{
    "type": "reminder_add",
    "uuid": uuidv4(),
    "args": {
      "notify_uid": item.added_by_uid,
      "item_id": item.itemId,
      "service": "push",
      "type": "location",
      "name": "Publix — Bluffs",
      "loc_lat": "26.893893428777858",
      "loc_long": "-80.0616267433865",
      "loc_trigger": "on_enter",
      "radius": 100
    }
  }]
}

/**
 * As long as the task contains at least one actionable label then run the action
 * @param item
 * @returns {*}
 */
const shouldRun = (item) => {
  const actionableLabels = [2153320725];

  return item.labels.some(label => actionableLabels.includes(label))
}

export async function handler (event, context, callback) {
  const body = JSON.parse(event.body)
  console.debug('received event', body)

  const item = JSON.parse(body.body).event_data

  if (!shouldRun(item)) {
    console.debug('should not update location reminders for task', item)
  }

  const response = await got('https://api.todoist.com/sync/v8/sync', {
    searchParams: {
      token: 'c689d97f498bb98a0fc6ffe903edcb0fb9ae1463',
      commands: JSON.stringify(createLocationReminders(item))
    }
  }).json()

  console.debug('response from todoist', response)

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

