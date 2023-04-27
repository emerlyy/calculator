export type Operation = '=' | '+' | '-' | '/' | '*';

export const isOperation = (char: string): char is Operation => {
    return ['=', '+', '-', '/', '*'].some(el => el === char);
}