import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { userStore } from '@/stores/user'

export function useAccentColor() {
    const theme = useTheme()
    const store = userStore()

    function normalizeColor(color) {
        if (!color) return null

        if (typeof color === 'string' && color.startsWith('hsl')) {
            const inner = color
                .replace(/hsl[a]?\(/, '')
                .replace(/\)/, '')
                .trim()

            const [hslPart, alphaPart] = inner.split('/').map(v => v.trim())

            const [hRaw, sRaw, lRaw] = hslPart.split(/\s+/)

            const h = parseFloat(hRaw)
            const s = parseFloat(sRaw) || 100
            const l = parseFloat(lRaw) || 50
            const a = isNaN(parseFloat(alphaPart)) ? 1 : parseFloat(alphaPart)


            return `hsla(${h}, ${s}%, ${l}%, ${a})`
        }

        return null
    }



    function applyAccentColor(rawColor) {
        const color = normalizeColor(rawColor)
        if (!color) return

        theme.themes.value.light.colors['custom-color'] = color
        theme.themes.value.dark.colors['custom-color'] = color

        const match = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/)
        if (!match) return

        const [_, h, s, l, a = 1] = match

        const baseAlpha = parseFloat(a)

        const umbraAlpha = Math.min(1, baseAlpha * 0.40)
        const penumbraAlpha = Math.min(1, baseAlpha * 0.30)
        const ambientAlpha = Math.min(1, baseAlpha * 0.20)

        document.documentElement.style.setProperty('--custom-shadow-umbra', `hsla(${h}, ${s}%, ${l}%, ${umbraAlpha})`)
        document.documentElement.style.setProperty('--custom-shadow-penumbra', `hsla(${h}, ${s}%, ${l}%, ${penumbraAlpha})`)
        document.documentElement.style.setProperty('--custom-shadow-ambient', `hsla(${h}, ${s}%, ${l}%, ${ambientAlpha})`)
    }

    watch(() => store.prefersDark, (value) => {
        theme.change(value ? 'dark' : 'light')
    }, { immediate: true })

    watch(() => store.prefersColor, (value) => {
        applyAccentColor(value)
    }, { immediate: true })

    return {
        normalizeColor,
        applyAccentColor
    }
}