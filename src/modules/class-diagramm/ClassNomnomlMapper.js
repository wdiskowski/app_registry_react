

export function map(classData) {
    return classData && classData.classes ? drawDirectives() + '\n' + drawClasses(classData.classes) + '\n' + drawRelations(classData) : 'loading...';
}

function drawDirectives() {
    return '#lineWidth: 1 \n #stroke: #000000 \n #fill: #cccccc';
}

function drawClasses(classes) {
    return classes.map(
        clazz => drawClass(clazz)
    ).reduce((a, b) => a + '\n' + b);
}

function drawClass(clazz) {
    let clazzDescription = '[' + clazz.name;
    if (hasProperties(clazz)) {
        clazzDescription += '|' + drawClassProperties(clazz.properties);
    }
    if (hasMethods(clazz)) {
        clazzDescription += '|' + drawMethods(clazz.methods);
    }
    return clazzDescription + ']';
}

function hasProperties(clazz) {
    return clazz.properties && clazz.properties.length;
}

function hasParameters(method) {
    return method.parameters && method.parameters.length;
}

function hasMethods(clazz) {
    return clazz.methods && clazz.methods.length;
}

function drawClassProperties(properties) {
    return properties.map(
        property => drawClassProperty(property)
    ).reduce((a, b) => a + ';' + b);
}

function drawClassProperty(property) {
    return drawVisibility(property.visibility) + ' ' + property.name + drawType(property.type);
}

function drawMethods(methods) {
    return methods.map(
        method => drawMethod(method)
    ).reduce((a, b) => a + ';' + b);
}

function drawMethod(method) {
    return drawVisibility(method.visibility) + ' ' + method.name
        + '(' + (hasParameters(method) ? drawParameters(method.parameters) : '') + ')' + drawType(method.type);
}

function drawParameters(parameters) {
    return parameters.map(
        parameter => drawParameter(parameter)
    ).reduce((a, b) => a + ', ' + b);
}

function drawParameter(parameter) {
    return parameter.name + drawType(parameter.type);
}

function drawVisibility(visibility) {
    let associationSign = ' ';
    switch (visibility) {
        case 'private': associationSign = '-'; break;
        case 'protected': associationSign = '#'; break;
        case 'public': associationSign = '+'; break;
    }
    return associationSign;
}

function drawType(type) {
    return type ? ': ' + type : '';
}


function drawRelations(classData) {
    return classData.relations && classData.relations.length ? classData.relations.map(
        relation => drawRelation(relation, classData.classes)
    ).reduce((a, b) => a + '\n' + b) : '';
}

function drawRelation(relation, classes) {
    let from = findClassNameByKey(classes, relation.from);
    let to = findClassNameByKey(classes, relation.to);
    if (from && to) {
        return '[' + from + ']' + (relation.text ? relation.text : '') + drawAssociation(relation.relationship)
            + (relation.toText ? relation.toText : '') + '[' + to + ']';
    } else {
        return '';
    }
}

function drawAssociation(association) {
    let associationSign = '-';
    switch (association) {
        case 'aggregation': associationSign += 'o'; break;
        case 'composition': associationSign += '+'; break;
        case 'generalization': associationSign += ':>'; break;
    }
    return associationSign;
}

function findClassNameByKey(classes, key) {
    let found = classes.find(clazz => key === clazz.key);
    return found ? found.name : '';
}
