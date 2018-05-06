

export function map(erData) {
    return erData && erData.entities ? drawDirectives() + '\n' + drawEntities(erData.entities) + '\n' + drawRelationships(erData.relations): 'loading...';
}

function drawDirectives() {
    return '#lineWidth: 1 \n #stroke: #000000 \n #fill: #f1f1f1';
}

function drawEntities(entities) {
    return entities.map(
        entity => drawEntity(entity)
    ).reduce((a, b) => a + '\n' + b);
}

function drawEntity(entity) {
    if(hasItems(entity)) {
        return '[' + entity.key + '|' + drawEntityProperties(entity) + ']';
    } else {
        return '[' + entity.key + ']';
    }
}

function hasItems(entity) {
    return entity.items && entity.items.length;
}

function drawEntityProperties(entity) {
    return entity.items.map(
        item => drawEntityProperty(item)
    ).reduce((a, b) => a + '|' + b);
}

function drawEntityProperty(item) {
    return item.iskey ? '# ' + item.name : '  ' + item.name;
}

function drawRelationships(relationships) {
    return relationships && relationships.length ? relationships.map(
        relationship => drawRelationship(relationship)
    ).reduce((a, b) => a + '\n' + b) : '';
}

function drawRelationship(relationship) {
    return '[' + relationship.from + ']' + (relationship.text ? relationship.text : '') + '-'
    + (relationship.toText ? relationship.toText : '') + '[' + relationship.to + ']';
}
