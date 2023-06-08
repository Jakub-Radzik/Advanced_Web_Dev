import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
  } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { STRIPE_PUBLISHABLE_KEY } from '../../../../../constants';
import { Box, Button, Center } from '@mantine/core';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const Payment = ({clientSecret}:{clientSecret: string}) => {
    const options = {
        clientSecret
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm clientSecret={clientSecret} />
        </Elements>
    );
}


const PaymentForm = ({clientSecret}:{clientSecret: string}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
    
        if(!stripe) throw new Error('NO STRIPE !!!!')

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
            // Show error to your customer
            return;
        }
    
        const {error} = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                return_url: 'http://localhost:8080/confirmPayment',
            },
        });
    
        if (error) {
            console.log(error)
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
        };

    return (<Center><Box w={500}>
        <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button color='primary' type='submit' disabled={!stripe || !elements} my={"xl"}>
            Pay
        </Button>
    </form>
    </Box></Center>)
}