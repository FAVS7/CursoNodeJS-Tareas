const fs = require('fs');
// Listado arreglo donde se almacenan las tareas por hacer
//Simula una base de datos
let listadoPorHacer = [];

// Funcion para guardar el archivo de la base de datos
const guardarDB = () => {
    // En "data" asigno el contenido en formato JSON del arreglo "listadoPorHacer"
    //JSON.stringify me permite pasar el arreglo "listadoPorHacer" en un formato JSON
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

//Funcion para guardar las nuevas tareas en la BD (arreglo listadoPorHacer)
const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        // si el archivo data.json se encuentra vacio, entonces agregaremos "[]" para que se puedan almacenar las tareas
        listadoPorHacer = [];
    }

}


//Funcion para crear nuevas tareas
const crear = (descripcion) => {

    cargarDB();
    //Se inicializa otro objeto tipo arreglo
    let porHacer = {
        descripcion,
        completado: false
    };
    // Todo lo que se encuentra en ListadoPorHacer se lo paso a porHacer
    listadoPorHacer.push(porHacer);

    guardarDB();
    // retorno el listado porhacer
    return porHacer;

}

// Funcion para enlistar todas las tareas de la BD
const getListado = () => {
    cargarDB();
    // Solo se necesita retornar los valores de listadoPorHacer
    return listadoPorHacer;
}

// Funcion para actualizar el status de las tareas
const actualizar = (descripcion, status = true) => {

    cargarDB();
    // Itero el arreglo listadoPorHacer para buscar un item que coincida con la descripcion ingresada
    // findIndex permite iterar el arreglo
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        // Le asigno el status ingresado por el usuario a la posicion "index" del arreglo que coincide con la descripcin que ingreso el usuario
        listadoPorHacer[index].completado = status;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

// funcion para borrar tareas
const borrar = (descripcion) => {

    cargarDB();
    // Filtro un elemento del arreglo "listadoPorHacer" que no coincida con la descripcion que ingresa el usuario y lo almaceno en nuevoListado
    //filter --> Me permite filtrar todo lo que no coincide con la descripcion que el usuario ingresa
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    // Si el tamaño de los dos listados es igual significa que en el arreglo de listadoPorHacer no hubo ningun elemento que coincida con la descripcion que ingreso el usuario
    if (listadoPorHacer.length === nuevoListado.length) {
        console.log(`No se encontro la tarea ${descripcion} para borrar`);
        return false;
    } else {
        // El contenido de nuevo listado se asigna a listadoPorHacer 
        // De esta manera en el listadoPorHacer ya no se encuentra el item que el usuario ingreso a traves de la descripicion y que queria borrar
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}