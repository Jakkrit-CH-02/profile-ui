import type { MenuGroupType } from "../@types/MenuType";
import PersonalVideoRoundedIcon from '@mui/icons-material/PersonalVideoRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
// import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
// import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
// import TopicRoundedIcon from '@mui/icons-material/TopicRounded';

export const MenuGroups: MenuGroupType[] = [
   {
      groupName: "Dashboard",
      name: "dashboard",
      mb: 2,
      menuList: [
         {
            name: "proflie",
            pathName: "/profile",
            text: "Profile",
            icon: FolderSharedRoundedIcon,
            subMenus: [],
         },
         {
            name: "overview",
            pathName: "/profile/overview",
            text: "Overview",
            icon: PersonalVideoRoundedIcon,
            subMenus: [],
         },
      ]
   },
   // {
   //    groupName: "Management",
   //    name: "management",
   //    mb: 2,
   //    menuList: [
   //       {
   //          name: "room",
   //          pathName: "/rooms",
   //          text: "Room",
   //          icon: HomeWorkRoundedIcon,
   //          subMenus: [],
   //       },
   //       {
   //          name: "contract",
   //          pathName: "/contracts",
   //          text: "Contract",
   //          icon: TopicRoundedIcon,
   //          subMenus: [],
   //       },
   //    ]
   // },
]