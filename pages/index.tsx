import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Todo Application</title>
      </Head>
      <MainBody>
        <Typography variant="h3" gutterBottom>
          ToDo management web application
        </Typography>
      </MainBody>
    </div>
  );
};

export default Home;

const MainBody = styled(Grid)`
  &&& {
    width: auto;
    height: 80vh;
    align-items: center;
    justify-content: center;
    display: flex;
  }
`;
