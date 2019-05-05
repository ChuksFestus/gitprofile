import React from "react";
import styled from "styled-components";
import { between, rem, fluidRange } from "polished";

const Container = styled.section`
	min-height: 100vh;
	max-width: 1440px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	-ms-align-items: center;
	align-items: center;
	flex-direction: column;
	padding-bottom: 2em;
	h1 {
		font-weight: 700;
		font-size: ${between(
			`${rem("30px")}`,
			`${rem("50px")}`,
			`${rem("320px")}`,
			`${rem("1200px")}`
		)};
	}
	form {
		${fluidRange(
			{
				prop: "width",
				fromSize: "80%",
				toSize: "60%"
			},
			"320px",
			"768px"
		)}
		display: grid;
		grid-template-columns: 1fr;
		@media (min-width: 768px) {
			grid-template-columns: 1fr auto;
		}
		margin: 0 auto;
		input {
			border: 1px solid #0000006b;
			font-size: 1rem;
			${fluidRange(
				{
					prop: "padding",
					fromSize: "0.8rem",
					toSize: "1rem"
				},
				"320px",
				"768px"
			)}
			:focus {
				outline: 5px solid #0000006b;
			}
		}
		button {
			background: white;
			color: black;
			border: 1px solid #0000006b;
			padding: 1rem 2rem;
			margin-top: 1em;
			@media (min-width: 768px) {
				grid-template-columns: 1fr auto;
				margin-top: 0;
				border-left: none;
			}
		}
	}
	.grid {
		width: 80%;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		grid-gap: 1em;
		margin-top: 2em;
		div {
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
			padding: 1em;
			img {
				width: 100%;
			}
			h2 {
				font-size: 1.3rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
`;

class Home extends React.Component {
	state = {
		value: "",
		users: []
	};

	handleSearch = e => {
		e.preventDefault();
		fetch(`https://api.github.com/search/users?q=${this.state.value}`)
			.then(res => res.json())
			.then(result => {
				this.setState({ users: result.items });
			});
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		const { users } = this.state;
		console.log({ users });
		return (
			<Container>
				<h1>GIT PROFILE</h1>
				<form onSubmit={this.handleSearch}>
					<input
						value={this.state.value}
						onChange={this.handleChange}
						type="text"
						placeholder="enter username"
					/>
					<button>search</button>
				</form>
				<div className="grid">
					{users.length !== 0 &&
						users.map(user => (
							<div key={user.login}>
								<img src={user.avatar_url} alt="" />
								<h2>{user.login}</h2>
							</div>
						))}
				</div>
			</Container>
		);
	}
}
export default Home;
