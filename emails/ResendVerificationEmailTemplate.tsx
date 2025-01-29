import React from "react";
import { Html, Head, Body, Container, Section, Text, Heading, Button } from "@react-email/components";

type AccountVerificationEmailTemplateProps = {
  otp:number | string;
  recipientName:string;
}
export function AccountVerificationEmailTemplate({ otp, recipientName }:AccountVerificationEmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify Your Account</Heading>
          <Text style={text}>
            Hi {recipientName || "there"},
          </Text>
          <Text style={text}>
            Thank you for signing up! Use the OTP code below to verify your account:
          </Text>
          <Section style={otpContainer}>
            <Text style={otpStyle}>{otp || "123456"}</Text>
          </Section>
          <Text style={text}>
            If you didn’t request this, you can safely ignore this email.
          </Text>
          <Button
            style={button}
            href="#"
          >
            Verify Account
          </Button>
          <Text style={footerText}>
            Need help? Contact us at support@example.com.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f6f9fc",
  margin: 0,
  padding: 20,
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};

const heading = {
  fontSize: "24px",
  color: "#333333",
  marginBottom: "16px",
};

const text = {
  fontSize: "16px",
  color: "#555555",
  margin: "12px 0",
};

const otpContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  padding: "10px 20px",
  margin: "20px 0",
};

const otpStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  color: "#1d4ed8",
};

const button = {
  display: "inline-block",
  backgroundColor: "#1d4ed8",
  color: "#ffffff",
  padding: "12px 24px",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  borderRadius: "8px",
  marginTop: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#888888",
  marginTop: "20px",
  textAlign: "center" as const,
};
