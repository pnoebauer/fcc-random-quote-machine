import React from 'react';
import './RandomQuoteMachine.css';

const defaultQuote = {
	text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
	author: 'Unknown',
};

class RandomQuoteMachine extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quotesList: [],
			quoteIndex: 0,
		};
	}

	fetchQuote = async () => {
		const response = await fetch('https://type.fit/api/quotes');
		const data = await response.json();

		return data;

		// console.log({data});
	};

	componentDidMount() {
		this.fetchQuote().then(data => {
			// console.log(data);

			this.setState({quotesList: data});
		});
	}

	loadQuote = e => {
		console.log('clicked');

		// this.setState(prevState => ({quoteIndex: prevState.quoteIndex + 1}));

		this.setState(prevState => ({
			quoteIndex: Math.floor(Math.random() * prevState.quotesList.length),
		}));
	};

	render() {
		const {quotesList, quoteIndex} = this.state;

		console.log(this.state);
		return (
			<div
				className='container-fluid bg-danger h-100 d-flex justify-content-center'
				style={{position: 'fixed', top: '0', left: '0'}}
			>
				<div className='p-2 w-50 m-auto bg-dark '>
					{/* <div className='p-2 m-auto bg-dark '> */}
					<div
						className='jumbotron m-auto bg-light d-flex flex-column pb-4'
						id='quote-box'
					>
						<blockquote className='blockquote m-0'>
							<p className='mb-0' id='text'>
								<i className='fa fa-quote-left'></i>
								{quotesList[quoteIndex] ? quotesList[quoteIndex].text : defaultQuote.text}
								<i className='fa fa-quote-right'></i>
							</p>
							<footer className='blockquote-footer' id='author' style={{float: 'right'}}>
								{quotesList[quoteIndex]
									? quotesList[quoteIndex].author
									: defaultQuote.author}
								{/* Someone famous in <cite title='Source Title'>{this.state.author}</cite> */}
							</footer>
						</blockquote>
						<div className='d-flex justify-content-between mt-2 '>
							<a
								className='btn btn-primary'
								role='button'
								href='https://twitter.com/intent/tweet'
								id='tweet-quote'
							>
								<i className='fa fa-twitter'></i>
							</a>
							<button className='btn btn-primary' id='new-quote' onClick={this.loadQuote}>
								New Quote
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RandomQuoteMachine;
