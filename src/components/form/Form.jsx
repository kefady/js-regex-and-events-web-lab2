import React, {useEffect, useState} from 'react';
import classes from "./Form.module.css";

const NAME_EXPRESSION = /^[А-ЯІЇЄ][а-яіїє]+ [А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$/;
const GROUP_EXPRESSION = /^[А-ЯІЇЄ]{2}-\d{2}$/;
const PHONE_NUMBER_EXPRESSION = /(^\(\d{3}\)-\d{3}-\d{2}-\d{2})|(^\d{10}$)/;
const ID_CARD_EXPRESSION = /^[А-ЯІЇЄ]{2} №\d{6}$/;
const DEPARTMENT_EXPRESSION = /^[А-ЯІЇЄ]{2,6}$/;

const EMPTY_FIELD_ERROR = 'Поле не може бути пустим';

const fieldConfig = [
    {name: 'name', label: 'Ініціали', placeholder: 'Введіть ініціали', expression: NAME_EXPRESSION, autoComplete: 'name'},
    {name: 'group', label: 'Група', placeholder: 'Введіть групу', expression: GROUP_EXPRESSION, autoComplete: 'on'},
    {name: 'phone_number', label: 'Телефон', placeholder: 'Введіть номер телефону', expression: PHONE_NUMBER_EXPRESSION, autoComplete: 'tel'},
    {name: 'id_card', label: 'ID карта', placeholder: 'Введіть номер ID-карти', expression: ID_CARD_EXPRESSION, autoComplete: 'on'},
    {name: 'department', label: 'Факультет', placeholder: 'Введіть факультет', expression: DEPARTMENT_EXPRESSION, autoComplete: 'on'},
];

const Form = () => {
    const initialState = {
        name: '',
        group: '',
        phone_number: '',
        id_card: '',
        department: '',
    };

    const [formValues, setFormValues] = useState(initialState);

    const [formErrors, setFormErrors] = useState(() => {
        const initialErrors = {};
        fieldConfig.forEach(field => {
            initialErrors[field.name] = EMPTY_FIELD_ERROR;
        });
        return initialErrors;
    });

    const [formFilled, setFormFilled] = useState(() => {
        const initialFilled = {};
        fieldConfig.forEach(field => {
            initialFilled[field.name] = false;
        });
        return initialFilled;
    });

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setFormValid(Object.values(formErrors).every(error => error === ''));
    }, [formErrors]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });

        const fieldConfigItem = fieldConfig.find(item => item.name === name);
        if (fieldConfigItem) {
            const {expression} = fieldConfigItem;
            if (!value) {
                setFormErrors({
                    ...formErrors,
                    [name]: EMPTY_FIELD_ERROR,
                });
            } else if (!expression.test(value)) {
                setFormErrors({
                    ...formErrors,
                    [name]: 'Некоректні дані',
                });
            } else {
                setFormErrors({
                    ...formErrors,
                    [name]: '',
                });
            }
        }
    };

    const blurHandler = (e) => {
        const fieldName = e.target.name;
        if (fieldConfig.some(item => item.name === fieldName)) {
            setFormFilled({
                ...formFilled,
                [fieldName]: true,
            });
        }
    };

    const resetForm = () => {
        setFormValues(initialState);
        setFormErrors(() => {
            const initialErrors = {};
            fieldConfig.forEach(field => {
                initialErrors[field.name] = EMPTY_FIELD_ERROR;
            });
            return initialErrors;
        });
        setFormFilled(() => {
            const initialFilled = {};
            fieldConfig.forEach(field => {
                initialFilled[field.name] = false;
            });
            return initialFilled;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValid) {
            showSubmittedData()
            resetForm();
        } else {
            alert('Ви заповнили форму некоректно!')
        }
    };

    const showSubmittedData = () => {
        if (formValues) {
            const formattedData = Object.keys(formValues)
                .map((key) => `${fieldConfig.find((field) => field.name === key).label}: ${formValues[key]}`)
                .join('\n');
            alert(`Введена інформація:\n${formattedData}`);
        }
    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <h2 className={classes.title}>Форма</h2>
                <div className={classes.content}>
                    {fieldConfig.map(field => (
                        <div className={classes.inputBox} key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            {(formErrors[field.name] && formFilled[field.name]) && (
                                <div className={classes.error}>*{formErrors[field.name].toLowerCase()}</div>
                            )}
                            <input
                                value={formValues[field.name]}
                                type="text"
                                placeholder={field.placeholder}
                                autoComplete={field.autoComplete}
                                name={field.name}
                                id={field.name}
                                style={{
                                    borderColor:
                                        formErrors[field.name] && formFilled[field.name]
                                            ? '#8d0801'
                                            : formFilled[field.name]
                                                ? '#21929b'
                                                : 'silver',
                                }}
                                onChange={handleChange}
                                onBlur={blurHandler}
                            />
                        </div>
                    ))}
                </div>
                <div className={classes.buttonContainer}>
                    <button type="submit" disabled={!formValid}>
                        Відправити
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
