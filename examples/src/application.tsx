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
import {PageOffsetPage} from "./pages/pageOffsetPage";

const L = props => (
    <>
        <br />-{" "}
        <Link
            style={{marginTop: 5, display: "inline-block"}}
            to={"/" + props.page.toLowerCase()}>
            {props.page}
        </Link>
    </>
);
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
                <L page="basics" />
                <L page="once" />
                <L page="combine" />
                <L page="stagger" />
                <L page="parallel" />
                <L page="css" />
                <L page="pin" />
                <L page="pageOffset" />
                <L page="reference" />
                <L page="template" />
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
            <Route path="/pageOffset" component={PageOffsetPage} />
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
