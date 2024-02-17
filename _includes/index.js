fetch('https://risacan.net/status/index.txt')
    .then(response => response.text())
    .then(text => {
        const lines = text.split('\n');
        const firstLine = lines[0];
        const secondLine = lines[1];
        const spanStatus = document.getElementById("status");
        spanStatus.innerHTML = secondLine;
        const spanWhen = document.getElementById("statusWhen");
        const spanWhenJp = document.getElementById("statusWhenJp");

        if (spanWhen) {
            spanWhen.innerHTML = timeAgo(firstLine, "");
        } else if (spanWhenJp) {
            spanWhenJp.innerHTML = timeAgo(firstLine, "ja");
        }
    })
    .catch(error => {
        console.error(error);
    });

function timeAgo(dateStr, lang) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const langDiffInSeconds = lang == 'ja' ? '秒前' : 'seconds ago';
    const langDiffInMinutes = lang == 'ja' ? '分前' : 'minutes ago';
    const langDiffInHours = lang == 'ja' ? '時間前' : 'hours ago';
    const langDiffInDays = lang == 'ja' ? '日前' : 'days ago';

    if (diffInSeconds < 60) {
        return Math.round(diffInSeconds) + langDiffInSeconds;
    } else if (diffInMinutes < 60) {
        return Math.round(diffInMinutes) + langDiffInMinutes;
    } else if (diffInHours < 24) {
        return Math.round(diffInHours) + langDiffInHours;
    } else {
        return Math.round(diffInDays) + langDiffInDays;
    }
}
