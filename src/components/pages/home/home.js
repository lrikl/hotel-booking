'use strict';

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'; 
import * as Yup from 'yup'; 
import {
    TextField,
    Button,   
    Select,   
    MenuItem, 
    FormControl,
    InputLabel,  
    FormHelperText, 
} from '@mui/material';

import { styled } from '@mui/material/styles';

const castomFormHelperText = styled(FormHelperText)(({ theme }) => ({
    wordWrap: 'break-word', 
    width: '100px',
}));

import './home.scss'; 

export default () => {
    const [destinationList, setDestinationList] = useState([]);
    const navigate = useNavigate();

    // початкові значення для Formik
    const initialValues = {
        selectedCity: '',
        checkInDate: '',
        checkOutDate: '',
        numbAdults: '',
        numbChildren: '',
        hotelsRating: '',
    };

    async function fetchDestinationList() {
        try { 
            const resp = await fetch('./static/serverData/db.json');
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            const data = await resp.json();
            setDestinationList(data.destination || []);
        } catch (error) {
            console.error("Failed to fetch destinations:", error);
            setDestinationList([]);
        }
    }

    useEffect(() => {
        fetchDestinationList();
    }, []);

    const cityLabels = useMemo(() => { // щоб запам'ятати результат функції, та не робити це кожного разу при рендері, тільки якщо destinationList змінився
        return destinationList.map(dest => dest.label);
    }, [destinationList]);

    const validationSchema = Yup.object().shape({
        selectedCity: Yup.string()
            .required('Місто є обовʼязковим полем')
            .oneOf(cityLabels, 'Будь ласка, виберіть місто зі списку'),
        checkInDate: Yup.date()
            .required('Дата заїзду є обовʼязковою')
            .nullable() // важливо для полів дати, щоб дозволити порожні початкові значення
            .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Дата заїзду не може бути в минулому'), // Не раньше сегодняшнего дня
        checkOutDate: Yup.date()
            .required('Дата виїзду є обовʼязковою')
            .nullable()
            .min(
                Yup.ref('checkInDate'), // посилання значення іншого поля для порівняння
                'Дата виїзду не може бути раніше дати заїзду'
            ),
        numbAdults: Yup.number()
            .min(0, 'Кількість не може бути негативною')
            .integer('Введіть ціле число')
            .max(10, 'Не може бути більше 10 тварин'),
        numbChildren: Yup.number()
            .min(0, 'Кількість не може бути негативною')
            .integer('Введіть ціле число')
            .max(10, 'Не може бути більше 10 дітей'),
        hotelsRating: Yup.number()
            .min(1, 'Рейтинг не може бути менше 1')
            .max(5, 'Рейтинг не може бути більше 5'),
    });

    const searchSubmit = ({ selectedCity, checkInDate, checkOutDate, numbAdults, numbChildren, hotelsRating }) => {
        const selectedDestination = destinationList.find(dest => dest.label === selectedCity);

        const searchParams = new URLSearchParams({
            city: selectedDestination.label.toLowerCase(),
            checkIn: checkInDate,
            checkOut: checkOutDate,
            adults: numbAdults,
            children: numbChildren,
            rating: hotelsRating,
        });
        navigate(`/hotels?${searchParams.toString()}`);
    };

    return (
        <div className="hotels-filter">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={searchSubmit}
                validateOnChange={true}
                validateOnBlur={true} 
            >
                {(formik) => ( // рендер-функція Formik, що надає доступ до стану форми {} formik
                    <Form className="hotels-form">
                        <FormControl
                            sx={{
                                maxWidth: '300px',
                                width: '100%'
                            }}
                            error={formik.touched.selectedCity && Boolean(formik.errors.selectedCity)} 
                        >
                            <InputLabel id="city-select-label">Виберіть місто</InputLabel>
                            <Field
                                name="selectedCity" 
                                as={Select}       // as= це зв'язка з компонентом mui
                                labelId="city-select-label"
                                label="Виберіть місто"
                                
                            >
                                <MenuItem value="">
                                    <em>Виберіть місто</em>
                                </MenuItem>
                                {destinationList.map(({ value, label }) => (
                                    <MenuItem key={value} value={label}>{label}</MenuItem>
                                ))}
                            </Field>
                            <FormHelperText>
                                {formik.touched.selectedCity && formik.errors.selectedCity}
                            </FormHelperText>
                        </FormControl>

                        <Field
                            as={TextField}
                            name="checkInDate"
                            label="Дата заїзду"
                            type="date"
                            InputLabelProps={{ shrink: true }} // щоб label не перекривав дату
                            inputProps={{
                                min: new Date().toISOString().split('T')[0] // дата сьогодні
                            }}
                            error={formik.touched.checkInDate && Boolean(formik.errors.checkInDate)}
                            helperText={formik.touched.checkInDate && formik.errors.checkInDate}
                        />

                        <Field
                            as={TextField}
                            name="checkOutDate"
                            label="Дата виїзду"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                min: formik.values.checkInDate || new Date().toISOString().split('T')[0]  // динамічний min на основі обраної дати заїзду
                            }}
                            disabled={!formik.values.checkInDate}
                            error={formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate)}
                            helperText={formik.touched.checkOutDate && formik.errors.checkOutDate}
                        />

                        <Field
                            as={TextField}
                            name="numbAdults" 
                            label="Тварини"
                            type="number"
                            FormHelperTextProps={{
                                component: castomFormHelperText
                            }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: "0", max: "10" }} 
                            error={formik.touched.numbAdults && Boolean(formik.errors.numbAdults)}
                            helperText={formik.touched.numbAdults && formik.errors.numbAdults}
                            size="small"
                        />

                        <Field
                            as={TextField}
                            name="numbChildren"
                            label="Діти"
                            type="number"
                            FormHelperTextProps={{
                                component: castomFormHelperText
                            }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: "0", max: "10" }}
                            error={formik.touched.numbChildren && Boolean(formik.errors.numbChildren)}
                            helperText={formik.touched.numbChildren && formik.errors.numbChildren}
                            size="small"
                        />

                        <Field
                            as={TextField}
                            name="hotelsRating"
                            label="Рейтинг"
                            type="number"
                            FormHelperTextProps={{
                                component: castomFormHelperText
                            }}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ min: "1", max: "5", step: "0.5" }}
                            error={formik.touched.hotelsRating && Boolean(formik.errors.hotelsRating)}
                            helperText={formik.touched.hotelsRating && formik.errors.hotelsRating}
                            size="small"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            Знайти готелі
                        </Button>

                    </Form>
                )}
            </Formik>
        </div>
    );
};