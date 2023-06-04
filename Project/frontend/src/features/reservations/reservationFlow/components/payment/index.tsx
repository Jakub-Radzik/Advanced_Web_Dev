import {loadStripe} from '@stripe/stripe-js';
import {
    PaymentElement,
    useStripe,
    useElements,
    Elements
  } from '@stripe/react-stripe-js';
import { FormEvent, useState } from 'react';
import { STRIPE_PUBLISHABLE_KEY } from '../../../../../constants';
import { usePayments } from '../../../../../hooks/usePayments';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export const Payment = () => {
    const [clientSecret, setClientSecret] = useState<string>('');
    const {reserveCheckout} = usePayments();

    // @ts-ignore
    // reserveCheckout().then(data => {
    //     console.log(data)
    //     setClientSecret(data.clientSecret);
    // });
    
    const options = {
        clientSecret
    };

    return (
        <div>Payment</div>
        // <Elements stripe={stripePromise} options={options}>
            // {/* {clientSecret && <PaymentForm clientSecret={clientSecret} />} */}
        // </Elements>
    );
}


// const PaymentForm = ({clientSecret}:{clientSecret: string}) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event: FormEvent<HTMLFormElement> ) => {
//         event.preventDefault();
    
//         if(!stripe) throw new Error('NO STRIPE !!!!')

//         if (elements == null) {
//             return;
//         }

//         // Trigger form validation and wallet collection
//         const {error: submitError} = await elements.submit();
//         if (submitError) {
//             // Show error to your customer
//             return;
//         }
    
//         console.log("before")
    
//         const {error} = await stripe.confirmPayment({
//                 elements,
//                 clientSecret,
//                 confirmParams: {
//                 return_url: 'https://localhost:8080',
//             },
//         });
    
//         if (error) {
//             console.log(error)
//             // This point will only be reached if there is an immediate error when
//             // confirming the payment. Show error to your customer (for example, payment
//             // details incomplete)
//         } else {
//             // Your customer will be redirected to your `return_url`. For some payment
//             // methods like iDEAL, your customer will be redirected to an intermediate
//             // site first to authorize the payment, then redirected to the `return_url`.
//         }
//         };

//     return ( <form onSubmit={handleSubmit}>
//         <PaymentElement />
//         <button type="submit" disabled={!stripe || !elements}>
//             Pay
//         </button>
//     </form>)
// }