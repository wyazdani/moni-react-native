import { resendOTP, verifyOTP } from "@/api/auth";
import CustomButton from "@/components/custom-button";
import AppLayout from "@/layouts/app-layout";
import { hp, wp } from "@/utils";
import { router, useLocalSearchParams } from "expo-router";
import { cssInterop } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import Toast from "react-native-simple-toast";

type Params = {
  email: string;
};

const TIMER_INITIAL_VALUE = 60;
const CELL_COUNT = 4;

const CustomizedCodeField = cssInterop(CodeField, {
  rootClassName: "rootStyle",
});

const VerifyOtp = () => {
  const { email } = useLocalSearchParams<Params>();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(TIMER_INITIAL_VALUE);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [loader, setLoader] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) return prevTimer - 1;
        else {
          clearInterval(interval);
          return prevTimer;
        }
      });
    }, 1000);
  };

  const resend = async () => {
    setResendLoader(true);
    const res = await resendOTP({ email });
    if (res?.status == 200) {
      Toast.show("OTP resent successfully", Toast.SHORT);
      setTimer(TIMER_INITIAL_VALUE);
      startTimer();
    }
    setResendLoader(false);
  };

  const handleSubmit = async () => {
    if (value.length < CELL_COUNT) {
      setError(true);
      return;
    }
    setLoader(true);
    const res = await verifyOTP({ email, otp: value });
    if (res?.status == 200) {
      Toast.show("OTP verified", Toast.SHORT);
      router.replace({ pathname: `/auth/create-password`, params: { email } });
    }
    setLoader(false);
  };

  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 200);
    startTimer();
  }, []);

  const renderTimer = useMemo(() => {
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;
  }, [timer]);

  return (
    <AppLayout
      heading="OTP Verification"
      subHeading="Please enter your 4-digit security code"
    >
      <Text className="text-gray text-sm font-inter-medium mt-8">
        We’ve sent a verification code to your email address.
      </Text>
      <Text className="text-black text-base font-poppins-semibold mt-1">
        {email}
      </Text>

      {/* @ts-ignore */}
      <CustomizedCodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootClassName={"justify-center gap-5 mt-8"}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            className={`w-14 aspect-square rounded-2xl border border-border justify-center items-center ${
              error && !value.charAt(index) && "border-error"
            }`}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text className="text-black text-base font-inter-medium">
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <View className="flex-row justify-between items-center mt-8">
        <TouchableOpacity>
          <Text className="text-gray text-sm font-inter-medium ">
            Didn’t get it?
          </Text>
        </TouchableOpacity>
        <Text className="text-black text-sm font-inter-medium ">
          {renderTimer}
        </Text>
      </View>
      <View className="flex-row items-center mt-1">
        <TouchableOpacity
          hitSlop={5}
          onPress={resend}
          disabled={timer > 0 || resendLoader}
        >
          <Text
            className={`font-poppins-semibold text-base text-black ${
              (timer > 0 || resendLoader) && "opacity-40"
            }`}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
        {resendLoader && (
          <ActivityIndicator color={"black"} size={"small"} className="ml-1" />
        )}
      </View>
      <CustomButton
        title="Verify"
        onPress={handleSubmit}
        className="mt-10"
        loader={loader}
      />
      {/* <CommonModal
          title={Localization.success_verified[lang]}
          visible={successModal}
          handleClose={() => setSuccessModal(false)}
        />
        <CommonModal
          error
          title={Localization.account_suspended[lang]}
          title2={Localization.check_with_head_admin[lang]}
          visible={errorModal}
          handleClose={() => setErrorModal(false)}
        /> */}
    </AppLayout>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    paddingTop: hp(20),
    paddingBottom: hp(10),
    justifyContent: "space-between",
  },
  text: {
    // color: Colors.white,
    // fontSize: FontSize.m,
    // fontFamily: FontFamily.InterRegular,
    // textAlign: "center",
    // marginBottom: wp(3),
  },
  privacyPolicy: {
    color: "#37F403",
  },
  codeFieldRoot: {
    justifyContent: "center",
    marginBottom: wp(5),
  },
  cell: {
    width: wp(15),
    height: wp(16),
    marginHorizontal: wp(0.1),
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  cellIcon: {
    position: "absolute",
  },
  cellText: {
    fontSize: wp(6),
    // lineHeight: 38,
    // textAlign: "center",
    // color: Colors.white,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  resendButton: {
    padding: 5,
  },
  resendText: {
    // color: Colors.gray,
    // fontSize: FontSize.m,
    // fontFamily: FontFamily.InterRegular,
    // textDecorationLine: "underline",
  },
});
