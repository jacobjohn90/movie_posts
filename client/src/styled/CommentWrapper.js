import styled from 'styled-components';

const FormStyle = styled.form`
    display: flex;
    align-items: center;
    textarea {
        background-color: #182433;
        margin: 5px;
        color: white;
    };
    textarea::placeholder {
        color: #d2d2d2;
    }
`
const EditCommentWrapper = styled.div`
    display: flex;
    align-items: center;
    button {
        max-height: 2rem;
    }
`

export {
    FormStyle,
    EditCommentWrapper
}