import React from 'react';
import Head from 'next/head';
import db from '../../../db.json';

const Header = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Head>
    <title>Alura Quiz Hiimgui</title>
    <meta property="og:title" content="hiimguiquizz" key="title" />
    <meta property="og:image" content={db.bg} />
  </Head>
);
export default Header;
