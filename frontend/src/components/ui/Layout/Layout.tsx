import React, { PropsWithChildren } from 'react';
import Toolbar from '../../Toolbar/Toolbar.tsx';
import './Layout.scss';
import Navigation from '../../Navigation/Navigation.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="Layout">
      <header className="Layout__header">
        <Toolbar />
      </header>
      <div className="Layout__flex">
        <div className="Layout__navigation">
          <Navigation />
        </div>
        <main className="Layout__main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
