import './newuser.css'

export default function NewUser() {
  return (
    <div className='newuser'>
      <h1 className="newuserTitle">New User</h1>
      <form className="newuserForm">
        <div className="newuserItem">
          <label>Username</label>
          <input type="text" placeholder='Thomas' />
        </div>
        <div className="newuserItem">
          <label>Full Name</label>
          <input type="text" placeholder='Thomas Smith' />
        </div>
        <div className="newuserItem">
          <label>Email</label>
          <input type="text" placeholder='Thomas007@gmail' />
        </div>
        <div className="newuserItem">
          <label>Password</label>
          <input type="password" placeholder='Password' />
        </div>
        <div className="newuserItem">
          <label>Phone</label>
          <input type="text" placeholder='+91 9876543210' />
        </div>
        <div className="newuserItem">
          <label>Address</label>
          <input type="text" placeholder='Lahore | Pakistan' />
        </div>
        <div className="newuserItem">
          <label>Gender</label>
          <div className="newuserGender">
            <input type="radio" name='Gender' id='male' value='male' />
            <label for="male">Male</label>
            <input type="radio" name='Gender' id='female' value='female' />
            <label for="female">Female</label>
            <input type="radio" name='Gender' id='other' value='other' />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newuserItem">
          <label>Active</label>
          <select className='newuserSelect' name ='active' id='active'>
            <option value='yes'>Yes</option>
            <option vlaue='no'>No</option>
          </select>
        </div>
        <button className="newuserButton">Create</button>
      </form>
    </div>
  )
}
