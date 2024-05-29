import { isString } from "lodash-es";

class EuiMpuiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EuiMpuiError";
  }
}

export function throwErrow(scope: string, msg: string) {
  throw new EuiMpuiError(`[${scope}] ${msg}`);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== "production") {
    const err = isString(scope) ? new EuiMpuiError(`[${scope}] ${msg}`) : scope;
    console.warn(err);
  }
}