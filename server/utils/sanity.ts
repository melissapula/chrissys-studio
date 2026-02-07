import { createClient } from '@sanity/client'

export function useSanityWriteClient() {
    const config = useRuntimeConfig()

    return createClient({
        projectId: '3i77cmnf',
        dataset: 'production',
        apiVersion: '2024-01-01',
        token: config.sanityApiToken,
        useCdn: false,
    })
}
