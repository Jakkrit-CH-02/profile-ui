import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer as MuiDrawer,
  ListItemButton,
  type Theme,
  type CSSObject,
  Collapse,
  styled,
  CssBaseline,
  Toolbar,
  List,
  ListItemText,
  Typography,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import { Colors, DRAWER_WIDTH } from "../../lib/constants";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Header } from "./Header";
import { useWindowSize } from "../../lib/hooks/useWindowSize";
import { MenuGroups } from "../../lib/constants/MenuGroup";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import { useTranslation } from "react-i18next";

type Props = {
  isShowSidebar: boolean;
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  [theme.breakpoints.up("sm")]: {
    width: 0,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  height: "100%",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const Sidebar = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t: __ } = useTranslation()
  const { isMobile } = useWindowSize();
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [drawerMobile, setDrawerMobile] = useState(true);
  const [collapse, setCollapse] = useState<{ [key: string]: boolean }>({
    "Dashboard": true,
    "Management": true,
  });

  const groupMenus = useMemo(() => {
    const res = MenuGroups.map((g) => ({
      ...g,
      menuList: g.menuList,
    })).filter((g) => g.menuList?.length > 0);
    return res;
  }, []);

  useEffect(() => {
    if (isMobile) {
      setDrawerMobile(false);
    }
  }, [isMobile]);

  const handleSidebarOpen = useCallback(() => {
    if (isMobile) {
      setDrawerMobile((s) => !s);
    } else {
      setExpandedSidebar((s) => !s);
    }
  }, [isMobile]);

  const handleSidebarClose = useCallback(() => {
    if (isMobile) {
      setDrawerMobile(false);
    } else {
      setExpandedSidebar(false);
    }
  }, [isMobile]);

  const getSelectedSidebar = useCallback(
    (path: string) => {
      return (
        (location.pathname === "/" && path === "/dashboard") ||
        location.pathname.indexOf(path) !== -1
      );
    },
    [location.pathname]
  );

  const isOpenSidebar = !isMobile && expandedSidebar;

  const displayMobile = () => {
    return (
      <MuiDrawer
        open={isMobile && drawerMobile}
        anchor={'left'}
        onClose={() => setDrawerMobile(false)}
        sx={{
          [`& .MuiDrawer=paper`]: {width: DRAWER_WIDTH, boxSizing: 'border-box'}
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          {groupMenus.map(m => (
            <List
              key={m.groupName}
              id={`group-menu-${m.name}`}
              sx={{ width: '100%', maxWidth: DRAWER_WIDTH, bgcolor: 'background.paper'}}
              component={'nav'}
            >
              <ListItemButton>
                <ListItemText
                  primary={
                    <Typography color={'primary'} style={{ fontWeight: 'bold' }}>
                      {__(`sidebar.${m.name}`, { defaultValue: m.groupName })}
                    </Typography>
                  }
                />
                {collapse[m.groupName] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={collapse[m.groupName]} timeout={'auto'} unmountOnExit>
                  {m.menuList.map(l => (
                    <List component={'div'} disablePadding key={l.name} id={`sub-menu-${l.name}`}>
                      <ListItemButton
                        sx={{
                          pl: 2,
                          '&.Mui-selected': {
                            backgroundColor: "#D3F7FF",
                            WebkitBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                            MozBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                            boxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`
                          },
                        }}
                        onClick={() => {
                        navigate(`${l.pathName}`)
                        handleSidebarClose()
                        }}
                        selected={getSelectedSidebar(l.pathName)}                      
                        >
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <l.icon />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography style={{ fontSize: 13 }}>
                              {__(`sidebar.${l.name}`, { defaultValue: l.text })}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </List>
                  ))}
              </Collapse>
            </List>
          ))}
        </Box>

      </MuiDrawer>
    )
  }

  const displayDesktop = () => {
    return (
      <Box display={!props.isShowSidebar ? "none" : undefined}>
        <CssBaseline />
        <Drawer open={isOpenSidebar} variant="permanent">
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            height={"100%"}
          >
            <Box>
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                {groupMenus.map((m) => (
                  <List
                    key={m.groupName}
                    id={`group-menu-${m.name}`}
                    component={"nav"}
                  >
                    <ListItemButton
                      onClick={() =>
                        setCollapse({
                          ...collapse,
                          [m.groupName]: !collapse[m.groupName],
                        })
                      }
                    >
                      <ListItemText
                        primary={
                          <Typography color={"primary"} fontWeight={"bold"}>
                            {__(`sidebar.${m.name}`, { defaultValue: m.groupName })}
                          </Typography>
                        }
                      />
                      {collapse[m.groupName] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={collapse[m.groupName]}
                      timeout={"auto"}
                      unmountOnExit
                    >
                      {m.menuList.map((l) => (
                        <List
                          component={"div"}
                          disablePadding
                          key={l.name}
                          id={`sub-menu-${l.name}`}
                        >
                          <ListItemButton
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "#D3F7FF",
                                WebkitBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                                MozBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                                boxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                              },
                            }}
                            onClick={() => {
                              navigate(l.pathName);
                            }}
                            selected={getSelectedSidebar(l.pathName)}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <l.icon/>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography whiteSpace={"break-spaces"}>
                                  {__(`sidebar.${l.name}`, { defaultValue: l.text })}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </List>
                      ))}
                    </Collapse>
                  </List>
                ))}
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  };

  return (
    <>
      <Header
        open
        renderIcon={
          <IconButton
            sx={{ color: "back" }}
            onClick={handleSidebarOpen}
            aria-label="menu"
            aria-haspopup={"true"}
            edge={"start"}
          >
            <DragIndicatorRoundedIcon />
          </IconButton>
        }
      />
      {displayMobile()}
      {displayDesktop()}
    </>
  );
};
