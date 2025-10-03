import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-2xl font-bold text-red-500'>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
