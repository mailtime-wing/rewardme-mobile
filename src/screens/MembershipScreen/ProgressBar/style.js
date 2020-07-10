import styled from '@emotion/native';
import Text from '@/components/AppText';

export const ProgressContainer = styled.View`
  padding: 8px 0;
  margin-top: 24px;
`;
export const ProgressDetailContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProgressHeader = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
export const ProgressNumber = styled(Text)`
  font-size: 12px;
  line-height: 15px;
  font-weight: bold;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;
