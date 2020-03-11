import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer as Container} from '@react-navigation/native';
import {AuthContext} from '@/context/auth';

import OnboardingScreen from '@/screens/OnboardingScreen';
import BrandSelectScreen from '@/screens/BrandSelectScreen';
import BrandSelectConfirmScreen from '@/screens/BrandSelectConfirmScreen';
import SignInScreen from '@/screens/SignInScreen';
import UserProfileScreen from '@/screens/UserProfileScreen';
import HomeStack from '@/screens/HomeStack';
import ModalStack from '@/screens/ModalStack';

import HeaderButton from '@/components/HeaderButton';

const Stack = createStackNavigator();

const screens = [
  {name: 'onboarding', component: OnboardingScreen},
  {name: 'sign_in', component: SignInScreen},
  {name: 'brand_select', component: BrandSelectScreen},
  {name: 'brand_select_confirm', component: BrandSelectConfirmScreen},
  {name: 'user_profile', component: UserProfileScreen},
];

const Root = () => {
  const {authToken} = useContext(AuthContext);
  return (
    <Container>
      {authToken == null ? (
        <Stack.Navigator>
          {screens.map(screen => (
            <Stack.Screen
              name={screen.name}
              component={screen.component}
              options={{
                headerTransparent: true,
                headerTitleStyle: {display: 'none'},
                headerStyle: {height: 80, backgroundColor: 'blue'},
                headerLeft: () => <HeaderButton root="onboarding" />,
              }}
            />
          ))}
        </Stack.Navigator>
      ) : (
        <Stack.Navigator mode="modal" headerMode="none">
          <Stack.Screen name="home" component={HomeStack} />
          <Stack.Screen name="modal" component={ModalStack} />
        </Stack.Navigator>
      )}
    </Container>
  );
};

export default Root;
