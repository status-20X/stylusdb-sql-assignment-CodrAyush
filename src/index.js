// src/index.js

// Function to evaluate a single condition
function evaluateCondition(row, clause) {
    const { field, operator, value } = clause;
    switch (operator) {
        case '=': return row[field] === value;
        case '!=': return row[field] !== value;
        case '>': return row[field] > value;
        case '<': return row[field] < value;
        case '>=': return row[field] >= value;
        case '<=': return row[field] <= value;
        default: throw new Error(`Unsupported operator: ${operator}`);
    }
}

// Function to parse SQL query
function parseQuery(query) {
    const match = query.match(/^SELECT (.+) FROM (.+?)(?: WHERE (.+))?$/);
    if (!match) {
        throw new Error('Invalid SQL query');
    }

    const [, fields, table, whereClause] = match;
    const parsed = {
        fields: fields.split(',').map(field => field.trim()),
        table: table.trim(),
        whereClauses: []
    };

    if (whereClause) {
        const conditions = whereClause.split(' AND ');
        parsed.whereClauses = conditions.map(condition => {
            const [field, operator, value] = condition.split(/\s*(=|!=|>|<|>=|<=)\s*/);
            return { field: field.trim(), operator: operator.trim(), value: parseInt(value.trim()) };
        });
    }

    return parsed;
}

// Function to execute the SELECT query
function executeSELECTQuery(data, query) {
    // Parse the query
    const { fields, table, whereClauses } = parseQuery(query);

    // If there are where clauses, filter the data based on conditions
    const filteredData = whereClauses.length > 0
        ? data.filter(row => whereClauses.every(clause => evaluateCondition(row, clause)))
        : data;

    // Return only the selected fields
    const result = filteredData.map(row => {
        const selectedRow = {};
        fields.forEach(field => {
            selectedRow[field] = row[field];
        });
        return selectedRow;
    });

    return result;
}

module.exports = {
    executeSELECTQuery, // Exporting executeSELECTQuery function
    parseQuery // Exporting parseQuery function
};
// src/index.js

// Function to evaluate a single condition
function evaluateCondition(row, clause) {
    // implementation
}

// Function to parse SQL query
function parseQuery(query) {
    // implementation
}

// Function to execute the SELECT query
function executeSELECTQuery(data, query) {
    // implementation
}

module.exports = {
    parseQuery,
    executeSELECTQuery
};
