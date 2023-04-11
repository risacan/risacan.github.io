fetch('https://risacan.net/status/index.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        const firstLine = lines[0];
        const secondLine = lines[1];
        const spanStatus = document.getElementById("status");
        spanStatus.innerHTML = secondLine;
        const spanWhen = document.getElementById("statusWhen");
        spanWhen.innerHTML = timeAgo(firstLine);
    })
    .catch(error => {
        console.error(error);
    });

function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInSeconds < 60) {
        return Math.round(diffInSeconds) + '秒前';
    } else if (diffInMinutes < 60) {
        return Math.round(diffInMinutes) + '分前';
    } else if (diffInHours < 24) {
        return Math.round(diffInHours) + '時間前';
    } else {
        return Math.round(diffInDays) + '日前';
    }
}
