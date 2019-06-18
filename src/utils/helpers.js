import store from '@/store'
import router from '@/router'

const defaultHeaders = {
  'Content-Type': 'application/json',
  "Origin": "http://lunchdeal24.de"
}

const ErrorsCodes = {
  SESSION_EXPIRED: 103,
  PRODUCER_INVALID_SESSION: 102
}

export const postData = ({ payload, url, headers = {}, formData }) => {
  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...defaultHeaders,
	    ...headers
    },
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
export const customFromatDate = (date) => {
  	const dateArray = date.split(' ')
  const dateSplited = dateArray[0].split('-').reverse().join('-')
  const time = dateArray[1]
  return dateSplited + ' ' + time
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

export const changeDateFormat = (date) => {
  if (!date) return null

  let arr = date.split(' ')
  let newDate = arr[0]
  let time = arr[1]

  const [year, month, day] = newDate.split('-')

  return `${day}-${month}-${year} ${time}`
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