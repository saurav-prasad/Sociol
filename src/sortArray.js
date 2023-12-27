const sortArray = (arr) => {
    arr.sort((a, b) => a.timestamp.localeCompare(b.timestamp)).reverse()
    return arr
}
export default sortArray