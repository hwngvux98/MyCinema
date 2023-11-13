import { getTVSeriesSeasonDetail } from '../../../../lib/tmdb'

export default async function handler(req, res) {
  const { id, seasonNum } = req.query
  //   const { seasonNum } = req.seasonNum
  //   const seasonNum = 1
  console.log('season' + seasonNum)
  try {
    const response = await fetch(getTVSeriesSeasonDetail(id, seasonNum))
    // const response2 = await fetch(getMovieCasts(id))
    const data = await response.json()
    // const data2 = await response2.json()
    res.status(200).json({
      results: data,
      //   credits: data2,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
