import { css } from '@emotion/core';
import styled from '@emotion/styled';

export const listDoneStyle = (isDone) => {
    if (isDone) {
        return css`
            text-decoration: line-through;
        `;
    }
    return css`
        text-decoration: none;
    `;
};

export const ListWrapper = styled.div`
    padding: 2px 0;
`;
