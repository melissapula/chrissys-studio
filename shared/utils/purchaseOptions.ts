export function isOriginalOption(label?: string | null): boolean {
    return /^\s*original\b/i.test(label || '')
}
