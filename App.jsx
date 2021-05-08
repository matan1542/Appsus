const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { BookAdd } from './apps/book/pages/BookAdd.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { BookApp } from './apps/book/BookApp.jsx';
import { MailApp } from './apps/mail/MailApp.jsx';
import { NoteApp } from './apps/note/NoteApp.jsx';
import { Home } from './pages/Home.jsx';


export function App() {
  return (
    <Router>
      <header>
        <AppHeader />
      </header>
      <main>
        <Switch>
          <Route component={BookDetails} path='/book/read/:bookId' />
          <Route component={MailDetails} path='/mail/read/:mailId' />
          <Route component={BookAdd} path='/book/add-book' />
          <Route component={NoteApp} path='/note' />
          <Route component={MailApp} path='/mail' />
          <Route component={BookApp} path='/book' />
          <Route component={Home} path={'/'} />
        </Switch>
      </main>
    </Router>
  );
}
