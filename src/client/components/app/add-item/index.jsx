import React, { useState } from 'react';
import { TextField, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from '@material-ui/core/colors';
import { addText } from './styled';

const AddItem = (props) => {
    const { onAddItem, creating } = props;
    const [input, setInputValue] = useState('');
    const onAdd = () => {
        if (!creating && input.trim() !== '') {
            setInputValue('');
            onAddItem(input);
        }
    };

    const onChangeInput = (event) => setInputValue(event.target.value);

    const onKeyPress = (event) => {
        if (event.which === 13 || event.keyCode === 13) {
            onAdd();
            return true;
        }
        return false;
    };

    return (
        <Grid container>
            <Grid xs={10} md={11} item css={addText}>
                <TextField
                    placeholder="Please Add Todo ..."
                    value={input}
                    onChange={onChangeInput}
                    onKeyPress={onKeyPress}
                    fullWidth
                    disabled={creating}
                />
            </Grid>
            <Grid xs={2} md={1} item>
                <AddCircleIcon
                    style={{
                        color: green[500],
                        cursor: creating ? 'not-allowed' : 'pointer',
                    }}
                    onClick={onAdd}
                />
            </Grid>
        </Grid>
    );
};

export default AddItem;
