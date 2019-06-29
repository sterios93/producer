import store from '@/store'
import router from '@/router'

import moment from 'moment'

const defaultHeaders = {
  'Content-Type': 'application/json',
  "Origin": "http://lunchdeal24.de"
}

const ErrorsCodes = {
  SESSION_EXPIRED: 103,
  PRODUCER_INVALID_SESSION: 102
}

export const postData = ({ hasHeaders = true, payload, url, headers = {}, formData }) => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    ...(hasHeaders && { headers: {
      ...defaultHeaders,
      ...headers 
      }
    }) ,
    redirect: 'follow',
    referrer: 'no-referrer',
    body: formData || JSON.stringify(payload)
  })
    .then(data => data.json())
    .then(data => {
      if (!data.success) {
        handleErrors(data)
      }
      return data
    })
}

export const getData = (url, query = '', token = '') => {
  return fetch(url + query, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrer: 'no-referrer'
  })
    .then(data => data.json())
    .then(data => {
      if (!data.success) {
        handleErrors(data)
      }
      return data
    })
}

export const formatDate = (date) => {
  let dateArray = date.split(' ')
  return {
    date: dateArray[0],
    time: dateArray[1],
    visible: false
  }
}

export const reverseFormatDate = ({ date, time }) => {
  return [date, time].join(' ')
}

export const changeDateFormat = (date, utc = true) => {
  if (!date) return null
  
  let arr = date.split(' ')
  let ISODate = arr[0]
  let time = arr[1]

  let [currentYear, currentMonth, currentDay] = !utc ? ISODate.split('-').reverse() : ISODate.split('-')
  let [currentHour, currentMinute] = time.split(':')

  const {year, month, day, hour, minute} = utcParser({
    utc,
    year: currentYear,
    month: currentMonth,
    day: currentDay,
    hour: currentHour,
    minute: currentMinute,
  })

  return `${year}-${month}-${day} ${hour}:${minute}` 
}

export const utcParser = ({utc, year, month, day, hour, minute}) => {
  let newDate

  if (utc) {
    let date = new Date(year, month, day, hour, minute)
    newDate = moment.utc(date)
  } else {
    let dateAsString = `${year}-${month}-${day} ${hour}:${minute}`
    newDate = moment.utc(dateAsString).local()
  }

  console.error(newDate)

  year = newDate.date().toString().padStart(2, '0').slice(-2)
  month = newDate.month().toString().padStart(2, '0').slice(-2)
  day = newDate.year()
  hour = newDate.hour().toString().padStart(2, '0').slice(-2)
  minute = newDate.minute().toString().padStart(2, '0').slice(-2)

  return {year, month, day, hour, minute}
} 

const handleErrors = (data) => {
  switch (data.error.code) {
    case ErrorsCodes.SESSION_EXPIRED:
    case ErrorsCodes.PRODUCER_INVALID_SESSION:
      router.push('login')
      store.dispatch('authentication/setIsUserLogged', false)
  }

  store.dispatch('snackbar/setState', {snackbar: true, message: data.error.message, color: 'red'})
}