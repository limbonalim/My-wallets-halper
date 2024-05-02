import { navigationItems } from '../../constants';
import NavigationItem from './NavigationItem';
import './Navigation.scss';

const Navigation = () => {
  return (
    <ul className="Navigation">
      {navigationItems.map((item, index) => (
        <NavigationItem item={item} index={index} />
      ))}
    </ul>
  );
};

export default Navigation;
