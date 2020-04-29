import React, { useState, useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { AppWrapper, heading, ListWrapper, listRoot, listWrapper } from './styled';
import { getAllTodos } from '../common/utils';
import { getFilteredItems, getUpdatedTime } from './utils';

const getListItems = (items) => {
    return items.map((item, index) => (
        <ListWrapper key={`todo-item-${index}`}>
            <ListItem css={listWrapper}>
                <ListItemText primary={item.text} secondary={`Updated At: ${getUpdatedTime(item.updatedAt)}`} />
            </ListItem>
            {index !== items.length - 1 ? <Divider /> : null}
        </ListWrapper>
    ));
};

const History = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        getAllTodos().then((data) => setItems(data));
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { completed, pending, all } = getFilteredItems(items);

    const allCompletedItems = getListItems(completed);
    const allPendingItems = getListItems(pending);
    const allItems = getListItems(all);

    return (
        <AppWrapper>
            <ExpansionPanel expanded={expanded === 'completed'} onChange={handleChange('completed')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="completed">
                    <Typography css={heading}>Completed Task</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List css={listRoot}>{allCompletedItems}</List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'pending'} onChange={handleChange('pending')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="pending">
                    <Typography css={heading}>Pending Task</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List css={listRoot}>{allPendingItems}</List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'all'} onChange={handleChange('all')}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="all">
                    <Typography css={heading}>All Task</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List css={listRoot}>{allItems}</List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </AppWrapper>
    );
};
export default History;
