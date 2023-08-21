import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import FilmCasts from '../../../components/FilmCasts'
import FilmGenres from '../../../components/FilmGenres'
import FilmHeading from '../../../components/FilmHeading'
import FilmImage from '../../../components/FilmImage'
import FilmInfo from '../../../components/FilmInfo'
import FilmRating from '../../../components/FilmRating'
import FilmResources from '../../../components/FilmResources'
import FilmSynopsis from '../../../components/FilmSynopsis'
import CollectionSearch from '../../../components/CollectionSearch'
import Loading from '../../../components/Loading'
import PageTitle from '../../../components/PageTitle'
import PaginationImproved from '../../../components/PaginationImproved'
import SearchBar from '../../../components/SearchBar'
import { fetcher, pathToSearchMovie } from '../../../utils'

export default function WatchMovies() {
  const router = useRouter()
  const { id } = router.query
  //   const currentPage = Number(id)
  const { data: movie, error: movieError } = useSWR(`/api/movie/${id}`, fetcher)

  const embedLink = `https://vidsrc.to/embed/movie/${id}`

  console.log(movie)

  if (movieError) return <div>{movieError}</div>
  if (!movie) return <div>{movieError}</div>

  return (
    <div>
      <Head>
        <title>Watching Movies {id}</title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      <PageTitle title={'Watching ' + movie.detail.title} />
      {movie ? (
        <>
          <div className='flex'>
            <div className='mr-5 w-1/4 rounded-md border-transparent bg-app-greyish-blue py-3'>
              <section className=' sm:mx-5 md:my-10 md:items-start'>
                <FilmImage
                  src={movie.detail.poster_path}
                  title={movie.detail.title}
                />

                <FilmHeading
                  tagline={movie.detail.tagline}
                  title={movie.detail.title}
                />
                <FilmRating number={renderRating(movie.detail.vote_average)} />
                <FilmInfo
                  infoType='vertical'
                  media_type='movie'
                  language={renderLanguage(movie.detail.spoken_languages || [])}
                  length={renderLength(movie.detail.runtime)}
                  status={renderStatus(movie.detailstatus)}
                  year={renderYear(movie.detail.release_date)}
                />
                <FilmGenres
                  infoType='vertical'
                  genres={movie.detail.genres || []}
                />
                <FilmSynopsis
                  infoType='vertical'
                  synopsis={movie.detail.overview}
                />
                {/* <FilmCasts casts={movie.credits.cast} /> */}
                {/* <FilmResources
                website={movie.detail.homepage}
                imdb={movie.detail.imdb_id}
              /> */}
              </section>
            </div>
            <div className='w-3/4 rounded-md bg-app-greyish-blue'>
              <iframe src={embedLink} height={650} width='100%'></iframe>
            </div>
          </div>

          <div className='mt-5 rounded-md border-transparent bg-app-greyish-blue py-3'>
            <section className='flex flex-col sm:mx-5 md:my-10 md:flex-row md:items-start'>
              <FilmImage
                src={movie.detail.poster_path}
                title={movie.detail.title}
              />

              <section className='md:w-4/5'>
                <FilmHeading
                  tagline={movie.detail.tagline}
                  title={movie.detail.title}
                />
                <FilmRating number={renderRating(movie.detail.vote_average)} />
                <FilmInfo
                  media_type='movie'
                  language={renderLanguage(movie.detail.spoken_languages || [])}
                  length={renderLength(movie.detail.runtime)}
                  status={renderStatus(movie.detailstatus)}
                  year={renderYear(movie.detail.release_date)}
                />
                <FilmGenres genres={movie.detail.genres || []} />
                <FilmSynopsis synopsis={movie.detail.overview} />
                {/* <FilmCasts casts={movie.credits.cast} /> */}
                {/* <FilmResources
                website={movie.detail.homepage}
                imdb={movie.detail.imdb_id}
              /> */}
              </section>
            </section>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export function renderRating(rating) {
  if (rating !== undefined) {
    return (rating / 2).toFixed(1)
  } else {
    return 0
  }
}

function renderLength(runtime) {
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

function renderYear(year) {
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
