import { TOAST_VARIANT } from '../config/toasts.config';

export type ToastVariant = (typeof TOAST_VARIANT)[number];

export interface IToast {
  id: string;
  message: string;
  variant: ToastVariant;
}

export type OpenToastDto = Pick<IToast, 'message'>;

export type ToastActionsHandler = Record<ToastVariant, (message: string) => void>;
