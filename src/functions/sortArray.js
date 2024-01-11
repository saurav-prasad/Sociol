// sorting an array based on timestamp
const sortArray = (arr) => {
    const sortedArray = [...arr];
    // sortedArray.sort((a, b) => a.timestamp.localeCompare(b.timestamp)).reverse();
    sortedArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sortedArray;
}
export default sortArray