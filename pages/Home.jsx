const { NavLink } = ReactRouterDOM;
export function Home() {
  return (
    <React.Fragment>
      <div className="home-page-container">
        <div className="hero">
          <h2 className="hero-header">Welcome To <span className='hero-title'>AppSus</span></h2>
        </div>
        <div className="links-container">
          <h2 className="my-apps">Our Apps</h2>
          <ul className="anchor-home-list clean-list">
            <li>
              <NavLink to="/note">
                <img src="assets/img/notes.png" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/mail">
                <img src="assets/img/mails.jpg" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/book">
                <img src="assets/img/books.jpg" />
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="about-us">
          <h2 className="abous-us-title">About Us</h2>
          <div className="about-us-inner-container">
            <div className="about-us-inner-container-img">
              <div className="matans-container">
                <h2 className="devs-about-title">Matan Lasry</h2>
                <img src="assets/img/matanImg.jfif" />
                <div className="social-media">
                  <ul className="social-media-list clean-list">
                    <li><div className='link-media link-media-github'>
                      <a href="https://github.com/matan1542" target="_blank"><i className="fab fa-github-square"></i></a>
                    </div></li>
                    <li>
                      <div className='link-media link-media-linkdin'>
                        <a className="decoration-none" href="https://www.linkedin.com/in/matan-lasry-608732207/" target="_blank"><i className="fab fa-linkedin"></i></a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="nadavs-container">
                <h2 className="devs-about-title">Nadav Nassi</h2>
                <img src="assets/img/nadavImg.jpeg" />
                <div className="social-media">
                  <ul className="social-media-list clean-list">
                    <li><div className='link-media link-media-github'>
                      <a href="https://github.com/NadavNassi" target="_blank"><i className="fab fa-github-square"></i></a>
                    </div></li>
                    <li>
                      <div className='link-media link-media-linkdin'>
                        <a className="decoration-none" href="https://www.linkedin.com/in/nadav-nassi-b5782b182/" target="_blank"><i className="fab fa-linkedin"></i></a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="about-us-vision">
              <p>Our vision is to be the gratest mobile/web developers we can be. Focused on constant innovation as our key for achieving the ultimate goal of success and emerge as globally recognized developers by providing the superior quality services and solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
