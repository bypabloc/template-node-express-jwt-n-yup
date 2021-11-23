// https://en.wikipedia.org/wiki/ISO_3166-1

import ven from './ven';

export const languages = {
    ven,
};

export default function (language) {
    return languages[language] || languages.ven;
}