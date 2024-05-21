function logout(){
    Swal.fire({
        //crear prompt antes de salir
        title: "¿Estás seguro?",
        text: "Esto cerrará tu sesión actual.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, cerrar sesión"
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Sesión cerrada",
                text: "Cerraste sesión",
                icon: "success"
              });
            // Borrar los datos de sesión
            localStorage.clear();
            // Redirigir al usuario a la página de inicio
            window.location.href = 'index.html';
          
        }
      });
}