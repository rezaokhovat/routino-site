export const studioAddress =
  'کرج، بلوار انقلاب، فاز سوم گوهردشت، گلستان یکم، پلاک ۶ واحد ۲'

const mapsQuery = encodeURIComponent(
  'کرج، بلوار انقلاب، فاز سوم گوهردشت، گلستان یکم، پلاک ۶',
)

export const studioMapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}&travelmode=driving`

export const studioMapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&z=16&hl=fa&output=embed`

export const studioNeshanUrl = `https://neshan.org/maps#/search/${mapsQuery}`
