// formatting the timestamp
const timePassed = (timestamp,) => {
    const startDateTime = new Date(timestamp);
    const currentDateTime = new Date();

    // Calculate the time difference in milliseconds
    let timeDifference = currentDateTime - startDateTime;
    if (timeDifference < 0) timeDifference *= -1

    // Convert milliseconds to seconds, minutes, hours, days, months, and years
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalMonths = Math.floor(totalDays / 30); // Assuming a month has approximately 30 days
    const totalYears = Math.floor(totalDays / 365); // Assuming a year has approximately 365 days

    // Determine the appropriate unit and value
    let formattedTime;
    if (totalSeconds < 60) {
        formattedTime = `${totalSeconds} sec${totalSeconds !== 1 ? 's' : ''}`;
    } else if (totalMinutes < 60) {
        formattedTime = `${totalMinutes} min${totalMinutes !== 1 ? 's' : ''}`;
    } else if (totalHours < 24) {
        formattedTime = `${totalHours} hr${totalHours !== 1 ? 's' : ''}`;
    } else if (totalDays < 30) {
        formattedTime = `${totalDays} dy${totalDays !== 1 ? 's' : ''}`;
    } else if (totalMonths < 12) {
        formattedTime = `${totalMonths} mo${totalMonths !== 1 ? 's' : ''}`;
    } else {
        formattedTime = `${totalYears} yr${totalYears !== 1 ? 's' : ''}`;
    }
    return formattedTime
}

export default timePassed