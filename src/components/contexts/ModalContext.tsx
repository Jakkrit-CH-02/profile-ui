import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import {
  createContext,
  Dispatch,
  FC,
  JSX,
  memo,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import CloseIcon from "@mui/icons-material/Close";
import { OutlineButton } from "../common/Button/OutlineButton";
import { PrimaryButton } from "../common/Button/PrimaryButton";
import { useTranslation } from "react-i18next";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

type ConfirmProps<T> = {
  data?: T;
  description?: string;
  onCancel?: () => void;
  onConfirm?: (data?: T) => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonColor?: ButtonColor;
};

const Confirm = <T,>(props: ConfirmProps<T>) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }}>
        <Typography>
          {props.description ? props.description : t("common.areYousure")}
        </Typography>
      </Grid>
      <Grid
        container
        size={{ xs: 12 }}
        justifyContent={"end"}
        columnGap={2}
        mt={2}
      >
        <OutlineButton onClick={() => props.onCancel?.()}>
          {props.cancelButtonText || t("common.cancle")}
        </OutlineButton>
        <PrimaryButton
          onClick={() => {
            props.onConfirm?.(props.data);
          }}
          color={props.confirmButtonColor ?? "warning"}
        >
          {props.confirmButtonText || t("common.confirm")}
        </PrimaryButton>
      </Grid>
    </Grid>
  );
};

type ConfirmDeleteProps<T> = {
  data?: T;
  resourceName?: string;
  onCancle?: () => void;
  onConfirm?: (data?: T) => void;
};

const ConfirmDelete = <T,>(props: ConfirmDeleteProps<T>) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography>{t("common.are_you_sure_to_remove_from")}</Typography>
      </Grid>
      <Grid container size={12} justifyContent={"end"} columnGap={2} mt={2}>
        <OutlineButton
          onClick={() => {
            props.onCancle?.();
          }}
        >
          {t("common.cancle")}
        </OutlineButton>
        <PrimaryButton
          color={"warning"}
          onClick={() => {
            props.onConfirm?.(props.data);
          }}
        >
          {t("common.remove")}
        </PrimaryButton>
      </Grid>
    </Grid>
  );
};

type DisplayModalProps = {
  title: string;
  open: boolean;
  handleClose: () => void;
  component: JSX.Element;
  footerComponent?: React.ReactNode;
  paddingClass?: string;
  width?: number;
  isWarning?: boolean;
};

const DisplayModalFC: FC<DisplayModalProps> = ({
  title,
  open,
  handleClose,
  component,
  width,
  footerComponent,
  isWarning,
}) => {
  return (
    <Dialog
      fullWidth
      open={open}
      keepMounted
      sx={{
        [`& .MuiPaper-root`]: {
          minWidth: width,
          borderRadius: 5,
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        sx={{ padding: 1, backgroundColor: isWarning ? "orange" : "" }}
      >
        <Typography variant="body1" fontWeight={600} ml={1} mt={0.5}>
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />

      {component && (
        <DialogContent sx={{ padding: 3 }}>{component}</DialogContent>
      )}
      {footerComponent && <DialogActions>{footerComponent}</DialogActions>}
    </Dialog>
  );
};

const DisplayModal = memo(DisplayModalFC);

export type ModalContextType = {
  handleClose: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setTitleModal: Dispatch<SetStateAction<string>>;
  displayModal: (
    title: string,
    open: boolean,
    component: JSX.Element,
    width?: number,
    footerComponent?: React.ReactNode,
    unmountOnClose?: boolean,
    isWarning?: boolean
  ) => void;
  displayConfirmModal: <T>(
    onConfirm: (data?: T) => void,
    title?: string,
    description?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    confirmButtonColor?: ButtonColor,
    data?: T,
    width?: number
  ) => void;
  displayConfirmDeleteModal: <T>(
    onConfirm: (data?: T) => void,
    resourceName?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
  displayConfirmSubmitModal: <T>(
    onConfirm: (data?: T) => void,
    description?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
  displayConfirmSaveModal: <T>(
    onConfirm: (data?: T) => void,
    description?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
};

const ModalContext = createContext<ModalContextType>({} as ModalContextType);

type Props = {
  children?: ReactNode;
  context?: React.Context<ModalContextType>;
};

export const ModalProvider: FC<Props> = ({ children, context }) => {
  const { t } = useTranslation();
  const [titleModal, setTitleModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [component, setComponent] = useState<JSX.Element>(<></>);
  const [footerComponent, setFooterComponent] = useState<React.ReactNode>(null);
  const [widthModal, setWidthModal] = useState(0);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [isWarning, setIsWarning] = useState<boolean>(false);

  const displayModal = useCallback(
    (
      title: string,
      open: boolean,
      component: JSX.Element,
      width?: number,
      footerComponent?: React.ReactNode,
      unmountOnClose: boolean = true,
      isWarning: boolean = false
    ) => {
      setTitleModal(title);
      setOpenModal(open);
      setComponent(component);
      setWidthModal(width || 600);
      setFooterComponent(footerComponent);
      setUnmountOnClose(unmountOnClose);
      setIsWarning(isWarning);
    },
    []
  );

  const handleClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const displayConfirmModal = useCallback(
    <T,>(
      onConfirm?: (data?: T) => void,
      title?: string,
      description?: string,
      confirmButtonText?: string,
      cancelButtonText?: string,
      confirmButtonColor?: ButtonColor,
      data?: T,
      width?: number
    ) => {
      setTitleModal(title || t("common.confirm"));
      setOpenModal(true);
      setComponent(
        <Confirm
          description={description}
          data={data}
          onCancel={() => setOpenModal(false)}
          onConfirm={onConfirm}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          confirmButtonColor={confirmButtonColor}
        />
      );
      setWidthModal(width || 500);
    },
    []
  );
  const displayConfirmDeleteModal = useCallback(
    <T,>(
      onConfirm?: (data?: T) => void,
      resourceName?: string,
      data?: T,
      title?: string,
      width?: number
    ) => {
      setTitleModal(title || t("common.remove"));
      setOpenModal(true);
      setComponent(
        <ConfirmDelete
          resourceName={resourceName}
          data={data}
          onCancle={() => setOpenModal(false)}
          onConfirm={onConfirm}
        />
      );
      setWidthModal(width || 500);
    },
    []
  );
  const displayConfirmSubmitModal = useCallback(
    <T,>(
      onConfirm?: (data?: T) => void,
      description?: string,
      data?: T,
      title?: string,
      width?: number
    ) => {
      setTitleModal(title || t("common.submit"));
      setOpenModal(true);
      setComponent(
        <Confirm
          description={description || t("common.are_you_sure_to_submit_form")}
          data={data}
          onCancel={() => setOpenModal(false)}
          onConfirm={onConfirm}
          confirmButtonText={t("common.submit")}
          confirmButtonColor="primary"
        />
      );
      setWidthModal(width || 500);
    },
    []
  );
  const displayConfirmSaveModal = useCallback(
    <T,>(
      onConfirm?: (data?: T) => void,
      description?: string,
      data?: T,
      title?: string,
      width?: number
    ) => {
      setTitleModal(title || t("common.save"));
      setOpenModal(true);
      setComponent(
        <Confirm
          description={description}
          data={data}
          onCancel={() => setOpenModal(false)}
          onConfirm={onConfirm}
          confirmButtonText={t("common.save")}
          confirmButtonColor="primary"
        />
      );
      setWidthModal(width || 500);
    },
    []
  );

  const actions = useMemo(
    () => ({
      setOpenModal,
      setTitleModal,
      handleClose,
      displayModal,
      displayConfirmModal,
      displayConfirmDeleteModal,
      displayConfirmSubmitModal,
      displayConfirmSaveModal,
    }),
    [
      handleClose,
      displayModal,
      displayConfirmModal,
      displayConfirmDeleteModal,
      displayConfirmSubmitModal,
      displayConfirmSaveModal,
    ]
  );

  const mountModal = unmountOnClose ? openModal : true;

  const ctx = context ?? ModalContext;

  return (
    <ctx.Provider value={actions}>
      {mountModal && (
        <DisplayModal
          title={titleModal}
          open={openModal}
          handleClose={handleClose}
          component={component}
          width={widthModal}
          footerComponent={footerComponent}
          isWarning={isWarning}
        />
      )}
      {children}
    </ctx.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export const ModalContextExtra = createContext<ModalContextType>(
  {} as ModalContextType
);
export const useModalExtra = () => useContext(ModalContextExtra);
