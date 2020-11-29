import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "../../css/MainPage/MediaBar.css";

import RedirectLabel from "./RedirectLabel";

export default function MediaBar() {

    function handleMoviesClick(event)
    {
        console.log( "Movies pressed");
    };

    function handleTVSeriesClick(event)
    {
        console.log( "TV-series pressed");
    };

    function handleChannelClick(event)
    {
        console.log( "Clicked on a channel label!");
    };

    function handlePartyClick(event)
    {
        console.log( "Clicked on a party label!");
    };

    return (
        <Container>
            <div className="MediaBar">
                <div style={ {width: 300, height: 600}} className="MediaSection">
                    
                    <div className="MediaChoiceContainer">
                        <h3 className="ClickableHeader3" onClick={handleMoviesClick}>Movies</h3>
                    </div>
                    <div className="MediaChoiceContainer">
                        <h3 className="ClickableHeader3">TV-Series</h3>
                    </div>
                    <div className="MediaChoiceContainer">
                        <h3>My Channels</h3>
                    </div>
                    <div className="ChannelScrollBar">
                        <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                                               <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                                               <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                                               <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                                               <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                                               <RedirectLabel
                            labelName={"Hello"}
                            onClickEvent={handleChannelClick}
                        ></RedirectLabel>
                    </div>


                    <div className="MediaChoiceContainer">
                        <input type="text" style={ {width: 150}}></input>
                        <button>Add Channel</button>
                    </div>



                    <div className="MediaChoiceContainer">
                        <h3>My Parties</h3>
                    </div>
                    <div className="ChannelScrollBar">
                        <RedirectLabel
                            labelName={"SLM"}
                            onClickEvent={handlePartyClick}
                        ></RedirectLabel>
                                                <RedirectLabel
                            labelName={"SLM"}
                            onClickEvent={handlePartyClick}
                        ></RedirectLabel>
                                                <RedirectLabel
                            labelName={"SLM"}
                            onClickEvent={handlePartyClick}
                        ></RedirectLabel>
                                                <RedirectLabel
                            labelName={"SLM"}
                            onClickEvent={handlePartyClick}
                        ></RedirectLabel>
                                                <RedirectLabel
                            labelName={"SLM"}
                            onClickEvent={handlePartyClick}
                        ></RedirectLabel>
                    </div>

                    <div className="MediaChoiceContainer">
                        <input type="text" style={ {width: 150}}></input>
                        <button>Add Party</button>
                    </div>

                </div>
            </div>
        </Container>
    );
}
