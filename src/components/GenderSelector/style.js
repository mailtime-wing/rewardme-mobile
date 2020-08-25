import styled from '@emotion/native';
import Text from '@/components/AppText';

export const GenderContainer = styled.View`
  height: 32px;
  width: 85%;
  flex-direction: row;
`;

export const Gender = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active ? props.theme.colors.secondary.normal : 'transparent'};
  border: ${props =>
    props.active
      ? props.theme.colors.secondary.normal
      : props.theme.colors.textOnBackground.disabled};
  border-radius: 34px;
  margin-right: 8px;
`;

export const GenderText = styled(Text)`
  color: ${props =>
    props.active
      ? props.theme.colors.background1
      : props.theme.colors.contrastColor};
`;

export const FormInputContainer = styled.View`
  margin-bottom: 24px;
`;

export const GenderLabel = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  font-weight: bold;
  margin-bottom: 8px;
  text-transform: uppercase;
`;
