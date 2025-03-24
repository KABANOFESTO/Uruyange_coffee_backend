"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userDTO = {
    createUserDTO: (user) => ({
        email: user.email,
        password: user.password,
        role: user.role || 'user',
    }),
    getUserDTO: (user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
    })
};
exports.default = userDTO;
//# sourceMappingURL=userDTO.js.map