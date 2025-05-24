import './widgetsSm.css'
import { Visibility } from "@mui/icons-material"
export default function WidgetsSm() {
    return (
        <div className='widgetSm'>
            <span className="widgetSmtitle">New Join Users</span>
            <ul className="widgetSmlist">
                <li className="widgetSmlistitem">
                    <img src="https://wallpapers.com/images/hd/bucky-barnes-d77x355fe3t6cvo9.jpg" alt="" className="widgetSmimg" />
                    <div className="widgetSmuser">
                        <span className="widgetSmusername">Bucky</span>
                        <span className="widgetSmusernametitle">Winter Soldier</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmicon' />
                        Display
                    </button>
                </li>
                <li className="widgetSmlistitem">
                    <img src="https://www.superherotoystore.com/cdn/shop/articles/desktop-wallpaper-wanda-maximoff-scarlett-witch-2022_850x.jpg?v=1696622664" alt="" className="widgetSmimg" />
                    <div className="widgetSmuser">
                        <span className="widgetSmusername">Scarlett Witch</span>
                        <span className="widgetSmusernametitle">Chaos Magic</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmicon' />
                        Display
                    </button>
                </li>
                <li className="widgetSmlistitem">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4at46VihSGzpULI3fVMoG0JLcklvyazTUcw&s" alt="" className="widgetSmimg" />
                    <div className="widgetSmuser">
                        <span className="widgetSmusername">Dr.Strange</span>
                        <span className="widgetSmusernametitle">Magician</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmicon' />
                        Display
                    </button>
                </li>
                <li className="widgetSmlistitem">
                    <img src="https://w0.peakpx.com/wallpaper/12/866/HD-wallpaper-spiderman-avenger-avengers-game-iphone-marvel-ps5-spider-man-spiderman-ps5-thumbnail.jpg" alt="" className="widgetSmimg" />
                    <div className="widgetSmuser">
                        <span className="widgetSmusername">Spider Man</span>
                        <span className="widgetSmusernametitle">Spider Web</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmicon' />
                        Display
                    </button>
                </li>
                <li className="widgetSmlistitem">
                    <img src="https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png" alt="" className="widgetSmimg" />
                    <div className="widgetSmuser">
                        <span className="widgetSmusername">Rudra Rajput</span>
                        <span className="widgetSmusernametitle">Software Dev</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className='widgetSmicon' />
                        Display
                    </button>
                </li>
            </ul>
        </div>
    )
}
