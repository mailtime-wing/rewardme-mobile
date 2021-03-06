import React from 'react';
import {Container, TitleContainer, Title, SubTitle} from './style';

const TabPage = ({children, title, subTitle}) => (
  <Container>
    <TitleContainer>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </TitleContainer>
    {children}
  </Container>
);

export default TabPage;
