const { NavLink } = ReactRouterDOM;
export function NavLinkToggle() {
  return (
    <ul className="anchor-header-list clean-list">
      <li>
        <NavLink exact to="/" >
          <i className="fas fa-home"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="/note">
          <i className="far fa-sticky-note"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="/mail">
          <i className="fas fa-at"></i>
        </NavLink>
      </li>
      <li>
        <NavLink to="/book">
          <i className="fas fa-book"></i>
        </NavLink>
      </li>
    </ul>
  );
}
