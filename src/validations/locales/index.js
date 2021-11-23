// https://en.wikipedia.org/wiki/ISO_3166-1

import ven from './ven';

// Based on https://github.com/jquense/yup/blob/2973d0a/src/locale.js

const languages = {
    ven,
};

export default function (language) {
    return languages[language] || languages.ven;
}