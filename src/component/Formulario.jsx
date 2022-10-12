import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [edad, setEdad] = useState('');
    const [profesion, setProfesion] = useState('');
    const [telefono, setTelefono] = useState('');
    
    const [lista, setLista] = useState([])


    useEffect(() => {

        const obtenerDatos = async () => {    
          try {
            await onSnapshot(collection(db, "list"), (querySnapshot) => {    
              setLista(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
          } catch (error) {
            console.log(error);
          }
        };
        obtenerDatos();
      }, []);


    const eliminar = async id => {
        console.log(id)
        try{
            await deleteDoc(doc(db,'list',id))
        }catch(error){
            console.log(error)
        }
    }
    const guardarEmpleados = async (e) =>{
        e.preventDefault()
        if(!nombre.trim()){
            alert('ingrese el nombre de la nombre')
            return
        }
        if(!apellidos.trim()){
            alert('ingrese la apellidos')
            return
        }
        if(!edad.trim()){
            alert('ingrese la edad del empleado')
            return
        }
        if(!profesion.trim()){
            alert('ingrese la profesión')
            return
        }
        if(!telefono.trim()){
            alert('ingrese el numero de telefono')
            return
        }

        try{   
            const data = await addDoc(collection(db,'list'),{
                
                namenombre: nombre,
                nameapellidos: apellidos,
                nameedad: edad,
                nameprofesion: profesion,
                nametelefono: telefono
            })

            setLista([
                ...lista,
                {namenombre:nombre, nameapellidos:apellidos, nameedad: edad, nameprofesion: profesion, nametelefono: telefono, id:data.id}
            ])

            setNombre('')
            setApellidos('')
            setEdad('')
            setProfesion('')
            setTelefono('')
            e.target.reset()
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>EMPLEADOS</h1>
        <hr/>
        <div className='row'>
            <div className="col-8">
                <h4 className="text-center">Listado de empleados</h4>
                <ul className="list-group">
                    {
                        lista.map(item =>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.namenombre}  -  {item.nameapellidos}  -  {item.nameedad} años  -  {item.nametelefono}  -  {item.nameprofesion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=>eliminar(item.id)}>Despedido</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        
        <div className='col-4'>
            <h4 className="text-center">
                Agregar Nuevo Empleado
            </h4>
            <form onSubmit={guardarEmpleados}>
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese el Nombre'
                onChange={(e)=>setNombre(e.target.value)}
                value = {nombre}
                ></input>
                
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese el Apellido'
                onChange={(e) => setApellidos(e.target.value)}
                value = {apellidos}></input>

                <input 
                className='form-control mb-2'
                type="number" 
                placeholder='Ingrese la edad'
                onChange={(e) => setEdad(e.target.value)}
                value = {edad}></input>
                
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese el número de teléfono'
                onChange={(e) => setTelefono(e.target.value)}
                value = {telefono}></input>
                
                <input 
                className='form-control mb-2'
                type="text" 
                placeholder='Ingrese la profesión del empleado'
                onChange={(e) => setProfesion(e.target.value)}
                value = {profesion}></input>
                
                <button 
                className='btn btn-primary btn-block'
                type='submit'
                >Registrar</button>
            </form>
        </div>
        </div>   
    </div>
  )
};

export default Formulario;