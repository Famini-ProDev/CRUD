import { userFilter, userDeleted, fetchUsers } from "./usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function UserList() {
  const dispatch = useDispatch();

  const { entities } = useSelector((state) => state.users);
  const loading = useSelector((state) => state.loading);
  const [searchName, setSreachName] = useState();
  const [searchEmail, setSearchEmail] = useState();
  const [dis, setdis] = useState(true);
  const handleSearchName = (e) => {
    setSreachName(e.target.value)
  }
  const handleSearchEmail = (e) => {
    setSearchEmail(e.target.value)
  }
  const handleDelete = (id) => {
    dispatch(userDeleted({ id }));
  };
  const handleSearch = () => {
    if (searchName || searchEmail) {
      dispatch(userFilter({ searchName, searchEmail }))
    }
    else {
      dispatch(fetchUsers())
    }

    setSreachName();
    setSearchEmail();
  };

  return (
    <div className="container">
      <div className="row">
        <h1>React Redux CRUD </h1>
      </div>
      <div className="row">

        <label htmlFor="nameInput">Name</label>
        <input
          className="u-full-width"
          type="text"
          placeholder="Name"
          id="nameSearch"
          onChange={handleSearchName}
          value={searchName}
        />
        <label htmlFor="emailInput">Email</label>
        <input
          className="u-full-width"
          type="email"
          placeholder="Email@gmail.com"
          id="emailSearch"
          onChange={handleSearchEmail}
          value={searchEmail}
        />
      </div>
      <div>
        <button
          onClick={handleSearch}
          className="button-primary"
        >
          Search
        </button>

      </div>

      <div className="row">
        {loading ? (
          "Loading..."
        ) : (
          <table className="u-full-width">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entities.length &&
                entities.map(({ id, name, email }, i) => (
                  <tr key={i}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                      <button onClick={() => handleDelete(id)}>Delete</button>
                      <Link to={`/edit-user/${id}`}>
                        <button>Edit</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <Link to="/add-user">
        <button className="button-primary">Add user</button>
      </Link>
    </div>
  );
}
