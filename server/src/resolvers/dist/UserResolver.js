"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
var User_1 = require("../entities/User");
var type_graphql_1 = require("type-graphql");
var argon2_1 = require("argon2");
var CustomError_1 = require("../errors/CustomError");
var constants_1 = require("../constants");
var sendEmail_1 = require("../utils/sendEmail");
var ModuleBinder_1 = require("../utils/ModuleBinder");
var RegisterUserInput = /** @class */ (function () {
    function RegisterUserInput() {
    }
    __decorate([
        type_graphql_1.Field()
    ], RegisterUserInput.prototype, "username");
    __decorate([
        type_graphql_1.Field()
    ], RegisterUserInput.prototype, "password");
    __decorate([
        type_graphql_1.Field()
    ], RegisterUserInput.prototype, "email");
    RegisterUserInput = __decorate([
        type_graphql_1.InputType()
    ], RegisterUserInput);
    return RegisterUserInput;
}());
var LoginUserInput = /** @class */ (function () {
    function LoginUserInput() {
    }
    __decorate([
        type_graphql_1.Field()
    ], LoginUserInput.prototype, "username");
    __decorate([
        type_graphql_1.Field()
    ], LoginUserInput.prototype, "password");
    LoginUserInput = __decorate([
        type_graphql_1.InputType()
    ], LoginUserInput);
    return LoginUserInput;
}());
var UserReponse = /** @class */ (function () {
    function UserReponse() {
    }
    __decorate([
        type_graphql_1.Field(function () { return [CustomError_1.FieldErrors]; }, { nullable: true })
    ], UserReponse.prototype, "errors");
    __decorate([
        type_graphql_1.Field(function () { return User_1.User; }, { nullable: true })
    ], UserReponse.prototype, "user");
    UserReponse = __decorate([
        type_graphql_1.ObjectType()
    ], UserReponse);
    return UserReponse;
}());
var UserResolver = /** @class */ (function () {
    function UserResolver() {
    }
    UserResolver.prototype.changePassword = function (token, newPassword, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, Promise, function () {
            var key, userID, currentUser, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (newPassword.length < 8) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "resetPassword",
                                            message: "The password must be atleast 8 characters."
                                        }
                                    ]
                                }];
                        }
                        key = constants_1.FORGET_PASSWORD_PREFIX + token;
                        return [4 /*yield*/, ModuleBinder_1["default"].get(key)];
                    case 1:
                        userID = _c.sent();
                        if (!userID) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "token",
                                            message: "Token expired"
                                        }
                                    ]
                                }];
                        }
                        return [4 /*yield*/, User_1.User.findOne({ id: parseInt(userID) })];
                    case 2:
                        currentUser = _c.sent();
                        if (!currentUser) {
                            return [2 /*return*/, {
                                    errors: [
                                        {
                                            field: "token",
                                            message: "User no longer exists"
                                        }
                                    ]
                                }];
                        }
                        _b = currentUser;
                        return [4 /*yield*/, argon2_1["default"].hash(newPassword)];
                    case 3:
                        _b.password = _c.sent();
                        return [4 /*yield*/, currentUser.save()];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, ModuleBinder_1["default"].del(key)];
                    case 5:
                        _c.sent();
                        req.session.userId = currentUser.id;
                        return [2 /*return*/, {
                                user: currentUser
                            }];
                }
            });
        });
    };
    UserResolver.prototype.forgotPassword = function (email, _a) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, false];
                        }
                        token = user.uuid;
                        return [4 /*yield*/, ModuleBinder_1["default"].set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 180)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, sendEmail_1.sendEmail(email, "<a href=\"http://localhost:3000/change-password/" + token + "\" >Reset Password</a>")];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // *** CRUD ***
    UserResolver.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.getUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserResolver.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User_1.User["delete"]({ id: id })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // *** REGISTRATION AND LOGGING ***
    UserResolver.prototype.registerUser = function (userCreds, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, Promise, function () {
            var hashedPassword, user, registeredUser, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (userCreds.username.length <= 3) {
                            return [2 /*return*/, {
                                    errors: [{
                                            field: 'username',
                                            message: "The username must be atleast 3 characters"
                                        }]
                                }];
                        }
                        if (userCreds.password.length < 8) {
                            return [2 /*return*/, {
                                    errors: [{
                                            field: 'password',
                                            message: "The password must be atleast 8 characters"
                                        }]
                                }];
                        }
                        return [4 /*yield*/, argon2_1["default"].hash(userCreds.password)];
                    case 1:
                        hashedPassword = _b.sent();
                        user = undefined;
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, User_1.User
                                .createQueryBuilder()
                                .insert()
                                .into(User_1.User)
                                .values({
                                username: userCreds.username,
                                password: hashedPassword,
                                email: userCreds.email
                            })
                                .returning('*')
                                .updateEntity(true)
                                .execute()];
                    case 3:
                        registeredUser = _b.sent();
                        user = registeredUser.generatedMaps[0];
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        if (error_1.routine === '_bt_check_unique') {
                            return [2 /*return*/, {
                                    errors: [{
                                            field: "username",
                                            message: "The user already exist"
                                        }]
                                }];
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        req.session.userId = user === null || user === void 0 ? void 0 : user.id;
                        return [2 /*return*/, {
                                user: user
                            }];
                }
            });
        });
    };
    UserResolver.prototype.loginUser = function (userCreds, _a) {
        var req = _a.req;
        return __awaiter(this, void 0, Promise, function () {
            var user, validPassword;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, User_1.User.findOne({ username: userCreds.username.toLowerCase() })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    errors: [{
                                            field: 'username',
                                            message: "The username doesn't exist"
                                        }]
                                }];
                        }
                        return [4 /*yield*/, argon2_1["default"].verify(user.password, userCreds.password)];
                    case 2:
                        validPassword = _b.sent();
                        if (!validPassword) {
                            return [2 /*return*/, {
                                    errors: [{
                                            field: 'password',
                                            message: "The passwords did not match"
                                        }]
                                }];
                        }
                        else {
                            req.session.userId = user.id;
                            return [2 /*return*/, {
                                    user: user
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserResolver.prototype.currentUser = function (_a) {
        var req = _a.req;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!req.session.userId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, User_1.User.findOne({ id: req.session.userId })];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    UserResolver.prototype.logoutUser = function (_a) {
        var req = _a.req, res = _a.res;
        return new Promise(function (resolve) { return req.session.destroy(function (error) {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (error) {
                console.log(error);
                resolve(false);
                return;
            }
            resolve(true);
        }); });
    };
    __decorate([
        type_graphql_1.Mutation(function () { return UserReponse; }),
        __param(0, type_graphql_1.Arg("token")),
        __param(1, type_graphql_1.Arg("newPassword")),
        __param(2, type_graphql_1.Ctx())
    ], UserResolver.prototype, "changePassword");
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        __param(0, type_graphql_1.Arg("email")),
        __param(1, type_graphql_1.Ctx())
    ], UserResolver.prototype, "forgotPassword");
    __decorate([
        type_graphql_1.Query(function () { return [User_1.User]; })
    ], UserResolver.prototype, "getAllUsers");
    __decorate([
        type_graphql_1.Query(function () { return User_1.User; }),
        __param(0, type_graphql_1.Arg("id", function () { return type_graphql_1.Int; }))
    ], UserResolver.prototype, "getUser");
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        __param(0, type_graphql_1.Arg("id", function () { return type_graphql_1.Int; }))
    ], UserResolver.prototype, "deleteUser");
    __decorate([
        type_graphql_1.Mutation(function () { return UserReponse; }),
        __param(0, type_graphql_1.Arg("userCreds")),
        __param(1, type_graphql_1.Ctx())
    ], UserResolver.prototype, "registerUser");
    __decorate([
        type_graphql_1.Mutation(function () { return UserReponse; }),
        __param(0, type_graphql_1.Arg("userCreds")),
        __param(1, type_graphql_1.Ctx())
    ], UserResolver.prototype, "loginUser");
    __decorate([
        type_graphql_1.Query(function () { return User_1.User; }, { nullable: true }),
        __param(0, type_graphql_1.Ctx())
    ], UserResolver.prototype, "currentUser");
    __decorate([
        type_graphql_1.Mutation(function () { return Boolean; }),
        __param(0, type_graphql_1.Ctx())
    ], UserResolver.prototype, "logoutUser");
    UserResolver = __decorate([
        type_graphql_1.Resolver()
    ], UserResolver);
    return UserResolver;
}());
exports.UserResolver = UserResolver;
