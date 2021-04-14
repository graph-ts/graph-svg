export function pickRandom<T> (array: T[]): T {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

export function randomString (maxLength: number): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, maxLength);
}

export function randomNumber (min: number, max: number): number {
    return min + Math.random() * (max - min);
}

type PathType = 'bspline'|'bundle'|'cardinal'|'catmullrom'|'line'|'monotonex'|'monotoney'|'natural'|'step'|'stepafter'|'stepbefore';
export function randomPathType () {
    return pickRandom<PathType>([
        'bspline',
        'bundle',
        'cardinal',
        'catmullrom',
        'line',
        'monotonex',
        'monotoney',
        'natural',
        'step',
        'stepafter',
        'stepbefore'
    ]);
}