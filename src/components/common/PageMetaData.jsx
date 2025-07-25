import { Helmet } from "react-helmet-async"

const PageMetaData = ({ title }) => {
	return (
		<Helmet>
			<title>{title} | Miles Recruit</title>
		</Helmet>
	)
}
export default PageMetaData
