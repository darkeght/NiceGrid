// Configurações globais encapsuladas
const globalConfig = {
    templateGrid: "{0}",
    templateTags: [
        "<table {0}>{1}</table>",
        "<caption {0}>{1}</caption>",
        "<thead {0}>{1}</thead>",
        "<tbody {0}>{1}</tbody>",
        "<tfoot {0}>{1}</tfoot>",
        "<th {0}>{1}</th>",
        "<tr {0}>{1}</tr>",
        "<td {0}>{1}</td>"
    ],
    propertyTags: ["onclick", "style", "title"],
    propertyTagsHeader: ["Headeronclick", "Headerstyle"],
    propertyTagsRows: ["Rowsonclick", "Rowsstyle"],
    propertyTagsFoot: ["Footonclick", "Footstyle"],
    splitChar: "⁞",
    filterDb: []
};

// Função utilitária para substituir placeholders em strings
const replacePlaceholders = (template, replacements) => {
    return template.replace(/{(\d+)}/g, (_, index) => replacements[index] || "");
};

// Função para criar atributos baseados em propriedades
const createAttributes = (element, properties) => {
    return properties
        .map(prop => {
            const value = $(element).attr(prop);
            return value ? `${prop.replace("Header", "")}="${value}"` : "";
        })
        .filter(Boolean)
        .join(" ");
};

// Função para criar o cabeçalho da tabela
const createTableHeader = (element) => {
    const headers = $(element).find(".header");
    return headers
        .map((_, header) => {
            const attributes = createAttributes(header, globalConfig.propertyTagsHeader);
            const title = $(header).attr("title") || "";
            return `<th ${attributes}>${title}</th>`;
        })
        .get()
        .join("");
};

// Função para criar linhas do corpo da tabela
const createTableRows = (element, startIndex, rowView, data) => {
    const headers = $(element).find(".header");
    const rows = data.slice(startIndex, startIndex + rowView);
    return rows
        .map((row, rowIndex) => {
            const cells = headers
                .map((_, header) => {
                    const fieldName = $(header).attr("fieldname");
                    return `<td>${row[fieldName]}</td>`;
                })
                .get()
                .join("");
            return `<tr>${cells}</tr>`;
        })
        .join("");
};

// Função para criar o rodapé da tabela
const createTableFooter = (element, gridID, startIndex, listName, callFunction) => {
    const rowView = Number($(element).attr("RowView")) || 10;
    const totalRows = window[listName].length;
    const lastPage = Math.max(0, totalRows - rowView);
    const nextPage = Math.min(totalRows, startIndex + rowView);
    const prevPage = Math.max(0, startIndex - rowView);

    const paginationLinks = `
        <a class="pagesselector icon-to-start-alt" onclick="${callFunction}('${gridID}', 0, '${listName}')"></a>
        <a class="pagesselector" onclick="${callFunction}('${gridID}', ${prevPage}, '${listName}')">◄</a>
        <a class="pagesselector" onclick="${callFunction}('${gridID}', ${nextPage}, '${listName}')">►</a>
        <a class="pagesselector icon-to-end-alt" onclick="${callFunction}('${gridID}', ${lastPage}, '${listName}')"></a>
    `;

    return `
        <tfoot>
            <tr>
                <td colspan="${$(element).find(".header").length}">
                    ${paginationLinks}
                </td>
            </tr>
        </tfoot>
    `;
};

// Função principal para criar o grid
const createNiceGrid = (gridID, startIndex, listName) => {
    const element = $(`#${gridID}`);
    const rowView = Number(element.attr("RowView")) || 10;
    const data = window[listName];

    const header = createTableHeader(element);
    const rows = createTableRows(element, startIndex, rowView, data);
    const footer = createTableFooter(element, gridID, startIndex, listName, "createNiceGrid");

    const table = `<table>${header}${rows}${footer}</table>`;
    element.html(table);
};
