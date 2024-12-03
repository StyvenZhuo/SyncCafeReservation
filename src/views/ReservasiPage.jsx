import React from 'react'
import AuthorizeView from '../components/AuthorizeView'
import Reservasi from '../components/Reservasi'

function ReservasiPage() {
  return (

    <AuthorizeView>
        <Reservasi/>
    </AuthorizeView>
  )
}

export default ReservasiPage
