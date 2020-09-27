import React, { Component } from 'react';
import { Form, Button, Segment, Icon, Header, Message } from 'semantic-ui-react';
import { port_ } from '../port/Port';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        isLoading: false
    }

    setErrors = err => this.setState({ error: err});

    checkErrors = err => this.state.error.includes(err);

    displayErrors = () =>  <p>{ this.state.error }</p>;

    handleChange = event => this.setState({ [event.target.name] : event.target.value });

    formIsValid = () => {
        if (!this.state.email || !this.state.password)
        {
            this.setErrors('fill in all fields!');
            return false;
        }
        else
        {
            this.setErrors('');
            return true;
        }
    }

    handleLoginSubmit = () => {

        if (this.formIsValid()) {
            this.setState({ isLoading: true });
            
            fetch(`${port_}/login`, {
                method : 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
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
                    this.setState({ error: data });
                }
            })
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { displayErrors, checkErrors } = this;
        const { email, password, error, isLoading } = this.state;

        return (
            <div className="gap">
                <div className="box">
                    <Segment raised padded>
                        <Header 
                            as='h1' 
                            icon 
                            color='grey'  
                            textAlign='center'
                        >
                            Login
                        </Header>
                        {
                            error.length > 0 ?
                                <Message className="error">
                                    { displayErrors() }
                                </Message> : ""
                        }
                        <Form>
                            <Form.Field>
                                <Form.Input 
                                    icon='envelope outline' 
                                    iconPosition='left' 
                                    placeholder='Email' 
                                    name='email'
                                    type="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    className={ checkErrors("email") ? "error" : "" }
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input 
                                    icon='protect' 
                                    iconPosition='left' 
                                    placeholder='Password'
                                    name='password'
                                    type="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    className={ checkErrors("password") ? "error" : ""}
                                />
                            </Form.Field>
                            <Button
                                fluid 
                                icon 
                                labelPosition='left'
                                color="grey"
                                disabled={isLoading}
                                className={ isLoading ? "loading" : ""}
                                onClick={this.handleLoginSubmit}
                            >
                                <Icon name='paper plane outline' />
                                Submit
                            </Button>
                        </Form>
                    </Segment>
                    <Message>
                        <Header as="h5"> 
                            Not yet a member?{" "}
                            <span onClick={() => this.props.routeChange("register")} className="login_msg"> Register</span>
                        </Header>
                    </Message>
                </div>
            </div>
        )
    }
}

export default Login;
