export type Result<E,T> = { error: E | undefined , value: null }  | { error: null, value: T }

export function ok<T>(data: T): Result<never, T> {
  return { error: null, value: data }
}

export function err<E>(err?: E): Result<E, never> {
  return { error: err, value: null }
}