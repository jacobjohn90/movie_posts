import styled from 'styled-components'

const SignUpWrapper = styled.div`

position: absolute;
top: 2rem;
right: 35%;
min-width: 30vw;

form {
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        padding-bottom: 5px;
        input{
            flex: 1;
            margin-left: 5px;
    };
    button {
        flex:0;
    }
}

background-color: #d2d2d2;
padding: 20px;


@media (min-width: 500px) {
    right: 35%;
    top: 60px;
}
`

export {
    SignUpWrapper
}