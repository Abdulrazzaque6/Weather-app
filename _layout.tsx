import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  useFonts({

    'outfit-bold':require('./../assets/fonts/OpenSans_Condensed-Bold.ttf'),
    'outfit-medium':require('./../assets/fonts/OpenSans_Condensed-Medium.ttf'),
    'outfit-regular':require('./../assets/fonts/OpenSans_Condensed-Regular.ttf'),
    'outfit-Italic':require('./../assets/fonts/OpenSans_SemiCondensed-Italic.ttf'),
    'outfit-MediumItalic':require('./../assets/fonts/OpenSans_SemiCondensed-MediumItalic.ttf'),
    'outfit-SemiCondensed-Bold':require('./../assets/fonts/OpenSans_SemiCondensed-Bold.ttf')
  })
  return (
    <Stack> 
      <Stack.Screen name="index" options={{
        headerShown:false
      }} />
    </Stack>
  );
}
