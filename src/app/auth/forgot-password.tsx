import { forgotPassword } from "@/api/auth";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { EMAIL_REGEX } from "@/constants/regex";
import AppLayout from "@/layouts/app-layout";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";

type InputRefs = {
  email: TextInput | null;
};

type Values = {
  email: string;
};

const ForgotPassword = () => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<InputRefs>({
    email: null,
  });

  const handleForgot = async (values: Values) => {
    setLoader(true);
    const res = await forgotPassword({ email: values.email });
    if (res?.status == 200) {
      Toast.show("OTP sent to your email", Toast.SHORT);
      router.navigate({ pathname: "/auth/verify-otp", params: { from: "forgot-password", email: values.email } });
    }
    setLoader(false);
  };

  let ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Enter Valid Email", (val) => EMAIL_REGEX.test(val || ""))
      .required("Email Required"),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik<Values>({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: handleForgot,
  });

  return (
    <AppLayout
      heading="Forgot Password"
      subHeading="Enter your registered email to receive the OTP"
    >
      <CustomInput
        className="mt-12"
        ref={(el) => (inputRefs.current["email"] = el)}
        placeholder={"Email"}
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email}
        autoCapitalize="none"
        onSubmitEditing={() => handleSubmit()}
        returnKeyType={"done"}
      />
      <CustomButton title="Submit" className="mt-10" loader={loader} onPress={handleSubmit} />
    </AppLayout>
  );
};

export default ForgotPassword;
