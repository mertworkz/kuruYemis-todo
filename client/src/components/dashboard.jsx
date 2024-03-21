// Login.jsx

import { Table } from 'react-bootstrap';

const Login = () => {
  return (
    <>
    <h1 className="text-center mt-5 text-primary">
    Hoşgeldiniz Şuanda Giriş yaptınız
    </h1>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
