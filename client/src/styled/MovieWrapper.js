import styled from 'styled-components'

const MovieWrapper = styled.div`
h1, h2 {
    text-align: center;
    background-color: rgba(0,0,0,0.6);
    padding: 5px 0;
}
`
const MovieContentWrapper = styled.div`
img {
    display: block;
    // text-align: center;
    width: 10rem;
    height: 15rem;
    overflow: hidden;
    margin: 5px auto;    
}
@media (min-width: 500px){
    display: flex;
    align-items: center;
    img{
        flex: 3, 1, auto;
        width: 20rem;
        height: 30rem;
    };
}
`
const MovieTextWrapper = styled.div`
strong {
    text-decoration: underline;
}
@media (min-width:500px) {
    flex: 0, 1, auto;
    max-width: 60vw;
    margin-left: 10px;
}
`

const CommentWrapper = styled.div`
text-align: center;
background-color: rgba(0,0,0,0.2);
border-radius: 5px;

`
const TextWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
p {
    display: block;
    margin-right: 5px;
}
button {
    max-height: 2.2rem;
}
`

export {
    MovieWrapper,
    MovieContentWrapper,
    MovieTextWrapper,
    CommentWrapper,
    TextWrapper
}