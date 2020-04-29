import { css } from '@emotion/core';

export const listDoneStyle = (isDone) => {
    if (isDone) {
        return css`
            text-decoration: line-through;
            padding: 0px 10px;
        `;
    }
    return css`
        text-decoration: none;
        padding: 0px 10px;
    `;
};

export const listWrapper = css`
    padding: 10px 0;
`;
