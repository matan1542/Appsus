
// import { eventBusService } from '../services/event-bus-service.js'
import {NavLinkToggle} from './NavLinkToggle.jsx'
const {Link, withRouter } = ReactRouterDOM

 class _NavHeader extends React.Component {
  state = {
    isShown: false
  };

  toggleIsShown = ()=>{
    this.setState({isShown: !this.state.isShown});
  }
  render() {
    return (
      <nav>
        <div className="nav-header">
          <div className="nav-logo animate__animated animate__bounce">
            <Link exact='true' to="/" className="decoration-none"> 
              <h2 className="nav-logo-title">AppSus</h2>
              </Link>
          </div>
         
           
           <div className="nav-toggle-container">
           <button className="nav-toggle" onClick={()=>{ this.toggleIsShown()  }}><i className="fas fa-th"></i></button>
           {this.state.isShown && <div className="nav-toggle-list animate__animated animate__fadeInRight">
           <NavLinkToggle/>
           </div>}
            </div>
        </div>
      </nav>
    );
  }
}


export const AppHeader = withRouter(_NavHeader)

