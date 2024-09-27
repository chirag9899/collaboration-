import styled from 'styled-components';

const SystemSelector = styled.div`
  grid-area: select-system;
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Selected = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: auto;
  height: auto;
`;

const Label = styled.div`
  margin-left: 10px;
`;

const Chevrons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChevronIcon = styled.i`
  font-size: 16px;
  cursor: pointer;
`;

// Example of usage

const Filters = () => (
  <SystemSelector>
    <Select className="platform">
      <Selected>
        <ItemWrapper>
          <Item>
            <Image src="/assets/votium-DTG-AdiX.png" alt="Votium" />
            <Label>Votium</Label>
          </Item>
        </ItemWrapper>
        <Label>Platform</Label>
      </Selected>
      <div className="items">
        <ItemWrapper>
          <Item>
            <Image src="/assets/votium-DTG-AdiX.png" alt="Votium" />
            <Label>Votium</Label>
          </Item>
        </ItemWrapper>
        <ItemWrapper>
          <Item>
            <Image src="/assets/redacted-r8ShDf4e.png" alt="Hidden Hand" />
            <Label>Hidden Hand</Label>
          </Item>
        </ItemWrapper>
      </div>
      <Chevrons>
        <ChevronIcon className="fas fa-chevron-up" />
        <ChevronIcon className="fas fa-chevron-down" />
      </Chevrons>
    </Select>

    <Select className="protocol">
      <Selected>
        <ItemWrapper>
          <Item>
            <Image src="/assets/crv-DgSNXO2J.svg" alt="Curve" />
            <Label>Curve</Label>
          </Item>
        </ItemWrapper>
        <Label>Protocol</Label>
      </Selected>
      <div className="items">
        <ItemWrapper>
          <Item>
            <Image src="/assets/crv-DgSNXO2J.svg" alt="Curve" />
            <Label>Curve</Label>
          </Item>
        </ItemWrapper>
        <ItemWrapper>
          <Item>
            <Image src="data:image/svg+xml,..." alt="Prisma" />
            <Label>Prisma</Label>
          </Item>
        </ItemWrapper>
      </div>
    </Select>
  </SystemSelector>
);

export default Filters;
