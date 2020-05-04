import React from 'react';

import {
    ListItem,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { listDoneStyle, ListWrapper } from './styled';
import { green, grey } from '@material-ui/core/colors';

const TodoItem = (props) => {
    const { text, _id, onDoneToDo, onDeleteToDo, completed } = props;

    const onDone = () => {
        onDoneToDo(_id, !completed);
    };

    const onDelete = () => {
        onDeleteToDo(_id);
    };
    return (
        <ListWrapper>
            <ListItem>
                <ListItemText primary={text} css={listDoneStyle(completed)} />
                <ListItemSecondaryAction>
                    <>
                        <IconButton aria-label="Done Todo" onClick={onDone}>
                            <DoneIcon
                                style={{
                                    color: completed ? green[500] : grey[500],
                                }}
                            />
                        </IconButton>

                        <IconButton aria-label="Delete Todo" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                </ListItemSecondaryAction>
            </ListItem>
        </ListWrapper>
    );
};

export default TodoItem;
