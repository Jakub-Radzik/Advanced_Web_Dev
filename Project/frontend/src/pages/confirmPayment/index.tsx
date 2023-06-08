import { useState } from "react";
import { usePayments } from "../../hooks/usePayments";
import { Center, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ConfirmPayment = () => {
    const navigate = useNavigate();
    const {sellTickets} = usePayments();
    const [code, setCode] = useState(0);
    const [error, setError] = useState("");


    sellTickets()
      .then((res) => {
        setCode(res.status)
      })
      .catch((err)=> setError(err.message))
      .finally(()=> setTimeout(()=> navigate("/"), 3000));

    return (<Center>
      { (code===0 && !error) && <Title>Payment processing</Title>}
      { (code===200 && !error) && <Title>Payment Succeeded. Check your email</Title>}
      { error && <Title>Something went wrong. Try again later.</Title>}
    </Center>);
  };
  