import { createPassword } from "@/api/auth";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import AppLayout from "@/layouts/app-layout";
import { router, useLocalSearchParams } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";

type InputRefs = {
  new_password: TextInput | null;
  confirm_password: TextInput | null;
};

type Values = {
  new_password: string;
  confirm_password: string;
};

type Params = {
  email: string;
};

const CreatePassword = () => {
  const { email } = useLocalSearchParams<Params>();
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<InputRefs>({
    new_password: null,
    confirm_password: null,
  });
  const handleCreate = async (values: Values) => {
    setLoader(true);
    const res = await createPassword({ email, password: values.new_password });
    if (res?.status == 200) {
      Toast.show("Password created successfully", Toast.SHORT);
      router.replace("/auth");
    }
    setLoader(false);
  };

  let ValidationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password Required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Confirm password does not match")
      .required("Confirm Password Required"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<Values>({
      initialValues: {
        new_password: "",
        confirm_password: "",
      },
      validationSchema: ValidationSchema,
      onSubmit: handleCreate,
    });

  return (
    <AppLayout
      heading="Create Password"
      subHeading="Secure your account with a new password"
    >
      <CustomInput
        ref={(el) => (inputRefs.current["new_password"] = el)}
        className="mt-12"
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
  );
};

export default CreatePassword;
