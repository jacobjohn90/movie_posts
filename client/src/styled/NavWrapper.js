import styled from 'styled-components';

const FontAwesomeStyling = styled.div`
    display: flex;
    align-items: center;
    color: #d2d2d2;
    :hover{
        color: black;
    }
    p{
        display: none;
        margin: 0;
        margin-right: 0.5rem;
    }
    svg{
        font-size: 1rem;
    }
    @media (min-width: 500px) {
        p{
            display: block;
        }
    }
`
const NavWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    background-color: #182433;
    box-shadow: 5px 6px 5px 0px rgba(0,0,0,1);
    a{
        text-decoration: none;
        font-size: 1.5rem;
        color: #d2d2d2;
        margin-left: 1rem;
        font-family: Raleway;

    }
    @media (min-width: 500px) {
        a{
            font-size: 2rem;
        }
    }
`
export {
    FontAwesomeStyling,
    NavWrapper
}