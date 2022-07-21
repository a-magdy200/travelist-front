import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
const FooterComponent = () => {
	return (
		<div className="footerContainer">
			<div> © 2022 Travelist, Inc.</div>
			<div>
				<FacebookIcon color="primary" />
				<TwitterIcon color="primary" />
				<InstagramIcon color="primary" />
			</div>
		</div>
	)
}
export default FooterComponent
