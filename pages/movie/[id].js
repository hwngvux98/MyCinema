import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import FilmCasts from '../../components/FilmCasts'
import FilmGenres from '../../components/FilmGenres'
import FilmHeading from '../../components/FilmHeading'
import FilmImage from '../../components/FilmImage'
import FilmInfo from '../../components/FilmInfo'
import FilmRating from '../../components/FilmRating'
import FilmResources from '../../components/FilmResources'
import FilmSynopsis from '../../components/FilmSynopsis'
import Loading from '../../components/Loading'
import SearchBar from '../../components/SearchBar'
import { fetcher, pathToSearchMovie } from '../../utils'
import {
  renderLanguage,
  renderLength,
  renderRating,
  renderStatus,
  renderYear,
} from '../../utils'

export default function Movie() {
  const router = useRouter()
  const { id } = router.query
  const { data: movie, error: movieError } = useSWR(`/api/movie/${id}`, fetcher)

  const watchContent = () => {
    console.log('test' + id)
    router.push(`/movie/watch/${id}`)
  }

  console.log(movie)

  if (movieError) return <div>{movieError}</div>
  if (!movie) return <div>{movieError}</div>

  return (
    <>
      <Head>
        <title>{movie.detail.title} | </title>
      </Head>
      <SearchBar
        placeholder='Search for movies'
        searchPath={pathToSearchMovie}
      />
      {movie ? (
        <section className='flex flex-col sm:mx-0 md:mx-0 md:flex-row md:items-start lg:justify-center'>
          <FilmImage
            src={movie.detail.poster_path}
            title={movie.detail.title}
            handleNameClick={() => {
              watchContent()
            }}
          />

          <section className='md:w-3/5'>
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
            <FilmCasts casts={movie.credits.cast} />
            <FilmResources
              website={movie.detail.homepage}
              imdb={movie.detail.imdb_id}
            />
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </>
  )
}
