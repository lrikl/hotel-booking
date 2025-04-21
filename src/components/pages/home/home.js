'use strict';

import React, { useState, useEffect } from "react";
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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; 

import './home.scss'; 

export default () => {
    const [destinationList, setDestinationList] = useState([]);
    const navigate = useNavigate();

    // початкові значення для Formik
    const initialValues = {
        selectedCity: '',
        checkInDate: null,
        checkOutDate: null,
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

    const validationSchema = Yup.object().shape({
        selectedCity: Yup.string()
            .required('City is a required field'),
        checkInDate: Yup.date()
            .nullable() // важливо для полів дати, щоб дозволити порожні початкові значення
            .typeError('Invalid date')
            .required('Arrival date is required')
            .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Check-in date cannot be in the past'),
        checkOutDate: Yup.date()
            .nullable()
            .typeError('Invalid date')
            .required('Departure date is required')
            .min(
                Yup.ref('checkInDate'), // посилання значення іншого поля для порівняння
                'The departure date cannot be earlier than the arrival date.'
            ),
        numbAdults: Yup.number()
            .min(0, 'min 0')
            .integer('enter an integer')
            .max(10, 'max 10'),
        numbChildren: Yup.number()
            .min(0, 'min 0')
            .integer('enter an integer')
            .max(10, 'max 10'),
        hotelsRating: Yup.number()
            .min(1, 'min 1')
            .max(5, 'max 5'),
    });

    const searchSubmit = ({ selectedCity, checkInDate, checkOutDate, numbAdults, numbChildren, hotelsRating }) => {
        const selectedDestination = destinationList.find(dest => dest.label === selectedCity);

        const searchParams = new URLSearchParams({
            city: selectedDestination.label.toLowerCase(),
            checkIn: dayjs(checkInDate).format('MM/DD/YYYY'),
            checkOut: dayjs(checkOutDate).format('MM/DD/YYYY'),
            adults: numbAdults,
            children: numbChildren,
            rating: hotelsRating,
        });

        navigate(`/hotels?${searchParams.toString()}`);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                className="form-main-field"
                                error={formik.touched.selectedCity && Boolean(formik.errors.selectedCity)} 
                            >
                                <InputLabel id="city-select-label">Destination</InputLabel>
                                <Field
                                    name="selectedCity" 
                                    as={Select}       // as= це зв'язка з компонентом mui
                                    labelId="city-select-label"
                                    label="Виберіть місто"
                                    
                                >
                                    {destinationList.map(({ value, label }) => (
                                        <MenuItem key={value} value={label}>{label}</MenuItem>
                                    ))}
                                </Field>
                                <FormHelperText>
                                    {formik.touched.selectedCity && formik.errors.selectedCity}
                                </FormHelperText>
                            </FormControl>

                            <DatePicker
                                label="Check In"
                                value={formik.values.checkInDate}
                                onChange={(newValue) => formik.setFieldValue('checkInDate', newValue)}
                                minDate={dayjs().startOf('day')} // min дата сьогодні
                                slotProps={{
                                    textField: {
                                        className: "form-main-field", 
                                        name: "checkInDate", 
                                        error: formik.touched.checkInDate && Boolean(formik.errors.checkInDate),
                                        helperText: formik.touched.checkInDate && formik.errors.checkInDate,
                                        onBlur: () => formik.setFieldTouched('checkInDate', true), 
                                    },
                                }}
                            />

                            <DatePicker
                                label="Check Out"
                                value={formik.values.checkOutDate}
                                onChange={(newValue) => formik.setFieldValue('checkOutDate', newValue)}
                                minDate={formik.values.checkInDate ? dayjs(formik.values.checkInDate).add(1, 'day') : dayjs().startOf('day').add(1, 'day')} //min дата завтра від checkInDate
                                slotProps={{
                                    textField: {
                                        className: "form-main-field",
                                        name: "checkOutDate",
                                        error: formik.touched.checkOutDate && Boolean(formik.errors.checkOutDate),
                                        helperText: formik.touched.checkOutDate && formik.errors.checkOutDate,
                                        onBlur: () => formik.setFieldTouched('checkOutDate', true),
                                    },
                                }}

                            />

                            <Field
                                className="form-field"
                                as={TextField}
                                name="numbAdults" 
                                label="Adults"
                                type="number"
                                inputProps={{ min: "0", max: "10" }} 
                                error={formik.touched.numbAdults && Boolean(formik.errors.numbAdults)}
                                helperText={formik.touched.numbAdults && formik.errors.numbAdults}
                            />

                            <Field
                                className="form-field"
                                as={TextField}
                                name="numbChildren"
                                label="Children"
                                type="number"
                                inputProps={{ min: "0", max: "10" }}
                                error={formik.touched.numbChildren && Boolean(formik.errors.numbChildren)}
                                helperText={formik.touched.numbChildren && formik.errors.numbChildren}
                            />

                            <Field
                                className="form-field"
                                as={TextField}
                                name="hotelsRating"
                                label="Rating from"
                                type="number"
                                inputProps={{ min: "1", max: "5", step: "0.5" }}
                                error={formik.touched.hotelsRating && Boolean(formik.errors.hotelsRating)}
                                helperText={formik.touched.hotelsRating && formik.errors.hotelsRating}
                            />

                            <Button
                                className="form-btn"
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!formik.isValid || formik.isSubmitting}
                                sx={{
                                    maxHeight: '60px',
                                    minWidth: '100px',
                                    background: '#fc9703',
                                    fontWeight: '600'
                        
                                }}
                            >
                                SUBMIT
                            </Button>

                        </Form>
                    )}
                </Formik>
            </div>

            <section className="home-text">
                <h2>Travel Whith <span className="orange-color">Booking</span></h2>
                <p><strong>Planning a trip? Let us make it unforgettable!</strong></p>
                <p>With <strong>Travel with Booking</strong>, you can:</p>
                <ul>
                    <li>🔎 Easily find and book a hotel in the USA</li>
                    <li>📆 Choose convenient travel dates</li>
                    <li>🌟 Filter accommodation by rating</li>
                    <li>🧒 Add preferences for kids or pets — full control</li>
                </ul>
            </section>
        </LocalizationProvider>
    );
};