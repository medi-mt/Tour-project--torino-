const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};


const formatTime = (time) => {
    return new Date(time).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    })
}

export { formatDate ,formatTime}