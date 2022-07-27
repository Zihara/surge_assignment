import {toast} from "react-toastify";

const Message = (message,type,timeout,position) => {
    switch (type){
        case 'info':
            return toast.info(message,{theme: "light",autoClose:timeout,position:position})
        case 'success':
            return toast.success(message,{theme: "light",autoClose:timeout,position:position})
        case 'warning':
            return toast.warning(message,{theme: "light",autoClose:timeout,position:position})
        case 'error':
            return toast.error(message,{theme: "light",autoClose:timeout,position:position})
        default:
            return toast(message,{autoClose:timeout})
    }
};

export default Message;