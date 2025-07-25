import React from 'react'

const PageLoader = () => {
	return (
		<div className="loading-overlay">
			<div className="loading-content text-center">
                <div className='d-flex align-items-center justify-content-center'>
				<div className="spinner-glow"></div>
                </div>
				<p>Fetching Data... Please Wait</p>
			</div>
		</div>
	)
}

export default PageLoader
