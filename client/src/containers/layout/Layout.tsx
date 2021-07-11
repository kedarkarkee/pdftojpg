import React from "react";
import { Switch, Route } from "react-router";
import VideoConverter from "../video/Video";
import PdfConverter from "../pdf/PdfConverter";
import SingleVideo from "../video/single/Single";

const layout = () => {
    const routes = (
        <Switch>
            <Route path="/video/:id" component={SingleVideo} />
            <Route path="/video" component={VideoConverter} />
            <Route path="/" exact component={PdfConverter} />
        </Switch>
    );
    return (
        <>
            <main>
                {routes}
            </main>
        </>
    );
}

export default layout;