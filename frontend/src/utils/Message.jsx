import {toast} from "react-toastify";

const Message = (message,type,timeout) => {
    switch (type){
        case 'info':
            return toast.info(message,{theme: "light",autoClose:timeout})
        case 'success':
            return toast.success(message,{theme: "light",autoClose:timeout})
        case 'warning':
            return toast.warning(message,{theme: "light",autoClose:timeout})
        case 'error':
            return toast.error(message,{theme: "light",autoClose:timeout})
        default:
            return toast(message,{autoClose:timeout})
    }
};

export default Message;