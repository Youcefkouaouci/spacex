import type { Launch, LaunchesQueryOptions } from '../types/launch'

const API_URL = 'https://api.spacexdata.com/v5'

export const fetchLaunches = async (options: LaunchesQueryOptions = {}): Promise<Launch[]> => {
  const { limit = 10, sort = 'date_utc', order = 'desc', upcoming = false } = options

  const query = {
    query: {
      upcoming,
    },
    options: {
      limit,
      sort: {
        [sort]: order === 'asc' ? 1 : -1,
      },
      populate: ['rocket', 'launchpad', 'payloads'],
    },
  }

  try {
    const response = await fetch(`${API_URL}/launches/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return data.docs as Launch[]
  } catch (error) {
    console.error('Error fetching launches:', error)
    throw error
  }
}

export const fetchNextLaunch = async (): Promise<Launch> => {
  try {
    const launches = await fetchLaunches({
      limit: 1,
      upcoming: true,
      sort: 'date_utc',
      order: 'asc',
    })

    if (launches.length === 0) {
      throw new Error('No upcoming launches found')
    }

    return launches[0]
  } catch (error) {
    console.error('Error fetching next launch:', error)
    throw error
  }
}
