import { type FC } from "react";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import { Box, styled, Toolbar, Typography } from "@mui/material";
import LogoIcon from "../../assets/react.svg";
import { IconImage } from "./IconImage";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#000",
  borderBottom: "1px solid #e0e0e0",
  backdropFilter: "blur(8px)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

type Props = {
  open: boolean;
  renderIcon: React.ReactNode;
};

export const Header: FC<Props> = ({ open, renderIcon }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexGrow={1}
          py={1}
          mx={1}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            {renderIcon}
            <Box
              onClick={() => navigate("/")}
              display={"flex"}
              alignItems={"center"}
              sx={{ cursor: "pointer", }}
            >
              <IconImage path={LogoIcon} size={38} />
              <Typography
                variant="h5"
                fontWeight={500}
                mx={1}
              >
                UI STARTER
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
