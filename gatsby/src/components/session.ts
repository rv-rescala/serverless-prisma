import React, { useRef, useState, forwardRef, useImperativeHandle, Component, useEffect } from 'react';

export type User = {
    username: string;
    cognitoId: string;
    groups: string[];
};

export const isBrowser = () => typeof window !== 'undefined';

export const getUser = (): User =>
  isBrowser() && window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {};

export const setUser = (user: User) => window.localStorage.setItem('user', JSON.stringify(user));
