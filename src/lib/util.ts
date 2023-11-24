
export const keys = <O extends Record<string, any>>(obj: O) => Object.keys(obj) as (keyof O)[]