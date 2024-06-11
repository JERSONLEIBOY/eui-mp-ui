import { isString } from "lodash-es";

class EuiMpuiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EuiMpuiError";
  }
}

function createEuiMpUiError(scope: string, msg: string) {
  return new EuiMpuiError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createEuiMpUiError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? createEuiMpUiError(scope, msg!) : scope;
    console.warn(err);
  }
}