import React from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';
import AppAvator from '@/components/AppAvator';
import AppIcon from '@/components/AppIcon';
import LoadingSpinner from '@/components/LoadingSpinner';

import ExternalLinkIcon from '@/assets/icon_external-link.svg';

import {GET_USER_LOCALE_AND_PHONE_NUMBER} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import locales from '@/constants/locale';

import {
  header,
  exchangesName,
  referralLink,
  referral,
  textAlignCenter,
  rowContainer,
  exchangesImage,
} from './style';

const ReferralLink = ({url}) => {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)} style={referral}>
      <AppIcon
        svgIcon={ExternalLinkIcon}
        sizeVariant="small"
        color={theme.colors.textOnBackground.disabled}
      />
      <AppText variant="caption" style={referralLink(theme)}>
        Referral link
      </AppText>
    </TouchableOpacity>
  );
};

const CryptoExchanges = () => {
  const theme = useTheme();
  const {data, loading} = useQueryWithAuth(GET_USER_LOCALE_AND_PHONE_NUMBER);
  const isChinaPhoneNumber = data?.userProfile?.phoneNumber?.includes('+86');
  const locale = data?.userProfile?.locale || locales.EN_US;
  let binanceUrl = '';
  let okexUrl = '';
  let digifinexUrl = '';

  if (isChinaPhoneNumber) {
    binanceUrl = 'https://accounts.binancezh.pro/cn/register?ref=VXR61SQI';
    okexUrl = 'https://www.okex.com/join/1/1838164';
    digifinexUrl = 'https://www.digifinex.xyz/zh-cn/from/lpKlJk';
  } else {
    switch (locale) {
      case locales.EN_US:
        binanceUrl = 'https://www.binance.com/en/register?ref=VXR61SQI';
        okexUrl = 'https://www.okex.com/join/1/1838164';
        digifinexUrl = 'https://www.digifinex.xyz/en-ww/from/lpKlJk';
        break;
      case locales.ZH_HK:
        binanceUrl = 'https://accounts.binance.com/tw/register?ref=VXR61SQI';
        okexUrl = 'https://www.okex.com/join/1/1838164';
        digifinexUrl = 'https://www.digifinex.xyz/zh-hk/from/lpKlJk';
        break;
      case locales.ZH_CN:
        binanceUrl = 'https://accounts.binance.com/cn/register?ref=VXR61SQI';
        okexUrl = 'https://www.okex.com/join/1/1838164';
        digifinexUrl = 'https://www.digifinex.xyz/zh-cn/from/lpKlJk';
        break;
      default:
        break;
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View>
      <AppText variant="body2" style={[header(theme), textAlignCenter]}>
        MDT is available in these crypto exchanges
      </AppText>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_binance.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          Binance
        </AppText>
        <ReferralLink url={binanceUrl} />
      </View>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_okex.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          OKEx
        </AppText>
        <ReferralLink url={okexUrl} />
      </View>
      <View style={rowContainer}>
        <AppAvator
          variant="default"
          sizeVariant="small"
          imageSrc={require('@/assets/icon_digifinex.png')}
          style={exchangesImage}
        />
        <AppText variant="body1" style={exchangesName(theme)}>
          Digifinex
        </AppText>
        <ReferralLink url={digifinexUrl} />
      </View>
    </View>
  );
};

export default CryptoExchanges;
