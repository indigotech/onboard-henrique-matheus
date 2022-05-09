import React from 'react';
import { LoadingBackground, LoadingText } from "../utils/style"

export const LoadingLayer = () => {
    return(
      <LoadingBackground>
        <LoadingText>Realizando login...</LoadingText>
      </LoadingBackground>
    )
  }