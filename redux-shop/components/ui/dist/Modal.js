"use strict";
exports.__esModule = true;
exports.CustomModal = void 0;
var react_1 = require("@chakra-ui/react");
var react_2 = require("react");
exports.CustomModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose;
    return (react_2["default"].createElement(react_1.Modal, { isOpen: isOpen, onClose: onClose },
        react_2["default"].createElement(react_1.ModalOverlay, null),
        react_2["default"].createElement(react_1.ModalContent, null,
            react_2["default"].createElement(react_1.ModalHeader, null, "Profile"),
            react_2["default"].createElement(react_1.ModalCloseButton, null),
            react_2["default"].createElement(react_1.ModalBody, null, "Placeholder for formik form to update profile"),
            react_2["default"].createElement(react_1.ModalFooter, null,
                react_2["default"].createElement(react_1.Button, { colorScheme: "teal", mr: 3, onClick: onClose }, "Save & Close"),
                react_2["default"].createElement(react_1.Button, { variant: "ghost", onClick: onClose }, "Discard Changes")))));
};
