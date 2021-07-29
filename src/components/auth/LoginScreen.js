import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    // Login
    const [formLoginValues, handleLoginInputChange] = useForm({
        lEmail: 'steven@mail.com',
        lPassword: '123456'
    });
    const { lEmail, lPassword } = formLoginValues;
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin(lEmail, lPassword) );
    }

    // Register
    const [formRegisterValues, handleRegisterInputChange] = useForm({
        rName: 'Kath',
        rEmail: 'kath@mail.com',
        rPassword1: '123456',
        rPassword2: '123456'
    });
    const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;
    const handleRegister = (e) => {
        e.preventDefault();
        if (rPassword1 !== rPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        dispatch( startRegister(rEmail, rPassword1, rName) );
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input 
                                type="text"
                                name="lEmail"
                                value={ lEmail }
                                className="form-control"
                                placeholder="Correo"
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="lPassword"
                                value={ lPassword }
                                className="form-control"
                                placeholder="Contraseña"
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                onChange={ handleRegisterInputChange }
                                value={ rName }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                onChange={ handleRegisterInputChange }
                                value={ rEmail }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword1"
                                onChange={ handleRegisterInputChange }
                                value={ rPassword1 } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rPassword2"
                                onChange={ handleRegisterInputChange }
                                value={ rPassword2 } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}