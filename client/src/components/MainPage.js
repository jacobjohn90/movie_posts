import React, { Component } from 'react';
import Movies from './Movies';

class MainPage extends Component {


    render() {
        return (
            <div>
                <Movies updatedSignedIn={this.props.updatedSignedIn}/>
            </div>
        );
    }
}

export default MainPage;