
export type Menu = {
   name: string
   text: string
   icon?: string
   path: string
   breadcrumbs: string[]
   breadcrumbLinks: string[]
   active: boolean
}

export type MenuType = {
   name: string
   pathName: string
   text: string
   icon: any // TODO: Fix type to be more specific for MUI icons
   subMenus: MenuType[]
   isCollapse?: boolean
   // roles?: Role[]
   // permissions?: PermissiosAction[]
}

export type MenuGroupType = {
   groupName: string
   name: string
   my?: number
   mb?: number
   menuList: MenuType[]
   // roles: Role[]
   // permissions: PermissionAction[]
}