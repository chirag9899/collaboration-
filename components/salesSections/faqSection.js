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
      question: "What payment methods does dVote accept?",
      answer: "dVote accepts payments via stablecoins such as USDC, USDT, and DAI",
    },
    {
      question: "What are the requirements to integrate a network on dVote?",
      answer:
        "To integrate a network with dVote, it must be EVM-compatible. A full archive node is necessary for calculating voting power at specific blocks. dVote can leverage node providers to meet these requirements, ensuring seamless network integration and functionality.",
    },
    {
      question: "How can a non-EVM compatible network be integrated?",
      answer:
        "Integration of non-EVM networks is feasible under specific conditions. Please reach out to our team for further guidance and details.",
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
