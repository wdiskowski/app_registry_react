import { compareTo } from './PropertyComparator';

export function sort(data, property) {
    return data.sort(function (a, b) { return compareTo(a, b, property); });
}