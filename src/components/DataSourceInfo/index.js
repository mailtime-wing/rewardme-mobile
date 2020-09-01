import React from 'react';
import {ScrollView} from 'react-native';

import Layout from './Layout';
import {screenStyle} from './style';

import ScreenContainer from '@/components/ScreenContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import useBankLogin from '@/hooks/useBankLogin';
import PlaidLogo from '@/assets/logo-plaid.svg';
import BankIcon from '@/assets/icon_bank.svg';

const layouts = {
  PLAID: {
    logo: <PlaidLogo />,
    rightIcon: <BankIcon />,
    title: 'We partner with Plaid to securely link your card',
    descriptions: [
      {
        title: 'Secure',
        caption: 'Transfer of your information is encrypted end-to-end',
      },
      {
        title: 'Private',
        caption: 'Your credentials will never be made accessible to RewardMe',
      },
    ],
  },
};

const DataSourceInfo = ({type, countryCode, onConnected}) => {
  const layout = layouts[type];

  const [login, {isError, isLoading}] = useBankLogin(type, countryCode, {
    onConnected,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // TODO: handle error
  }

  return (
    <ScrollView>
      <ScreenContainer hasTopBar style={screenStyle}>
        <Layout {...layout} onContinuePress={login} />
      </ScreenContainer>
    </ScrollView>
  );
};

export default DataSourceInfo;