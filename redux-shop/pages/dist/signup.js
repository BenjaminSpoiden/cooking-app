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
var react_2 = require("react");
var CredentialsLayout_1 = require("../components/layouts/CredentialsLayout");
var head_1 = require("next/head");
var formik_1 = require("formik");
var InputField_1 = require("../components/ui/InputField");
var graphql_1 = require("../generated/graphql");
var erropMap_1 = require("../utils/erropMap");
var router_1 = require("next/router");
var link_1 = require("next/link");
var next_urql_1 = require("next-urql");
var createUrqlClient_1 = require("../utils/createUrqlClient");
var Signup = function () {
    var _a = graphql_1.useRegisterMutation(), _ = _a[0], registerUser = _a[1];
    var router = router_1.useRouter();
    var toast = react_1.useToast();
    return (react_2["default"].createElement(react_2["default"].Fragment, null,
        react_2["default"].createElement(head_1["default"], null,
            react_2["default"].createElement("title", null, "Register Your Account")),
        react_2["default"].createElement(CredentialsLayout_1.CredentialsLayout, null,
            react_2["default"].createElement(react_1.Heading, { pb: 4, alignSelf: "center" }, "Register"),
            react_2["default"].createElement(formik_1.Formik, { initialValues: { username: "", password: "", email: "" }, onSubmit: function (values, _a) {
                    var setErrors = _a.setErrors;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var responseUser;
                        var _b, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, registerUser(values)];
                                case 1:
                                    responseUser = _d.sent();
                                    if ((_b = responseUser.data) === null || _b === void 0 ? void 0 : _b.registerUser.errors) {
                                        setErrors(erropMap_1.toErrorMap(responseUser.data.registerUser.errors));
                                    }
                                    else if ((_c = responseUser.data) === null || _c === void 0 ? void 0 : _c.registerUser.user) {
                                        router.push("/dashboard");
                                        toast({
                                            title: "Register succesfull",
                                            description: "You succesfully registered your account",
                                            status: "success",
                                            duration: 2000,
                                            isClosable: true
                                        });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                } }, function (_a) {
                var isSubmitting = _a.isSubmitting;
                return (react_2["default"].createElement(formik_1.Form, null,
                    react_2["default"].createElement(InputField_1.InputField, { name: "username", label: "Username", placeholder: "Enter your username", variant: "filled", inputsize: "sm" }),
                    react_2["default"].createElement(InputField_1.InputField, { name: "email", label: "Email", placeholder: "Enter your email", variant: "filled", inputsize: "sm" }),
                    react_2["default"].createElement(InputField_1.InputField, { name: "password", label: "Password", placeholder: "Enter your password", type: "password", variant: "filled", inputsize: "sm" }),
                    react_2["default"].createElement(react_1.Button, { type: "submit", colorScheme: "teal", mt: 4, w: "30%", isLoading: isSubmitting }, "Register"),
                    react_2["default"].createElement(react_1.VStack, { justifyContent: "left", alignItems: "left" },
                        react_2["default"].createElement(react_1.Checkbox, { defaultIsChecked: true, id: "newsletter-cb", name: "newsletter", colorScheme: "teal", borderColor: "teal.600" }, "Notify me when new recipes are uploaded"),
                        react_2["default"].createElement(react_1.Checkbox, { id: "terms-cb", name: "terms", borderColor: "teal.600", colorScheme: "teal", mt: 4 }, "I read and I agree to the terms and conditions"),
                        react_2["default"].createElement(react_1.Checkbox, { id: "terms-cb", name: "terms", borderColor: "teal.600", colorScheme: "teal", mt: 4 }, "I read and I agree to the privacy policy"))));
            }),
            react_2["default"].createElement(react_1.Divider, { mt: 2, maxW: "250px", alignSelf: "center" }),
            react_2["default"].createElement(link_1["default"], { href: "/login" },
                react_2["default"].createElement(react_1.Text, { mt: 4, fontSize: "sm", alignSelf: "center", _hover: { textColor: "blue.500", cursor: "pointer" } }, "Already have an account ? Click here to login.")))));
};
exports["default"] = next_urql_1.withUrqlClient(createUrqlClient_1.createUrqlClient)(Signup);
