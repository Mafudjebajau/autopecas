import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxOpen,
  FaChartBar,
  FaPlus,
} from "react-icons/fa";

export default function AdminPanel() {
  const [users, setUsers] = useState([
    { id: 1, nome: "João", email: "joao@email.com" },
    { id: 2, nome: "Maria", email: "maria@email.com" },
  ]);

  const [form, setForm] = useState({ nome: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.nome || !form.email) return alert("Preencha os campos!");
    setUsers([...users, { id: users.length + 1, ...form }]);
    setForm({ nome: "", email: "" });
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "250px" }}
      >
        <h4 className="mb-4 text-center fw-bold">⚙️ Admin Panel</h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item">
            <a href="#dashboard" className="nav-link text-white d-flex align-items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a href="#usuarios" className="nav-link text-white d-flex align-items-center gap-2">
              <FaUsers /> Usuários
            </a>
          </li>
          <li className="nav-item">
            <a href="#produtos" className="nav-link text-white d-flex align-items-center gap-2">
              <FaBoxOpen /> Produtos
            </a>
          </li>
          <li className="nav-item">
            <a href="#relatorios" className="nav-link text-white d-flex align-items-center gap-2">
              <FaChartBar /> Relatórios
            </a>
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-grow-1 p-4">
        <h2 id="dashboard" className="fw-bold mb-3">
          <FaTachometerAlt className="me-2 text-primary" /> Dashboard
        </h2>
        <p className="text-muted">Bem-vindo ao painel administrativo.</p>

        <hr />

        {/* Inserção de dados */}
        <div id="usuarios">
          <h3 className="fw-bold mb-3">
            <FaUsers className="me-2 text-primary" /> Gerenciar Usuários
          </h3>
          <div className="card shadow-sm border-0 p-3 mb-4">
            <h5 className="mb-3 fw-semibold">Adicionar Usuário</h5>
            <div className="row g-2">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-5">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2" onClick={handleAdd}>
                  <FaPlus /> Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Visualização de dados */}
          <div className="card shadow-sm border-0 p-3">
            <h5 className="mb-3 fw-semibold">Lista de Usuários</h5>
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-bold">{u.id}</td>
                    <td>{u.nome}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <hr />

        {/* Seções fake */}
        <div id="produtos" className="mt-4">
          <h3 className="fw-bold">
            <FaBoxOpen className="me-2 text-success" /> Produtos
          </h3>
          <p className="text-muted">Aqui você pode gerenciar os produtos (futuro CRUD).</p>
        </div>

        <hr />

        <div id="relatorios" className="mt-4">
          <h3 className="fw-bold">
            <FaChartBar className="me-2 text-warning" /> Relatórios
          </h3>
          <p className="text-muted">Área reservada para relatórios do sistema.</p>
        </div>
      </div>
    </div>
  );
}
