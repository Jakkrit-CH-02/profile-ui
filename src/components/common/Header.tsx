import { useState, type FC } from "react";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import { useNavigate } from "react-router-dom";
import th from "/src/assets/icons/thailand.png";
import en from "/src/assets/icons/united-kingdom.png";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoIcon from "../../assets/react.svg";
import { IconImage } from "./IconImage";

const languages = [
  { code: "en", name: "English", icon: en },
  { code: "th", name: "Thai", icon: th },
];

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const openSelectLang = Boolean(anchorEl);
  console.log(currentLang.icon);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLang = (lang: (typeof languages)[0]) => {
    setCurrentLang(lang);
    setAnchorEl(null);
    // TODO: call i18n.changeLanguage(lang.code) ถ้าใช้ i18next
  };

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
              sx={{ cursor: "pointer" }}
            >
              <IconImage path={LogoIcon} size={38} />
              <Typography variant="h5" fontWeight={500} mx={1}>
                PROFILE
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
              <Avatar
                src={`${currentLang.icon}`}
                alt={currentLang.name}
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={openSelectLang}
              onClose={handleClose}
              sx={{ mt: 1 }}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.code}
                  onClick={() => handleSelectLang(lang)}
                >
                  <ListItemIcon>
                    <img
                      src={lang.icon}
                      alt={lang.name}
                      width="20"
                      height="15"
                    />
                  </ListItemIcon>
                  <ListItemText primary={lang.name} />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
