import { ImBooks } from "react-icons/im";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createUser } from "../Global/GlobalState";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { Link,  } from "react-router-dom";
const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().email().required("This Field Is Required"),
    password: yup.string().required("Password Needed"),
  });

  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSummit = handleSubmit(async (value) => {
    console.log(value);
    const { email, password } = value;
    const mainURL = "https://sam-diary.herokuapp.com";
    const URL = `${mainURL}/api/diary/user/signin`;

    await axios.post(URL, { email, password }).then((res) => {
      // console.log(res.data.data);
      dispatch(createUser(res.data.data));
    });

    swal({
      title: `Signed In Sucessfully ✌️`,
      text: "You Can Now Start Creating Awesome Diaries",
      icon: "success",
      button: "Proceed",
    });

    navigate("/diary");
  });

  return (
    <Container>
   <ImageDiv>
        <img src="/assets/2.jpg" />
      </ImageDiv>
      <Content>
        <Wrap>
          <Text>
            <h2>Welcome back</h2>
            <h3>Start your journey</h3>
            <span>Please fill the details below</span>
          </Text>

          <Form onSubmit={onSummit}>
            <span style={{ color: "red", width: "100%" }}>
              {errors.email && errors.email.message}
            </span>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email")}
            />

            <span style={{ color: "red", width: "100%" }}>
              {errors.password && errors.password.message}
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />

            <button type="submit">Submit</button>
          </Form>
          <Option>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--blue)" }}>
              Register for free
            </Link>
          </Option>
        </Wrap>
      </Content>
    </Container>
  );
}

export default Signin;

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
