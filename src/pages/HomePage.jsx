import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Text } from "@chakra-ui/react";
import axios from "axios";
import BASE_API_URL from "../constant/ip";

export default function HomePage() {
  const [subscriptions, setsubscriptions] = useState([]);

  const getData = async () => {
    const response = await axios.get(`${BASE_API_URL}subscription`);
    setsubscriptions(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {subscriptions.map((item) => (
        <Card key={item.id}>
          <CardBody>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>
              {item.price} {item.currency}
            </Text>
            <Text>{item.invoice_period}</Text>
            <Text>{item.invoice_interval}</Text>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
