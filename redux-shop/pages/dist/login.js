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
var react_1 = require("react");
var head_1 = require("next/head");
var CredentialsLayout_1 = require("../components/layouts/CredentialsLayout");
var react_2 = require("@chakra-ui/react");
var graphql_1 = require("../generated/graphql");
var formik_1 = require("formik");
var erropMap_1 = require("../utils/erropMap");
var router_1 = require("next/router");
var InputField_1 = require("../components/ui/InputField");
var link_1 = require("next/link");
var next_urql_1 = require("next-urql");
var createUrqlClient_1 = require("../utils/createUrqlClient");
var Login = function () {
    var _a = graphql_1.useLoginMutation(), _ = _a[0], loginUser = _a[1];
    var router = router_1.useRouter();
    var toast = react_2.useToast();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(head_1["default"], null,
            react_1["default"].createElement("title", null, "Login")),
        react_1["default"].createElement(CredentialsLayout_1.CredentialsLayout, null,
            react_1["default"].createElement(react_2.Heading, { pb: 4, alignSelf: "center" }, "Login"),
            react_1["default"].createElement(formik_1.Formik, { initialValues: { username: "", password: "" }, onSubmit: function (values, _a) {
                    var setErrors = _a.setErrors;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_b) {
                            response = loginUser(values);
                            return [2 /*return*/, response
                                    .then(function (result) {
                                    var _a, _b;
                                    if ((_a = result.data) === null || _a === void 0 ? void 0 : _a.loginUser.errors) {
                                        setErrors(erropMap_1.toErrorMap(result.data.loginUser.errors));
                                    }
                                    else if ((_b = result.data) === null || _b === void 0 ? void 0 : _b.loginUser.user) {
                                        router.push("/dashboard");
                                        toast({
                                            title: "Login succesfull",
                                            description: "You are succesfully logged into your account.",
                                            status: "success",
                                            duration: 2000,
                                            isClosable: true
                                        });
                                    }
                                })["catch"](function (error) { return console.log("Error: " + error); })];
                        });
                    });
                } }, function (_a) {
                var isSubmitting = _a.isSubmitting;
                return (react_1["default"].createElement(formik_1.Form, null,
                    react_1["default"].createElement(InputField_1.InputField, { name: "username", label: "Username", placeholder: "Enter your username", variant: "filled", inputsize: "sm" }),
                    react_1["default"].createElement(InputField_1.InputField, { name: "password", label: "Password", placeholder: "Enter your Password", variant: "filled", inputsize: "sm", type: "password" }),
                    react_1["default"].createElement(react_2.Button, { type: "submit", colorScheme: "teal", mt: 4, w: "30%", isLoading: isSubmitting }, "Login"),
                    react_1["default"].createElement(react_2.VStack, { alignItems: "left" },
                        react_1["default"].createElement(react_2.Checkbox, { id: "remember-me-cb", name: "rememberMe", colorScheme: "teal", borderColor: "teal.600" }, "Remember me"))));
            }),
            react_1["default"].createElement(react_2.Divider, { mt: 2, maxW: "250px", alignSelf: "center" }),
            react_1["default"].createElement(link_1["default"], { href: "/signup" },
                react_1["default"].createElement(react_2.Text, { mt: 4, fontSize: "sm", alignSelf: "center", _hover: { textColor: "blue.500", cursor: "pointer" } }, "Don't have an account yet ? Click here to create one")),
            react_1["default"].createElement(link_1["default"], { href: "/forget-password" },
                react_1["default"].createElement(react_2.Text, { mt: 4, fontSize: "sm", alignSelf: "center", _hover: { textColor: "blue.500", cursor: "pointer" } }, "Forgot your password ? Click here")))));
};
exports["default"] = next_urql_1.withUrqlClient(createUrqlClient_1.createUrqlClient)(Login);
