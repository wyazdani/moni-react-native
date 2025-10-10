import { register } from "@/api/auth";
import CustomButton from "@/components/custom-button";
import CustomDropdown from "@/components/custom-dropdown";
import CustomInput from "@/components/custom-input";
import SocialLoginBtns from "@/components/social-login-btns";
import { EMAIL_REGEX } from "@/constants/regex";
import AppLayout from "@/layouts/app-layout";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import Toast from "react-native-simple-toast";
import * as Yup from "yup";

const COUNTRIES = [
  {
    name: "Pakistan",
    code: "pk",
  },
  {
    name: "India",
    code: "in",
  },
  {
    name: "America",
    code: "us",
  },
  {
    name: "United Kingdom",
    code: "uk",
  },
  {
    name: "Ireland",
    code: "ir",
  },
  {
    name: "United Arab Emirates",
    code: "uae",
  },
];

const WHERE_DID_HEAR_LIST = [
  {
    name: "Google",
  },
  {
    name: "Facebook",
  },
  {
    name: "Instagram",
  },
  {
    name: "Other",
  },
];

type InputRefs = {
  first_name: TextInput | null;
  last_name: TextInput | null;
  email: TextInput | null;
  state: TextInput | null;
};

type Values = {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  state: string;
  where_did_hear: string;
};

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<InputRefs>({
    first_name: null,
    last_name: null,
    email: null,
    state: null,
  });

  const handleSignup = async (values: Values) => {
    setLoader(true);
    const res = await register(values);
    if (res?.status == 201) {
      Toast.show("Account created. Verify OTP to continue", Toast.SHORT);
      router.navigate({
        pathname: "/auth/verify-otp",
        params: { email: values.email },
      });
    }
    setLoader(false);
  };

  let ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name Required"),
    last_name: Yup.string().required("Last Name Required"),
    email: Yup.string()
      .test("email", "Enter Valid Email", (val) => EMAIL_REGEX.test(val || ""))
      .required("Email Required"),
    country: Yup.string().required("Select Country"),
    state: Yup.string().required("State Required"),
  });

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
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      country: "",
      state: "",
      where_did_hear: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: handleSignup,
  });

  return (
    <AppLayout
      from="signup"
      heading="Register Account"
      subHeading="Already have an account?"
    >
      <CustomInput
        ref={(el) => (inputRefs.current["first_name"] = el)}
        className="mt-8"
        placeholder={"First Name"}
        value={values.first_name}
        onChangeText={handleChange("first_name")}
        onBlur={handleBlur("first_name")}
        error={touched.first_name && errors.first_name}
        autoCapitalize="none"
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
        autoCapitalize="none"
        onSubmitEditing={() => inputRefs.current["email"]?.focus()}
        returnKeyType={"next"}
        submitBehavior={"submit"}
      />
      <CustomInput
        ref={(el) => (inputRefs.current["email"] = el)}
        placeholder={"Email"}
        value={values.email}
        onChangeText={handleChange("email")}
        onBlur={handleBlur("email")}
        error={touched.email && errors.email}
        autoCapitalize="none"
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
      />
      <CustomDropdown
        placeholder="Where did you hear about Moni?"
        data={WHERE_DID_HEAR_LIST}
        labelField={"name"}
        valueField={"name"}
        value={values.where_did_hear}
        onChange={(item) => {
          setFieldValue("where_did_hear", item.name);
        }}
        error={touched.where_did_hear && errors.where_did_hear}
        onBlur={() => setFieldTouched("where_did_hear")}
      />
      <CustomButton
        title="Register"
        className="mt-10"
        loader={loader}
        onPress={handleSubmit}
      />
      <SocialLoginBtns />
    </AppLayout>
  );
};

export default Signup;
