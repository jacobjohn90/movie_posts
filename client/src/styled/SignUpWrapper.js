import styled from 'styled-components'

const SignUpWrapper = styled.div`

position: absolute;
z-index: 100;
top: 2rem;
right: 10%;
min-width: 30vw;
h3 {
    text-align: center;
}
form {
    display: flex;
    flex-direction: column;
    background-color: #d2d2d2;
    border-radius: 5px;
    padding: 20px;
    div {
        display: flex;
        padding-bottom: 5px;
        input{
            flex: 1;
            margin-left: 5px;
        };
    };
    button {
        flex:0;
    }
}



@media (min-width: 500px) {
    right: 35vw;
    top: 2rem;
}
`

export {
    SignUpWrapper
}