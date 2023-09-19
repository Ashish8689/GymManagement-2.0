export const localStorageState = {
    getItem: (key: string) => localStorage.getItem(key) as string,

    setItem: (key: string, value: string) => {
        localStorage.setItem(key, value)
    },
    removeItem: (key: string) => localStorage.removeItem(key),
}
