export const formatNumberIdxToRowIdx = (n: number): string => {
    let result = ''
    n++ // chuyển sang hệ 1-based

    while (n > 0) {
        const rem = (n - 1) % 26
        result = String.fromCharCode(65 + rem) + result
        n = Math.floor((n - 1) / 26)
    }

    return result
}
