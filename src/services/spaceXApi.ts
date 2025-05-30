// Importation des types
import type { Launch, LaunchesQueryOptions } from '../types/launch'

// URL de l’API SpaceX
const API_URL = 'https://api.spacexdata.com/v5'

// Récupérer une liste de lancements depuis l'API SpaceX.
export const fetchLaunches = async (options: LaunchesQueryOptions = {}): Promise<Launch[]> => {
  const { limit = 10, sort = 'date_utc', order = 'desc', upcoming = false } = options
  // Construction de l'objet de requête sort, populate, limit
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
    // Appel de l'API avec la méthode POST pour interroger les lancements
    const response = await fetch(`${API_URL}/launches/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    })
    // Vérification du succès de la requête HTTP
    if (!response.ok) {
      throw new Error(`L’API a répondu avec l’état: ${response.status}`)
    }

    const data = await response.json()
    return data.docs as Launch[]
  } catch (error) {
    // Gestion des erreurs
    console.error('Erreur de récupération des lancements:', error)
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
      throw new Error('Aucun lancement à venir n’a été trouvé')
    }

    return launches[0]
  } catch (error) {
    console.error('Erreur lors de la récupération au prochain lancement:', error)
    throw error
  }
}
