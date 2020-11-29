import React, { Component } from 'react';

import Media from "./Media";
import "../../css/Media.css";

class MediaSearchContainer extends Component {
    state = {  

    }

    render() { 
        return ( 
            <div className="MediaWrapper">
                <div className="MediaDiv">
                    <Media mediaType={this.props.mediaType} mediaName={this.props.mediaName}></Media>
                </div>
                <div className="MediaOptionDiv">
                    <div>
                        <label>Add to Channel:</label>
                        <select name="channelsForAddingTo">
                            <option value="channel1">Channel 1</option>
                            <option value="channel2">Channel 2</option>
                        </select>
                    </div>
                    <button>Watch</button>
                </div>
            </div>
         );
    }
}
 
export default MediaSearchContainer;