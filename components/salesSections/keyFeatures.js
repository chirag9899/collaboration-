import _ from "lodash";
import React from "react";
import {
  Card,
  CardContainer,
  CardIcon,
  CardText,
  CardTitle,
  Eyebrow,
  KeyFeaturesContainer,
  Section,
} from "./styled";

const FeatureCard = ({ icon, title, text }) => (
  <Card>
    <CardIcon src={icon} alt={title} />
    <CardTitle>{title}</CardTitle>
    <CardText>{text}</CardText>
  </Card>
);

const FeatureCards = () => (
  <CardContainer>
    <FeatureCard
      icon="/imgs/icons/mainnet-testnet.png"
      title="Mainnet and Testnet Network Support"
      text="We support seamless integration with both Mainnet and Testnet environments.Whether you're launching on a test network or rolling out on the main network, our platform ensures full support to facilitate uninterrupted governance."
    />
    <FeatureCard
      icon="/imgs/icons/custom-domain.png"
      title="Custom Domain Registry"
      text="We provide custom domain registration to elevate your brand's identity. Align your voting space with your project's brand by using a custom domain. Personalize your governance platform and make it instantly recognizable."
    />
    <FeatureCard
      icon="/imgs/icons/support.png"
      title="Dedicated Customer Support"
      text="Provides you with a dedicated support group on Telegram/Discord. Receive specialized support from our team. Whether it's technical assistance or general inquiries, our team will be there to help you 24/7 via your preferred platform."
    />
     <FeatureCard
      icon="/imgs/icons/quick-setup.png"
      title="Quick Setup in 48 hours"
      text="Get your voting space live within 48 hours. We understand that time is critical for your community's decision-making process. Our team guarantees that your voting platform will be set up and ready for use in just two days."
    />
     <FeatureCard
      icon="/imgs/icons/marketing-support.png"
      title="Marketing support"
      text="As our valued partner, we provide marketing efforts to enhance the visibility of your voting process. We'll help you promote ongoing voting matters and ensure that your proposals receive the attention they deserve."
    />
  </CardContainer>
);

export default function KeyFeaturesSection() {
  return (
    <Section>
      <KeyFeaturesContainer>
        <Eyebrow>Key features</Eyebrow>
        <h1
          style={{
            fontSize: "34px",
            marginBottom: "12px",
            lineHeight: "1.3em",
          }}
        >
          What the network plan offers
        </h1>
        <div
          style={{
            fontSize: "16px",
            lineHeight: "25px",
            maxWidth: "500px",
            margin: "0 auto 30px",
          }}
        >
          Our network plan is designed to provide the infrastructure and support
          needed for effective governance.
        </div>

        <FeatureCards />
      </KeyFeaturesContainer>
    </Section>
  );
}
