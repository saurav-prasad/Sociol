const sliceString = (str, n = 0) => {
    return (str?.length > n && n > 0) ? str.slice(0,
        (str.charAt(n) === " ") || str.charAt(n + 1) === " " || str.charAt(n - 1) === " " ? n + 1 : n) + "..."
        : str

}
export default sliceString