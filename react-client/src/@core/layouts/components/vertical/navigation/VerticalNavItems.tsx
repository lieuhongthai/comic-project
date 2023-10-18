// ** Type Imports
import { NavLink, NavGroup, LayoutProps, NavSectionTitle } from 'src/@core/layouts/types';

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink';
import VerticalNavGroup from './VerticalNavGroup';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';
import { memo, useMemo, useState } from 'react';

interface Props {
  parent?: NavGroup;
  navHover?: boolean;
  navVisible?: boolean;
  isSubToSub?: NavGroup;
  navigationBorderWidth: number;
  settings: LayoutProps['settings'];
  saveSettings: LayoutProps['saveSettings'];
  verticalNavItems?: LayoutProps['verticalLayoutProps']['navMenu']['navItems'];
}

const resolveNavItemComponent = (item: NavGroup | NavLink | NavSectionTitle) => {
  if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle;
  if ((item as NavGroup).children) return VerticalNavGroup;

  return VerticalNavLink;
};

const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props;

  // ** State
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

  const RenderMenuItems = useMemo(
    () =>
      verticalNavItems?.map((item: NavGroup | NavLink | NavSectionTitle, index: number) => {
        const TagName: any = resolveNavItemComponent(item);

        return <TagName {...props} {...{ groupActive, setGroupActive, currentActiveGroup, setCurrentActiveGroup }} key={index} item={item} />;
      }),
    [verticalNavItems, props, groupActive, currentActiveGroup]
  );

  return <>{RenderMenuItems}</>;
};

export default memo(VerticalNavItems, (pre, next) => !(pre.navHover !== next.navHover || pre.navVisible !== next.navVisible));

// export default VerticalNavItems
