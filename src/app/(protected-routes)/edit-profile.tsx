import { updateUserApi } from "@/api/users";
import ConfirmationBottomSheet from "@/bottom-sheets/confirmation-bottom-sheet";
import CustomButton from "@/components/custom-button";
import CustomDropdown from "@/components/custom-dropdown";
import CustomInput from "@/components/custom-input";
import { COUNTRIES } from "@/constants";
import { COLORS } from "@/constants/styles";
import AppLayout from "@/layouts/app-layout";
import { updateUser } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import BottomSheet from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import {
  Image,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";

type InputRefs = {
  first_name: TextInput | null;
  last_name: TextInput | null;
  state: TextInput | null;
};

type Values = {
  first_name: string;
  last_name: string;
  country: string;
  state: string;
};

const INITIAL_VALUES: Values = {
  first_name: "",
  last_name: "",
  country: "",
  state: "",
};

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset>();
  const router = useRouter();
  const confirmationBottomSheetRef = useRef<BottomSheet | null>(null);
  const inputRefs = useRef<InputRefs>({
    first_name: null,
    last_name: null,
    state: null,
  });

  let ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name Required"),
    last_name: Yup.string().required("Last Name Required"),
    country: Yup.string().required("Select Country"),
    state: Yup.string().required("State Required"),
  });

  const pickEntites = (user: Values) => {
    const { first_name, last_name, country, state } = user;
    return { first_name, last_name, country, state };
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
  } = useFormik<Values>({
    initialValues: { ...INITIAL_VALUES, ...pickEntites(user) },
    validationSchema: ValidationSchema,
    onSubmit: () => {
      Keyboard.dismiss();
      confirmationBottomSheetRef.current?.expand();
    },
  });

  const handleUpdate = async () => {
    setLoader(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof Values]);
    });
    if (selectedImage)
      formData.append("image", {
        uri: selectedImage.uri,
        name: selectedImage.fileName || "photo.jpg",
        type: selectedImage.mimeType || "image/jpeg",
      } as any);
    const res = await updateUserApi(formData);
    if (res?.status == 200) {
      dispatch(updateUser(res.data));
      Toast.show("Information updated successfully", Toast.SHORT);
      router.back();
    }
    setLoader(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      allowsMultipleSelection: false,
    });
    result.assets?.[0] && setSelectedImage(result.assets[0]);
  };

  return (
    user && (
      <>
        <AppLayout title="Edit Information">
          {/* Profile Picture */}
          <View className="bg-primary rounded-full border-4 border-[white] self-center">
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage.uri }
                  : user.profile_image
                  ? { uri: user.profile_image }
                  : require("@/assets/images/dummy-profile.jpg")
              }
              className="w-24 h-24 rounded-full "
            />
            {/* Edit Icon */}
            <TouchableOpacity
              activeOpacity={0.6}
              className="absolute bottom-0 right-0 rounded-full"
              onPress={pickImage}
            >
              <LinearGradient
                colors={[COLORS.secondary, COLORS.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="w-8 h-8 rounded-full items-center justify-center border-2 border-white"
              >
                <Image
                  source={require("@/assets/icons/pen.png")}
                  className="h-4 w-4"
                  resizeMode="contain"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <CustomInput
            ref={(el) => (inputRefs.current["first_name"] = el)}
            placeholder={"First Name"}
            value={values.first_name}
            onChangeText={handleChange("first_name")}
            onBlur={handleBlur("first_name")}
            error={touched.first_name && errors.first_name}
            onSubmitEditing={() => inputRefs.current["last_name"]?.focus()}
            returnKeyType={"next"}
            submitBehavior={"submit"}
          />
          <CustomInput
            ref={(el) => (inputRefs.current["last_name"] = el)}
            placeholder={"Last Name"}
            value={values.last_name}
            onChangeText={handleChange("last_name")}
            onBlur={handleBlur("last_name")}
            error={touched.last_name && errors.last_name}
            onSubmitEditing={() => inputRefs.current["state"]?.focus()}
            returnKeyType={"next"}
            submitBehavior={"submit"}
          />
          <CustomDropdown
            placeholder="Country"
            data={COUNTRIES}
            labelField={"name"}
            valueField={"code"}
            value={values.country}
            onChange={async (country) => {
              await setFieldValue("country", country.code);
              validateField("country");
            }}
            error={touched.country && errors.country}
            onBlur={() => setFieldTouched("country")}
          />
          <CustomInput
            ref={(el) => (inputRefs.current["state"] = el)}
            placeholder={"State"}
            value={values.state}
            onChangeText={handleChange("state")}
            onBlur={handleBlur("state")}
            error={touched.state && errors.state}
            autoCapitalize="none"
            onSubmitEditing={() => handleSubmit()}
          />
          <CustomButton
            title="Save"
            className="mt-10"
            loader={loader}
            onPress={handleSubmit}
          />
        </AppLayout>
        <ConfirmationBottomSheet
          ref={confirmationBottomSheetRef}
          title="Change Information"
          description="Are you sure you want to update your account information?"
          onSubmit={handleUpdate}
        />
      </>
    )
  );
};

export default EditProfile;
