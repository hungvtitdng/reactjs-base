import React, { memo } from 'react'
import { Layout, Dropdown } from 'antd'
import { useTranslation } from 'react-i18next'

import MdiIcon from '../icon/MdiIcon'
import Flags from './Flags'
import history from '../../utils/history'
import useAuthRequest from '../../requests/useAuthRequest'
import { hasPer } from '../../routes/permission'
import Avatar from '../../pages/wrap/Avatar'
import { COLORS } from '../../config/constants'
import useSelector from '../../store/modules/auth/useSelector'

const MenuIcon = ({ isCollapsed, onCollapse }) => {
  const name = isCollapsed ? 'mdiMenu' : 'mdiMenuOpen'

  return (
    <MdiIcon
      color={COLORS.WHITE}
      name={name}
      size={1}
      className="ml-2 pointer"
      onClick={onCollapse}
    />
  )
}

const HeaderMain = ({ isCollapsed, onCollapse }) => {
  const { t } = useTranslation()
  const { logoutRequest } = useAuthRequest()
  const { user: authUser } = useSelector()

  const onLogout = () => {
    logoutRequest()
  }

  const onClickMenuItem = (path) => {
    history.push(path)
  }

  const menuItems = [
    {
      key: '1',
      className: 'pt-3 pb-3',
      label: (
        <div className="flex items-center" onClick={() => onClickMenuItem('/profiles')}>
          <MdiIcon name="mdiAccountOutline" />
          <span className="pl-4">{t('profile')}</span>
        </div>
      ),
    },
    {
      key: '2',
      className: 'pt-3 pb-3',
      label: (
        <div className="flex items-center" onClick={() => onClickMenuItem('/change-password')}>
          <MdiIcon name="mdiShieldKeyOutline" />
          <span className="pl-4">{t('change-password')}</span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: '3',
      className: 'pt-3 pb-3',
      label: (
        <div className="flex items-center" onClick={onLogout}>
          <MdiIcon name="mdiLogout" color={COLORS.RED_LIGHT} />
          <span className="pl-4">{t('logout')}</span>
        </div>
      ),
    },
  ]

  const items = menuItems.filter((item) => {
    if (!item.permission) return true

    return hasPer(authUser?.roles, item.permission)
  })

  return (
    <Layout.Header>
      <div className="flex items-center">
        <MenuIcon isCollapsed={isCollapsed} onCollapse={onCollapse} />
      </div>
      <div className="flex justify-end items-center mr-4">
        <Dropdown placement="bottomRight" menu={{ items }} trigger={['click']}>
          <div className="flex items-center pointer relative pl-3 h-full">
            <span className="fz-4 pr-2 md-hide">{authUser?.last_name} {authUser?.first_name}</span>
            <Avatar path={authUser?.avatar?.upload_path} />
          </div>
        </Dropdown>
        <Flags />
      </div>
    </Layout.Header>
  )
}

export default memo(HeaderMain)

// const mapStateToProps = createStructuredSelector({
//   authUser: authSelectors.user(),
// })

// export default connect(
//   mapStateToProps,
// )(HeaderMain)
