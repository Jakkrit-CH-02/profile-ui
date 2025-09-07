import { useCallback, useMemo, useState } from "react";
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
} from "@mui/material";
import { Colors, MenuGroups } from "../../lib/constants";
import { ExpandLess } from "@mui/icons-material";
import { Header } from "./Header";
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

type Props = {
  isShowSidebar: boolean;
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: 320,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
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
  width: 320,
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
  const [expandedSidebar, setExpandedSidebar] = useState(true);
  const [collapse, setCollapse] = useState<{ [key: string]: boolean }>({
    "User Management": true,
    "Room Managmemt": true,
    Contracts: true,
  });
  const location = useLocation();

  const handleSidebarOpen = useCallback(() => {
    setExpandedSidebar((s) => !s);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setExpandedSidebar(false);
  }, []);

  const getSelectSidebar = useCallback(
    (path: string) => {
      return (
        (location.pathname === "/" && path === "/contracts") ||
        location.pathname.indexOf(path) !== -1
      );
    },
    [location.pathname]
  );

  const groupMenus = useMemo(() => {
    const res = MenuGroups.map((g) => ({
      ...g,
      menuList: g.menuList,
    })).filter((g) => g.menuList?.length > 0);
    return res;
  }, []);

  const isOpenSidebar = expandedSidebar;

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
                          {`sidebar.${m.name}`
                            ? `sidebar.${m.name}`
                            : m.groupName}
                        </Typography>
                      }
                    />
                    {collapse[m.groupName] ? <ExpandLess /> : <ExpandLess />}
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
                            "&Mui-selected": {
                              backgroundColor: "#D3F7FF",
                              WebkitBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                              MozBoxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`,
                              boxShadow: `inset 4px 0px 0px 0px ${Colors.primary}`
                            },
                          }}
                          onClick={() => {
                           navigate(l.pathName)
                          }}
                          selected={getSelectSidebar(l.pathName)}>
                        </ListItemButton>
                        <ListItemText 
                        primary={
                           <Typography whiteSpace={'break-spaces'}>
                              {(`sidebar.${l.name}`) ? (`sidebar.${l.name}`) : l.text}
                           </Typography>
                        }
                        />
                      </List>
                    ))}
                  </Collapse>
                </List>
              ))}
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
         renderIcon={(
            <IconButton
            sx={{ color: 'white'}}
            onClick={handleSidebarOpen}
            aria-label="menu"
            aria-haspopup={'true'}
            edge={'start'}
            >
               <DragIndicatorRoundedIcon />
            </IconButton>
         )}
      />
      {displayDesktop()}
   </>
  )
};
