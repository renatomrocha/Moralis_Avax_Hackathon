

export const dateFromTimeStamp = (timestamp : number) => {
    const date = new Date(timestamp * 1000)
    const month = parseInt(date.getMonth().toString()) + 1;
    return date.getDate() + '-' + month + '-' + date.getFullYear()
}