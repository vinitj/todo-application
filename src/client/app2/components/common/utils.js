export const getNewItems = (items, operation, _id, updates) => {
    if (operation === 'delete') {
        return items.filter((item) => item._id !== _id);
    }
    return items.map((item) =>
        item._id === _id ? { ...item, ...updates } : item,
    );
};

export const getTempItem = (text, completed) => {
    return {
        completed,
        createdAt: Date(),
        text,
        updatedAt: Date(),
        __v: 0,
        _id: 'newly_created',
    };
};

export const makeCall = (url, options) => {
    return fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    }).then((res) => res.json());
};

export const getAllTodos = () => {
    return makeCall('/rest/lists', { method: 'GET' });
};
