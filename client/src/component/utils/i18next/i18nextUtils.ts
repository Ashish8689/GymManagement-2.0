import { InitOptions } from 'i18next'
import { map, upperCase } from 'lodash'
import enUS from '../../locale/languages/en-us.json'

export enum SupportedLocales {
    English = 'en-US',
}

export const languageSelectOptions = map(SupportedLocales, (value, key) => ({
    label: `${key} - ${upperCase(value.split('-')[0])}`,
    key: value,
}))

// Returns i18next options
export const getInitOptions = (): InitOptions => {
    return {
        supportedLngs: Object.values(SupportedLocales),
        resources: {
            'en-US': { translation: enUS },
        },
        fallbackLng: ['en-US'],
        detection: {
            order: ['cookie'],
            caches: ['cookie'], // cache user language on
        },
        interpolation: {
            escapeValue: false, // XSS safety provided by React
        },
        missingKeyHandler: (_lngs: unknown, _ns: string, key: string) =>
            // eslint-disable-next-line no-console
            console.error(`i18next: key not found "${key}"`),
        saveMissing: true, // Required for missing key handler
    }
}
