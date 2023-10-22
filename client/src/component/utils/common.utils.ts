export const refreshPage = () => history.go(0)

export const getRandomColor = (name: string) => {
    const firstAlphabet = name.charAt(0).toLowerCase()
    const asciiCode = firstAlphabet.charCodeAt(0)
    const colorNum =
        asciiCode.toString() + asciiCode.toString() + asciiCode.toString()

    const num = Math.round(0xffffff * parseInt(colorNum))
    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255

    return {
        color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.6)',
        character: firstAlphabet.toUpperCase(),
    }
}

export const getUniqueArray = (count: number) =>
    [...Array(count)].map((_, index) => ({
        key: `key${index}`,
    }))
