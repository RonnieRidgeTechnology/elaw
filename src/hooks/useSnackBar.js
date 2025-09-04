import { notification } from "antd";

export const useSnackBar = () => {
  const success = (message, description) => {
    notification.success({
      message,
      description,
      placement: "bottomRight",
    });
  };

  const error = (message, description) => {
    notification.error({
      message,
      description,
      placement: "bottomRight",
    });
  };

  const info = (message, description) => {
    notification.info({
      message,
      description,
      placement: "bottomRight",
    });
  };

  const warning = (message, description) => {
    notification.warning({
      message,
      description,
      placement: "bottomRight",
    });
  };

  return { success, error, info, warning };
};
