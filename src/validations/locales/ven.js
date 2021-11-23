import printValue from '../util/printValue';

import lang from '../../lang';

const language = lang('es');

const methodsCustom = {
    equalTo: ({ path, reference }) => `${language[path] || path} debe ser igual que ${language[reference] || reference}.`,
    uniqueTable: ({ path }) => `${language[path] || path} ya existe.`,
    mustHaveSpecialCharacter: ({ path, countMissing }) => `${language[path] || path} falta(n) ${countMissing} caracter(es) especial(es).`,
    mustHaveNumber: ({ path, countMissing }) => `${language[path] || path} falta(n) ${countMissing} número(s).`,
    mustHaveLowerCase: ({ path, countMissing }) => `${language[path] || path} falta(n) ${countMissing} minúscula(s).`,
    mustHaveUpperCase: ({ path, countMissing }) => `${language[path] || path} falta(n) ${countMissing} mayúscula(s).`,
    default: ({ path }) => `${language[path] || path} no es válido.`,
}

export default {
    mixed: {
        default: (e) => methodsCustom?.[e?.type] ? methodsCustom[e.type](e) : methodsCustom['default'](e),
        required: ({ path }) => `${language[path] || path} es un campo obligatorio.`,
        oneOf: ({ path, values }) => `${language[path] || path} debe ser uno de los siguientes valores: ${values}.`,
        notOneOf: ({ path, values }) => `${language[path] || path} no debe ser uno de los siguientes valores: ${values}.`,
        notType: ({ path, type, value, originalValue }) => {
            const isCast = originalValue != null && originalValue !== value;
            let msg =
                `${path} debe ser un \`${type}\` Tipo, ` +
                `pero el valor final fue: \`${printValue(value, true)}\`` +
                (isCast
                    ? ` (Obtenido del valor \`${printValue(originalValue, true)}\`).`
                    : '.');
    
            if (value === null) {
                msg +=
                    `\n Si "nulo" es intencionalmente un valor vacío, asegúrese de marcar el esquema como` +
                    ' `.nullable()`';
            }
    
            return msg;
        },
    },
    string: {
        length: ({ path, length }) => `${language[path] || path} debe ser exactamente ${length} caracteres.`,
        min: ({ path, min }) => `${language[path] || path} debe ser de al menos ${min} caracteres.`,
        max: ({ path, max }) => `${language[path] || path} debe ser como máximo ${max} caracteres.`,
        matches: ({ path, regex }) => `${language[path] || path} debe coincidir con lo siguiente: ${regex}.`,
        email: ({ path }) => `${language[path] || path} debe ser un correo electrónico válido.`,
        url: ({ path }) => `${language[path] || path} debe ser una URL válida.`,
        uuid: ({ path }) => `${language[path] || path} debe ser un UUID válido.`,
        trim: ({ path }) => `${language[path] || path} debe ser una cadena recortada.`,
        lowercase: ({ path }) => `${language[path] || path} debe ser una cadena en minúsculas.`,
        uppercase: ({ path }) => `${language[path] || path} debe ser una cadena en mayúsculas.`,
    },
    number: {
        min: ({ path, min }) => `${language[path] || path} debe ser mayor que o igual a ${min}.`,
        max: ({ path, max }) => `${language[path] || path} debe ser menor que o igual a ${max}.`,
        lessThan: ({ path, less }) => `${language[path] || path} debe ser menor a ${less}.`,
        moreThan: ({ path, more }) => `${language[path] || path} debe ser mayor a ${more}.`,
        positive: ({ path }) => `${language[path] || path} debe ser un número positivo.`,
        negative: ({ path }) => `${language[path] || path} debe ser un número negativo.`,
        integer: ({ path }) => `${language[path] || path} debe ser un entero.`,
    },
    date: {
        min: ({ path, min }) => `${language[path] || path} campo debe ser posterior a ${min}.`,
        max: ({ path, max }) => `${language[path] || path} campo debe ser posterior a ${max}.`,
    },
    boolean: {
        isValue: ({ path, value }) => `${language[path] || path} el campo debe ser ${value}.`,
    },
    object: {
        noUnknown: ({ path, unknown }) => `${language[path] || path} el campo tiene claves no especificadas: ${unknown}.`,
    },
    array: {
        min: ({ path, min }) => `${language[path] || path} campo debe tener al menos ${min} artículos.`,
        max: ({ path, max }) => `${language[path] || path} campo debe ser menor o igual a ${max} artículos.`,
        length: ({ path, length }) => `${language[path] || path} debe tener ${length} artículos.`,
    },
}
