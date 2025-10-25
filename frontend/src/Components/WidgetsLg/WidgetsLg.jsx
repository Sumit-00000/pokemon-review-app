import './widgetsLg.css'

export default function WidgetsLg() {

  const Button = ({ type }) => {
    return <button className={'widgetLgbutton ' + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgtitle">Latest Feedback</h3>
      <table className="widgetLgtable">
        <tr className="widgetLgtr">
          <th className="widgetlgth">Customer</th>
          <th className="widgetlgth">Date</th>
          <th className="widgetlgth">Feedback</th>
          <th className="widgetlgth">Status</th>
        </tr>
        <tr className="widgetLgtr">
          <td className="widgetLguser">
            <img src="https://i.redd.it/dyp3ws8axd561.jpg" alt="imagehaiyha" className="widgetLgimg" />
            <span className="widgetLgname">Captain America</span>
          </td>
          <td className="widgetLgdate">19-Feb 2024</td>
          <td className="widgetLgfeedback">I am Steve Rogers</td>
          <td className="widgetLgstatus"><Button type="Approved" /></td>
        </tr>
        <tr className="widgetLgtr">
          <td className="widgetLguser">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIInzjaNQEWZTrulMfbQYj1QLCnSnbdmqmrw&s" alt="imagehaiyha" className="widgetLgimg" />
            <span className="widgetLgname">Iron Man</span>
          </td>
          <td className="widgetLgdate">20-Feb 2024</td>
          <td className="widgetLgfeedback">Better than my suit</td>
          <td className="widgetLgstatus"><Button type="Declined" /></td>
        </tr>
        <tr className="widgetLgtr">
          <td className="widgetLguser">
            <img src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/11/thor-looking-angry-cropped.jpg" alt="imagehaiyha" className="widgetLgimg" />
            <span className="widgetLgname">Thor</span>
          </td>
          <td className="widgetLgdate">21-Feb 2024</td>
          <td className="widgetLgfeedback">Using From Asgard</td>
          <td className="widgetLgstatus"><Button type="Pending" /></td>
        </tr>
        <tr className="widgetLgtr">
          <td className="widgetLguser">
            <img src="https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/9438053/hulk_agnarok.jpg?quality=90&strip=all&crop=18.5791015625,0,62.841796875,100" alt="imagehaiyha" className="widgetLgimg" />
            <span className="widgetLgname">Hulk</span>
          </td>
          <td className="widgetLgdate">20-Feb 2024</td>
          <td className="widgetLgfeedback">Pokemon Smassshh..</td>
          <td className="widgetLgstatus"><Button type="Approved" /></td>
        </tr>
      </table>
    </div>
  )
}
