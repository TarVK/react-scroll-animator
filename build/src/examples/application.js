import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { ReferencePage } from "./pages/referencePage";
import { BasicsPage } from "./pages/basicsPage";
import { PinPage } from "./pages/pinPage";
import { CombinePage } from "./pages/combinePage";
import { ExamplePage } from "./pages/examplePage";
export var Application = function () { return (React.createElement(Router, null,
    React.createElement(Route, { exact: true, path: "/", component: function () { return React.createElement("div", null, "home"); } }),
    React.createElement(Route, { path: "/reference", component: ReferencePage }),
    React.createElement(Route, { path: "/basics", component: BasicsPage }),
    React.createElement(Route, { path: "/pin", component: PinPage }),
    React.createElement(Route, { path: "/combine", component: CombinePage }),
    React.createElement(Route, { path: "/example", component: ExamplePage }))); };
//# sourceMappingURL=application.js.map