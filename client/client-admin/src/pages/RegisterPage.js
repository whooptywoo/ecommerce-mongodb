import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/actions/actionCreator";

export default function RegisterPage() {
	const [form, setForm] = useState();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const changeHandler = (e) => {
		const { value, name } = e.target;
		const obj = { ...form };
		obj[name] = value;
		setForm(obj);
	};

	async function handleLogin(e) {
		e.preventDefault();
		try {
			dispatch(login(form)).then(() => navigate("/"));
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="h-screen max-w-screen overflow-hidden">
			<div className="bg-login bg items-center px-20 flex justify-center">
				<div className="bg-white w-5/6 h-5/6 rounded-xl shadow-xl flex">
					<div className="w-1/2 h-full bg-yellow-400 rounded-l-lg flex flex-col pt-40 px-10 text-blue-500">
						<h1 className="text-6xl font-extrabold">
							Welcome to eGroceries.id
						</h1>
						<h2 className="text-2xl mt-10">Your trusty shopping companion</h2>
					</div>
					<div className="flex flex-col items-center justify-center h-full w-1/2 gap-20">
						<h1 className="text-xl font-bold">Create an account</h1>
						<form
							className="flex flex-col justify-center items-center w-3/5 gap-10"
							onSubmit={handleLogin}
						>
							<input
								type="text"
								className=" bg-gray-100 rounded-md py-4 px-4 text-sm w-4/5"
								placeholder="Full name"
								name="fullName"
								onChange={changeHandler}
							/>
							<input
								type="email"
								className=" bg-gray-100 rounded-md py-4 px-4 text-sm w-4/5"
								placeholder="Email"
								name="email"
								onChange={changeHandler}
							/>
							<input
								type="password"
								className=" bg-gray-100 rounded-md py-4 px-4 text-sm w-4/5"
								placeholder="Password"
								name="password"
								onChange={changeHandler}
							/>

							<input
								type="submit"
								className="w-4/5 bg-blue-600 rounded-md py-2 px-4 mt-5 text-white font-bold"
								value="Sign Up"
							/>
						</form>
					</div>
				</div>
			</div>
			;
		</div>
	);
}
