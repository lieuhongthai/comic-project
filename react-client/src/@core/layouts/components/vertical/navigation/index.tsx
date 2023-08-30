// ** React Import
import { memo, useRef, useState } from 'react'

// ** MUI Import
import List from '@mui/material/List'
import Box, { BoxProps } from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import Drawer from './Drawer'
import VerticalNavItems from './VerticalNavItems'
import VerticalNavHeader from './VerticalNavHeader'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface Props {
  navWidth: number
  navVisible: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  children: LayoutProps['children']
  setNavVisible: (value: boolean) => void
  saveSettings: LayoutProps['saveSettings']
  navMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['content']
  navMenuBranding: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  verticalNavItems: LayoutProps['verticalLayoutProps']['navMenu']['navItems']
  navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps']
  menuUnlockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
  afterNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['afterContent']
  beforeNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['beforeContent']
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  '&.scrolled': {
    opacity: 1
  }
}))

const Navigation = (props: Props) => {
  // ** Props
  const { hidden, settings, afterNavMenuContent, beforeNavMenuContent, navMenuContent: userNavMenuContent } = props

  // ** States
  const [navHover, setNavHover] = useState<boolean>(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Hooks
  const theme = useTheme()
  const { mode } = settings

  // ** Var
  const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect()

        return { ...original, height: Math.floor(original.height) }
      }
    }
  }

  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
      container = hidden ? container.target : container
      if (shadowRef && container.scrollTop > 0) {
        // @ts-ignore
        if (!shadowRef.current.classList.contains('scrolled')) {
          // @ts-ignore
          shadowRef.current.classList.add('scrolled')
        }
      } else {
        // @ts-ignore
        shadowRef.current.classList.remove('scrolled')
      }
    }
  }

  const shadowBgColor = () => {
    if (mode === 'light') {
      return `linear-gradient(${theme.palette.customColors.lightBg} 5%,${hexToRGBA(theme.palette.customColors.lightBg, 0.85)} 30%,${hexToRGBA(
        theme.palette.customColors.lightBg,
        0.5
      )} 65%,${hexToRGBA(theme.palette.customColors.lightBg, 0.3)} 75%,transparent)`
    } else {
      return `linear-gradient(${theme.palette.customColors.darkBg} 5%,${hexToRGBA(theme.palette.customColors.darkBg, 0.85)} 30%,${hexToRGBA(
        theme.palette.customColors.darkBg,
        0.5
      )} 65%,${hexToRGBA(theme.palette.customColors.darkBg, 0.3)} 75%,transparent)`
    }
  }

  const ScrollWrapper = hidden ? Box : PerfectScrollbar

  console.log(12005, 'Re-render: Navigation', navHover, userNavMenuContent && userNavMenuContent(props))

  return (
    <Drawer {...props} navHover={navHover} setNavHover={setNavHover}>
      <VerticalNavHeader {...props} navHover={navHover} />
      {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed' ? beforeNavMenuContent(props) : null}
      {(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
        <StyledBoxForShadow ref={shadowRef} sx={{ background: shadowBgColor() }} />
      )}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* @ts-ignore */}
        <ScrollWrapper
          {...(hidden
            ? {
                onScroll: (container: any) => scrollMenu(container),
                sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
              }
            : {
                options: { wheelPropagation: false },
                onScrollY: (container: any) => scrollMenu(container),
                containerRef: (ref: any) => handleInfiniteScroll(ref)
              })}
        >
          {beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static' ? beforeNavMenuContent(props) : null}
          {userNavMenuContent ? (
            userNavMenuContent(props)
          ) : (
            <List className='nav-items' sx={{ pt: 0, '& > :first-child': { mt: '0' } }}>
              <VerticalNavItems navHover={navHover} {...props} />
            </List>
          )}
          {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static' ? afterNavMenuContent(props) : null}
        </ScrollWrapper>
      </Box>
      {afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed' ? afterNavMenuContent(props) : null}
    </Drawer>
  )
}

export default memo(Navigation, (pre, next) => {
  console.log(
    12005,
    { pre, next },
    !(pre.hidden !== next.hidden || pre.navVisible !== next.navVisible || pre.toggleNavVisibility !== next.toggleNavVisibility)
  )

  return !(
    pre.hidden !== next.hidden ||
    pre.navVisible !== next.navVisible ||
    pre.toggleNavVisibility !== next.toggleNavVisibility ||
    pre.settings.navCollapsed !== next.settings.navCollapsed
  )
})
