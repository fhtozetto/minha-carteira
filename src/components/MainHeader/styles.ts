import styled from "styled-components";

export const Container = styled.div`
    /* Define a siglado usada no grid do layout */
    grid-area: MH;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
`;
