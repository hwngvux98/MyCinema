import Image from 'next/image'
import { shimmer, TMDB_IMAGE_ENDPOINT, toBase64 } from '../utils'
import { BiMoviePlay } from 'react-icons/fa'

export default function FilmImage({ src, title, handleNameClick }) {
  let imageScale = handleNameClick ? 1 : 2
  return (
    <section className='px-20 text-center md:pr-8 md:pl-0'>
      <Image
        className='rounded-lg'
        src={`${TMDB_IMAGE_ENDPOINT}/${src}`}
        alt={title}
        width={350 / imageScale}
        height={530 / imageScale}
        placeholder='blur'
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(350, 530))}`}
        unoptimized
      />
      {/* <BiMoviePlay /> */}
      {handleNameClick ? (
        <>
          <button
            onClick={handleNameClick}
            className='text-capitalize my-2 flex w-full items-center justify-center rounded-md bg-app-greyish-blue py-2 px-3 text-xl text-app-pure-white hover:bg-app-pure-white hover:text-app-dark-blue'>
            Watch
          </button>
        </>
      ) : (
        <></>
      )}
    </section>
  )
}
