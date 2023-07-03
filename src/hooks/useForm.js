import { useMemo, useState, useEffect } from "react";


export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formValues, setFormValues] = useState(initialForm);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formValues]);

    useEffect(() => {
        setFormValues(initialForm);
    }, [initialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        return true;
    }, [formValidation]);



    const onInputChanged = ({ target }) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const onResetForm = () => {
        setFormValues(initialForm);
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formValues[formField]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        });
    }
    const titleClass = useMemo(() => {
        if (!formSubmitted) return;
        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid'

    }, [formValues.title, formSubmitted]);

    return {
        ...formValues,
        formValues,
        setFormValues,
        onInputChanged,
        onDateChanged,
        formSubmitted,
        setFormSubmitted,
        titleClass,
        ...formValidation,
        isFormValid,
        onResetForm
    }

}
