import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

type Props = {}

export default function Settings (props: Props)  {
  return (
    <View>
      <Text>Settings</Text>
      <Link href={'/'}>
      Back to home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({})