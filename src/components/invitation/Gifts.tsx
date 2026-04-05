import React, { useState } from "react";
import { Card, Col, Row, Typography, Button } from "antd";
import weddingData from "@/data/weddingData.json";
import DoubleDownArrowIcon from "./DoubleArrow";
import Liverpool from "./Liverpool";

const { Title, Text } = Typography;

const GiftTable: React.FC = () => {
  const { message, options } = weddingData.giftTable;
  const [copiedText, setCopiedText] = useState<string>("");
  const [visibleDetails, setVisibleDetails] = useState<number | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    } catch {
      alert("No se pudo copiar al portapapeles");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Title
        level={2}
        style={{ textAlign: "center", margin: "1rem 0 0" }}
        className="title-decorative"
      >
        Mesa de Regalos
      </Title>

      <Text
        style={{
          display: "block",
          textAlign: "center",
          color: "#7A8B75",
          fontSize: 16,
          maxWidth: 600,
          margin: "0 auto 40px auto",
          lineHeight: 1.5,
        }}
      >
        {message}
      </Text>
    </div>
  );
};

export default GiftTable;
