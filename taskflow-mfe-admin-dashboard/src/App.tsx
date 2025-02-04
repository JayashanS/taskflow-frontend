import React, { useState } from "react";
import { Button, Input, Card } from "antd";
import AddressPicker from "./components/Map";

const ParentComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  return (
    <Card style={{ maxWidth: 500, margin: "20px auto", textAlign: "center" }}>
      <h2>Pick a Location</h2>
      <Input
        value={selectedAddress}
        placeholder="Selected address will appear here"
        disabled
        style={{ marginBottom: "10px" }}
      />
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Address Picker
      </Button>

      <AddressPicker
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        setAddress={setSelectedAddress}
      />
    </Card>
  );
};

export default ParentComponent;
