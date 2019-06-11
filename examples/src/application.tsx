import React from "react";
import {HashRouter as Router, Route, Link, withRouter} from "react-router-dom";
import {ReferencePage} from "./pages/referencePage";
import {BasicsPage} from "./pages/basicsPage";
import {PinPage} from "./pages/pinPage";
import {CombinePage} from "./pages/combinePage";
import {TemplatePage} from "./pages/templatePage";
import {StaggerPage} from "./pages/staggerPage";
import {ParallelPage} from "./pages/parallelPage";
import {OncePage} from "./pages/oncePage";
import {CssPage} from "./pages/cssPage";

const Page = withRouter(props => {
    // Reset the scroll offset
    document.body.scrollTop = 0;

    // Return the page
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    right: 20,
                    top: 20,
                    padding: 10,
                    backgroundColor: "cyan",
                    zIndex: 1000,
                }}>
                Examples:
                <br />
                <Link to="/basics">Basics</Link>
                <br />
                <Link to="/once">Once</Link>
                <br />
                <Link to="/combine">Combine</Link>
                <br />
                <Link to="/stagger">Stagger</Link>
                <br />
                <Link to="/parallel">Parallel</Link>
                <br />
                <Link to="/css">Css</Link>
                <br />
                <Link to="/pin">Pin</Link>
                <br />
                <Link to="/reference">Reference</Link>
                <br />
                <Link to="/template">Template</Link>
            </div>
            <Route
                exact
                path="/"
                component={() => (
                    <div>
                        Please go to the{" "}
                        <a href="https://github.com/TarVK/react-scroll-animator">
                            github repository
                        </a>{" "}
                        for more information, or check examples using the menu on the
                        right
                    </div>
                )}
            />
            <Route path="/basics" component={BasicsPage} />
            <Route path="/once" component={OncePage} />
            <Route path="/combine" component={CombinePage} />
            <Route path="/stagger" component={StaggerPage} />
            <Route path="/parallel" component={ParallelPage} />
            <Route path="/css" component={CssPage} />
            <Route path="/pin" component={PinPage} />
            <Route path="/reference" component={ReferencePage} />
            <Route path="/template" component={TemplatePage} />
        </>
    );
});

export const Application = () => (
    <Router>
        <Page></Page>
    </Router>
);
