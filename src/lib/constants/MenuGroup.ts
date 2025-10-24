import type { MenuGroupType } from "../@types/MenuType";
import PersonalVideoRoundedIcon from '@mui/icons-material/PersonalVideoRounded';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import TopicRoundedIcon from '@mui/icons-material/TopicRounded';

export const MenuGroups: MenuGroupType[] = [
   {
      groupName: "Dashboard",
      name: "dashboard",
      mb: 2,
      menuList: [
         {
            name: "overview",
            pathName: "/dashboard/overview",
            text: "Overview",
            icon: PersonalVideoRoundedIcon,
            subMenus: [],
         },
         {
            name: "analytics",
            pathName: "/dashboard/analytics",
            text: "Analytics",
            icon: EqualizerRoundedIcon,
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
   //          name: "",
   //          pathName: "/",
   //          text: "",
   //          icon: null,
   //          subMenus: [],
   //       },
   //       {
   //          name: "",
   //          pathName: "/",
   //          text: "",
   //          icon: null,
   //          subMenus: [],
   //       },
   //    ]
   // },
]