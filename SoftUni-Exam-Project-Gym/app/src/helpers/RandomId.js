function generateRandomString() {
    const length = 20;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.charAt(randomIndex);
    }

    return randomString;
}

export function RandomStringGenerator() {
    const randomString = generateRandomString();
    
    return randomString

}