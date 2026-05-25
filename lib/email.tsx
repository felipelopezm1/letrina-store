import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { render } from "@react-email/components";
import { Resend } from "resend";
import { formatGBP } from "@/lib/money";

type ReceiptEmailProps = {
  productName: string;
  purchaseId: string;
  accessUrl: string;
  amountPaid: number;
  downloadsLeft: number;
};

export function ReceiptEmail({
  productName,
  purchaseId,
  accessUrl,
  amountPaid,
  downloadsLeft,
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Letrina Dumping Ground purchase is ready.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Text style={styles.kicker}>Letrina Dumping Ground</Text>
          <Heading style={styles.heading}>Your download is out of the pit.</Heading>
          <Text style={styles.text}>
            Thanks for picking up <strong>{productName}</strong>. You paid{" "}
            {formatGBP(amountPaid)} and can download it {downloadsLeft} times.
          </Text>
          <Section style={styles.panel}>
            <Text style={styles.label}>Purchase ID</Text>
            <Text style={styles.code}>{purchaseId}</Text>
          </Section>
          <Button href={accessUrl} style={styles.button}>
            Open download page
          </Button>
          <Text style={styles.small}>
            Keep this email. No accounts, no passwords: this purchase ID is your
            access key.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export async function sendReceiptEmail({
  to,
  ...props
}: ReceiptEmailProps & { to: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL ?? "Letrina <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("RESEND_API_KEY missing; skipping receipt email.");
    return;
  }

  const resend = new Resend(apiKey);
  const html = await render(<ReceiptEmail {...props} />);

  await resend.emails.send({
    from,
    to,
    subject: `Your ${props.productName} download`,
    html,
  });
}

const styles = {
  body: {
    margin: 0,
    backgroundColor: "#14110d",
    color: "#e8dcc4",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  container: {
    margin: "0 auto",
    padding: "36px 20px",
    maxWidth: "560px",
  },
  kicker: {
    color: "#ff5a1f",
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    fontSize: "12px",
  },
  heading: {
    color: "#f5ecd9",
    fontSize: "32px",
    lineHeight: "1.05",
    margin: "10px 0 20px",
  },
  text: {
    color: "#d6c9af",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  panel: {
    border: "1px solid #7a6f5c",
    padding: "16px",
    margin: "24px 0",
    backgroundColor: "#1f1a14",
  },
  label: {
    color: "#7a6f5c",
    fontSize: "11px",
    margin: 0,
    textTransform: "uppercase" as const,
  },
  code: {
    color: "#f5ecd9",
    fontSize: "24px",
    margin: "8px 0 0",
  },
  button: {
    backgroundColor: "#e8dcc4",
    color: "#14110d",
    borderRadius: "999px",
    padding: "14px 22px",
    display: "inline-block",
    textDecoration: "none",
    fontWeight: 700,
  },
  small: {
    color: "#7a6f5c",
    fontSize: "12px",
    lineHeight: "1.5",
    marginTop: "24px",
  },
};
