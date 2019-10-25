import React, { Component } from "react";

class Auth extends Component {
  state = {
    isLogin: true
  };
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  switchHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  handleSubmit = e => {
    e.preventDevault();
    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    console.log(email, password);
    let requestBody = {
      query: `
        query{
          login(email:"${email}",password:"${password}"){
            userId
            token
            tokenExpiration
          }
        }      
      `
    };
    if (!this.state.isLogin) {
      requestBody = {
        query: `
            mutation{
              createUser(userInput:{email:"${email}",password:"${password}"}){
                _id
                email
              }
            }      
          `
      };
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed catch data");
        }
      })
      .then(resData => console.log(resData))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={this.emailRef} />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordRef} />
          </div>
          <div className="form-action">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.switchHandler}>
              Switch to {this.state.isLogin ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
