import { hasPer } from '../../routes/permission'
import authStore from '../../store/modules/auth'

const WithAuth = ({ children, allowRoles = null }) => {
  const { user: authUser } = authStore.useSelector()

  if (hasPer(authUser?.roles, allowRoles)) {
    return children
  }

  return null
}

export default WithAuth
