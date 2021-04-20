// /.netlify/functions/updateLocationReminders
import got from 'got'
import { v4 as uuidv4 } from 'uuid'

const createLocationReminders = (task) => {
  return [{
    "type": "reminder_add",
    "uuid": uuidv4(),
    "args": {
      "notify_uid": task.added_by_uid,
      "item_id": task.id,
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
 * @param task
 * @returns {*}
 */
const shouldRun = (task) => {
  const actionableLabels = [2153320725]; // @publix

  return task.labels.some(label => actionableLabels.includes(label))
}

export async function handler (event) {
  const eventBody = JSON.parse(event.body)
  console.debug('parsed lambda event', eventBody)

  const task = eventBody.event_data
  console.debug('parsed todoist task', task)

  if (!shouldRun(task)) {
    console.debug('task does not have an actionable label, aborting', task)

    return {
      statusCode: 204
    }
  }

  const response = await got('https://api.todoist.com/sync/v8/sync', {
    searchParams: {
      token: 'c689d97f498bb98a0fc6ffe903edcb0fb9ae1463',
      commands: JSON.stringify(createLocationReminders(task))
    }
  }).json()

  console.debug('response from todoist', response)

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

