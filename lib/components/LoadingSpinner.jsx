import React from 'react'
import classnames from 'classnames'

import PoolLogo from 'assets/images/pooltogether-white-logo.svg'

export const LoadingSpinner = ({ ready }) => {
  return <div
    className={classnames(
      'loading-indicator animated anim-fastest absolute z-50',
      {
        'fadeOut': ready
      }
    )}
  >
    <img
      alt={'Pool Together Logo'}
      src={PoolLogo}
      width='200'
      className='mx-auto'
    />
  </div>
}