//import { useState, useEffect } from 'react'  no good for class component
// import { render } from '@testing-library/react';
import React, { Component } from 'react';

//const Auth = (props) => {   moving to class from functional 
// const [signup, setSignup] = useState(true);
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [errorText, setErrorText] = useState(''); 

class Auth extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            signup: true,
            errorText: '',
            eValid: false,  /*email*/
            pValid: false   /*password*/
        }
    }

    
    /*removed 'const'- turned functions into methods*/
    handleSubmit = async (e) => {
        e.preventDefault();
        const apiURL = `https://useracess.herokuapp.com/user/${this.state.signup ? 'create' : 'login'}`;
    
        const reqBody = {
            /*added 'this.state'*/
            email: this.state.email,
            password: this.state.password,
        }
    
        try {
            const res = await fetch(apiURL, {
                method: "POST",
                body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            })
    
            const json = await res.json();
    
            if (json.errors) {
                let errMsg = json.errors[0].message
                /*changed 'setErrorText' to 'this.setState'*/
                this.setState({
                    /** */
                    errorText: errMsg.charAt(0).toUpperCase() + errMsg.slice(1) + '.'
                })
                throw new Error(json.errors[0].message)
            } else {
                console.log(json.Message);
                /* added 'this.props' */
                this.props.setLoggedIn(true)
            }
    
        } catch (e) {
            console.log(e);
        }
    }
    
    /*removed 'const' - turned functions into methods*/
    handleEmail = (e) => {
        /** added 'this.setState' */
        this.setState({
            email: e.target.value
        })
    }
    
    /*removed 'const' - turned functions into methods*/
    handlePassword = (e) => {
        /**added 'this.setState' */
        this.setState({
            password: e.target.value
        })
    }
    /* change 'useEffect(() => {}' to 'componentDidMount'*/ 
    componentDidMount(){
        this.props.setIsClass(Boolean(Auth?.prototype?.render))
    }

    render(){  /*added 'render' and wrap*/
        return (
            <>
            <p style={{ margin: 0, fontSize: '.5em' }}>{this.state.errorText}</p>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(e) => /* added 'this.' method*/this.handleSubmit(e)}>
        
                    <div style={{ display: 'flex', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor='email'>Email</label>
                            <input style={{ position: 'relative' }} required type='email' name='email' id='email' onChange={(e) => { /* added 'this.' */ this.handleEmail(e) }} />
                        </div>
                    </div>
        
                    <div style={{ display: 'flex', position: 'relative' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label htmlFor='password'>Password</label>
                            <input required type='password' id='password' onChange={(e) => { /* added 'this.' */ this.handlePassword(e) }} />
                        </div>
                    </div>
        
                    <button type='button' style={{ margin: '1em' }} onClick={() => /* added 'this.' */ this.setState({signup: /* added 'this.' */ !this.state.signup})}>
                        {this.state.signup ? 'Need to Login?' : 'Need to Signup?'}</button>
        
                    <button type='submit' style={{ margin: '1em' }}>{/* added 'this.' */this.state.signup ? 'Signup' : 'Login'} </button>
        
                </form>
            </>
        )

    }
}    



export default Auth;