import React, { useContext, useEffect, useState } from "react";
import HeaderRow from "../../components/global/HeaderRow";
import Pagination from "../../components/global/Pagination";
import PanelTitle from "../../components/global/PanelTitle";
import EditUserForm from "../../components/users/EditUserForm";
import UserForm from "../../components/users/UserForm";
import UserRow from "../../components/users/UserRow";
import { ModalContext } from "../../context/ModalContext";
import { StaffContext } from "../../context/StaffContext";

const AdminStaff = () => {
    const [page, setPage] = useState(0);
    const [query, setQuery] = useState("");
    const { users, getStaff, deleteStaff, clearStaff } = useContext(StaffContext);

    const { modalComponent } = useContext(ModalContext);

    useEffect(() => {
        getStaff({ page, query });
        return clearStaff;
    }, [page, query]);

    const handleCreate = () => {
        modalComponent("Agregar Usuario", <UserForm />);
    };

    const handleEdit = (user) => {
        modalComponent("Editar Usuario", <EditUserForm user={user} />);
    };

    const confirmDelete = (user) => {
        modalComponent(
            "Eliminar Usuario",
            <div>
                <p>¿Estás seguro que deseas eliminar al usuario {user.user.email}?</p>
                <button
                    className="btn btn-danger"
                    onClick={() => deleteStaff(user.staff_id)}
                >
                    Eliminar
                </button>
            </div>
        );
    };

    const renderStaffs = () => {
        if (Array.isArray(users)) {
            return users.map((user) => (
                <UserRow
                    key={user.user_id}
                    user={user}
                    editUser={handleEdit}
                    deleteUser={confirmDelete}
                />
            ));
        }
    };

    return (
        <div className="container-fluid">
            <PanelTitle title="Usuarios" onClick={handleCreate} />
            <div className="card p-2 no-scale shadow">
                <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Buscar por nombre o correo electrónico..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <HeaderRow
                    headers={["Nombre", "Correo Electrónico", "Rol", "Acciones"]}
                />
                <div className="container-fluid mb-3">{renderStaffs()}</div>
                <Pagination modifier={setPage} />
            </div>
        </div>
    );
};

export default AdminStaff;
