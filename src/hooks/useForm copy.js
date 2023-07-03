import { useMemo } from "react";
import { useState } from "react";

export const useForm = (initialForm = {}) => {

    const [formValues, setFormValues] = useState(initialForm);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onInputChanged = ({ target }) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
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
        titleClass
    }

}
