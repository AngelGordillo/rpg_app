export const schema = {
    title: "A monster form",
    description: "A form whichs allows you to register a moster",
    type: "object",
    "required": [
        "name"
    ],
    properties: {
        name: {
            type: "string",
            title: "Nombre"
        },
        tipo: {
            type: "string",
            title: "Tipo"
        },
        raza: {
            type: "string",
            title: "Raza"
        },
        uri: {
            type: "string",
            title: 'Link',
        }
    }
};

export const uiOrder = {
    "ui:order": [
        "name",
        "tipo",
        "raza",
        "uri"
    ],
}