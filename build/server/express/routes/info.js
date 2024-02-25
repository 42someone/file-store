"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRouter = void 0;
const tslib_1 = require("tslib");
const express_1 = require("express");
const Middlewares = tslib_1.__importStar(require("../middleware"));
const dependencies_1 = require("../../../dependencies");
const dependency_identifiers_1 = require("../../../dependencies/dependency-identifiers");
const InfoRouter = (0, express_1.Router)();
exports.InfoRouter = InfoRouter;
InfoRouter.get('/', Middlewares.IsAuthenticated, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const getInfoUseCase = dependencies_1.DependencyContainer.get(dependency_identifiers_1.Symbols.GetInfoUseCase);
    try {
        const token_payload = req["token_payload"];
        const info = yield getInfoUseCase.execute({ id: +token_payload.user_id });
        res.send(info);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}));
//# sourceMappingURL=info.js.map