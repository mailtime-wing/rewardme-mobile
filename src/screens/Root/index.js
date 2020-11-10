import React, {useContext, useEffect} from 'react';
import {Linking} from 'react-native';
import {
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import {NavigationContainer, getStateFromPath} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';

import OnboardingScreen from '@/screens/OnboardingScreen';
import MerchantSelectScreen from '@/screens/MerchantSelectScreen';
import EnterScreen from '@/screens/EnterScreen';
import VerifyEnterScreen from '@/screens/VerifyEnterScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import BindEmailScreen from '@/screens/BindEmailScreen';
import LoadingScreen from '@/screens/LoadingScreen';
import NotificationPermissionScreen from '@/screens/NotificationPermissionScreen';
import AccountSetupDoneScreen from '@/screens/AccountSetupDoneScreen';
import ChooseCashBackTypeScreen from '@/screens/ChooseCashBackTypeScreen';
import IntroductionScreen from '@/screens/IntroductionScreen';
import WelcomeScreen from '@/screens/WelcomeScreen';
import SignUpRewardScreen from '@/screens/SignUpRewardScreen';
import HomeStack from '@/screens/HomeStack';
import MembershipScreen from '@/screens/MembershipScreen';
import ChooseRegionScreen from '@/screens/ChooseRegionScreen';
import DataSourceInfoScreen from '@/screens/DataSourceInfoScreen';
import LinkedCardsScreen from '@/screens/LinkedCardsScreen';
import LinkedEmailsScreen from '@/screens/LinkedEmailsScreen';

import SignOutScreen from '@/screens/SignOutScreen';
import NotificationScreen from '@/screens/NotificationScreen';
import UserProfileEditScreen from '@/screens/UserProfileEditScreen';
import BindEmailEditScreen from '@/screens/BindEmailEditScreen';
import SettingScreen from '@/screens/SettingScreen';
import AppSettingScreen from '@/screens/AppSettingScreen';

import AccountSecurityScreen from '@/screens/AccountSecurityScreen';
import VerifyPhoneNumberScreen from '@/screens/VerifyPhoneNumberScreen';
import ChangePhoneNumberScreen from '@/screens/ChangePhoneNumberScreen';
import PhoneSuccessScreen from '@/screens/PhoneSuccessScreen';
import ChangePinScreen from '@/screens/ChangePinScreen';
import SetupPinScreen from '@/screens/SetupPinScreen';
import ForgetPinScreen from '@/screens/ForgetPinScreen';
import VerifyIdentityScreen from '@/screens/VerifyIdentityScreen';
import ResetPinScreen from '@/screens/ResetPinScreen';
import PinSuccessScreen from '@/screens/PinSuccessScreen';

import MerchantPreferenceEditScreen from '@/screens/MerchantPreferenceEditScreen';
import LinkedCardsSettingScreen from '@/screens/LinkedCardsSettingScreen';
import ChooseRegionSettingScreen from '@/screens/ChooseRegionSettingScreen';
import DataSourceInfoSettingScreen from '@/screens/DataSourceInfoSettingScreen';
import ReferralScreen from '@/screens/ReferralScreen';

// wallet page
import ConverterScreen from '@/screens/ConverterScreen';
import WithdrawalScreen from '@/screens/WithdrawalScreen';
import MissingReceiptScreen from '@/screens/MissingReceiptScreen';
import TransactionDetailScreen from '@/screens/TransactionDetailScreen';

import MembershipDetailScreen from '@/screens/MembershipDetailScreen';
import CashBackSummaryScreen from '@/screens/CashBackSummaryScreen';

import {AuthContext} from '@/context/auth';
import {SetupFlowContext} from '@/context/setupFlow';
import BackAppButton from '@/components/BackAppButton';
import CloseIconButton from '@/components/CloseIconButton';
import BackIconButton from '@/components/BackIconButton';
import {APP_BAR_HEIGHT} from '@/constants/layout';

import {styles} from './style';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const screens = [
  {
    name: 'onboarding',
    component: OnboardingScreen,
    options: {headerShown: false},
  },
  {name: 'enter', component: EnterScreen},
  {name: 'verify_enter', component: VerifyEnterScreen},
  {name: 'loading', component: LoadingScreen},
];

const setupScreens = [
  // 1st step: update user profile
  {
    name: 'user_profile',
    component: UserProfileScreen,
    appBarShown: false,
  },
  // 2nd step: choose cashback type
  {
    name: 'choose_cash_back_type',
    component: ChooseCashBackTypeScreen,
    options: {headerShown: false},
  },
  // 3rd step: select offers
  {name: 'welcome', component: WelcomeScreen},
  {name: 'merchant_select', component: MerchantSelectScreen},
  // 4rd step: bind email (which is skippable)
  {
    name: 'introduction',
    component: IntroductionScreen,
    options: {headerShown: false},
  },
  {
    name: 'add_email',
    component: BindEmailScreen,
  },
  {
    name: 'linked_emails',
    component: LinkedEmailsScreen,
  },
  {
    name: 'choose_region',
    component: ChooseRegionScreen,
  },
  {
    name: 'data_source_info',
    component: DataSourceInfoScreen,
  },
  {
    name: 'linked_cards',
    component: LinkedCardsScreen,
    options: {headerShown: false},
  },
  // 5th step: turn on notification
  {
    name: 'notification_permission',
    component: NotificationPermissionScreen,
    options: {headerShown: false},
  },
  // 6th step: setup done and gain reward
  {
    name: 'account_setup_done',
    component: AccountSetupDoneScreen,
    options: {headerShown: false},
  },
  {
    name: 'sign_up_reward',
    component: SignUpRewardScreen,
    options: {headerShown: false},
  },
];

const authScreens = [
  {name: 'home', component: HomeStack, options: {headerShown: false}},
  {
    name: 'membership',
    component: MembershipScreen,
    options: {headerTransparent: true},
  },
];

const authModalScreens = [
  {name: 'notification', component: NotificationScreen},
  // {name: 'my_referral_code', component: UserProfileEditScreen},
  // {name: 'enter_invite_code', component: AppSettingScreen},
  {name: 'converter', component: ConverterScreen},
  {name: 'withdrawal', component: WithdrawalScreen},
  {name: 'missing_receipt', component: MissingReceiptScreen},
  {name: 'transaction_detail', component: TransactionDetailScreen},
  {
    name: 'membership_detail',
    component: MembershipDetailScreen,
    options: {themeStyle: true},
  },
  {
    name: 'cash_back_summary',
    component: CashBackSummaryScreen,
  },
  {name: 'referral', component: ReferralScreen},
];

const settingScreens = [
  {name: 'settingsHome', component: SettingScreen},
  {name: 'edit_profile', component: UserProfileEditScreen},
  {name: 'offers_preference_edit', component: MerchantPreferenceEditScreen},
  {name: 'merchants_preference', component: MerchantSelectScreen},
  {name: 'emails_binding', component: BindEmailScreen}, // same as add_email in setupScreens (but different navigator)
  {name: 'emails_binding_edit', component: BindEmailEditScreen}, // enter by the user menu
  {name: 'account_security', component: AccountSecurityScreen},
  {name: 'verify_phone_number', component: VerifyPhoneNumberScreen},
  {name: 'change_phone_number', component: ChangePhoneNumberScreen},
  {name: 'phone_success', component: PhoneSuccessScreen},
  {name: 'change_pin', component: ChangePinScreen},
  {name: 'setup_pin', component: SetupPinScreen},
  {name: 'forget_pin', component: ForgetPinScreen},
  {name: 'verify_identity', component: VerifyIdentityScreen},
  {name: 'reset_pin', component: ResetPinScreen},
  {name: 'pin_success', component: PinSuccessScreen},
  {name: 'sign_out', component: SignOutScreen},
  {name: 'app_settings', component: AppSettingScreen},
  {name: 'faq_and_support', component: AppSettingScreen},
  {name: 'terms_of_service', component: AppSettingScreen},
  {name: 'privacy_policy', component: AppSettingScreen},
  {name: 'about_us', component: AppSettingScreen},
  {
    name: 'linked_cards_setting',
    component: LinkedCardsSettingScreen,
  },
  {
    name: 'choose_region_setting',
    component: ChooseRegionSettingScreen,
  },
  {
    name: 'data_source_info_setting',
    component: DataSourceInfoSettingScreen,
  },
];

const linkingConfig = {
  // invitefd://. (go to invite friend page)
  // secureaccount:// (go to secure account page)
  // bindemail:// (go to bind email page)
  // bindbank:// (go to bind bank account page)
  // internalweb://
  // externalweb://

  // TODO: handle internalweb and externalweb
  initialRouteName: 'home',
  screens: {
    settings: {
      screens: {
        account_security: {
          path: 'secureaccount',
          exact: true,
        },
        emails_binding: {
          path: 'bindemail',
          exact: true,
        },
        linked_cards_setting: {
          path: 'bindbank',
          exact: true,
        },
      },
    },
    referral: {
      path: 'referral',
      exact: true,
    },
    home: {
      // return to home if the path not match
      path: '*',
    },
  },
};

const linking = {
  // e.g. rewardme://secureaccount
  prefixes: ['rewardme://'],
  config: linkingConfig,
  getStateFromPath(path, config) {
    // ignore url from bank sync server
    if (path.startsWith('planto') || path.startsWith('credigo')) {
      return null;
    }
    return getStateFromPath(path, config);
  },
};

const SettingStack = createStackNavigator();
const screenUnderModalOptions = {
  headerTitle: null,
  headerStyle: {
    height: APP_BAR_HEIGHT,
    shadowOffset: {x: 0, y: 0},
  },
  headerLeftContainerStyle: {
    paddingLeft: 24,
  },
  headerRightContainerStyle: {
    paddingRight: 24,
  },
  cardStyle: [styles.card],
  headerStatusBarHeight: 16,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

const Setting = ({navigation}) => {
  const theme = useTheme();

  const settingCardStyle = [
    css`
      ${theme.colors.elevatedBackground1}
    `,
    {
      ...screenUnderModalOptions.cardStyle,
    },
  ];

  const settingHeaderStyle = [
    css`
      ${theme.colors.elevatedBackground1}
    `,
    {
      ...screenUnderModalOptions.headerStyle,
    },
  ];

  return (
    <SettingStack.Navigator
      screenOptions={{
        ...screenUnderModalOptions,
        cardStyle: settingCardStyle,
        headerStyle: settingHeaderStyle,
        headerLeft: ({onPress}) => {
          return onPress ? (
            <BackIconButton onPress={onPress} />
          ) : (
            <CloseIconButton onPress={() => navigation.goBack()} />
          );
        },
      }}>
      {settingScreens.map(({name, ...props}) => (
        <SettingStack.Screen key={name} name={name} {...props} />
      ))}
    </SettingStack.Navigator>
  );
};

const Main = () => {
  const theme = useTheme();
  const {authToken} = useContext(AuthContext);
  const {validScreenNames} = useContext(SetupFlowContext);
  const {top} = useSafeAreaInsets();

  const headerStyle = {
    ...styles.header,
    height: top + APP_BAR_HEIGHT,
    backgroundColor: theme.colors.background1,
  };

  const cardStyle = {
    ...styles.card,
    backgroundColor: theme.colors.background1,
  };

  return (
    <MainStack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleStyle: styles.headerTitle,
        cardStyle: cardStyle,
        headerStyle: headerStyle,
        gestureEnabled: false,
        headerStatusBarHeight: top,
        headerLeftContainerStyle: {
          paddingLeft: 24,
        },
      }}>
      {!authToken &&
        screens.map(({name, appBarShown, options, ...screenProps}) => (
          <MainStack.Screen
            key={name}
            name={name}
            {...screenProps}
            options={{
              headerLeft: (props) =>
                appBarShown === false ? null : <BackAppButton {...props} />,
              headerStyle: {
                ...headerStyle,
                ...(appBarShown === false && {height: top}),
              },
              ...options,
            }}
          />
        ))}
      {authToken
        ? setupScreens
            .filter((setupScreen) => validScreenNames[setupScreen.name])
            .map(({name, appBarShown, options, ...screenProps}) => {
              return (
                <MainStack.Screen
                  key={name}
                  name={name}
                  {...screenProps}
                  options={{
                    headerLeft: (props) =>
                      appBarShown === false ? null : (
                        <BackAppButton {...props} />
                      ),
                    headerStyle: {
                      ...headerStyle,
                      ...(appBarShown === false && {height: top}),
                    },
                    ...options,
                  }}
                />
              );
            })
        : null}
      {authToken
        ? authScreens.map(({name, options, ...screenProps}) => (
            <MainStack.Screen
              key={name}
              name={name}
              {...screenProps}
              options={{
                headerLeft: BackAppButton,
                ...options,
              }}
            />
          ))
        : null}
    </MainStack.Navigator>
  );
};

const Root = () => {
  const {authToken} = useContext(AuthContext);
  const theme = useTheme();

  const rootCardStyle = {
    ...screenUnderModalOptions.cardStyle,
    backgroundColor: theme.colors.background1,
  };

  const rootHeaderStyle = {
    ...screenUnderModalOptions.headerStyle,
    backgroundColor: theme.colors.background1,
  };

  const themeCardStyle = {
    ...screenUnderModalOptions.cardStyle,
    backgroundColor: theme.colors.themeBackground,
  };

  const themeHeaderStyle = {
    ...screenUnderModalOptions.headerStyle,
    backgroundColor: theme.colors.themeBackground,
  };

  useEffect(() => {
    Linking.addEventListener('url');
    return () => {
      Linking.removeEventListener('url');
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        mode="modal"
        headerMode="screen"
        screenOptions={{
          ...TransitionPresets.ModalPresentationIOS,
          headerTitle: null,
          cardStyle: [styles.card],
          headerLeft: (props) => <CloseIconButton {...props} />,
          cardOverlayEnabled: true,
          gestureEnabled: true,
          headerStatusBarHeight: 0,
        }}>
        <RootStack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        {authToken ? (
          <RootStack.Screen
            name="settings"
            component={Setting}
            options={{headerShown: false}}
          />
        ) : null}
        {authToken
          ? authModalScreens.map(({name, options, ...screenProps}) => (
              <RootStack.Screen
                key={name}
                name={name}
                {...screenProps}
                options={{
                  ...screenUnderModalOptions,
                  ...options,
                  headerStyle: options?.themeStyle
                    ? themeHeaderStyle
                    : rootHeaderStyle,
                  cardStyle: options?.themeStyle
                    ? themeCardStyle
                    : rootCardStyle,
                }}
              />
            ))
          : null}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
