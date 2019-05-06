import React from "react";
import styled from "styled-components";

import Loading from "./loading";

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 1rem;
	.cont {
		border: 1px solid #d1d5da;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		border-radius: 3px;
		.dist {
			padding: 1em 0;
		}
		.lang {
			width: 100%;
			display: flex;
			justify-content: space-between;
		}
		.name {
			font-weight: bold;
			color: black;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			/*padding-bottom: 1em*/
		}
	}
`;

export default class Repo extends React.Component {
	state = {
		data: [],
		isLoading: true
	};

	componentDidMount() {
		fetch(`https://api.github.com/users${this.props.user}/repos`)
			.then(res => res.json())
			.then(result => {
				this.setState({ data: result, isLoading: false });
			});
	}

	render() {
		return this.state.isLoading ? (
			<Loading />
		) : (
			<Grid>
				{this.state.data.map(dat => (
					<div key={dat.id} className="cont">
						<p className="name">{dat.name}</p>
						<div>
							<p className="dist">{dat.description}</p>
							<p className="lang">
								<span>{dat.language}</span> <span>★ {dat.stargazers_count}</span>
							</p>
						</div>
					</div>
				))}
			</Grid>
		);
	}
}
