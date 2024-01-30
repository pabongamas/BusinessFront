import Swal from 'sweetalert2'
import { SweetAlertOptions } from 'sweetalert2';
import { buttonsClasses } from '../models/ButtonClasses.model';

const objByDefaultAlertSwal={
    title: ``,
    text: "",
    icon: "",
    showCancelButton: true,
    confirmButtonText: "",
    buttonsStyling: false,
    customClass: {
      cancelButton:buttonsClasses.buttons.cancel,
      confirmButton:buttonsClasses.buttons.confirm,
      title:buttonsClasses.texts.title
    }
  };

function SuccessErrorToast(msg: any, type: 'error' | 'success') {
    if (type === 'error') {
        Swal.fire({
            title: 'Error!',
            text: msg,
            icon: 'error',
            confirmButtonText: 'OK',
            buttonsStyling: false,
            customClass: {
                cancelButton: buttonsClasses.buttons.cancel,
                confirmButton:buttonsClasses.buttons.confirm,
                title: buttonsClasses.texts.title
            }
        })
    } else if (type === "success") {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            buttonsStyling: true,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: msg
        });
    }

}
function fireActionSwal(objByDefaultAlertSwal:any|SweetAlertOptions){
    const fire=Swal.fire(objByDefaultAlertSwal)
    return fire;
}

export {Swal,SuccessErrorToast,objByDefaultAlertSwal,fireActionSwal}