import './home.css'
import Featuredinfo from "../../Components/Featuredinfo/Featuredinfo"
import Chart from '../../Components/Chart/Chart'
import WidgetsSm from '../../Components/WidgetsSm/WidgetsSm'
import WidgetsLg from '../../Components/WidgetsLg/WidgetsLg'

function Home() {
    return (
        <>
            <div className='home'>
            <Featuredinfo/>
            <Chart/>
            <div className='homeWidgets'>
                <WidgetsSm/>
                <WidgetsLg/>
            </div>
            </div>
            

        </>
    )
}

export default Home
