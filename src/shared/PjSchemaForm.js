export const schema = {
    title: "A investigator form",
    description: "A form whichs allows you to register",
    type: "object",
    "required": [
        "name"
    ],
    properties: {
        name: {
            type: "string",
            title: "Nombre",
            "default": "Chuck"
        },
        profesion: {
            type: "string",
            title: "Profesion"
        },
        edad: {
            type: "integer",
            title: "Edad"
        },
        sexo: {
            type: "string",
            title: "Sexo"
        },
        nacionalidad: {
            type: "string",
            title: "Nacionalidad"
        },
        residencia: {
            type: "string",
            title: "Residencia"
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
        "profesion",
        "edad",
        "sexo",
        "nacionalidad",
        "residencia",
        "uri"
    ],
}