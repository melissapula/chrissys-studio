import imageUrlBuilder from '@sanity/image-url'

const GROQ_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body
}`

function mapSanityPost(doc, builder) {
    return {
        id: doc._id,
        title: doc.title,
        slug: doc.slug,
        publishedAt: doc.publishedAt,
        excerpt: doc.excerpt,
        coverImage: doc.coverImage
            ? builder
                  .image(doc.coverImage)
                  .width(800)
                  .quality(80)
                  .auto('format')
                  .url()
            : null,
        body: doc.body,
    }
}

export function useBlogPosts() {
    const sanity = useSanity()
    const builder = imageUrlBuilder(sanity.config)

    const { data: sanityPosts } = useSanityQuery(GROQ_QUERY)

    const posts = computed(() => {
        if (sanityPosts.value && sanityPosts.value.length > 0) {
            return sanityPosts.value.map((doc) => mapSanityPost(doc, builder))
        }
        return []
    })

    return {
        posts,
    }
}
