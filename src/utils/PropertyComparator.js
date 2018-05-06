export function compareTo(left, right, property) {
    if (!left || !right || !left[property] || !right[property]) {
        return 0
    }
    return left[property].toLowerCase() > right[property].toLowerCase() ?
        1 : (right[property].toLowerCase() > left[property].toLowerCase() ? -1 : 0);
}