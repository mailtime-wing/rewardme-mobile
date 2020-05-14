import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Container, Details, EditLater} from './style';

import ThemeButton from '@/components/ThemeButton';
import BrandList from '@/components/BrandList';

const BrandSelectConfirmScreen = ({route, navigation}) => {
  const {numberOfBrand} = route.params;
  const {selectedBrands} = route.params;

  const handleConfirmPress = () => {
    navigation.navigate('sign_in', {
      isSignUp: true,
      selectedBrands: selectedBrands,
    });
  };

  return (
    <Container>
      <Details>
        <FormattedMessage
          id="confirm_select_offer_details"
          defaultMessage="Once you shop in these {number_of_brands} brands, you will earn cash back."
          values={{
            number_of_brands: numberOfBrand,
          }}
        />
      </Details>
      <Details>
        <FormattedMessage
          id="please_confirm_brands"
          defaultMessage="If you’re happy with the offer, please confirm your choice."
        />
      </Details>
      <BrandList brandList={selectedBrands} />
      <ThemeButton onPress={handleConfirmPress}>
        <FormattedMessage id="confirm" default="Confirm" />
      </ThemeButton>
      <EditLater>
        <FormattedMessage
          id="edit_prefernece_afterward"
          defaultMessage="You can edit the preference in settings afterward"
        />
      </EditLater>
    </Container>
  );
};

export default BrandSelectConfirmScreen;
