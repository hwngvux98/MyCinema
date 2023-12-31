import { v4 as uuidv4 } from 'uuid'

export const TMDB_ENDPOINT = process.env.TMDB_ENDPOINT
export const TMDB_API_KEY = process.env.TMDB_API_KEY
export const TMDB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/original'

export const pathToSearchAll = '/search/'
export const pathToSearchMovie = '/search/movie/'
export const pathToSearchTV = '/search/tv/'

export const fetcher = url => fetch(url).then(res => res.json())

export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>
`

export const toBase64 = str =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export const renderResults = (array, Component, media_type) => {
  return array.map(item => (
    <Component
      key={item.id || uuidv4()}
      id={item.id}
      category={item.media_type || media_type}
      rating={item.adult}
      src={
        item.poster_path
          ? `${TMDB_IMAGE_ENDPOINT}/${item.poster_path}`
          : `${TMDB_IMAGE_ENDPOINT}/${item.backdrop_path}`
      }
      title={
        item.title ? item.title : item.original_name || item.original_title
      }
      year={item.release_date || item.first_air_date}
    />
  ))
}

export const sliceArray = (arr, limit) => {
  return arr.slice(0, limit)
}

export function renderRating(rating) {
  if (rating !== undefined) {
    return (rating / 2).toFixed(1)
  } else {
    return 0
  }
}

export function renderLength(runtime) {
  if (runtime !== 0 && runtime !== undefined) {
    return runtime + ' min.'
  } else {
    return 'N/A'
  }
}

export function renderLanguage(languages) {
  if (languages.length !== 0) {
    return languages[0].name
  } else {
    return 'N/A'
  }
}

export function renderYear(year) {
  if (!year) {
    return 'N/A'
  } else {
    return year.substring(0, 4)
  }
}

export function renderStatus(status) {
  if (!status) {
    return 'N/A'
  } else {
    return status
  }
}
