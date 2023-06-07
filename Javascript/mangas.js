const request = new XMLHttpRequest();
request.open('GET', 'https://api.jikan.moe/v4/anime', true);

request.onload = function () {
  if (request.status >= 200 && request.status < 400) {

    const data = JSON.parse(this.response);
    
    const contenedor = document.getElementById('contenedor');
    contenedor.setAttribute('class', 'card-columns');
    
    data.data.forEach((pelicula) => {
      
      // Creamos una tarjeta
      const tarjeta = document.createElement('div');
      tarjeta.setAttribute('class', 'card');

      // Creamos la cabecera y el cuerpo de la tarjeta
      const cabeceraTarjeta = document.createElement('div');
      cabeceraTarjeta.setAttribute('class', 'card-header');

      const cuerpoTarjeta = document.createElement('div');
      cuerpoTarjeta.setAttribute('class', 'card-body');

      // Creamos el encabezado y le asignamos el título de la película
      const titulo = document.createElement('h5');
      titulo.setAttribute('class', 'card-title');
      titulo.textContent = pelicula.title;

      //Creamos la imagen de la tarjeta
      const imagenTarjeta = document.createElement('img');
      imagenTarjeta.setAttribute('class', 'card-img-top');
      imagenTarjeta.src = pelicula.images.jpg.image_url;

      // Creamos el párrafo y le asignamos la descripción de la película
      pelicula.descripcion = pelicula.synopsis.substring(0, 250);

      const descripcion = document.createElement('p');
      descripcion.setAttribute('class', 'card-text');
      descripcion.textContent = `${ pelicula.descripcion }...`;

      // Agregamos la tarjeta
      contenedor.appendChild(tarjeta);

      // Agregamos la cabecera, el cuerpo y la imagen de la tarjeta
      tarjeta.appendChild(imagenTarjeta);
      tarjeta.appendChild(cabeceraTarjeta);
      tarjeta.appendChild(cuerpoTarjeta);

      // Agregamos el título a la cabecera
      cabeceraTarjeta.appendChild(titulo);
      
      // Agregamos la descripción al cuerpo
      cuerpoTarjeta.appendChild(descripcion);

    });
  } else {

    //Generamos una advertencia en caso de que no retorne valor alguno desde el API
    const contenedor = document.getElementById('contenedor');
    const mensajeError = document.createElement('div');

    mensajeError.setAttribute('class', 'alert alert-danger');
    mensajeError.textContent = `Ha ocurrido un error con código ${request.status}`;

    contenedor.appendChild(mensajeError);
  }
}

request.send();
