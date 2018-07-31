import styled from 'styled-components';

const MoviesStyles = styled.div`
text-align: center;
margin-top: 1rem;
display: flex;
flex-direction: row;
width: 100vw;
flex-wrap: wrap;
justify-content: center;
a {
    position: relative;
    text-align: center;
    width: 10rem;
    text-decoration: none;
    color: white;
    display: flex;
    margin: 0.5rem;
    img {
        width: 10rem;
        height: 15rem;
        overflow: hidden;
    }
    p {
        position: absolute;
        text-align: center;
        width: 100%;
        bottom: 0;
        margin: 0;
        padding: 1rem 0 1rem;
        background-color: rgba(0,0,0,0.8)
    }
}

@media (min-width: 500px) {
    flex-direction: row;
    a {
        width: 20rem;
        img {
            width: 20rem;
            height: 30rem;
        }
    }

}
`
const MovieSearchStyle = styled.div`
display: block;
`

export {
    MoviesStyles,
    MovieSearchStyle
}