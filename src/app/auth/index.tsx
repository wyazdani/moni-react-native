import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import SocialLoginBtns from "@/components/social-login-btns";
import { EMAIL_REGEX } from "@/constants/regex";
import AppLayout from "@/layouts/app-layout";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import * as Yup from "yup";

type InputRefs = {
  email: TextInput | null;
  password: TextInput | null;
};

const Login = () => {
  const router = useRouter();
  const inputRefs = useRef<InputRefs>({
    email: null,
    password: null,
  });
  const handleLogin = async () => {
    // router.navigate("/(protectedScreens)/(tabs)");
  };

  let ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Enter Valid Email", (val) => EMAIL_REGEX.test(val || ""))
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Passsword must be atleast 8 characters")
      .required("Password Required"),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
    // validateOnChange:false,
    onSubmit: handleLogin,
  });

  return (
    <AppLayout
      backBtn={false}
      from="login"
      heading="Login Account"
      subHeading="Don’t have an account?"
    >
      <CustomInput
        ref={(el) => (inputRefs.current["email"] = el)}
        className="mt-16"
        placeholder={"Email"}
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email}
        autoCapitalize="none"
        onSubmitEditing={() => inputRefs.current["password"]?.focus()}
        returnKeyType={"next"}
        submitBehavior={"submit"}
      />
      <CustomInput
        className="mb-2"
        ref={(el) => (inputRefs.current["password"] = el)}
        placeholder={"Password"}
        password
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        error={touched.password && errors.password}
        autoCapitalize="none"
        onSubmitEditing={() => handleSubmit()}
        returnKeyType={"done"}
      />
      <TouchableOpacity className="self-end" hitSlop={5} onPress={() => {}}>
        <Text className="text-primary text-base font-inter-medium">
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <CustomButton title="Login" className="mt-10" />
      <SocialLoginBtns />
    </AppLayout>
  );
};

export default Login;
