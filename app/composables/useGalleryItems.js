import imageUrlBuilder from '@sanity/image-url'

const GROQ_QUERY = `*[_type == "galleryItem"] | order(displayOrder asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  artist,
  medium,
  dimensions,
  price,
  sold,
  year,
  "categories": coalesce(categories, [category]),
  image,
  body,
  purchaseOptions
}`

const TEXT_CATEGORIES = ['poems', 'songs', 'short-stories']

function mapSanityItem(doc, builder) {
    return {
        id: doc._id,
        title: doc.title,
        slug: doc.slug,
        artist: doc.artist || 'chrissy',
        medium: doc.medium,
        dimensions: doc.dimensions,
        price: doc.price,
        sold: doc.sold ?? false,
        year: doc.year,
        categories: doc.categories?.filter(Boolean) || [],
        image: doc.image
            ? builder
                  .image(doc.image)
                  .width(800)
                  .quality(80)
                  .auto('format')
                  .url()
            : null,
        body: doc.body,
        purchaseOptions: doc.purchaseOptions || [],
        isTextContent: (doc.categories || []).some((c) =>
            TEXT_CATEGORIES.includes(c)
        ),
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
        return []
    })

    const availableCount = computed(
        () => items.value.filter((item) => item.price).length
    )

    const filterItems = (artist, category) => {
        let result = items.value
        if (artist && artist !== 'all') {
            result = result.filter((item) => item.artist === artist)
        }
        if (category && category !== 'all') {
            result = result.filter((item) => item.categories.includes(category))
        }
        return result
    }

    return {
        items,
        availableCount,
        filterItems,
    }
}
