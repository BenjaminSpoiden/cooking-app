"use strict";
exports.__esModule = true;
exports.VerticalNavbar = void 0;
var react_1 = require("react");
var react_2 = require("@chakra-ui/react");
var fa_1 = require("react-icons/fa");
var graphql_1 = require("../generated/graphql");
var router_1 = require("next/router");
exports.VerticalNavbar = function () {
    var _a = graphql_1.useLogoutMutation(), fetching = _a[0].fetching, logoutUser = _a[1];
    var router = router_1.useRouter();
    var _b = react_2.useDisclosure(), isOpen = _b.isOpen, onClose = _b.onClose, onOpen = _b.onOpen;
    var signOut = function () {
        if (!fetching) {
            logoutUser();
            router.push("/");
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_2.Modal, { isOpen: isOpen, onClose: onClose },
            react_1["default"].createElement(react_2.ModalOverlay, null),
            react_1["default"].createElement(react_2.ModalContent, null,
                react_1["default"].createElement(react_2.ModalHeader, null, "Modal Title"),
                react_1["default"].createElement(react_2.ModalCloseButton, null),
                react_1["default"].createElement(react_2.ModalBody, null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, officiis. Laboriosam, nisi. Sunt, corrupti non quo doloribus mollitia natus expedita a deserunt quibusdam animi nesciunt et, porro voluptate iure pariatur?"),
                react_1["default"].createElement(react_2.ModalFooter, null,
                    react_1["default"].createElement(react_2.Button, { colorScheme: "blue", mr: 3, onClick: onClose }, "Close"),
                    react_1["default"].createElement(react_2.Button, { variant: "ghost" }, "Secondary Action")))),
        react_1["default"].createElement("nav", null,
            react_1["default"].createElement(react_2.Flex, { position: "fixed", justifyContent: "center", minHeight: "100%", minWidth: "48px", bgColor: "teal.600", fontSize: "2rem", color: "white" },
                react_1["default"].createElement(react_2.List, { spacing: 2 },
                    react_1["default"].createElement(react_2.Tooltip, { shouldWrapChildren: true, hasArrow: true, label: "Home", fontSize: "sm", placement: "right" },
                        react_1["default"].createElement(react_2.ListItem, null,
                            react_1["default"].createElement(react_2.Icon, { as: fa_1.FaHome, w: "24px" }))),
                    react_1["default"].createElement(react_2.Tooltip, { shouldWrapChildren: true, hasArrow: true, label: "Shopping Cart", fontSize: "sm", placement: "right" },
                        react_1["default"].createElement(react_2.ListItem, null,
                            react_1["default"].createElement(react_2.Icon, { as: fa_1.FaShoppingCart, w: "24px" }))),
                    react_1["default"].createElement(react_2.Tooltip, { shouldWrapChildren: true, hasArrow: true, label: "Diet & Health", fontSize: "sm", placement: "right" },
                        react_1["default"].createElement(react_2.ListItem, null,
                            react_1["default"].createElement(react_2.Icon, { as: fa_1.FaLeaf, w: "24px" }))),
                    react_1["default"].createElement(react_2.Flex, { position: "absolute", bottom: 0 },
                        react_1["default"].createElement(react_2.Flex, { justifyContent: "center" },
                            react_1["default"].createElement(react_2.List, { spacing: 2 },
                                react_1["default"].createElement(react_2.ListItem, null,
                                    react_1["default"].createElement(react_2.Menu, { isLazy: true },
                                        react_1["default"].createElement(react_2.MenuButton, null,
                                            react_1["default"].createElement(react_2.Avatar, { ml: "-4px", size: "sm", name: "Avatar K", src: "" })),
                                        react_1["default"].createElement(react_2.MenuList, { color: "black" },
                                            react_1["default"].createElement(react_2.MenuGroup, { title: "Profile" },
                                                react_1["default"].createElement(react_2.MenuItem, { fontSize: "md", onClick: onOpen }, "Update Profile"),
                                                react_1["default"].createElement(react_2.MenuItem, { fontSize: "md" }, "My Wishlist"),
                                                react_1["default"].createElement(react_2.MenuItem, { fontSize: "md", textColor: "red.500", onClick: function () { return signOut(); } }, "Log out")),
                                            react_1["default"].createElement(react_2.MenuDivider, { color: "gray.200" }),
                                            react_1["default"].createElement(react_2.MenuGroup, { title: "Feedback" },
                                                react_1["default"].createElement(react_2.MenuItem, { fontSize: "md" }, "Send us a feedback")))))))))))));
};
