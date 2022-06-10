import React, { useState } from "react";
import { ImBooks } from "react-icons/im";
import styled from "styled-components";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import Loading from "../LoadState";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { Link,  } from "react-router-dom";

const SignUp = () => {
  const [image, setImage] = useState("/avatar.gif");
  const [avatar, setAvatar] = useState("");
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadChange = () => {
    setLoading(true);
  };

  console.log(loading);

  const formSchema = yup.object().shape({
    userName: yup.string().required("Please Enter Your Username"),
    email: yup.string().email().required("email needed to complet process"),
    password: yup.string().required("Password field is Required"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Please re-confirm your password"),
  });

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setImage(save);
    setAvatar(file);
  };

  const onSummit = handleSubmit(async (value) => {
    console.log(value);
    const { userName, email, password } = value;

    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/diary/user/signup`;

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    const config = {
      "content-type": "multipart/form-data",
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(percent);
      },
    };

    await axios.post(URL, formData, config).then((res) => {
      console.log("Data:", res);
    });
    // .catch(
    //   swal({
    //     title: `A Error Occored`,
    //     text: "Server Or NetWork Error",
    //     icon: "error",
    //   })
    // );

    setLoading(false);
    swal({
      title: `Welcome ${userName}`,
      text: "You just Signeg Up Please proceed to Sign In",
      icon: "success",
      button: "Sign In Now",
    });

    navigate("/signin");
  });

  return (
    <Ddiv>
      {loading ? (
        <Div className="sweet-loading">
          <HashLoader loading={loading} size={100} />
        </Div>
      ) : null}
<Container>
      <ImageDiv>
        <img src="/assets/2.jpg" />
      </ImageDiv>
      <Content>
        <Wrap>
          <Text>
            <h2>Welcome back</h2>
            <h3>Never forget your dreams again</h3>
            <span>Please fill the details below</span>
          </Text>
          <Form onSubmit={onSummit}>
            <span style={{ color: "red", width: "100%" }}>
              {errors.email && errors.email.message}
            </span>
            <input
              type="fullname"
              placeholder="Enter fullname"
              {...register("email")}
            />
            <span style={{ color: "red", width: "100%" }}>
              {errors.email && errors.email.message}
            </span>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <span style={{ color: "red", width: "100%" }}>
              {errors.email && errors.email.message}
            </span>
            <input
              type="password"
              placeholder="Enter password"
              {...register("email")}
            />

            <span style={{ color: "red", width: "100%" }}>
              {errors.password && errors.password.message}
            </span>
            <input
              type="confirm password"
              placeholder=""
              {...register("password")}
            />

            <button type="submit">Submit</button>
          </Form>
          <Option>
            Already have an account?{" "}
            <Link to="/signin" style={{ color: "var(--blue)" }}>
              SIGNIN 
            </Link>
          </Option>
        </Wrap>
      </Content>
    </Container>
    </Ddiv>
  );
};

export default SignUp;

const Ddiv = styled.div``;

const Container = styled.div`
width: 100%;
display: flex;
align-items: center;

font-family:cursive ;
height: 100%;
min-height: calc(100vh - 80px);
`;

const ImageDiv = styled.div`
flex: 0.5;
overflow: hidden;

img {
  width: 100%;
  height:100vh;
  object-fit: cover;
}
`;

const Content = styled.div`
flex: 0.5;
display: flex;
align-items: center;
justify-content: center;
`;
const Wrap = styled.div`
width: 70%;
`;
const Text = styled.div`
margin-bottom: 30px;

h2 {
  font-size: 35px;
  margin: 10px 0;
}
h3 {
  font-size: 35px;
  margin: 10px 0;
  color:red ;
}
`;

const Form = styled.form`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
input {
  width: 100%;
  height: 45px;
  padding: 0 10px;
  box-sizing: border-box;
  outline: none;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 20px;
}

button {
  background-color: #4ea7c4;
  border: 0;
  outline: none;
  padding: 15px 30px;
  color: white;
  font-size: 18px;

  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.35s;

  :hover {
    transform: scale(1.025);
    background-color: rgba(0, 125, 254, 0.5);
  }
}
`;

const Option = styled.div`
text-align: center;
margin-top: 10px;
`;
// const Container = styled.div``
// const Container = styled.div``
// const Container = styled.div``
const Div = styled.div`
  height: 90vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
`;