import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
export function LocalLink({ to, ...props }) {
  const { path } = useLanguage();
  return <Link to={path(to)} {...props} />;
}
export function LocalNavLink({ to, ...props }) {
  const { path } = useLanguage();
  return <NavLink to={path(to)} {...props} />;
}
