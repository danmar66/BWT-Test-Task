export function formatJson(str) {
    return str !== '' ? JSON.parse(str.replace(/&quot;/ig, '"')) : ''
}