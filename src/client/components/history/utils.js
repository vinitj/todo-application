export const getFilteredItems = (items) => {
    return {
        completed: items.filter((item) => item.completed === true),
        pending: items.filter((item) => item.completed !== true),
        all: items,
    };
};

export const getUpdatedTime = (time) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateObj = new Date(time);
    const finalDate = `${months[dateObj.getMonth()]} ${String(dateObj.getDate()).padStart(
        2,
        '0',
    )} ${dateObj.getFullYear()}`;
    const finalTime = `${String(dateObj.getHours()).padStart(2, '0')}:${String(dateObj.getMinutes()).padStart(
        2,
        '0',
    )}:${String(dateObj.getSeconds()).padStart(2, '0')}`;

    return `${finalDate} ${finalTime}`;
};
