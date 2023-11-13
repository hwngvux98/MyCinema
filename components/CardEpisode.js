import { useState } from 'react'

export default function CardEpisode({ epList, handleClick }) {
  let [selectEpisode, setSelectEpisode] = useState('')
  let classStyle =
    'card-hover-animation flex h-16 grow flex-col justify-center rounded-md border-2 pl-2 text-sm font-medium'

  return (
    <section className='card-collection-grid my-10 '>
      {epList.map((ep, index) => (
        <div
          onClick={() => {
            handleClick({ id: ep.id, index: index })
            setSelectEpisode(index)
          }}
          key={ep.id}
          className={
            index != selectEpisode
              ? classStyle +
                'border-app-greyish-blue  text-app-greyish-blue hover:bg-app-greyish-blue  hover:text-white'
              : classStyle +
                'border-white bg-app-greyish-blue text-white hover:border-white '
          }>
          {ep.name ? <a>{ep.name}</a> : <a> Episode {index + 1}</a>}
          <a className='text-xs font-extralight'>Episode {index + 1} </a>
        </div>
      ))}
    </section>
  )
}
