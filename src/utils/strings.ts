export function clipStringToLength(string: string | undefined, length: number): string | undefined {
    if (!string) {
        return undefined;
    } else if (string.length > length) {
        return string.substring(0, length) + "...";
    } else {
        return string;
    }
}