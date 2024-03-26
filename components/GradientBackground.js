import React, { useState } from 'react';
import { Svg, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { View, Animated } from 'react-native';

const GradientBackground = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scaleValue = new Animated.Value(1);

  const handleHoverIn = () => {
    setIsHovered(true);
    Animated.spring(scaleValue, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <Svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            {/* <Stop offset="0" stopColor={isHovered ? '#2E7D32' : '#4CAF50'} /> */}
            {/* <Stop offset="1" stopColor={isHovered ? '#4CAF50' : '#2E7D32'} /> */}
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <View
        onTouchStart={handleHoverIn}
        onTouchEnd={handleHoverOut}
        style={{ flex: 1 }}
      >
        {children}
      </View>
    </View>
  );
};

export default GradientBackground;
