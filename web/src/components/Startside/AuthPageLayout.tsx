import { Box, Stack, styled } from "@mui/material";
import { BoxProps } from "@mui/system";
import icon from "../../../public/Mappe-Screen.png";

const RightSide = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    background: "none",
    height: "100%",
    marginTop: 50,
    marginBottom: 50,
  },
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
    backgroundColor: "#2f855a",
  },
}));

const LeftSide = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "100%",
    paddingBottom: 50,
  },
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
    paddingLeft: 10,
  },
  textAlign: "center",
}));

const Logo = styled("img")<any>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    height: "200px",
  },
  [theme.breakpoints.up("sm")]: {
    height: "300px",
  },
  [theme.breakpoints.up("md")]: {
    height: "400px",
  },
}));

export const AuthPageLayout = ({ leftSideContent }: any) => {
  return (
    <Stack
      className="center"
      direction={{ xs: "column-reverse", sm: "row" }}
      sx={{
        maxHeight: "100vh",
      }}
    >
      <LeftSide
        className="left-side-auth-page"
        sx={{
          py: 2,
        }}
      >
        {leftSideContent}
      </LeftSide>
      <RightSide className="center right-side-auth-page">
        <Logo src={icon} alt="Learnify" className="icon-image" />
      </RightSide>
    </Stack>
  );
};
