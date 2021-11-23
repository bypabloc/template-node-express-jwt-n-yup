import { sequelize } from '../config/database'

import pkg from 'sequelize';
const { QueryTypes } = pkg

import * as Yup from 'yup';
import "yup-phone";

import { setLocale } from 'yup';

import languages from './locales'

Yup.addMethod(Yup.string, 'equalTo', function (ref) {
	return this.test({
		name: 'equalTo',
		exclusive: false,
		params: {
			reference: ref.path,
            type: 'equalTo',
		},
		test: function(value) {
            return value === this.resolve(ref) 
		},
	})
});

const bulkSelect = async ({ list }) => {
    const listPromises = []
    for (const item of list) {
        const newPromise = new Promise((resolve, reject) => {
            const { table, column, value } = item;
            sequelize.query(`SELECT * FROM ${table} WHERE ${column} = '${value}'`, { type: QueryTypes.SELECT })
                .then(resolve).catch(reject)
        });
        listPromises.push(newPromise);
    }

    return Promise.all(listPromises).then(res => {
        let valid = false;
        for (const item of res) {
            if(item.length > 0) {
                valid = true;
                break;
            };
        }
        return valid;
    });
}

Yup.addMethod(Yup.string, 'uniqueTable', function (ref) {
    console.log('ref:',ref)
	return this.test({
		name: 'uniqueTable',
		exclusive: false,
		params: {
			reference: ref.path,
            type: 'uniqueTable',
		},
		test: async function(value) {
            console.log('value:',value)
            const list = [ ...ref ]
            for (const key in list) {
                list[key]['value'] = value
            }
            console.log('list:',list)
            let valid = true;
            try {
                const res = await bulkSelect({ list })
                if(res) valid = false;
            } catch (error) {
                console.log('Yup -> addMethod -> uniqueTable -> error:', error);
                valid = false;
            }
            return valid;
		},
	})
});

Yup.addMethod(Yup.string, 'mustHaveSpecialCharacter', function (ref = 1) {
    const validator = '[\\W]';
    const matcher = new RegExp(validator, 'g')
    const regex = new RegExp(`^(?=(.*${validator}){${ref},}).*$`, 'g');
    return this.test("mustHaveSpecialCharacter", function (value) {
        const { path, createError } = this;
    
        if ( ! value?.length ) {
            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref,
                    type: 'mustHaveSpecialCharacter',
                },
            })
        }

        const valid = regex.test(value);
        if(!valid) {
            const countMatch = [...value.matchAll(matcher)].length;

            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref - countMatch,
                    type: 'mustHaveSpecialCharacter',
                },
            })
        }
        return true;
    });
});
Yup.addMethod(Yup.string, 'mustHaveNumber', function (ref = 1) {
    const validator = '[0-9]';
    const matcher = new RegExp(validator, 'g')
    const regex = new RegExp(`^(?=(.*${validator}){${ref},}).*$`, 'g');
    return this.test("mustHaveNumber", function (value) {
        const { path, createError } = this;
    
        if ( ! value?.length ) {
            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref,
                    type: 'mustHaveSpecialCharacter',
                },
            })
        }

        const valid = regex.test(value);
        if(!valid) {
            const countMatch = [...value.matchAll(matcher)].length;

            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref - countMatch,
                    type: 'mustHaveNumber',
                },
            })
        }
        return true;
    });
});
Yup.addMethod(Yup.string, 'mustHaveLowerCase', function (ref = 1) {
    const validator = '[a-z]';
    const matcher = new RegExp(validator, 'g')
    const regex = new RegExp(`^(?=(.*${validator}){${ref},}).*$`, 'g');
    return this.test("mustHaveLowerCase", function (value) {
        const { path, createError } = this;
    
        if ( ! value?.length ) {
            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref,
                    type: 'mustHaveSpecialCharacter',
                },
            })
        }

        const valid = regex.test(value);
        if(!valid) {
            const countMatch = [...value.matchAll(matcher)].length;

            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref - countMatch,
                    type: 'mustHaveLowerCase',
                },
            })
        }
        return true;
    });
});
Yup.addMethod(Yup.string, 'mustHaveUpperCase', function (ref = 1) {
    const validator = '[A-Z]';
    const matcher = new RegExp(validator, 'g')
    const regex = new RegExp(`^(?=(.*${validator}){${ref},}).*$`, 'g');
    return this.test("mustHaveUpperCase", function (value) {
        const { path, createError } = this;
    
        if ( ! value?.length ) {
            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref,
                    type: 'mustHaveSpecialCharacter',
                },
            })
        }

        const valid = regex.test(value);
        if(!valid) {
            const countMatch = [...value.matchAll(matcher)].length;

            return createError({
                path,
                params: {
                    reference: path,
                    countMissing: ref - countMatch,
                    type: 'mustHaveUpperCase',
                },
            })
        }
        return true;
    });
});

export const validateObject = ({ validations, values }) => {
    const schema = Yup.object().shape({
        ...validations,
    })
    return new Promise((resolve, reject) => {
        schema.validate({...values}, { abortEarly: false }).then(resolve).catch((err) => {
            const errors = {};
            if(err?.inner){
                for (const error of err.inner) {
                    if(errors[error['path']]){
                        errors[error['path']].push(error['errors'].map(e => e.charAt(0).toUpperCase() + e.slice(1)));
                    }else{
                        errors[error['path']] = [error['errors'].map(e => e.charAt(0).toUpperCase() + e.slice(1))];
                    }
                }
            }
            reject(errors);
        })
    })
}

export const setLocaleYup = (language) => {
    setLocale(languages(language));
};

export const yup = Yup;