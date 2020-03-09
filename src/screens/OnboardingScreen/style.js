import styled from '@emotion/native';

export const Container = styled.View`
  padding-top: 43px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ContentContainer = styled.View`
  margin-top: 43px;
  margin-bottom: 43px;
  padding-left: ${props => `${(props.width * 0.25) / 2}px`};
  padding-right: ${props => `${(props.width * 0.25) / 2}px`};
  align-self: center;
`;

export const ColorBackground = styled.View`
  color: ${props => props.backgroundColor};
  width: ${props => `${props.width * 0.75}px`};
  height: ${props => `${props.width * 0.75}px`};
  border-radius: 24px;
`;

export const Header = styled.Text`
  font-size: 19px;
  margin-top: 40px;
  margin-bottom: 10px;
`;

export const Details = styled.Text`
  font-size: 10px;
  margin-bottom: 20px;
`;

export const Skip = styled.Text`
  font-size: 12px;
  letter-spacing: 1px;
  text-decoration-line: underline;
  text-align: center;
  margin-top: 5px;
`;
