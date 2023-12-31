import React from 'react'
import {FormattedMessage} from 'react-intl'

export function Bar() {
  return (
    <p>
      <FormattedMessage
        id="foo"
        defaultMessage="Foo"
        description={{text: 'Bar', maxCharacterCount: 2}}
      />
    </p>
  )
}
