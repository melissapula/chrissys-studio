import imageUrlBuilder from '@sanity/image-url'
import { galleryItems as mockItems } from '~/data/galleryItems'

const GROQ_QUERY = `*[_type in ["galleryItem", "painting"]] | order(displayOrder asc, _createdAt desc) {
  _id,
  title,
  artist,
  medium,
  dimensions,
  price,
  sold,
  year,
  category,
  image,
  body
}`

function mapSanityItem(doc, builder) {
    return {
        id: doc._id,
        title: doc.title,
        artist: doc.artist || 'chrissy',
        medium: doc.medium,
        dimensions: doc.dimensions,
        price: doc.price,
        sold: doc.sold ?? false,
        year: doc.year,
        category: doc.category,
        image: doc.image
            ? builder.image(doc.image).width(800).quality(80).url()
            : null,
        body: doc.body,
    }
}

export function useGalleryItems() {
    const sanity = useSanity()
    const builder = imageUrlBuilder(sanity.config)

    const { data: sanityItems } = useSanityQuery(GROQ_QUERY)

    const items = computed(() => {
        if (sanityItems.value && sanityItems.value.length > 0) {
            return sanityItems.value.map((doc) => mapSanityItem(doc, builder))
        }
        return mockItems
    })

    const availableCount = computed(
        () => items.value.filter((item) => item.price && !item.sold).length
    )

    const filterItems = (artist, category) => {
        let result = items.value
        if (artist && artist !== 'all') {
            result = result.filter((item) => item.artist === artist)
        }
        if (category && category !== 'all') {
            result = result.filter((item) => item.category === category)
        }
        return result
    }

    return {
        items,
        availableCount,
        filterItems,
    }
}
