"use strict";
exports.__esModule = true;
exports.Navbar = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var link_1 = require("next/link");
var icons_1 = require("@chakra-ui/icons");
var react_scroll_1 = require("react-scroll");
var react_scroll_2 = require("react-scroll");
var graphql_1 = require("../../generated/graphql");
var isServer_1 = require("../../utils/isServer");
var MenuItems = function (_a) {
    var children = _a.children, _b = _a.to, to = _b === void 0 ? "/" : _b, _c = _a.isLast, isLast = _c === void 0 ? false : _c;
    return (react_1["default"].createElement(react_2.Text, { mr: { base: 0, sm: isLast ? 0 : 10 }, display: "flex", justifyContent: "center", alignItems: "center", size: "md", textColor: "teal.600", fontWeight: "bold", fontSize: "lg", cursor: "pointer" },
        react_1["default"].createElement(react_scroll_1.Link, { to: to, smooth: true, duration: 1000 }, children)));
};
exports.Navbar = function (_a) {
    var scrollAmout = _a.scrollAmout;
    var _b = react_1.useState(false), show = _b[0], setShow = _b[1];
    var toggleMenu = function () { return setShow(function (c) { return !c; }); };
    var _c = graphql_1.useCurrentUserQuery({
        pause: isServer_1.isServer()
    })[0], data = _c.data, fetching = _c.fetching;
    var _d = graphql_1.useLogoutMutation(), logoutFetching = _d[0].fetching, logoutUser = _d[1];
    var body = null;
    if (fetching) {
    }
    else if (!(data === null || data === void 0 ? void 0 : data.currentUser)) {
        body = (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_2.Flex, { flexBasis: { base: "100%", md: "auto" }, d: ["none", "none", "none", "flex"] },
                react_1["default"].createElement(link_1["default"], { href: "/login" },
                    react_1["default"].createElement(react_2.Button, { size: "md", colorScheme: "gray", w: "125px", mr: "4" },
                        react_1["default"].createElement(react_2.Text, { fontWeight: "bold", color: "teal.600" }, "Login"))),
                react_1["default"].createElement(link_1["default"], { href: "/signup" },
                    react_1["default"].createElement(react_2.Button, { size: "md", colorScheme: "gray", w: "125px" },
                        react_1["default"].createElement(react_2.Text, { fontWeight: "bold", color: "teal.600" }, "Signup"))))));
    }
    else {
        body = (react_1["default"].createElement(react_2.Flex, null,
            react_1["default"].createElement(react_2.Box, { mr: 4 },
                react_1["default"].createElement(react_2.Text, { display: "flex", justifyContent: "center", alignItems: "center", fontSize: "lg", fontWeight: "bold", color: "teal.600" }, data.currentUser.username)),
            react_1["default"].createElement(react_2.Button, { size: "md", colorScheme: "gray", w: "125px", onClick: function () { return logoutUser(); }, isLoading: logoutFetching },
                react_1["default"].createElement(react_2.Text, { fontWeight: "bold", color: "teal.600" }, "Log out"))));
    }
    return (react_1["default"].createElement(react_2.Flex, { as: "nav", position: "fixed", align: "center", zIndex: 1, justify: "space-between", wrap: "wrap", w: "100%", mb: 8, p: 8, shadow: scrollAmout > 0 ? "sm" : "none", bgColor: scrollAmout > 0 ? "white" : "transparent" },
        react_1["default"].createElement(react_2.Flex, null,
            react_1["default"].createElement(react_2.Heading, { cursor: "pointer", size: "md", color: "whitesmoke", textColor: "teal.600", onClick: function () { return react_scroll_2.animateScroll.scrollToTop(); } }, "Cooking App")),
        react_1["default"].createElement(react_2.Box, { mt: "1", d: ["flex", "flex", "flex", "none"], onClick: toggleMenu }, show ? react_1["default"].createElement(icons_1.CloseIcon, null) : react_1["default"].createElement(icons_1.HamburgerIcon, null)),
        react_1["default"].createElement(react_2.Flex, { flexBasis: { base: "100%", md: "auto" }, d: ["none", "none", "none", "flex"] },
            react_1["default"].createElement(MenuItems, { to: "valueSection" }, "Our Values"),
            react_1["default"].createElement(MenuItems, { to: "teamSection" }, "Our Team"),
            react_1["default"].createElement(MenuItems, { to: "aboutUsSection", isLast: true }, "Our Plans")),
        body));
};
