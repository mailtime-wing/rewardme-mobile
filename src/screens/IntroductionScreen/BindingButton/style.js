import styled from '@emotion/native';
import TitleText from '@/components/TitleText';
import AppText from '@/components/AppText';

export const Button = styled.TouchableOpacity`
  margin-bottom: 16px;
  width: 100%;
`;

export const ButtonView = styled.View`
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: 24px 16px;
`;

export const TextContainer = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const ButtonTitle = styled(TitleText)`
  font-size: 18px;
  color: ${props => props.theme.colors.contrastColor};
`;

export const ButtonCaption = styled(AppText)`
  font-size: 12px;
  color: ${props => props.theme.colors.textOnBackground.disabled};
`;
