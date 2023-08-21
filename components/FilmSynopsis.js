export default function FilmSynopsis({ synopsis, infoType }) {
  let textStyle = infoType ? 'md:text-xs text-sm' : 'md:text-lg'
  return (
    <div className='mb-6'>
      <h3 className='mb-1 md:text-lg'>Synopsis</h3>
      <p className={'font-light' + textStyle}>{synopsis ? synopsis : 'N/A'}</p>
    </div>
  )
}
