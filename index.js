"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const child_process_1 = require("child_process");
try {
    const src = core.getInput('src');
    const host = core.getInput('host');
    const remote = core.getInput('remote');
    const port = core.getInput('port');
    const user = core.getInput('user');
    const key = core.getInput('key');
    (0, child_process_1.execSync)(`echo "${key}" > __TEMP_INPUT_KEY_FILE`);
    (0, child_process_1.execSync)(`chmod 600 __TEMP_INPUT_KEY_FILE`);
    (0, child_process_1.execSync)(`scp -o StrictHostKeyChecking=no -v -i __TEMP_INPUT_KEY_FILE -P ${port} -r ${src} ${user}@${host}:${remote}`);
}
catch (error) {
    core.setFailed(error.message);
}
finally {
    (0, child_process_1.execSync)(`rm __TEMP_INPUT_KEY_FILE`);
}
