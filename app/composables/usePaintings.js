import imageUrlBuilder from '@sanity/image-url'
import { paintings as mockPaintings } from '~/data/paintings'

const GROQ_QUERY = `*[_type == "painting"] | order(displayOrder asc, _createdAt desc) {
  _id,
  title,
  medium,
  dimensions,
  price,
  sold,
  year,
  category,
  image
}`

function mapSanityPainting(doc, builder) {
  return {
    id: doc._id,
    title: doc.title,
    medium: doc.medium,
    dimensions: doc.dimensions,
    price: doc.price,
    sold: doc.sold ?? false,
    year: doc.year,
    category: doc.category,
    image: builder.image(doc.image).width(800).quality(80).url(),
  }
}

export function usePaintings() {
  const sanity = useSanity()
  const builder = imageUrlBuilder(sanity.config)

  const { data: sanityPaintings } = useSanityQuery(GROQ_QUERY)

  const paintings = computed(() => {
    if (sanityPaintings.value && sanityPaintings.value.length > 0) {
      return sanityPaintings.value.map((doc) => mapSanityPainting(doc, builder))
    }
    return mockPaintings
  })

  const availableCount = computed(() => paintings.value.filter((p) => !p.sold).length)

  const filterByCategory = (category) => {
    if (category === 'all') return paintings.value
    return paintings.value.filter((p) => p.category === category)
  }

  return {
    paintings,
    availableCount,
    filterByCategory,
  }
}
