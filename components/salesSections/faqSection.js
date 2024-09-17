import React, { useState } from "react";
import {
  AnsWrapper,
  Eyebrow,
  FAQContainer,
  FAQIcon,
  FAQItem,
  FaqWrapper,
  Heading1,
  Section,
} from "./styled";

export default function FaqSection() {
  // State to keep track of the open FAQ item
  const [openItemIndex, setOpenItemIndex] = useState(null);

  // Function to toggle the FAQ item
  const toggleFaqItem = (index) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What payment methods does Dvote accept?",
      answer: "Dvote accepts payments in USDC, USDT, DAI, and GHO stablecoins.",
    },
    {
      question: "What are the requirements to add a network?",
      answer:
        "To add a network on Snapshot, it must be EVM compatible. Additionally, a full archive node is required to calculate voting power at a specific block. Snapshot can use node providers to meet this requirement and ensure smooth integration and functionality.",
    },
    {
      question: "How to add a network that is not EVM compatible?",
      answer:
        "Adding a non-EVM network is possible under certain conditions. Please contact us for more details.",
    },
  ];

  return (
    <Section>
      <FAQContainer>
        <Eyebrow>Frequently asked questions</Eyebrow>
        <Heading1>Questions?</Heading1>

        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            style={{ borderBottom: "1px solid #5C5C5C", cursor: "pointer" }}
            onClick={() => toggleFaqItem(index)}
          >
            <FaqWrapper>
              {faq.question}
              <FAQIcon
                style={{
                  transform:
                    openItemIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m6 9l6 6 6-6"
                />
              </FAQIcon>
            </FaqWrapper>

            {openItemIndex === index && <AnsWrapper>{faq.answer}</AnsWrapper>}
          </FAQItem>
        ))}
      </FAQContainer>
    </Section>
  );
}
