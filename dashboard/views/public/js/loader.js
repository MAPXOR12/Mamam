
f



function reloading(){
return {
  '<div id="preloader"><div class="container"><div class="lds-facebook"><div></div><div></div><div> </div> </div></div></div><script>var loader = document.getElementById("preloader");window.addEventListener("load", function () {});</script>'
}
  
}


function MyLoader(Where, GetNeeded = null ,ID) {
  
  
  


  
	$("main").html(reloading());
  

     $("main").load(Where + '', GetNeeded, function (responseText, statusText, xhr) {
       
       
          if (xhr.status == 200) {
               if (GetNeeded == null) {
                    window.history.pushState('obj', '', Where);
               } else {
                    window.history.pushState('obj', '', Where + '?' + GetNeeded);
               }
          } else if (xhr.status == 500) {
			const Toast = Swal.mixin({
			toast: true,
			position: 'bottom',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
			toast: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
			})
			Toast.fire({
			icon: 'error',
			title: 'ERROR 500: A server error occurred',
			})
			setTimeout(() => { MyLoader('/'); }, 2000);
          } else if (xhr.status == 404) {
			const Toast = Swal.mixin({
			toast: true,
			position: 'bottom',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
			toast: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
			})
			Toast.fire({
			icon: 'error',
			title: 'ERROR 404: The requested page was not found',
			})
			setTimeout(() => { MyLoader('/'); }, 2000);
          } else if (xhr.status == 503) {
			const Toast = Swal.mixin({
			toast: true,
			position: 'bottom',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
			toast: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
			})
			Toast.fire({
			icon: 'error',
			title: 'ERROR 503: Service Unavailable',
			})
			setTimeout(() => { MyLoader('/'); }, 2000);
          } else {
			const Toast = Swal.mixin({
			toast: true,
			position: 'bottom',
			showConfirmButton: false,
			timer: 5000,
			timerProgressBar: true,
			toast: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
			})
			Toast.fire({
			icon: 'error',
			title: 'ERROR 503: An unknown error has occurred',
			})
			setTimeout(() => { MyLoader('/dashboard'); }, 2000);
          }
     });
        }