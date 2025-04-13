export function generateId() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 5);
    return `${timestamp}-${randomString}`;
}
