import Swal from "sweetalert2";

class Notification {
	simpleNotification(message: any, status: string) {
		const Toast = Swal.mixin({
			toast: true,
			position: "top",
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener("mouseenter", Swal.stopTimer);
				toast.addEventListener("mouseleave", Swal.resumeTimer);
			},
		});

		// @ts-ignore
		Toast.fire({
			icon: status,
			title: message,
		});
	}
}

const notificationService = new Notification();

export default notificationService;
