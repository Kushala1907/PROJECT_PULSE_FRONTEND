import './Header.css'
import wal from '../../../src/wal_logo-1.png'
function Header() {
  return (
    <div className="header">
    <div className="row">
      <div className="col-sm-6 pe-3">
        <img src={wal} alt="wal"></img>

      </div>
      <div className="col-sm-6">
        <p>WEST AGILE IT LABS</p>
        <p>Hitech-city</p>
        <p>Hyderabad,500043</p>
        
      </div>
      </div>
    </div>
  );
}
//export Header
export default Header;