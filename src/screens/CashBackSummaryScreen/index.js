import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import {VirtualizedList, TouchableOpacity, Image, View} from 'react-native';
import {useTheme} from 'emotion-theming';
import {FormattedMessage, FormattedNumber} from 'react-intl';
import {MEASURABLE_REWARD_POINT} from '@/constants/currency';
import {GET_MERCHANTS_API} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import DemoData from './data.json';

import LinearGradient from 'react-native-linear-gradient';
import {
  image,
  banner,
  body,
  chip,
  currency as currencyStyle,
  amount as amountStyle,
  range as rangeStyle,
  firstChipMargin,
  historyHeaderContainer,
  cashBackTitle,
  background as historyBackground,
} from './style';

import {ThemeContext} from '@/context/theme';
import AppIcon from '@/components/AppIcon';
import AppText from '@/components/AppText2';
import MissingCartIcon from '@/assets/icon_missed-shopping-cart.svg';
import TransactionBottomSheet from '@/components/TransactionBottomSheet';

import TransactionsHistory from '@/components/TransactionsHistory';
import AppButton from '@/components/AppButton';
import BrandIcon from '@/components/BrandIcon';

const SummaryChip = ({currency, amount, range, style}) => {
  const theme = useTheme();
  return (
    <View style={[chip(theme), style]}>
      <AppText variant="unit11" style={currencyStyle(theme)}>
        {currency}
      </AppText>
      <AppText variant="digit16mono" style={amountStyle(theme)}>
        <FormattedNumber
          value={amount}
          minimumFractionDigits={2}
          maximumFractionDigits={2}
        />
      </AppText>
      <AppText variant="smallText" style={rangeStyle(theme)}>
        {range}
      </AppText>
    </View>
  );
};

const CashBackSummaryScreen = ({navigation}) => {
  const theme = useTheme();
  const {isDark} = useContext(ThemeContext);
  const backgroundImg = isDark
    ? require('@/assets/cashback-history-background_dark.png')
    : require('@/assets/cashback-history-background.png');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [activeFilterSectionIndex, setActiveFilterSectionIndex] = useState(0);
  const [activeFilterItemIndex, setActiveFilterItemIndex] = useState(null);
  const [activeFilterSubType, setActiveFilterSubType] = useState('');
  const [activeFilterMask, setActiveFilterMask] = useState('');
  const [cashBackHistoryList, setCashBackHistoryList] = useState([]);

  const {data: merchantsData, loading: merchantsLoading} = useQueryWithAuth(
    GET_MERCHANTS_API,
  );

  const cashBackHistoryRawList = useMemo(
    () =>
      DemoData.data?.edges.map(
        (h) =>
          (h = {
            cursor: h.cursor,
            icon: merchantsLoading ? (
              <LoadingSpinner />
            ) : (
              <BrandIcon
                sizeVariant="normal"
                ImgSrc={{
                  uri: merchantsData?.merchants.find(
                    (merchant) => merchant.name === h.node.merchant,
                  ).logo,
                }}
              />
            ),
            node: {
              amount: h.node.purchase_amount,
              id: h.node.id,
              title: h.node.merchant,
              transactionTime: h.node.history_time,
              type: h.node.provider,
              data: {
                email: h.node.data?.account_email,
                subType: h.node.data?.subType,
                mask: h.node.data?.mask,
              },
            },
          }),
      ),
    [merchantsData, merchantsLoading],
  );

  useEffect(() => {
    setCashBackHistoryList(cashBackHistoryRawList);
  }, [cashBackHistoryRawList]);

  const currencyCode = MEASURABLE_REWARD_POINT;

  const dataByMerchants = [];
  const dataByEmails = [];
  const dataByBanks = {};

  DemoData.data?.edges.forEach((history) => {
    if (
      !!history.node.merchant &&
      !dataByMerchants.includes(history.node.merchant)
    ) {
      dataByMerchants.push(history.node.merchant);
    }

    if (
      !!history.node.data.account_email &&
      !dataByEmails.includes(history.node.data.account_email)
    ) {
      dataByEmails.push(history.node.data.account_email);
    }

    if (!!history.node.data.subType && !!history.node.data.mask) {
      if (!dataByBanks[history.node.data.subType]) {
        dataByBanks[history.node.data.subType] = [];
      }

      if (
        !dataByBanks[history.node.data.subType].includes(history.node.data.mask)
      ) {
        dataByBanks[history.node.data.subType].push(history.node.data.mask);
      }
    }
  });

  const filterList = [
    {title: 'Cashback from Selected Merchants', data: dataByMerchants},
    {title: 'Cashback from Emails', data: dataByEmails},
    {title: 'Cashback from Bank accounts', data: dataByBanks},
  ];

  const handleFilterPress = () => {
    setShowBottomSheet(true);
  };

  const handleLayoutPress = () => {
    setShowBottomSheet(false);
  };

  const handleItemPress = (index, itemIndex) => {
    setActiveFilterSectionIndex(index);
    setActiveFilterItemIndex(itemIndex);
  };

  const handleBankItemPress = (subType, mask) => {
    setActiveFilterSubType(subType);
    setActiveFilterMask(mask);
  };

  const onApplyPress = () => {
    if (activeFilterSectionIndex === 0) {
      //filter by merchants
      setCashBackHistoryList(
        cashBackHistoryRawList.filter(
          (history) =>
            history.node.title ===
            filterList[activeFilterSectionIndex].data[activeFilterItemIndex],
        ),
      );
    }

    if (activeFilterSectionIndex === 1) {
      //filter by emails
      console.log(
        'email',
        cashBackHistoryRawList.map((h) => h.node.data.account_email),
      );
      setCashBackHistoryList(
        cashBackHistoryRawList.filter(
          (history) =>
            history.node.data.email ===
            filterList[activeFilterSectionIndex].data[activeFilterItemIndex],
        ),
      );
    }

    if (activeFilterSectionIndex === 2) {
      //filter by banks
      setCashBackHistoryList(
        cashBackHistoryRawList.filter(
          (history) =>
            history.node.data.subType === activeFilterSubType &&
            history.node.data.mask === activeFilterMask,
        ),
      );
    }

    setShowBottomSheet(false);
  };

  const onLoadMore = () => {};

  const handleMissingCartPress = useCallback(() => {
    navigation.navigate('missing_receipt');
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: {backgroundColor: theme.colors.cashBackSummaryBackground},
      headerBackground: () => (
        <LinearGradient
          colors={theme.colors.linearGradientBackground.cashBackSummary}
        />
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleMissingCartPress}>
          <AppIcon
            sizeVariant="small"
            svgIcon={MissingCartIcon}
            color={theme.colors.contrastColor}
          />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    handleMissingCartPress,
    theme.colors.linearGradientBackground.cashBackSummary,
    theme.colors.cashBackSummaryBackground,
    theme.colors.contrastColor,
  ]);

  return (
    <>
      <VirtualizedList
        getItemCount={() => 0}
        ListHeaderComponent={
          <>
            <Image source={backgroundImg} resizeMode="cover" style={image} />
            <View style={body}>
              <SummaryChip
                currency="USD"
                amount={10.12}
                range={
                  <FormattedMessage
                    id="in_past_days"
                    defaultMessage="In Past {day} Days"
                    values={{
                      day: 7,
                    }}
                  />
                }
                style={firstChipMargin}
              />
              <SummaryChip
                currency="USD"
                amount={1234.21}
                range={
                  <FormattedMessage id="in_totals" defaultMessage="In Totals" />
                }
              />
              <Image
                style={banner}
                source={require('@/assets/upgrade_promotion_banner.png')}
                resizeMode="cover"
              />
            </View>
          </>
        }
        ListFooterComponent={
          <TransactionsHistory
            headerComponent={
              <View style={historyHeaderContainer(theme)}>
                <AppText variant="heading5" style={cashBackTitle(theme)}>
                  <FormattedMessage
                    id="cash_back_history"
                    defaultMessage="Cash Back History"
                  />
                </AppText>
                <AppButton
                  onPress={handleFilterPress}
                  variant="outlined"
                  sizeVariant="compact"
                  colorVariant="secondary"
                  text={<FormattedMessage id="button.filter" />}
                />
              </View>
            }
            currencyCode={currencyCode}
            navigation={navigation}
            transactionsHistoryList={cashBackHistoryList}
            onEndReached={onLoadMore}
            style={historyBackground(theme)}
          />
        }
      />
      {showBottomSheet && (
        <TransactionBottomSheet
          title={<FormattedMessage id="filter_by" defaultMessage="Filter by" />}
          items={filterList}
          activeOptionIndex={activeFilterSectionIndex}
          onLayoutPress={handleLayoutPress}
          onItemPress={handleItemPress}
          onBankItemPress={handleBankItemPress}
          onApplyPress={onApplyPress}
        />
      )}
    </>
  );
};

export default CashBackSummaryScreen;
