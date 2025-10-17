import { login } from "@/api/auth";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import SocialLoginBtns from "@/components/social-login-btns";
import { EMAIL_REGEX } from "@/constants/regex";
import AppLayout from "@/layouts/app-layout";
import { saveUser } from "@/redux/slices/authSlice";
import { router } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-simple-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

type InputRefs = {
  email: TextInput | null;
  password: TextInput | null;
};

type Values = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<InputRefs>({
    email: null,
    password: null,
  });

  const handleLogin = async (values?: Values) => {
    setLoader(true);
    const res = await login(values);
    if (res?.status == 200) {
      Toast.show("User logged in successfuly", Toast.SHORT);
      dispatch(saveUser(res.data))
      router.replace("/tabs");
    }
    setLoader(false);
  };

  let ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .test("email", "Enter Valid Email", (val) => EMAIL_REGEX.test(val || ""))
      .required("Email Required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password Required"),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik<Values>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: ValidationSchema,
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
        className="mt-12"
        placeholder={"Email"}
        value={values.email}
        onChangeText={handleChange("email")}
        keyboardType={"email-address"}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email}
        autoCapitalize="none"
        onSubmitEditing={() => inputRefs.current["password"]?.focus()}
        returnKeyType={"next"}
        submitBehavior={"submit"}
      />
      <CustomInput
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
      <TouchableOpacity
        className="self-end mt-1"
        hitSlop={5}
        onPress={() => router.push("/auth/forgot-password")}
      >
        <Text className="text-primary text-sm font-inter-medium">
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <CustomButton
        title="Login"
        className="mt-10"
        loader={loader}
        onPress={handleSubmit}
      />
      <SocialLoginBtns />
    </AppLayout>
  );
};

export default Login;
