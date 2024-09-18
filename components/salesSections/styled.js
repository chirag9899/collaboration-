import styled from "styled-components";
import Button from "../Button";
import { p_16_semibold } from "styles/textStyles";
import { primary_color } from "../styles/colors";

// Styling for the section with padding and text alignment
export const Section = styled.div`
  padding: 20px 0;
  text-align: center;
`;
// Container for max-width and margin
export const Container = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
`;
// Styling for headings
export const Heading1 = styled.h1`
  font-family: "Mono", sans-serif;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 16px;
  font-weight: 700;
`;
// Icon SVG
export const Icon = styled.svg`
  width: 1.2em;
  height: 1.2em;
  transform: rotate(-45deg);
`;
// Key features container
export const KeyFeaturesContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;
// Eyebrow text
export const Eyebrow = styled.div`
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 16px;
  font-weight: 700;
  color: #a7a4a4;
`;
// Key feature items
export const KeyFeatureItem = styled.h3`
  display: flex;
  align-items: center;
  font-size: 22px;
  line-height: 33px;
  margin: 0;
  margin-top: 6px;
`;
// Key feature icon
export const KeyFeatureIcon = styled.svg`
  width: 20px;
  height: 20px;
  color: var(--success-color); /* Add your success color */
  margin-right: 8px;
`;
// Trusted by section
export const TrustedByContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;
// Logo images
export const LogoImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 8px;
`;
// Get started section
export const GetStartedContainer = styled.div`
  padding: 0 16px;
  margin: 0 auto;
  max-width: 1012px;
  @media (max-width: 880px) {
    max-width: 880px;
  }
  text-align: center;
`;
// Border box
export const BorderBox = styled.div`
  border: 1px solid #5c5c5c !important;
  padding: 16px;
  border-radius: 8px;
  margin-top: 25px;
`;
// FAQ items
export const FAQContainer = styled.div`
  padding: 0 16px;
  /* margin: 0 auto; */
  /* max-width: 1012px; */
  margin: "unset";
  max-width: "unset";
  @media (max-width: 880px) {
    max-width: 880px;
  }
`;
// FAQ question items
export const FAQItem = styled.div`
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  font-weight: 700;
`;

export const AnsWrapper = styled.p`
  padding: 10px;
  margin-top: 15px;
  text-align: start;
  color: #a7a4a4;
`;

export const FaqWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
// FAQ icon
export const FAQIcon = styled.svg`
  width: 1.2em;
  height: 1.2em;
  color: var(--text-color); /* Add your text color */
  margin-left: auto;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
export const ButtonWrapper = styled(Button)`
  cursor: pointer;
  ${p_16_semibold};
  color: ${primary_color};
  margin-right: 10px;
  font-size: 12px;
  padding: 4px 12px !important;
  /* font-size: "20px" !important; */
  margin-top: "22px" !important;
  line-height: "1.3em" !important;
  /* padding: "10px !important"  !important; */
  display: "table";
  width: "300px";
  > img {
    width: 24px;
    height: 24px;
    margin-right: 8px !important;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  padding: 50px 20px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Card = styled.div`
  width: 30%;
  text-align: center;
  padding: 40px 20px;
  background: var(--background-0);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  img {
    filter: brightness(0) saturate(100%) invert(77%) sepia(87%) saturate(673%)
      hue-rotate(351deg) brightness(102%) contrast(102%);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45%; /* Two cards per row on tablets */
  }

  @media (max-width: 480px) {
    width: 100%; /* One card per row on mobile */
  }
`;

export const CardIcon = styled.img`
  height: 64px;
  margin-bottom: 20px;
  transition: filter 0.3s ease;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  color: #58a6ff;
  margin-bottom: 20px;
`;

export const CardText = styled.p`
  font-size: 16px;
  color: #c9d1d9;
  line-height: 1.5;
`;
