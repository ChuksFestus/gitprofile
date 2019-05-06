import React from "react";
import styled from "styled-components";

import Loading from "./loading";

export const Grid = styled.div`
	width: 100%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	grid-gap: 1em;
	div {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
		padding: 1em;
		img {
			width: 100%;
		}
		p {
			color: #333;
			padding-top: 1em
		}
	}
`;

export default class Following extends React.Component {
	state = {
		data: [],
		isLoading: true
	};

	componentDidMount() {
		fetch(`https://api.github.com/users${this.props.user}/following`)
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
					<div key={dat.id}>
						<img src={dat.avatar_url} alt="" />
						<p>{dat.login}</p>
					</div>
				))}
			</Grid>
		);
	}
}
