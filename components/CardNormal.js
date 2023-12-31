import { useRouter } from 'next/router'
import CardImage from './CardImage'
import CardInfo from './CardInfo'

export default function CardNormal({ id, category, rating, src, title, year }) {
  const router = useRouter()

  const handleClick = () => {
    if (category === 'movie') {
      router.push(`/movie/${id}`)
    } else if (category === 'tv') {
      router.push(`/tv/${id}`)
    }
  }

  return (
    <div
      className='card-hover-animation relative mb-4 grow cursor-pointer justify-between rounded-md bg-app-greyish-blue 2xs:w-[130px] md:basis-1/4 lg:h-[400px] lg:basis-1/6'
      onClick={handleClick}>
      <CardImage src={src} alt={title} />
      <CardInfo
        id={id}
        category={category}
        rating={rating}
        title={title}
        year={year}
      />
    </div>
  )
}
