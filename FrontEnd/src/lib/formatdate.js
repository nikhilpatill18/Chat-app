export function formatedate(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',  // "03"
        minute: '2-digit',// "30"
        // second: '2-digit' // "00"
    })
}