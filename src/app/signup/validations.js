export const validations = (userData) => {
    const errors = {};
    const regexName = /^[a-z ,.'-]+$/i
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regexPassword = /[A-Z]/

    if (!regexName.test(userData.name)) {
        errors.name = "Nombre inválido. Solo se permiten letras, comas, espacios, puntos, comillas y guiones.";
    } else if (userData.name.length > 30) {
        errors.name = "El nombre excede la longitud máxima de 30 caracteres.";
    }

    if (!regexEmail.test(userData.email)) {
        errors.email = "Correo electrónico inválido";
    }

    if (userData.password.length < 6) {
        errors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (!regexPassword.test(userData.password)) {
        errors.password = "La contraseña debe tener al menos una mayuscula"
    }

    return errors;
};