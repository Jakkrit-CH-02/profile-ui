export const DRAWER_WIDTH = 260;
export const ACTIVE_LAYOUT_WIDTH = 330;
export const HEADER_HEIGHT = 64;
export const PADDING_LAYOUT =24;
export const MAX_FILE_SIZE = 5242880; // 5MB

export const DATE_TIME_GMT_FORMAT = 'YYYY-MM-DD HH:mm:ss Z'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DISPLAY_DATE_FORMAT = 'DD/MM/YYYY HH:mm:ss A [GMT]Z'

export enum ActionTable {
  VIEW = "view",
  EDIT = "edit",
  DELETE = "delete",
  BUTTON_DELETE = "button_delete",
  REVIEW = "review",
  CREATE = "create",
  HISTORY = "history",
  CHECKBOX = "checkbox",
}

export enum ActionMode {
   VIEW = "view",
   EDIT = "edit",
   CREATE = "create",
}

export enum StatusType {

   // AVAILABLE = "available", // ว่าง #22C55E
   // OCCUPIED = "occupied", // มีผู้เช่า #EF4444
   // RESERVED = "reserved", // จองแล้ว #F59E0B
   // MAINTENANCE = "maintenance", // ซ่อมบำรุง #8B5CF6
   // EXPIRED = "expired", // สัญญาหมดอายุ #F97316
   // TERMINATED = "terminated", // ยกเลิกสัญญา #DC2626

   AVAILABLE = "available", // ว่าง #BBF7D0 (เขียวพาสเทลเข้ม)
   OCCUPIED = "occupied", // มีผู้เช่า #FCA5A5 (แดงพาสเทลเข้ม)
   RESERVED = "reserved", // จองแล้ว #FDE68A (ส้มพาสเทลเข้ม)
   MAINTENANCE = "maintenance", // ซ่อมบำรุง #C4B5FD (ม่วงพาสเทลเข้ม)
   EXPIRED = "expired", // สัญญาหมดอายุ #FDBA74 (ส้มอ่อนเข้ม)
   TERMINATED = "terminated", // ยกเลิกสัญญา #FCA5A5 (แดงอ่อนเข้ม)
}

export const statusOptions = [
  {
    title: "All status",
    value: "",
    color: "",
    bdColor: "#",
  },
  {
    title: "Available",
    value: StatusType.AVAILABLE,
    color: "#BBF7D0",
    bdColor: "#22C55E",
  },
  {
    title: "Occupied",
    value: StatusType.OCCUPIED,
    color: "#FCA5A5",
    bdColor: "#EF4444",
  },
  {
    title: "Reserved",
    value: StatusType.RESERVED,
    color: "#FDE68A",
    bdColor: "#F59E0B",
  },
  {
    title: "Maintenance",
    value: StatusType.MAINTENANCE,
    color: "#C4B5FD",
    bdColor: "#8B5CF6",
  },
  {
    title: "Expired",
    value: StatusType.TERMINATED,
    color: "#FDBA74",
    bdColor: "#F97316",
  },
  {
    title: "Terminated",
    value: StatusType.EXPIRED,
    color: "#FCA5A5",
    bdColor: "#DC2626",
  },
];

export enum UserRole {
  onwer = "Onwer",
  admin = "Admin",
  tenant = "Tenant",

}

export { Colors } from "./Colors"
export { MenuGroups } from "./MenuGroup"