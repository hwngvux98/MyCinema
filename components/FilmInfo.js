export default function FilmInfo({
  infoType,
  firstAir,
  lastAir,
  language,
  length,
  media_type,
  status,
  year,
}) {
  console.log(infoType)
  let textType = !infoType ? 'lg:text-lg' : 'lg:text-sm'
  return (
    <>
      {media_type === 'movie' ? (
        <div
          className={
            'mb-6 flex items-center justify-between text-left text-sm lg:w-10/12 ' +
            textType
          }>
          <div>
            <p className='mb-1 text-app-placeholder'>Length</p>
            <p className='text-app-pure-white'>{length}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>Language</p>
            <p className='text-app-pure-white'>{language}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>Year</p>
            <p className='text-app-pure-white'>{year}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>Status</p>
            <p className='text-app-pure-white'>{status}</p>
          </div>
        </div>
      ) : (
        <div
          className={
            'mb-6 flex items-center justify-between text-left text-sm lg:w-10/12' +
            textType
          }>
          <div>
            <p className='mb-1 text-app-placeholder'>Language</p>
            <p className='text-app-pure-white'>{language}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>First Air</p>
            <p className='text-app-pure-white'>{firstAir}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>Last Air</p>
            <p className='text-app-pure-white'>{lastAir}</p>
          </div>
          <div>
            <p className='mb-1 text-app-placeholder'>Status</p>
            <p className='text-app-pure-white'>{status}</p>
          </div>
        </div>
      )}
    </>
  )
}
