import Image from "next/image";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 64px;
  height: 64px;

  border: 0;
  border-radius: 50%;
  background: var(--background-0);

  overflow: hidden;
`;

export default function Logo({ imageFile }) {
  return (
    <Wrapper>
      {imageFile && (
        <img
          style={{ objectFit: "cover" }}
          width="100%"
          height="100%"
          src={imageFile}
          alt=""
        />
      )}
    </Wrapper>
  );
}
