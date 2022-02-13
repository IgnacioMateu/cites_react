import Patients from "./patients"

const ListPatients = ({ patients, setPatient, deletePatient }) => {
    return (
        <div className="md:w-1/2 lg:w-2/5 md:h-screen overflow-y-scroll">

            {patients.length == 0 ? (
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando pacientes {""}
                        <span className="text-indigo-600 font-bold ">y apareceran en este lugar</span>
                    </p>
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {""}
                        <span className="text-indigo-600 font-bold ">Pacientes y Citas</span>
                    </p>

                    {patients.map((x) => (
                        <Patients
                            key={x.id}
                            patient={x}
                            setPatient={setPatient}
                            deletePatient={deletePatient}
                        />
                    )
                    )}
                </>
            )}

        </div>
    )
}

export default ListPatients