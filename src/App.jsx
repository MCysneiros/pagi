import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
function App() {
	const { loading, data } = useFetch();
	const [page, setPage] = useState(0);
	const [followers, setFollowers] = useState([]);

	useEffect(() => {
		if (loading) return;
		setFollowers(data[page]);
	}, [page, loading]);

	const handlePage = index => {
		setPage(index);
	};

	const handlePrev = () => {
		setPage(oldPage => {
			if (oldPage === 0) return 0;
			return oldPage - 1;
		});
	};

	const handleNext = () => {
		setPage(oldPage => {
			if (oldPage === data.length - 1) return data.length - 1;
			return oldPage + 1;
		});
	};

	return (
		<main>
			<div className='section-title'>
				<h1>{loading ? 'loading...' : 'pagination'}</h1>
				<div className='underline'></div>
			</div>
			<section className='followers'>
				<div className='container'>
					{followers.map(follower => {
						return <Follower key={follower.id} {...follower} />;
					})}
				</div>
				{!loading && (
					<div className='btn-container'>
						<button className='prev-btn' onClick={handlePrev}>
							prev
						</button>
						{data.map((item, index) => {
							return (
								<button
									key={index}
									onClick={() => handlePage(index)}
									className={`page-btn ${
										index === page ? 'active-btn' : null
									}`}>
									{index + 1}
								</button>
							);
						})}

						<button className='next-btn' onClick={handleNext}>
							next
						</button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
