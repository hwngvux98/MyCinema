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
import { useState } from 'react'
import {
  fetcher,
  pathToSearchTV,
  renderLanguage,
  renderRating,
  renderStatus,
} from '../../../utils'
import CardEpisode from '../../../components/CardEpisode'
import Dropdown from '../../../components/Dropdown'

export default function WatchTVSeries() {
  const router = useRouter()
  const { id } = router.query
  const [seasonNum, setSeason] = useState(1)
  const [episodeNum, setEpisode] = useState(1)
  //   const currentPage = Number(id)
  const { data: tv, error: tvError } = useSWR(`/api/tv/${id}`, fetcher)
  const { data: recommendedTV, error: rcTVError } = useSWR(
    `/api/tv/recommendations/${id}`,
    fetcher
  )
  const { data: seasonDetail, error: seasonError } = useSWR(
    `/api/tv/season/${id}?seasonNum=${seasonNum}`,
    fetcher
  )

  //   console.log(recommendedTV)

  const embedLink = `https://vidsrc.to/embed/tv/${id}/${seasonNum}/${episodeNum}`

  console.log(tv)
  console.log(seasonDetail)

  const selectSeason = seasonNum => {
    console.log(seasonNum)
    setSeason(seasonNum)
  }

  const selectEpisode = episode => {
    setEpisode(episode.index + 1)
  }

  if (tvError) return <div>{tvError}</div>
  if (!tv) return <div>{tvError}</div>

  return (
    <div>
      <Head>
        <title>Watching TV Series {id}</title>
      </Head>
      <SearchBar
        placeholder='Search for tv series/show'
        searchPath={pathToSearchTV}
      />
      <PageTitle title={'Watching ' + tv.detail.name} />
      {tv ? (
        <>
          {/* <div className='flex'>
            <div className='mr-5 w-1/4 rounded-md border-transparent bg-app-greyish-blue py-3'>
              <section className=' sm:mx-5 md:my-10 md:items-start'>
                <FilmImage src={tv.detail.poster_path} title={tv.detail.name} />

                <FilmHeading
                  tagline={tv.detail.tagline}
                  title={tv.detail.name}
                />
                <FilmRating number={renderRating(tv.detail.vote_average)} />
                <FilmInfo
                  infoType='vertical'
                  media_type='tv'
                  language={renderLanguage(tv.detail.spoken_languages || [])}
                  firstAir={tv.detail.first_air_date}
                  lastAir={tv.detail.last_air_date}
                  status={renderStatus(tv.detail.status)}
                />
                <FilmGenres
                  infoType='vertical'
                  genres={tv.detail.genres || []}
                />
                <FilmSynopsis
                  infoType='vertical'
                  synopsis={movie.detail.overview}
                />
                <FilmCasts casts={movie.credits.cast} />
                <FilmResources
                website={movie.detail.homepage}
                imdb={movie.detail.imdb_id}
              />
              </section>
            </div>
            
          </div> */}

          <div className='rounded-md bg-app-greyish-blue pb-10'>
            <iframe src={embedLink} height={650} width='100%' />
          </div>

          <div className='mt-10'>
            {/* <CardEpisode
              epList={tv.detail.seasons || []}
              handleClick={info => selectSeason(info)}
            /> */}
            <Dropdown
              options={tv.detail.seasons || []}
              handleClick={info => selectSeason(info)}></Dropdown>
          </div>

          {seasonDetail ? (
            <div>
              <CardEpisode
                epList={seasonDetail ? seasonDetail.results.episodes || [] : []}
                handleClick={info => selectEpisode(info)}
              />
            </div>
          ) : (
            <Loading />
          )}

          <div className='mt-5 rounded-md border-transparent bg-app-greyish-blue py-3'>
            <section className='flex flex-col sm:mx-5 md:my-10 md:flex-row md:items-start'>
              <FilmImage src={tv.detail.poster_path} title={tv.detail.name} />

              <section className='md:w-4/5'>
                <FilmHeading
                  tagline={tv.detail.tagline}
                  title={tv.detail.name}
                />
                <FilmRating number={renderRating(tv.detail.vote_average)} />
                <FilmInfo
                  media_type='tv'
                  language={renderLanguage(tv.detail.spoken_languages || [])}
                  firstAir={tv.detail.first_air_date}
                  lastAir={tv.detail.last_air_date}
                  status={renderStatus(tv.detail.status)}
                />
                <FilmGenres genres={tv.detail.genres || []} />
                <FilmSynopsis synopsis={tv.detail.overview} />
                <FilmCasts casts={tv.credits.cast} />
                {/* <FilmResources
                  website={tv.detail.homepage}
                  imdb={tv.detail.imdb_id}
                /> */}
              </section>
            </section>
          </div>
          <div className='mt-20'>
            <a className='text-3xl font-medium'>Recommended</a>
            <div className='mt-10'>
              {recommendedTV ? (
                <>
                  <CollectionSearch
                    isGenre
                    arr={recommendedTV.results.slice(0, 10)}
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
