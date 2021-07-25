export enum ResulType {
    OK = "OK",
    Error = "Error"
}

export interface ResultOK<T> {
    type: ResulType.OK;
    result: T;
}

export interface ResultError<T> {
    type: ResulType.Error;
    error: T;
}

export type Result<T, E> = ResultOK<T> | ResultError<E>;

export class ResultBuilder {
    public static err<T, E>(e: E): Result<T, E> {
        return {
            type: ResulType.Error,
            error: e
        };
    }

    public static ok<T, E>(t: T): Result<T, E> {
        return {
            type: ResulType.OK,
            result: t
        };
    }
}
