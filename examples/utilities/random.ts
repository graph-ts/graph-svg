export function pickRandom<T> (array: T[]): T {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

export function randomString (maxLength: number): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, maxLength);
}