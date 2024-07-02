export class UserValidation {

    static EmailValidation(email: string): boolean {
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    static PasswordValidation(password: string) {
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password,
        )
    }

    static CPFValidation(cpf: string) {
        const cpfWithoutDots = cpf.replace(/[^\d]+/g, '')
        return !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(cpf) || cpfWithoutDots.length != 11 || (
            cpfWithoutDots === '00000000000' ||
            cpfWithoutDots === '11111111111' ||
            cpfWithoutDots === '22222222222' ||
            cpfWithoutDots === '33333333333' ||
            cpfWithoutDots === '44444444444' ||
            cpfWithoutDots === '55555555555' ||
            cpfWithoutDots === '66666666666' ||
            cpfWithoutDots === '77777777777' ||
            cpfWithoutDots === '88888888888' ||
            cpfWithoutDots === '99999999999'
        )
    }

    static CPFDigitValidation(cpf: string): boolean {
        const cpfWithoutDots = cpf.replace(/[^\d]+/g, '')
        let sum = 0;
        let remainder;

        // Calcula o primeiro dígito verificador
        for (let i = 1; i <= 9; i++) {
            sum +=
                parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
           return true// throw new Error('Invalid CPF');
        }

        sum = 0;

        // Calcula o segundo dígito verificador
        for (let i = 1; i <= 10; i++) {
            sum +=
                parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
            remainder = 0;
        }

        if (
            remainder !== parseInt(cpfWithoutDots.substring(10, 11))
        ) {
            return true // throw new Error('Invalid CPF');
        }
    }
}