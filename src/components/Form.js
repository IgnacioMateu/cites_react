import { useState, useEffect } from 'react'
import Error from './Error'

let copyValue = { mascota: '', propietario: '', email: '', fecha: '', sintomas: '' }

const Form = ({ patients, setPatients, patient, setPatient }) => {
    const value2 = []
    const [value, setValue] = useState({ mascota: '', propietario: '', email: '', fecha: '', sintomas: '', id: 0 })
    const [error, setError] = useState(false)

    const resetForm = () => {
        copyValue.mascota = ''
        copyValue.propietario = ''
        copyValue.email = ''
        copyValue.fecha = ''
        copyValue.sintomas = ''
    }

    /*  useEffect
    
        -When the component is ready useEffect run,
        is a perfect place for use useEffect
        to query an API or LocalStorage 
    
        -Because we can pass a dependency and be listen 
        for the changes that will happen in a variable, 
        can to update the component when that change happens */

    useEffect(() => {
        if (Object.keys(patient).length > 0) {
            for(let key in patient) {
                setValue({
                    ...patient,
                    key: patient[key]
                })

                copyValue = {
                    ...patient,
                    key: patient[key]
                }
            } 
        }
    }, [patient])


    const generateId = (v) => {
        let random = Math.random().toString(36).substring(2);
        let fecha = Date.now().toString(36)

        v.id = random + fecha
    }


    const handleSet = ([v, b]) => {
        value2.push(b)
        copyValue = {
            ...copyValue,
            [v]: value2[0]
        }

        setValue({
            ...value,
            [v]: value2[0]
        })
    }

  

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([value.mascota, value.propietario, value.email, value.fecha, value.sintomas].includes('')) {
            setError(true)
            return;
        }

        setError(false)

        if (patient.id) {
            value.id = patient.id
            const updatePatient = patients.map( x => 
                x.id === value.id ? value : x)
            
            setPatients(updatePatient)
            setPatient({})
        } else {
            generateId(value)
            setPatients([
                ...patients,
                value
            ])
        }
        
        resetForm()
    }



    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3x1 text-center ">Seguimiento pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Aniade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

                {error && <Error><p>Todos los campos son obligatorios</p></Error>}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase form-bold">
                        Nombre Mascota
                    </label>

                    <input
                        id="mascota"
                        type='text'
                        placeholder="Nombre de la mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={copyValue.mascota}
                        onChange={(e) => handleSet(['mascota', e.target.value])}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase form-bold">
                        Nombre Propietario
                    </label>

                    <input
                        id="propietario"
                        type='text'
                        placeholder="Nombre de el propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={copyValue.propietario}
                        onChange={(e) => handleSet(['propietario', e.target.value])}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase form-bold">
                        Email
                    </label>

                    <input
                        id="email"
                        type='text'
                        placeholder="Email contacto propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={copyValue.email}
                        onChange={(e) => handleSet(['email', e.target.value])}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase form-bold">
                        Alta
                    </label>

                    <input
                        id="alta"
                        type='date'
                        formTarget='YYYY-MM-DD'
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        value={copyValue.fecha}
                        onChange={(e) => handleSet(['fecha', e.target.value])}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase form-bold">
                        Sintomas
                    </label>

                    <textarea
                        id="sintomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md "
                        placeholder="Describe los sintomas"
                        value={copyValue.sintomas}
                        onChange={(e) => handleSet(['sintomas', e.target.value])}
                    />

                </div>

                <input
                    type='submit'
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold 
                    hover:bg-indigo-700 cursor-pointer transition-all"
                    value={ patient.id ? 'Editar paciente' : 'Agregar paciente' }
                />
            </form>
        </div>
    )
}

export default Form