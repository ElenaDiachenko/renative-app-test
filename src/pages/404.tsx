import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'next/router';
import { commonStyles, palette } from '../styles';

export default function Page() {
  const router = useRouter();
  return (
    <View style={[commonStyles.container, { paddingTop: 150 }]}>
      <Text style={commonStyles.title}>404 - Page Not Found</Text>
      <Text style={{ ...commonStyles.text, fontSize: 24 }}>
        Sorry, there is nothing to see here
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ ...commonStyles.text, fontSize: 24 }}>Go To </Text>
        <TouchableOpacity
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
        >
          <Text
            style={{
              color: palette.accentColor,
              fontSize: 24,
              textDecorationLine: 'underline',
            }}
          >
            Homepage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
