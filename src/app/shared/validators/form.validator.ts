import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Injectable } from '../../../../node_modules/@angular/core';

import * as moment from 'moment';

@Injectable()
export class FormValidator {
    matchPassword(AC: AbstractControl) {
        const password = AC.get('senha').value; // to get value in input tag
        const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        } else {
            return null;
        }
    }
    matchEmail(AC: AbstractControl) {
        const email = AC.get('email').value; // to get value in input tag
        const confirmEmail = AC.get('confirmEmail').value; // to get value in input tag
        if (email !== confirmEmail) {
            AC.get('confirmEmail').setErrors({ MatchEmail: true });
        } else {
            return null;
        }
    }

    validLength(value: string, maxLenght: number) {
        return value.length >= maxLenght;
    }

    validEmail(value: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    }

    validConfirmField(primaryFieldValue: string, confirmFieldValue: string) {
        return primaryFieldValue === confirmFieldValue;
    }

    validRequiredField(value: string) {
        return value && value !== "";
    }

    validHourField(ac: AbstractControl): { [key: string]: boolean } | null {
        let _validHour = true;

        const value = ac.value;
        if (value && value.length > 0) {
            const hourArray = value.split(':');
            if (hourArray.length === 2) {
                const hour = parseInt(hourArray[0].replace('/\D/g', ''), 10);
                const minutes = parseInt(hourArray[1].replace('/\D/g', ''), 10);
                if (hour < 0 || hour > 23) {
                    _validHour = false;
                }

                if (minutes < 0 || minutes > 59) {
                    _validHour = false;
                }
            }
        }

        if (_validHour === false) {
            return { invalidHour: true };
        } else {
            return null;
        }
    }

    validCpfField(ac: AbstractControl): { [key: string]: boolean } | null {
        let cpf = ac.value;
        let soma = 0;
        let resto: number;
        //if (!ac.touched) {
        //    return { invalidCpf: false };
        // }

        if (!cpf || cpf === '' || cpf.length !== 11) {
            return { invalidCpf: true };
        } else {
            cpf = cpf.replace('/\D/g', '');
        }

        if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
            cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' ||
            cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' ||
            cpf === '99999999999') {
            return { invalidCpf: true };
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10), 10)) {
            return { invalidCpf: true };
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11), 10)) {
            return { invalidCpf: true };
        }

        return null;
    }

    validCnpjField(ac: AbstractControl): { [key: string]: boolean } | null {
        let cnpj = ac.value;
        /*if (!ac.touched) {
            return { invalidCnpj: false };
        }*/

        if (!cnpj || cnpj === '' || cnpj.length !== 14) {
            return { invalidCnpj: true };
        } else {
            cnpj = cnpj.replace(/[^\d]+/g, '');

        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" ||
            cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" ||
            cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" ||
            cnpj == "99999999999999") {
            return { invalidCnpj: true };
        }

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += (parseInt(numeros.charAt(tamanho - i), 10) * pos--);
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return { invalidCnpj: true };
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += (parseInt(numeros.charAt(tamanho - i), 10) * pos--);
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return { invalidCnpj: true };
        }

        return null;
    }

    testCpf(cpf: string): boolean {
        let soma = 0;
        let resto: number;

        cpf = cpf.replace('/\D/g', '');

        if (cpf === '' || cpf.length !== 11) {
            return false;
        }

        if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
            cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' ||
            cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' ||
            cpf === '99999999999') {
            return false;
        }

        for (let i = 1; i <= 9; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(9, 10), 10)) {
            return false;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma = soma + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
        }
        resto = (soma * 10) % 11;

        if ((resto === 10) || (resto === 11)) {
            resto = 0;
        }

        if (resto !== parseInt(cpf.substring(10, 11), 10)) {
            return false;
        }

        return true;
    }

    testCnpj(cnpj: string): boolean {

        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj === '' || cnpj.length !== 14) {
            return false;
        }

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || cnpj == "11111111111111" || cnpj == "22222222222222" ||
            cnpj == "33333333333333" || cnpj == "44444444444444" || cnpj == "55555555555555" ||
            cnpj == "66666666666666" || cnpj == "77777777777777" || cnpj == "88888888888888" ||
            cnpj == "99999999999999") {
            return false;
        }

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0, tamanho);
        const digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += (parseInt(numeros.charAt(tamanho - i), 10) * pos--);
            if (pos < 2) {
                pos = 9;
            }
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(0), 10)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += (parseInt(numeros.charAt(tamanho - i), 10) * pos--);
            if (pos < 2) {
                pos = 9;
            }
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado !== parseInt(digitos.charAt(1), 10)) {
            return false;
        }

        return true;
    }

    validDateField(ac: AbstractControl): { [key: string]: boolean } | null {
        let _validDate = false;
        _validDate = moment(ac.value).isValid();
        const value = moment(ac.value).format();
        if (value && value.length > 0) {
            let inputValueArray = value.split('-');
            inputValueArray = inputValueArray.slice(0, 3);
            inputValueArray[2] = inputValueArray[2].substring(0, 2);
            inputValueArray.reverse();
            if (inputValueArray.length === 3) {
                const day = inputValueArray[0];
                const month = inputValueArray[1];
                const year = inputValueArray[2];

                if (!day || !month || !(year && year.length === 4)) {
                    _validDate = false;
                } else {
                    _validDate = moment(year + month + day, 'YYYYMMDD').isValid();
                }
            }
        }
        if (_validDate === false) {
            return { invalidDate: true };
        } else {
            return null;
        }
    }


    isValidDate = (c: AbstractControl) => {
        const nextYear = moment('0101' + moment().add(2, 'y').year(), "MMDDYYYY");
        const valid = moment(c.value).isBetween('1949-12-31', nextYear);
        return valid ? null : { validDate: true };
    }
    isValidDateToday = (c: AbstractControl) => {
        if (c.value == null)
            return null

        const today = moment().format('YYYY-MM-DD');
        const valid = moment(c.value).isBetween('1949-12-31', today, null, '[]');
        return valid ? null : { validDate: true };
    }

    jobRequired(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const nome = c.get(dateField1).value;
            const job = c.get(dateField2).value;
            if ((nome !== null && job !== null) && job > 0) {
                return validatorField;
            }
            return null;
        };
    }

    invalidRefundDate = (c: AbstractControl) => {
        const lastYear = moment(moment().subtract(1, 'y').subtract(1, 'd'), "MMDDYYYY");
        const valid = moment(c.value, "YYYY-MM-DD").isBetween(lastYear, moment());
        return valid ? null : { invalidDate: true };
    }

    dateLessThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const tdate1 = c.get(dateField1).value;
            const date1 = moment(tdate1, "YYYY-MM-DD");
            const tdate2 = c.get(dateField2).value;

            const date2 = moment(tdate2, "YYYY-MM-DD");
            if (c.get(dateField2).touched) {
                if ((date1.isValid() && date2.isValid()) && date2.isSameOrBefore(date1)) {
                    return validatorField;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };
    }
    dateLessOrEqualThan(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const tdate1 = c.get(dateField1).value;
            const date1 = moment(tdate1, "YYYY-MM-DD");
            const tdate2 = c.get(dateField2).value;

            const date2 = moment(tdate2, "YYYY-MM-DD");
            if (c.get(dateField2).touched) {
                if ((date1.isValid() && date2.isValid()) && date2.isBefore(date1)) {
                    return validatorField;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };
    }

    dateLessThan2003 = (c: AbstractControl) => {
        if (c.value == null)
            return null

        const today = moment().format('YYYY-MM-DD');
        const valid = moment(c.value).isBetween('2003-01-01', today, null, '[]');
        return valid ? null : { validDate: true };
    }
    isBetweenNextDayMonthAgo = (c: AbstractControl) => {
        if (c.value == null)
            return null

        const today = moment().add(1, 'days').format('YYYY-MM-DD');
        const monthAgo = moment().add(30, 'days').format('YYYY-MM-DD');
        const valid = moment(c.value).isBetween(today, monthAgo, null, '[]');
        return valid ? null : { validDate: true };
    }
    isNotWeekendDay = (c: AbstractControl) => {
        if (c.value == null)
            return null
        const date = moment(c.value).isoWeekday();
        const valid = !(date === 6 || date === 0)
        return valid ? null : { validDate: true };
    }
    dateSixMonthsDifference(dateField1: string, dateField2: string, validatorField: { [key: string]: boolean }): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            const tdate1 = c.get(dateField1).value;
            const date1 = moment(tdate1, "YYYY-MM-DD");
            const tdate2 = c.get(dateField2).value;

            const date2 = moment(tdate2, "YYYY-MM-DD");
            if (c.get(dateField2).touched || c.get(dateField2).dirty) {
                if ((date1.isValid() && date2.isValid()) && date2.diff(date1, 'months') < 6) {
                    return null;
                } else {
                    return validatorField;
                }
            } else {
                return null;
            }
        };
    }

    validUfField(ac: AbstractControl): { [key: string]: boolean } | null {
        let _validUf = true;

        let value = ac.value;
        if (value && value.length > 0) {
            if (value.length !== 2) {
                _validUf = false
            } else {
                value = value.toUpperCase();
                switch (value) {
                    case 'AC': case 'AL': case 'AP':
                    case 'AM': case 'BA': case 'CE':
                    case 'DF': case 'ES': case 'GO':
                    case 'MA': case 'MT': case 'MS':
                    case 'MG': case 'PA': case 'PB':
                    case 'PR': case 'PE': case 'PI':
                    case 'RJ': case 'RN': case 'RS':
                    case 'RO': case 'RR': case 'SC':
                    case 'SP': case 'SE': case 'TO':
                        _validUf = true;
                        break;
                    default:
                        _validUf = false;
                }
            }
        }

        if (_validUf === false) {
            return { invalidUf: true };
        } else {
            return null;
        }
    }


}
