import React, { useRef, useEffect } from "react";
import LottieView from 'lottie-react-native';
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
    const navigation = useNavigation()
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (

        <View style={{ flex: 1, backgroundColor: "#A6038B", justifyContent: "center", alignItems: "center" }}>
            <LottieView
                autoPlay
                loop={false}
                onAnimationFinish={() => navigation.navigate('Home')}
                ref={animation}
                style={{

                    backgroundColor: '#A6038B',
                }}

                source={require('../../assets/splash.json')}
            />
        </View>
    );
}
