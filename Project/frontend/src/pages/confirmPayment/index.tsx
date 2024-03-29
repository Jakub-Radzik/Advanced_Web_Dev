import { useEffect, useState } from "react";
import { usePayments } from "../../hooks/usePayments";
import { Center, Loader, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ConfirmPayment = () => {
  const navigate = useNavigate();
  const { sellTickets } = usePayments();
  const [code, setCode] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    sellTickets()
      .then(res => {
        setCode(res.status);
      })
      .catch(err => setError(err.message))
      .finally(() => setTimeout(() => navigate("/"), 3000));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Center>
      {code === 0 && !error && <><Title>Payment processing</Title> <Loader/> </>}
      {code === 200 && !error && (
        <Title>Payment Succeeded. Check your email</Title>
      )}
      {error && <Title>Something went wrong. Try again later.</Title>}
    </Center>
  );
};
