const httpRequest = async (alpha2Code: string) => {
  const response = await fetch(
    `https://restcountries.com/v2/lang/${alpha2Code}`
  )

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const data = await response.json()

  return data
}

export default httpRequest
