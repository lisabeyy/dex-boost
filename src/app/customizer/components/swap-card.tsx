"use client";
import { SwapWidget,  darkTheme, lightTheme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useState } from 'react';
import './swap-card.css';
import { useTheme } from 'next-themes';
import { ColorType } from './Customizer';

if (typeof window !== "undefined") {
  // @ts-ignore
    window.Browser = {
      T: () => {
      }
    };
  }

type Props = {
  theme?: string;
  colors?: ColorType;
  borderRadius?: number;
  hideConnectionUI: boolean;
  disableBranding: boolean;
};



export default function SwapCard(props: Props) {
  let widgetTheme;
  const { theme } = useTheme();
  
  widgetTheme = props.theme
    ? props.theme === 'Dark'
      ? darkTheme
      : props.theme === 'Auto'
      ? theme === 'dark'
        ? darkTheme
        : lightTheme
      : lightTheme
    : lightTheme;

    widgetTheme = {
      ...widgetTheme,
      primary: props?.colors?.primary ? props?.colors?.primary : widgetTheme.primary,
      secondary: props?.colors?.secondary ? props?.colors?.secondary : widgetTheme.secondary,
      active: props?.colors?.active ? props?.colors?.active : widgetTheme.active,
      interactive: props?.colors?.interactive ? props?.colors?.interactive : widgetTheme.interactive,
      onInteractive: props?.colors?.onInteractive ? props?.colors?.onInteractive : widgetTheme.onInteractive,
      container: props?.colors?.container ? props?.colors?.container : widgetTheme.container,
      module: props?.colors?.module ? props?.colors?.module : widgetTheme.module,
      accent: props?.colors?.accent ? props?.colors?.accent : widgetTheme.accent,
      onAccent: props?.colors?.onAccent ? props?.colors?.onAccent : widgetTheme.onAccent,
      outline: props?.colors?.outline ? props?.colors?.outline : widgetTheme.outline,
      dialog: props?.colors?.dialog ? props?.colors?.dialog : widgetTheme.dialog,
      success: props?.colors?.success ? props?.colors?.success : widgetTheme.success,
      error: props?.colors?.error ? props?.colors?.error : widgetTheme.error,
      hint: props?.colors?.hint ? props?.colors?.hint : widgetTheme.hint,
    }






  return (
        <SwapWidget   theme={widgetTheme} hideConnectionUI={props.hideConnectionUI} />
      
  );
}