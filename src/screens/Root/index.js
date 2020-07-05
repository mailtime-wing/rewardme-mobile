import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import OnboardingScreen from '@/screens/OnboardingScreen';
import OfferSelectScreen from '@/screens/OfferSelectScreen';
import SignInScreen from '@/screens/SignInScreen';
import SignUpScreen from '@/screens/SignUpScreen';
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
import ModalStack from '@/screens/ModalStack';
import ProfileStack from '@/screens/ProfileStack';
import {AuthContext} from '@/context/auth';
import BackButton from '@/components/BackButton';
import {
  MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR,
  TOP_BAR_HEIGHT,
} from '@/constants/layout';

import {styles} from './style';

const Stack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'sign_up', component: SignUpScreen},
  {name: 'loading', component: LoadingScreen},
];

const setupScreens = [
  // 1st step: update user profile
  {name: 'user_profile', component: UserProfileScreen},
  // 2nd step: choose cashback type
  {name: 'choose_cash_back_type', component: ChooseCashBackTypeScreen},
  // 3rd step: select offers
  {name: 'welcome', component: WelcomeScreen},
  {name: 'offer_select', component: OfferSelectScreen},
  // 4rd step: bind email (which is skippable)
  {
    name: 'introduction',
    component: IntroductionScreen,
    skip: 'notification_permission',
  },
  {
    name: 'bind_email',
    component: BindEmailScreen,
    skip: 'notification_permission',
  },
  // 5th step: turn on notification
  {name: 'notification_permission', component: NotificationPermissionScreen},
  // 6th step: setup done and gain reward
  {name: 'account_setup_done', component: AccountSetupDoneScreen, skip: 'home'},
  {name: 'sign_up_reward', component: SignUpRewardScreen},
];

const authScreens = [
  {name: 'home', component: HomeStack},
  {name: 'modal', component: ModalStack},
  {name: 'profile', component: ProfileStack},
];

const backScreen = [
  'sign_in',
  'sign_up',
  'welcome',
  'offer_select',
  'bind_email',
];

const Root = () => {
  const {authToken, setupStatus} = useContext(AuthContext);
  const {top} = useSafeAreaInsets();

  const excludeScreenNames = [];
  if (setupStatus?.isProfileCompleted) {
    excludeScreenNames.push('user_profile');
  }
  if (setupStatus?.isCashbackCurrencyCodeSet) {
    excludeScreenNames.push('choose_cash_back_type');
  }
  if (setupStatus?.isBasicOfferSet) {
    excludeScreenNames.push('welcome');
    excludeScreenNames.push('offer_select');
  }
  if (setupStatus?.isDataSourceBound) {
    excludeScreenNames.push('introduction');
    excludeScreenNames.push('bind_email');
  }
  if (
    setupStatus?.isDataSourceBound &&
    setupStatus?.isCashbackCurrencyCodeSet &&
    setupStatus?.isBasicOfferSet
  ) {
    excludeScreenNames.push('account_setup_done');
    excludeScreenNames.push('sign_up_reward');
  }

  const filteredSetupScreens = setupScreens.filter(
    screen => !excludeScreenNames.includes(screen.name),
  );

  const headerStyle = {
    ...styles.header,
    height: top + MARGIN_BETWEEN_STATUS_BAR_AND_TOP_BAR + TOP_BAR_HEIGHT,
  };

  return (
    <Container>
      {!authToken ? (
        <Stack.Navigator>
          {screens.map(screen => (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              options={{
                headerTransparent: true,
                headerTitleStyle: styles.headerTitle,
                cardStyle: styles.card,
                headerStyle: headerStyle,
                headerLeft: () =>
                  backScreen.includes(screen.name) ? <BackButton /> : null,
                gestureEnabled: false,
              }}
            />
          ))}
        </Stack.Navigator>
      ) : (
        // TODO: hide setupScreens so that it cannot be back from authScreens
        <Stack.Navigator>
          {filteredSetupScreens.map((screen, i) => {
            const {name, component, ...params} = screen;
            return (
              <Stack.Screen
                key={name}
                name={name}
                component={component}
                options={{
                  headerTransparent: true,
                  headerTitleStyle: styles.headerTitle,
                  cardStyle: styles.card,
                  headerStyle: headerStyle,
                  headerLeft: () =>
                    backScreen.includes(name) ? <BackButton /> : null,
                  gestureEnabled: false,
                }}
                initialParams={{
                  next: filteredSetupScreens[i + 1]
                    ? filteredSetupScreens[i + 1].name
                    : 'home',
                  ...params,
                }}
              />
            );
          })}

          {authScreens.map(screen => (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              options={{
                headerTransparent: true,
                headerTitleStyle: styles.headerTitle,
                headerStyle: headerStyle,
                headerLeft: () =>
                  backScreen.includes(screen.name) ? <BackButton /> : null,
                gestureEnabled: false,
              }}
            />
          ))}
        </Stack.Navigator>
      )}
    </Container>
  );
};

export default Root;
