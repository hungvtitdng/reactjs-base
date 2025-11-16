import { hasPer } from '../../routes/permission'
import useSelector from '../../store/modules/auth/useSelector'

const WithAuth = ({ children, allowRoles = null }) => {
  const { user: authUser } = useSelector()

  if (hasPer(authUser?.roles, allowRoles)) {
    return children
  }

  return null
}

export default WithAuth
