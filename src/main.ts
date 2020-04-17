import 'whatwg-fetch'
import { ApiKey } from './constants/api-key'
import { Data } from './constants/types'

const checkStatus = (response: any): any => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

const parseJSON = (response: any): any => {
  return response.json()
}

const fetchData = (requestUrl: string): Promise<Data> => {
  return fetch(requestUrl)
    .then(checkStatus)
    .then(parseJSON)
    .then((data: any) => data)
    .catch((error) => console.log(error))
}

const toUTC = (secondsFromUTC: string) => {
  let secondsInUTC = new Date().getTime() + Number(secondsFromUTC) * 1000
  return new Date(Number(secondsInUTC)).toUTCString()
}

const getWeatherByLocation = (locations: Array<string>) => {
  let requestUrl, data, temperatureInKelvin, timezoneUTC

  locations.map(async (location) => {
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${ApiKey.openweatherapi}`
    try {
      data = await fetchData(requestUrl)
      temperatureInKelvin = await data.main.temp
      timezoneUTC = await toUTC(data.timezone)
      console.log(
        `Name : '${data.name}' Temperature : '${temperatureInKelvin}K' Date : ${timezoneUTC}`
      )
    } catch (error) {
      console.log(error)
    }
  })
}

getWeatherByLocation(['New York', '10005', 'Tokyo', 'São Paulo', 'Pluto'])

export { getWeatherByLocation }
