// Login.jsx

import { Button, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import sendAPIRequest from './api/sendAPIrequest';
const register = async(username,password) => {
    console.log(username, password);
    const data = {
        username,
        password
    }
    const Request = await sendAPIRequest('POST', '/api/v1/register', data);
    if (Request.code !== 200) return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: Request.data.message
    });
    Swal.fire({
        icon: 'success',
        title: 'Başarılı!',
        text: 'Kayıt işlemi başarılı bir şekilde gerçekleşti.'
    });
    window.location.href = '/auth/login';
}


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        console.log(username, password);
    }, [ username, password]);

  return (
    <>
    <h1 className="text-center mt-5 text-primary">
        Demirtaş Kuruyemiş - Hesap Oluştur
    </h1>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Kullanıcı adı</Form.Label>
              <Form.Control type="username" placeholder="Kullanıcı adı giriniz..." onChange={(e) => setUsername(e.target.value)} />
              <Form.Text className="text-muted">
               Bu bir to-do uygulamasıdır.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" placeholder="Şifre giriniz..."  onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={() => register(username, password)}>
            Kayıt Ol
            </Button>
          </Form>
          <a href="/auth/login" className="text-decoration-none d-block mt-3">Hesabınız varmı? giriş yapın.</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
