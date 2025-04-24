'use strict';

import React, { useEffect } from "react";
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
    Grid,
    CircularProgress, 
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs'; 

import { useDispatch, useSelector } from "react-redux";
import { fetchBookingData } from "../../../slices/fetchDataThunks.js";

import './home.scss'; 

export default () => {
    const navigate = useNavigate();
    const destinationList = useSelector(state => state.destination.list)
    const isLoading = useSelector(state => state.destination.isLoading)
    const dispatch = useDispatch();

    const initialValues = {  // початкові значення для Formik, стан зберігається всередені форміка, доступ отримаємо через рендер-проп {(formik) => ...}
        selectedCity: '',
        checkInDate: null,
        checkOutDate: null,
        numbAdults: '',
        numbChildren: '',
        hotelsRating: '',
    };

    useEffect(() => {
        dispatch(fetchBookingData());
    }, [])

    const validationSchema = Yup.object().shape({
        selectedCity: Yup.string()
            .required('City is a required field'),
        checkInDate: Yup.date()
            .nullable() // важливо для полів дати, щоб дозволити порожні початкові значення
            .required('Check In Date is required')
            .typeError('Invalid date')
            .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Check-in date cannot be in the past'),
        checkOutDate: Yup.date()
            .nullable()
            .required('Check Out Date is required')
            .typeError('Invalid date')
            .min(
                Yup.ref('checkInDate'), // посилання значення з іншого поля для порівняння
                'The departure date cannot be earlier than the arrival date.'
            ),
        numbAdults: Yup.number()
            .min(1, 'min 1')
            .integer('enter an integer')
            .max(10, 'max 10'),
        numbChildren: Yup.number()
            .min(0, 'not less than 0')
            .integer('enter an integer')
            .max(10, 'max 10'),
        hotelsRating: Yup.number()
            .min(1, 'min 1')
            .max(5, 'max 5'),
    });

    const searchSubmit = ({ selectedCity, checkInDate, checkOutDate, numbAdults, numbChildren, hotelsRating }) => {
        const selectedDestination = destinationList.find(dest => dest.label === selectedCity);

        if (!selectedDestination) {
            console.error("Selected destination not found in the list:", selectedCity);
            alert('Selected destination not found');
            return;
        }

        const params = {
            city: selectedDestination.label.toLowerCase(),
            checkIn: dayjs(checkInDate).format('MM/DD/YYYY'), 
            checkOut: dayjs(checkOutDate).format('MM/DD/YYYY'),
        };
        

        if (numbAdults) {
            params.adults = numbAdults;
        }

        if(numbChildren) {
            params.children = numbChildren;
        }

        if(hotelsRating) {
            params.rating = hotelsRating;
        }

        const searchParams = new URLSearchParams(params);

        navigate(`/hotels?${searchParams.toString()}`);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {isLoading ? (
                <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <CircularProgress sx={{color: '#fc9703'}} />
                </Grid>

            ) : (
                <>
                    <div className="hotels-filter">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={searchSubmit}
                            validateOnChange={true}
                            validateOnBlur={true} 
                        >
                            {(formik) => { // рендер-функція Formik, що надає доступ до стану форми {} formik
                                const { touched, errors, values } = formik;

                                return (
                                <Form className="hotels-form">
                                    <FormControl
                                        className="form-main-field"
                                        error={touched.selectedCity && Boolean(errors.selectedCity)} 
                                    >
                                        <InputLabel id="city-select-label">Destination</InputLabel>
                                        <Field
                                            name="selectedCity" 
                                            as={Select}       // as= зв'язка з компонентом mui
                                            labelId="city-select-label"
                                            label="Destination"
                                            
                                        >
                                            {destinationList.map(({ value, label }) => (
                                                <MenuItem key={value} value={label}>{label}</MenuItem>
                                            ))}
                                        </Field>
                                        <FormHelperText>
                                            {touched.selectedCity && errors.selectedCity}
                                        </FormHelperText>
                                    </FormControl>

                                    <DatePicker
                                        label="Check In"
                                        value={values.checkInDate}
                                        onChange={(newValue) => formik.setFieldValue('checkInDate', newValue)}
                                        minDate={dayjs().startOf('day')} // min дата сьогодні
                                        slotProps={{
                                            textField: {
                                                className: "form-main-field", 
                                                name: "checkInDate", 
                                                error: touched.checkInDate && Boolean(errors.checkInDate),
                                                helperText: touched.checkInDate && errors.checkInDate,
                                                onBlur: () => formik.setFieldTouched('checkInDate', true), 
                                            },
                                        }}
                                    />

                                    <DatePicker
                                        label="Check Out"
                                        value={values.checkOutDate}
                                        onChange={(newValue) => formik.setFieldValue('checkOutDate', newValue)}
                                        minDate={values.checkInDate ? dayjs(values.checkInDate).add(1, 'day') : dayjs().startOf('day').add(1, 'day')} //min дата завтра від checkInDate
                                        slotProps={{
                                            textField: {
                                                className: "form-main-field",
                                                name: "checkOutDate",
                                                error: touched.checkOutDate && Boolean(errors.checkOutDate),
                                                helperText: touched.checkOutDate && errors.checkOutDate,
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
                                        inputProps={{ min: "1", max: "10" }} 
                                        error={touched.numbAdults && Boolean(errors.numbAdults)}
                                        helperText={touched.numbAdults && errors.numbAdults}
                                    />

                                    <Field
                                        className="form-field"
                                        as={TextField}
                                        name="numbChildren"
                                        label="Children"
                                        type="number"
                                        inputProps={{ min: "0", max: "10" }}
                                        error={touched.numbChildren && Boolean(errors.numbChildren)}
                                        helperText={touched.numbChildren && errors.numbChildren}
                                    />

                                    <Field
                                        className="form-field"
                                        as={TextField}
                                        name="hotelsRating"
                                        label="Rating from"
                                        type="number"
                                        inputProps={{ min: "1", max: "5", step: "0.1" }}
                                        error={touched.hotelsRating && Boolean(errors.hotelsRating)}
                                        helperText={touched.hotelsRating && errors.hotelsRating}
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
                            )}}
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
                            <li>🧒 Add the number of adults or children - full control</li>
                        </ul>
                    </section>
                </>
            )}  
        </LocalizationProvider>
    );
};