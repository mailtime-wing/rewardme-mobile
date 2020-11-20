import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import {
  rewardMeContainer,
  summaryHeader,
  earned,
  amount,
  rewardMe,
  upperSection,
  summaryContainer,
  lowerSection,
  arrow,
  brand as brandName,
  // brandPercentage,
  imageContainer,
  brandDetail as brandDetailContainer,
  selectedMerchant,
  rowContainer,
  button,
} from './style';

import ArrowIcon from '@/assets/list_arrow.svg';
import ShoppingBagAddIcon from '@/assets/icon_shopping-bag-add.svg';

import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';
import BrandIcon from '@/components/BrandIcon';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import SummaryDemoData from './summary_data.json';

const CashBackItem = ({icon, brand, earnInTotal, earnInPeriod}) => {
  const theme = useTheme();
  // TODO: create <AppTag /> component for %
  return (
    <View style={rowContainer}>
      <View style={imageContainer}>
        <BrandIcon sizeVariant="large" ImgSrc={icon} />
      </View>
      <View style={brandDetailContainer(theme)}>
        <View style={rowContainer}>
          <AppText variant="heading5" style={brandName(theme)}>
            {brand}
          </AppText>
          {/* <AppText variant="heading6" style={brandPercentage(theme)}>
            <FormattedMessage
              id="cash_back_percentage"
              defaultMessage="{percentage}% cashback"
              values={{percentage: 0.5}}
            />
          </AppText> */}
        </View>

        <AppText variant="caption" style={earned(theme)}>
          <FormattedMessage
            id="earned_in_past_7_days"
            values={{
              amount: (
                <AppText variant="caption" style={amount(theme)}>
                  <FormattedMessage id="currencies.usd" defaultMessage="USD" />{' '}
                  <FormattedNumber value={Number(earnInPeriod)} />
                </AppText>
              ),
            }}
          />
        </AppText>
        <AppText variant="caption" style={earned(theme)}>
          <FormattedMessage
            id="earned_in_total"
            values={{
              amount: (
                <AppText variant="caption" style={amount(theme)}>
                  <FormattedMessage id="currencies.usd" defaultMessage="USD" />{' '}
                  <FormattedNumber value={Number(earnInTotal)} />
                </AppText>
              ),
            }}
          />
        </AppText>
      </View>
    </View>
  );
};

const CashBackSummarySection = ({
  merchantsData,
  navigation,
  onPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={style}>
      <TouchableOpacity style={upperSection(theme)} onPress={onPress}>
        <View style={rewardMeContainer}>
          <Image source={require('@/assets/rewardme.png')} style={rewardMe} />
        </View>
        <View style={summaryContainer}>
          <AppText variant="heading4" style={summaryHeader(theme)}>
            <FormattedMessage
              id="cash_back_summary"
              defaultMessage="Cash Back Summary"
            />
          </AppText>
          <AppText variant="caption" style={earned(theme)}>
            <FormattedMessage
              id="earned_in_past_7_days"
              values={{
                amount: (
                  <AppText variant="caption" style={amount(theme)}>
                    <FormattedMessage
                      id="currencies.usd"
                      defaultMessage="USD"
                    />{' '}
                    <FormattedNumber
                      value={Number(
                        SummaryDemoData.data.total_cashback_in_period,
                      )}
                    />
                  </AppText>
                ),
              }}
            />
          </AppText>
          <AppText variant="caption" style={earned(theme)}>
            <FormattedMessage
              id="earned_in_total"
              values={{
                amount: (
                  <AppText variant="caption" style={amount(theme)}>
                    <FormattedMessage
                      id="currencies.usd"
                      defaultMessage="USD"
                    />{' '}
                    <FormattedNumber
                      value={Number(SummaryDemoData.data.total_cashback)}
                    />
                  </AppText>
                ),
              }}
            />
          </AppText>
        </View>
        <ArrowIcon
          stroke={theme.colors.borderColor}
          strokeWidth={2}
          style={arrow}
        />
      </TouchableOpacity>
      <View
        style={[
          lowerSection,
          css`
            ${theme.colors.elevatedBackground1}
          `,
        ]}>
        <AppText variant="subTitle3" style={selectedMerchant(theme)}>
          <FormattedMessage
            id="cash_back_from_selected_merchants"
            defaultMessage="Cash Back from Selected Merchants"
          />
        </AppText>
        {SummaryDemoData.data.merchant_summary_infos.map((merchant_summary) => (
          <CashBackItem
            icon={{
              uri: merchantsData?.find(
                (merchant) => merchant.name === merchant_summary.merchant,
              ).logo,
            }}
            brand={merchant_summary.merchant}
            earnInTotal={merchant_summary.total_cashback}
            earnInPeriod={merchant_summary.total_cashback_in_period}
          />
        ))}
        <AppButton
          onPress={() =>
            navigation.navigate('settings', {screen: 'offers_preference_edit'})
          }
          variant="filled"
          sizeVariant="normal"
          colorVariant="secondary"
          text={
            <FormattedMessage id="add_merchant" defaultMessage="Add merchant" />
          }
          style={button}
          svgIcon={ShoppingBagAddIcon}
        />
      </View>
    </View>
  );
};
export default CashBackSummarySection;
