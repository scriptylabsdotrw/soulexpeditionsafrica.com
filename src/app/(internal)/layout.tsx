/* This file is the Payload admin's root layout — it bypasses the marketing-site layout
   so the admin UI gets its own HTML shell. Do not import marketing components here. */

import config from '@payload-config';
import '@payloadcms/next/css';
import {
  handleServerFunctions,
  RootLayout,
} from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';
import React from 'react';

import { importMap } from './admin/importMap.js';

import './custom.scss';

type Args = { children: React.ReactNode };

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
