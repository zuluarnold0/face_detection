import React, { Component } from 'react';
import { Button, Form, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { port_ } from '../port/Port';

class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        cpassword: '',
        loading: false,
        errors: '',
    }

    setErrors = err => this.setState({ errors: err});

    displayErrors = () => <p>{ this.state.errors }</p>;

    checkError = (err, inputName) => err.includes(inputName);

    handleChange = event => this.setState({ [event.target.name] : event.target.value });

    validateInputs = () => {
        const { username, email, password, cpassword } = this.state;
        //password validation
        var matchedCase = [];
        matchedCase.push("[$@$!%*#?&]");
        matchedCase.push("[A-Z]");    
        matchedCase.push("[0-9]"); 
        matchedCase.push("[a-z]");
        // Check the conditions
        var ctr = 0;
        for (var i = 0; i < matchedCase.length; i++) {
            if (new RegExp(matchedCase[i]).test(password)) {
                ctr++;
            }
        }
        //email validation
        var isEmailValid = false;
        // eslint-disable-next-line
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            isEmailValid = true;
        }
        //check for: empty fields, invalid email and passwords
        if (!email || !username || !password || !cpassword) 
        {
            this.setErrors('fill in all fields!');
            return false;
        }
        else if (!isEmailValid)
        {
            this.setErrors("You have entered an invalid email address!");
            return false;
        }
        else if (password !== cpassword)
        {
            this.setErrors('passwords dont match!');
            return false;
        }
        else if (ctr !== 4)
        {
            this.setErrors("Password must have: [A-Z], [0-9], [a-z] and [$@$!%*#?&]");
            return false;
        }
        else
        {
            this.setErrors('');
            return true;
        }
    }

    handleRegisterSubmit = () => {

        if (this.validateInputs()) {
            this.setState({ loading: true });
            
            fetch(`${port_}/register`, {
                method : 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    this.props.loadUser(data);
                    this.props.routeChange("home");
                } else {
                    this.setState({ errors: data });
                }
            })
            .catch(err => console.log(err))
            this.setState({ loading: false });
        }
    }

    render () {
        const { routeChange } = this.props;
        const { handleChange, displayErrors, checkError } = this;
        const { username, email, password, cpassword, errors, loading } = this.state;

        return <div className="gap">
            <div className="box">
                <Segment raised padded>
                    <Header 
                        as='h1' 
                        icon 
                        color='violet'  
                        textAlign='center'
                    >
                        Register
                    </Header>
                    { 
                        errors.length > 0 ? <Message color="red"> 
                                { displayErrors(errors) }
                            </Message> : "" 
                    }
                    <Form>
                        <Form.Field>
                            <Form.Input
                                icon='user outline' 
                                iconPosition='left' 
                                placeholder='Username' 
                                name='username'
                                value={username}
                                onChange={handleChange}
                                className={ checkError(errors, "username") ? "error" : "" }
                           />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                icon='envelope outline' 
                                iconPosition='left' 
                                placeholder='Email'
                                name='email'
                                type='email'
                                value={email}
                                onChange={handleChange}
                                className={ checkError(errors, "email") ? "error" : "" }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                icon='protect' 
                                iconPosition='left' 
                                placeholder='Password'
                                name='password' 
                                type='password'
                                value={password}
                                onChange={handleChange}
                                className={ checkError(errors, "password") ? "error" : "" }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input 
                                color='orange'
                                icon='protect' 
                                iconPosition='left' 
                                placeholder='Confirm Password' 
                                name='cpassword'
                                type='password'
                                value={cpassword}
                                onChange={handleChange}
                                className={ checkError(errors, "password") ? "error" : "" }
                            />
                        </Form.Field>
                        <Button
                            fluid 
                            icon 
                            labelPosition='left'
                            color='violet'
                            disabled={loading}
                            className={ loading ? "loading" : "" }
                            onClick={this.handleRegisterSubmit}
                        >
                            <Icon name='paper plane outline' />
                            Submit
                        </Button>
                    </Form>
                </Segment>
                <Message>
                    <Header as="h5">
                        Already a member? {" "}
                        <span onClick={() => routeChange("login")} className="register_msg">Login</span>
                    </Header>
                </Message>
            </div>
        </div>
    }
}

export default Register;