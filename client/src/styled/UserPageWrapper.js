import styled from 'styled-components'

const UserPageWrapper = styled.div`
h1 {
    text-align: center;
    background-color: rgba(0,0,0,0.6);
    padding: 5px 0;
}
`
const UserInfoStyle = styled.div`
display: flex;
align-items: center;
img{
    width: 30vw;
    height: 20vh;
    margin: 0 5px;

}
@media(min-width:500px){
    justify-content: center;
    img{
        width: 15vw;
        height: 25vh;
    }
}
`
const UserTextStyle = styled.div`

`
const EditUserStyle = styled.div`
    display: flex;
    align-items: center;
    p {
        display: block;
        margin-right: 5px;
    }
    button {
        max-height: 2.2rem;
    }
`
const UserCommentStyle = styled.div`
    a {
        text-decoration: none;
        color: seagreen;
        
    }
`


export {
    UserPageWrapper,
    UserInfoStyle,
    UserTextStyle,
    EditUserStyle,
    UserCommentStyle
}