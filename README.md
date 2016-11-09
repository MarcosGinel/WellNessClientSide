# WellNessClientSide
App de cliente para la prueba de Wellness

Esta aplicación es una SPA hecha en AngularJS 1.5.8. Cumple con el requisito de la aplicación cliente usando rest. Aunque no se pedía, se ha implementado un servicio de autenticación mediante Token que guarda el token en localStorage y en "memoria" angularJS (mediante values), de forma que a pesar de ser una aplicación SPA, también permite la recarga.

Es decir, tanto el login como el logout son "reales". Faltaría por cifrar el toquen en localStorage.

El usuario admin/wellness (user/password) tiene permisos para escribir, editar, borrar y leer. El resto, sólo leer.

* Se puede realizar el alta de usuarios, su edición y borrado.
* También se puede dar de alta un precio para un día.
* Y por último, se pueden añadir "facturación" del día en función del consumo. En el propio listado de Facturación se puede elegir el periodo de facturación de los días que el usuario haya "consumido".

De cara a la interfaz he optado por usar varios componentes, aunque sólo he maquetado con Bootstrap 3, he usado la estética y controles de Bootstrap, pero también de AngularUI.Bootstrap, e incluso una ui.grid de AngularUI para mostrar que se pueden combinar perfectamente. También hay una grid hecha mediante Bootstrap. Y por último también se ha integrado AngularUI.Bootstrap, que es un wrapper sobre bootstrap que nos permite abstraernos de mucha carga de trabajo de sobre el propio framework de presentación y centrarnos sólamente en la maquetación.

Se ha incluido una gráfica con zoom para la lectura y análisis de los datos (los pocos que hay).

Además, si se ejecuta una petición a /index2.html, se realiza una precarga de datos en la BD que está en el fichero LoaderController.js, esto se podría hacer con Celery para Python-Django y haciendo una llamada a la api rest para que ejecutase el job, pero ya excedía un poco la prueba.

Me ha faltado poder servir la aplicación en AngularMaterial y en MaterializeCSS. Lo bueno de la escasa "dependencia" de las vistas con respecto a Bootstrap y AngularUI, es que se podrían diseñar en cualquier otro framework de presentación.

Se ha usado:
  * Bootstrap 3
  * AngularJS 1.5.8
  * Angular Route Segment
  * Sass para la gestión de hojas de estilos
  * Angular-UI (concretmente: ui-grid, ui-bootstrap.Modal, ui-bootstrap.Datepicker)
  * D3.js
  * C3.js
  
La aplicación ha de desplegarse en un servidor de aplicaciones y rellenar el fichero settings.js, concretamente las siguientes variables:
  * "protocol" : "http",
  * "host" : "localhost:8000"

Cambiar por lo que corresponda al servidor Django.  
