import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import MovieLogo from "../../images/MovieIcon.png";
import TVShowLogo from "../../images/TVShowIcon.png";

import "../../css/Media.css";

class Media extends Component {

    loadMediaPage()
    {
        console.log( "Loading media page...");
    }

    render() {
        return ( 
        <div>
            <div>
                <img src={this.getMediaImage()} onClick={this.loadMediaPage} width={200} height={200}></img>
            </div>
            <div>
             <label>{this.props.mediaName}</label>
            </div>
        </div>
        );
    }

    getMediaImage()
    {
        if ( this.props.mediaType == 0)
        {
            return MovieLogo;
        }
        else
        {
            return TVShowLogo;
        }
    };
}
 
export default Media;