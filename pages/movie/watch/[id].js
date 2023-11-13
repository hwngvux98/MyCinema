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
import {
  fetcher,
  pathToSearchMovie,
  renderLanguage,
  renderLength,
  renderRating,
  renderStatus,
  renderYear,
} from '../../../utils'

export default function WatchMovies() {
  const router = useRouter()
  const { id } = router.query
  //   const currentPage = Number(id)
  const { data: movie, error: movieError } = useSWR(`/api/movie/${id}`, fetcher)
  const { data: recommendedMovie, error: rcMovieError } = useSWR(
    `/api/movie/recommendations/${id}`,
    fetcher
  )

  console.log(recommendedMovie)

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
          {/* <div className='flex'>
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
              </section>
            </div>
          </div> */}

          <div className='rounded-md bg-app-greyish-blue pb-10'>
            <iframe src={embedLink} height={650} width='100%' />
          </div>

          <div className='mt-5 rounded-md border-transparent bg-app-greyish-blue py-3'>
            {/* <div className='rounded-md bg-app-greyish-blue'>
              <iframe src={embedLink} height={650} width='100%' />
            </div> */}
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
          <div className='mt-20'>
            <a className='text-3xl font-medium'>Recommended</a>
            <div className='mt-10'>
              {recommendedMovie ? (
                <>
                  <CollectionSearch
                    isGenre
                    arr={recommendedMovie.results.slice(0, 10)}
                  />
                  {/* <PaginationImproved
                  currentPageAdvance={currentPage + 1}
                  currentPage={currentPage}
                  prevHref={`/movie/popular/${currentPage - 1}`}
                  nextHref={`/movie/popular/${currentPage + 1}`}
                  isFirst={isFirst}
                  isLast={isLast}
                  goToPreviousPage={() => currentPage - 1}
                  goToNextPage={() => currentPage + 1}
                  totalPages={data.total_pages}
                /> */}
                </>
              ) : (
                <Loading />
              )}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  )
}
