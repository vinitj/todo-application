import React, { useState, useEffect } from 'react';
import { AppWrapper, listRoot, ListWrapper } from './styled';
import TodoItem from './todo-item';
import AddItem from './add-item';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import { getNewItems, getTempItem, makeCall, getAllTodos } from '../common/utils';

const getListItems = (items, onDoneToDo, onDeleteToDo) => {
    return items.map((item, index) => (
        <ListWrapper key={`todo-item-${index}`}>
            <TodoItem {...item} onDoneToDo={onDoneToDo} onDeleteToDo={onDeleteToDo} />
            {index !== items.length - 1 ? <Divider /> : null}
        </ListWrapper>
    ));
};

const Application = (props) => {
    const ssrData = Array.isArray(props.ssrData) ? props.ssrData : [];
    const [creating, setCreating] = useState(false);
    const [items, setItems] = useState(ssrData);

    useEffect(() => {
        if (ssrData.length === 0) {
            getAllTodos().then((data) => setItems(data));
        }
    }, []);

    const onDoneToDo = (_id, status) => {
        setItems(getNewItems(items, 'update', _id, { completed: status }));
        makeCall(`/rest/list/${_id}`, { method: 'PUT', body: JSON.stringify({ completed: status }) }).catch((error) => {
            // revert
            setItems(getNewItems(items, 'update', _id, { completed: !status }));
            console.error('Error while updating:', error);
        });
    };

    const onDeleteToDo = (_id) => {
        setItems(getNewItems(items, 'delete', _id));
        makeCall(`/rest/list/${_id}`, { method: 'DELETE' }).catch((error) => {
            // revert
            getAllTodos().then((data) => setItems(data));
            console.error('Error while updating:', error);
        });
    };

    const onAddItem = (item) => {
        const newTempTodo = getTempItem(item, false);
        const oldItems = [...items];
        const newListWithTemp = [newTempTodo, ...items];
        setItems(newListWithTemp);
        setCreating(true);
        makeCall('/rest/list/new', { method: 'POST', body: JSON.stringify({ item }) })
            .then((data) => {
                const newList = [data, ...oldItems];
                setCreating(false);
                setItems(newList);
            })
            .catch((error) => {
                setCreating(false);
                console.error('Error while creating :', error);
            });
    };

    const allItems = getListItems(items, onDoneToDo, onDeleteToDo);

    return (
        <AppWrapper>
            <AddItem onAddItem={onAddItem} creating={creating} />
            <List css={listRoot}>{allItems}</List>
        </AppWrapper>
    );
};

export default Application;
