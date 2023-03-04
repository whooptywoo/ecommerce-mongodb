export default function LoginPage() {
	return (
		<div className="h-screen max-w-screen">
			<div className="bg-login bg items-center px-20 flex justify-center">
				<div className="bg-white w-5/6 h-5/6 rounded-xl shadow-xl flex">
					<div className="w-1/2 h-full bg-yellow-400 rounded-l-lg flex flex-col pt-40 px-10 text-blue-500">
						<h1 className="text-6xl font-extrabold">
							Welcome to eGroceries.id
						</h1>
						<h2 className="text-2xl mt-10">Your trusty shopping companion</h2>
					</div>
					<div className="flex flex-col items-center justify-center h-full w-1/2 gap-20">
						<h1 className="text-xl font-bold">Please login to continue</h1>
						<form className="flex flex-col justify-center items-center w-3/5 gap-10">
							<input
								type="text"
								className=" bg-gray-100 rounded-md py-4 px-4 text-sm w-4/5"
								placeholder="Username"
							/>
							<input
								type="password"
								className=" bg-gray-100 rounded-md py-4 px-4 text-sm w-4/5"
								placeholder="Password"
							/>
                            <input type="submit" className="w-4/5 bg-blue-600 rounded-md py-2 px-4 mt-5 text-white font-bold" value="Login"/>
						</form>
                        <h1>or sign up here</h1>
					</div>
				</div>
			</div>
			;
		</div>
	);
}
