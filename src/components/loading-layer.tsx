import { printIntrospectionSchema } from 'graphql';
import React from 'react';
import { LoadingBackground, LoadingText } from "../utils/style"

export const LoadingLayer = (props) => {
    return(
      <LoadingBackground>
        <LoadingText>{props.text}</LoadingText>
      </LoadingBackground>
    )
  }