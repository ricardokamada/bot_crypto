import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { getSettings, updateSettings } from '../../services/SettingsService';
import Menu from '../../components/Menu/Menu';
import Symbols from './Symbols';

function Settings() {

    const inputEmail = useRef('');
    const inputNewpassword = useRef('');
    const inputConfirmPassword = useRef('');
    const inputApiUrl = useRef('');
    const inputAccessKey = useRef('');
    const inputSecretKey = useRef('');

    const history = useHistory();

    const [error, setError] = useState('');

    const [success, setSuccess] = useState('');


    useEffect(() => {
        const token = localStorage.getItem("token");

        getSettings(token)
            .then(settings => {
                inputEmail.current.value = settings.email;
                inputApiUrl.current.value = settings.apiUrl;
                inputAccessKey.current.value = settings.accessKey;

            })
            .catch(err => {
                if (err.response && err.response.status === 401)
                    return history.push('/');

                console.error(err.message);

                if (err.response)
                    setError(err.response.data);
            })
    }, [])

    function onFormSubmit(event) {
        event.preventDefault();

        if ((inputNewpassword.current.value || inputConfirmPassword.current.value)
            && inputNewpassword.current.value !== inputConfirmPassword.current.value) {
            return setError('The fields New password and Confirm password must be equals. ')
        }
        const token = localStorage.getItem('token');

        updateSettings({
            email: inputEmail.current.value,
            password: inputNewpassword.current.value ? inputNewpassword.current.value : null,
            apiUrl: inputApiUrl.current.value,
            accessKey: inputAccessKey.current.value,
            secretKey: inputSecretKey.current.value ? inputSecretKey.current.value : null
        }, token)
            .then(result => {
                if (result) {
                    setError('');
                    setSuccess(`Settings updated succcessfully !`);
                    inputSecretKey.current.value = '';
                    inputNewpassword.current.value = '';
                    inputConfirmPassword.current.value = '';
                } else {
                    setSuccess('');
                    setError(`Can't update the settings `)
                }
            })
            .catch(error => {
                setSuccess('');
                console.error(error.message);
                setError(`Can't update the settings `)
            })

    }

    return (

        <React.Fragment>
            <Menu />
            <main className='content'>
                <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4'>
                    <div className='d-block mb-4 mb-md-0'>
                        <h1 className='h4'>Settings</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className='h5 mb-4'>General Info</h2>
                            <form onSubmit={onFormSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor='email'>Email</label>
                                            <input ref={inputEmail} className="form-control" id='email' type="email" placeholder='name@company.com' required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor='newPassword'>New Password</label>
                                            <input ref={inputNewpassword} className="form-control" id='newPassword' type="password" placeholder='Enter your new password' />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div>
                                            <label htmlFor='confirmPassword'>Confirm Password</label>
                                            <input ref={inputConfirmPassword} className="form-control" id='confirmPassword' type="password" placeholder='Enter your new password again' />
                                        </div>
                                    </div>
                                </div>
                                <h2 className='h5 my-4'>Exchange Info</h2>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor='apiUrl'>API URL</label>
                                            <input ref={inputApiUrl} className="form-control" id='apiUrl' type="text" placeholder='Enter the API URL' required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor='accessKey'>ACCESS KEY</label>
                                            <input ref={inputAccessKey} className="form-control" id='accessKey' type="text" placeholder='Enter the ACCESS KEY' required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor='secretKey'>NEW SECRET KEY</label>
                                            <input ref={inputSecretKey} className="form-control" id='secretKey' type="password" placeholder='Enter the SECRET KEY' />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                        <div className='col-sm-3'>
                                            <button className="btn btn-gray-800 mt-2 animate-up-2" type='submit'> Save All</button>
                                        </div>
                                        {
                                            error ?
                                                <div className='alert alert-danger mt-2 col-9 py-2'>{error} </div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                        {
                                            success ?
                                                <div className='alert alert-success mt-2 col-9 py-2'>{success} </div>
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                      <Symbols/>                  
            </main>
        </React.Fragment>

    )
}

export default Settings;