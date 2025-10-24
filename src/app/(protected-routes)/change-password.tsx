import { changePasswordApi } from "@/api/users";
import ConfirmationBottomSheet from "@/bottom-sheets/confirmation-bottom-sheet";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import AppLayout from "@/layouts/app-layout";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";

type InputRefs = {
  old_password: TextInput | null;
  new_password: TextInput | null;
  confirm_password: TextInput | null;
};

type Values = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const ChangePassword = () => {
  const [loader, setLoader] = useState(false);
  const confirmationBottomSheetRef = useRef<BottomSheet | null>(null);
  const inputRefs = useRef<InputRefs>({
    old_password: null,
    new_password: null,
    confirm_password: null,
  });

  let ValidationSchema = Yup.object().shape({
    old_password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Old Password Required"),
    new_password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("New Password Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Confirm password does not match")
      .required("Confirm Password Required"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<Values>({
      initialValues: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      validationSchema: ValidationSchema,
      onSubmit: () => {
        Keyboard.dismiss();
        confirmationBottomSheetRef.current?.expand();
      },
    });

  const handleChangePassword = async () => {
    setLoader(true);
    const { old_password, new_password } = values;
    const res = await changePasswordApi({ old_password, new_password });
    if (res?.status == 200) {
      Toast.show("Password changed successfully", Toast.SHORT);
      router.back();
    }
    setLoader(false);
  };

  return (
    <>
      <AppLayout title="Change Password">
        <CustomInput
          ref={(el) => (inputRefs.current["new_password"] = el)}
          placeholder={"Old Password"}
          password
          value={values.old_password}
          onChangeText={handleChange("old_password")}
          onBlur={handleBlur("old_password")}
          error={touched.old_password && errors.old_password}
          autoCapitalize="none"
          onSubmitEditing={() => inputRefs.current["confirm_password"]?.focus()}
          returnKeyType={"next"}
          submitBehavior={"submit"}
        />
        <CustomInput
          ref={(el) => (inputRefs.current["new_password"] = el)}
          placeholder={"New Password"}
          password
          value={values.new_password}
          onChangeText={handleChange("new_password")}
          onBlur={handleBlur("new_password")}
          error={touched.new_password && errors.new_password}
          autoCapitalize="none"
          onSubmitEditing={() => inputRefs.current["confirm_password"]?.focus()}
          returnKeyType={"next"}
          submitBehavior={"submit"}
        />
        <CustomInput
          ref={(el) => (inputRefs.current["confirm_password"] = el)}
          placeholder={"Confirm Password"}
          password
          value={values.confirm_password}
          onChangeText={handleChange("confirm_password")}
          onBlur={handleBlur("confirm_password")}
          error={touched.confirm_password && errors.confirm_password}
          autoCapitalize="none"
          onSubmitEditing={() => handleSubmit()}
          returnKeyType={"done"}
        />
        <CustomButton
          title="Submit"
          className="mt-10"
          loader={loader}
          onPress={handleSubmit}
        />
      </AppLayout>
      <ConfirmationBottomSheet
        ref={confirmationBottomSheetRef}
        title="Change Password"
        description="Are you sure, you want to change your password of your account? If yes then you have to login your account again."
        onSubmit={handleChangePassword}
      />
    </>
  );
};

export default ChangePassword;
