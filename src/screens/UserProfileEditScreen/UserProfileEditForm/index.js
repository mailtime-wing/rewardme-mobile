import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {FormattedMessage, FormattedDate} from 'react-intl';
import ImagePicker from 'react-native-image-picker';
import {useFormikContext} from 'formik';

import {
  FillIcon,
  errorStyle,
  formContainer,
  nameStyle,
  dateFieldContainer,
  profilePictureText,
  profilePictureContainer,
  editingStyle,
  container,
} from './style';

import GenderSelector, {genderOptions} from '@/components/GenderSelector';
import DateTimePickerInput from '@/components/DateTimePickerInput';
import ListOption from '@/components/ListOption';

import Input from '@/components/AppInput';
import AppAvator from '@/components/AppAvator';
import AppText from '@/components/AppText2';
import HeaderTitle from '@/components/HeaderTitle';

import splitPhoneNumber from '@/utils/splitPhoneNumber';
import {useTheme} from 'emotion-theming';

const cameraOptions = {
  title: 'CHANGE PROFILE PHOTO',
  customButtons: [{name: 'REMOVE', title: 'Remove Current Photo'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const UserProfileEditForm = ({handleDatePickerPress, formState}) => {
  const theme = useTheme();
  const {
    setFieldValue,
    values,
    errors,
    submitForm,
    resetForm,
  } = useFormikContext();

  useEffect(() => {
    if (formState.isConfirmed) {
      submitForm();
    }

    if (formState.isCancelled) {
      resetForm();
    }
  }, [formState.isConfirmed, formState.isCancelled, submitForm, resetForm]);

  const handleCameraPress = () => {
    ImagePicker.showImagePicker(cameraOptions, (response) => {
      if (response.didCancel) {
        // handle cancel
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        setFieldValue('profilePicture', null);
      } else {
        const source = {uri: response.uri};
        if (source) {
          setFieldValue('profilePicture', source);
        }
      }
    });
  };

  return (
    <View>
      {!formState.isEditing && (
        <HeaderTitle>
          <FormattedMessage id="profile" defaultMessage="Profile" />
        </HeaderTitle>
      )}
      <View style={container}>
        {formState.isEditing ? (
          <View
            style={formContainer}
            pointerEvents={formState.isEditing ? 'auto' : 'none'}>
            <View style={[profilePictureContainer, editingStyle]}>
              <AppText variant="label" style={profilePictureText(theme)}>
                <FormattedMessage
                  id="profile_photo"
                  defaultMessage="profile photo"
                />
              </AppText>
              <TouchableOpacity onPress={() => handleCameraPress()}>
                <AppAvator
                  variant="image"
                  sizeVariant="normal"
                  imageSrc={values.profilePicture}
                />
              </TouchableOpacity>
              <FillIcon source={require('@/assets/filled.png')} />
            </View>
            <Input
              label={<FormattedMessage id="your_name" />}
              required
              name="name"
            />
            <GenderSelector
              gender={values.gender}
              setFieldValue={setFieldValue}
            />
            <AppText variant="caption" style={errorStyle(theme)}>
              {errors.gender ? errors.gender : ' '}
            </AppText>
            <DateTimePickerInput
              style={dateFieldContainer}
              onPress={handleDatePickerPress}
              label={
                <FormattedMessage
                  id="date_of_birth"
                  defaultMessage="DATE OF BIRTH"
                />
              }
              required
              name="dob"
              showDatePicker={formState.showDatePicker}
              onDismiss={handleDatePickerPress}
            />
          </View>
        ) : (
          <View>
            <View style={profilePictureContainer}>
              <AppAvator
                variant="image"
                sizeVariant="normal"
                imageSrc={values.profilePicture}
              />
              <AppText variant="subTitle1" style={nameStyle(theme)}>
                {values.name}
              </AppText>
            </View>
            <ListOption
              key="gender"
              label={<FormattedMessage id="gender" />}
              value={
                genderOptions.find((gender) => gender.value === values.gender)
                  ?.label
              }
              noArrow
            />
            <ListOption
              key="dob"
              label={<FormattedMessage id="date_of_birth" />}
              value={
                <FormattedDate
                  value={values.dob}
                  year="numeric"
                  month="2-digit"
                />
              }
              noArrow
            />
            <ListOption
              key="phone"
              label={<FormattedMessage id="telephone" />}
              value={splitPhoneNumber(values.phone)}
              noArrow
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default UserProfileEditForm;