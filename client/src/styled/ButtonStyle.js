import styled from 'styled-components';

const Button = styled.button`
    background-color: #182433;
    color: ruby;
    border: ruby;
    border-radius: 5px;
    padding: 0.5rem;
    // margin-bottom: 0.5rem;
    color: #d2d2d2;
    :hover{
        background-color: white;
        color: black;
        border: 2px solid black;
    }
    :focus{
        outline: none;
    }
    :active{
        background-color: black;
        color: white;
    }
    margin-right: 0.5rem;
`

export default Button