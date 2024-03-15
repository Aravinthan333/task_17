import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserCard = ({ username, name, email, phone, website }) => {
  return (
    <div className="display">
      <p>
        Username: <b>{username}</b>
      </p>
      <p>
        Name: <b>{name}</b>
      </p>
      <p>
        Mail: <b>{email}</b>
      </p>
      <p>
        Phone: <b>{phone}</b>
      </p>
      <p>
        Website: <b>{website}</b>
      </p>
    </div>
  );
};

UserCard.propTypes = {
  username: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  email: PropTypes.string,
};

// --------------------------------------------------------------------------------

function App() {
  var c = 11;

  const [users, setUsers] = useState([]);
  const [newuser, setNewuser] = useState({ id: c++ });
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data));
  }, []);

  const handleChange = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
    console.log({ ...newuser, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      newuser.name != "" &&
      newuser.username != "" &&
      newuser.email != "" &&
      newuser.phone != "" &&
      newuser.website != ""
    ) {
      axios.post("https://jsonplaceholder.typicode.com/users", {
        ...newuser,
        name: newuser.name,
        username: newuser.username,
        email: newuser.email,
        phone: newuser.phone,
        website: newuser.website,

        // ...newuser,
      });

      setUsers([...users, newuser]);
      setNewuser({
        ...newuser,
        username: "",
        name: "",
        email: "",
        phone: "",
        website: "",
      });
    } else alert("Please fill out all fields");
  };

  const editUser = (user) => {
    setUpdate(true);
    setNewuser({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
    });
  };
  const updateUser = ({ id, username, name, email, phone, website }) => {
    setUpdate(false);
    axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, {
      name,
      username,
      email,
      phone,
      website,
    });
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, username, name, email, phone, website } : u
      )
    );
    setNewuser({
      id: c,
      username: "",
      name: "",
      email: "",
      phone: "",
      website: "",
    });
    console.log("Line 113", newuser);
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="addUser">
        <input
          type="text"
          name="username"
          value={newuser.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          value={newuser.name}
          placeholder="Enter your name"
          onChange={handleChange}
          required
        />
        <input
          type="mail"
          name="email"
          value={newuser.email}
          placeholder="Mail id"
          onChange={handleChange}
          required
        />
        <input
          type="phone"
          name="phone"
          value={newuser.phone}
          placeholder="Enter your contact number"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="website"
          value={newuser.website}
          placeholder="website"
          onChange={handleChange}
          required
        />

        {update ? (
          <button onClick={() => updateUser({ ...newuser })}>
            Update User
          </button>
        ) : (
          <button onClick={handleSubmit}>Add User</button>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {users.map((user) => (
          <div
            key={user.username}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "15px",
              borderRadius: "5px",
            }}
          >
            <UserCard {...user} />

            <div className="editable">
              <button onClick={() => editUser(user)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
