// helpers/toastNotify.js
import { toast } from "react-toastify";

export const toastNotify = (message, type = "info", position = "top-center") => {
    toast(message, { type, position });
};
