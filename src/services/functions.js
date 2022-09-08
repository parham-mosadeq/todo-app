import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toasterSuccess = (txt, direction) => {
  toast.success(txt, {
    position: direction,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const toasterWarning = (txt, direction) => {
  toast.warning(txt, {
    position: direction,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const toasterError = (txt, direction) => {
  toast.error(txt, {
    position: direction,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

export const getLocalStorage = () => {
  let data = localStorage.getItem('todosItems');
  if (data) {
    return JSON.parse(data);
  } else {
    return 'something went wrong';
  }
};
