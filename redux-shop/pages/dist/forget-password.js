"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("@chakra-ui/react");
var formik_1 = require("formik");
var next_urql_1 = require("next-urql");
var head_1 = require("next/head");
var react_2 = require("react");
var CredentialsLayout_1 = require("../components/layouts/CredentialsLayout");
var InputField_1 = require("../components/ui/InputField");
var graphql_1 = require("../generated/graphql");
var createUrqlClient_1 = require("../utils/createUrqlClient");
var ForgetPassword = function () {
    var _a = graphql_1.useForgotPasswordMutation(), forgotPassword = _a[1];
    var _b = react_2.useState(false), complete = _b[0], setComplete = _b[1];
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].createElement(head_1["default"], null,
            react_2["default"].createElement("title", null, "Forget password")),
        react_2["default"].createElement(CredentialsLayout_1.CredentialsLayout, null,
            react_2["default"].createElement(react_1.Heading, { pb: 4, alignSelf: "center" }, "Forget password"),
            react_2["default"].createElement(formik_1.Formik, { initialValues: { email: "" }, onSubmit: function (values) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, forgotPassword(values)];
                            case 1:
                                _a.sent();
                                setComplete(true);
                                return [2 /*return*/];
                        }
                    });
                }); } }, function (_a) {
                var isSubmitting = _a.isSubmitting;
                return complete ? react_2["default"].createElement(react_1.Box, null, "If the email exists, we sent you a request") : (react_2["default"].createElement(formik_1.Form, null,
                    react_2["default"].createElement(InputField_1.InputField, { name: "email", label: "Email", placeholder: "Enter your Email", variant: "filled", inputsize: "sm", type: "email" }),
                    react_2["default"].createElement(react_1.Button, { type: "submit", colorScheme: "teal", mt: 4, w: "auto", isLoading: isSubmitting }, "Forgot password")));
            }))));
};
exports["default"] = next_urql_1.withUrqlClient(createUrqlClient_1.createUrqlClient)(ForgetPassword);
