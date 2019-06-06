const defaultHeaders = {
	"Content-Type": "application/json",
}

export const postData = ({payload, url, headers = {}}) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      ...defaultHeaders,
	    ...headers
    },
    redirect: "follow",
    referrer: "no-referrer",
    body: JSON.stringify(payload),
  })
}

export const getData = (url, query = '', token = '') => {
  return fetch(url + query, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrer: "no-referrer",
  })
}
export const customFromatDate = (date) => {
  	const dateArray = date.split(' ');
	const dateSplited = dateArray[0].split('-').reverse().join('-');
	const time = dateArray[1];
	return dateSplited + ' ' + time;
}

export const formatDate = (date) => {
  let dateArray = date.split(' ')
  return {
    date: dateArray[0],
    time: dateArray[1],
    visible: false
  }
}

export const reverseFormatDate = ({date, time}) => {
  return [date, time].join(' ')
}

