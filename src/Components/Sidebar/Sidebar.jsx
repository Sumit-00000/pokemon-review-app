import { Link } from 'react-router-dom';
import './Sidebar.css'
import { HomeRounded, CatchingPokemonRounded, CategoryRounded, PublicRounded, EmojiPeopleRounded, Reviews, Grading, Mail, RateReview, Info } from '@mui/icons-material';
function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/home" className='linkhome'>
                            <li className="sidebarListitem">
                                <HomeRounded className='sidebarIcons' />
                                Home
                            </li>
                        </Link>
                        <Link to="/pokemon" className='link'>
                            <li className="sidebarListitem">
                                <CatchingPokemonRounded className='sidebarIcons' />
                                Pokemon
                            </li>
                        </Link>
                        <Link to="/Category" className='linkcategory'>
                            <li className="sidebarListitem">
                                <CategoryRounded className='sidebarIcons' />
                                Category
                            </li>
                        </Link>
                        <Link to="/Country" className='linkcountry'>
                            <li className="sidebarListitem">
                                <PublicRounded className='sidebarIcons' />
                                Country
                            </li>
                        </Link>
                        <Link to="/Owner" className='linkowner'>
                            <li className="sidebarListitem">
                                <EmojiPeopleRounded className='sidebarIcons' />
                                Owner
                            </li>
                        </Link>
                        <Link to="/Review" className='linkReview'>
                            <li className="sidebarListitem">
                                <Reviews className='sidebarIcons' />
                                Review
                            </li>
                        </Link>
                        <Link to="/Reviewer" className='linkReviewer'>
                            <li className="sidebarListitem">
                                <Grading className='sidebarIcons' />
                                Reviewer
                            </li>
                        </Link>
                        <h3 className="sidebarTitle">Notification</h3>
                        <ul className="sidebarList">
                            <li className="sidebarListitem">
                                <Mail className='sidebarIcons' />
                                Mail
                            </li>
                            <li className="sidebarListitem">
                                <RateReview className='sidebarIcons' />
                                Feedback
                            </li>
                            <Link to="/About" className='linkabout'>
                                <li className="sidebarListitem">
                                    <Info className='sidebarIcons' />
                                    About Us
                                </li>
                            </Link>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
