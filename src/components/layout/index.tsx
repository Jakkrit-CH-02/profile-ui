import { Box, styled } from "@mui/material";
import { Fragment, useEffect, useState, type FC, type ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { Sidebar } from "../common/Sidebar";

type Props = {
  children?: ReactNode;
  isShowSidebar?: boolean;
};

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{
  isMobile?: boolean;
}>(({ theme, isMobile }) => ({
  flexGrow: 1,
  marginTop: 64,
  width: isMobile ? "100%" : `calc(100% - ${320}px)`,
  backgroundColor: "#F4F7FA",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const MainWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isMobile",
})<{
  isMobile?: boolean;
}>(({ isMobile }) => ({
  padding: 24,
  paddingBottom: isMobile ? 284 : 20,
}));

const MainLayout: FC<{
  isMobile: boolean;
  children: ReactNode;
}> = ({ isMobile, children }) => {
  const [isShowPadding, setIsShowPadding] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsShowPadding(false);
  }, [location.pathname]);

  return (
    <MainWrapper isMobile={isMobile && isShowPadding}>{children}</MainWrapper>
  );
};

export const Layout = ({ isShowSidebar = true }: Props) => {
  const { isMobile } = useWindowSize();

  return (
    <Fragment>
      <Box display={"flex"} minHeight={"100vh"}>
        <Sidebar isShowSidebar={isShowSidebar} />
        <Main isMobile={isMobile}>
          <MainLayout isMobile={isMobile}>
            <Outlet />
          </MainLayout>
        </Main>
      </Box>
    </Fragment>
  );
};
