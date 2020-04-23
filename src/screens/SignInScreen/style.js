import styled from '@emotion/native';

export const VerificationContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 21px;
  margin-bottom: 37px;
`;

export const VerificationCodeContainer = styled.View`
  margin-right: 16px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 36px;
  color: ${props => props.theme.colors.secondary.normal};
  line-height: 36px;
  letter-spacing: 2px;
  font-weight: 500;
  margin-bottom: 29px;
  text-transform: uppercase;
`;

export const Container = styled.View`
  padding-top: 136px;
  padding-left: 30px;
  padding-right: 30px;
`;

export const LoginAndAgree = styled.Text`
  font-size: 10px;
  color: ${props => props.theme.colors.grey.dark};
  margin-top: 11px;
  padding: 0 24px;
`;

export const PhoneSectionContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PhonePrefixContainer = styled.View`
  width: 28%;
  margin-right: 8px;
`;

export const PhoneContainer = styled.View`
  flex: 1;
`;
