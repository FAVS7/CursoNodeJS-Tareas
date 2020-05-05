## Aplicación de comandos

Esta es una aplicacion de consola, cuenta con archivo JSON que simula una base de datos, en este archivo se pueden agregar tareas.
El contenido del archivo(tareas) cuenta con un status binario llamado completado, entonces el status "completado" puede ser false o verdadero.
Las acciones que se pueden hacer con el contenido del archivo json son crear nuevas tareas, enlistar las tareas, cambiar el status y borrar tareas.
Las maneras de correr esta aplicacion por consola son:
  
##### Crear una nueva tarea, enlistar las tareas, modificar el status y borrar tareas.
* node app crear -d "Nombre de la tarea" 
* node app listar -d "todo"
* node app actualizar -d "nombre de la tarea" -c "true o false"  --> de no tener el status c; sera true por default
* node borrar -d "nombre de la tarea"

