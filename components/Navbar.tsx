import { Avatar, AppBar, Box, Toolbar, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';

function Navbar() {
  const { user } = useUser();

  return (
    <Container>
      <AppBarContainer position="static">
        <Toolbar>
          <ToolbarText variant="h6">Todo Application</ToolbarText>
          {user ? (
            <>
              <SignUpButton variant="outlined">
                {/* this is will cause unhandle error */}
                <Link href="/api/auth/logout">
                  <a>sign out</a>
                </Link>
                {/* <a href="/api/auth/logout">sign out</a> */}
              </SignUpButton>
              <Avatar alt="Profile Photo" src={`${user.picture}`} />
            </>
          ) : (
            <Box display="flex" justifyContent="flex-end" flexGrow={1} alignItems="center">
              <SignUpButton variant="outlined">
                {/* this is will cause unhandle error */}
                <Link href="/api/auth/login?returnTo=/dashboard">
                  <a>Login</a>
                </Link>
                {/* <a href="/api/auth/login?returnTo=/dashboard">Login</a> */}
              </SignUpButton>
            </Box>
          )}
        </Toolbar>
      </AppBarContainer>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  flex-grow: 1;
  position: sticky;
`;

const AppBarContainer = styled(AppBar)`
  &&& {
    background-color: black;
  }
`;

const ToolbarText = styled(Typography)`
  flex-grow: 1;

  @media (max-width: 450px) {
    color: transparent;
  }
`;

const SignUpButton = styled(Button)`
  &&& {
    color: white;
    border: 1px solid white;
    margin-right: 10px;
  }
`;
