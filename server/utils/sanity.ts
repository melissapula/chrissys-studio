import { createClient } from '@sanity/client'
import type { H3Event } from 'h3'

export function useSanityWriteClient(event: H3Event) {
    const config = useRuntimeConfig()
    const cfEnv = event.context.cloudflare?.env

    return createClient({
        projectId: '3i77cmnf',
        dataset: 'production',
        apiVersion: '2024-01-01',
        token: config.sanityApiToken || cfEnv?.SANITY_API_TOKEN,
        useCdn: false,
    })
}

export function useSanityReadClient() {
    return createClient({
        projectId: '3i77cmnf',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: false,
    })
}
