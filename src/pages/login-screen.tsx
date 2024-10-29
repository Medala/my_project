import Navbar from "@components/Navbar"
import Layout from "@components/layouts/layout"
import LoginForm from "@components/login-form"
import OtpForm from "@components/otp-form"
import React, { useState } from "react"

const LoginScreen = () => {
  const [showLoginFrom, toggleLoginForm] = useState(true)
  const [showOtpForm, toggleOtpFomr] = useState(false)
  const [returnedOtpId, getOtpId] = useState<number | null>(null)
  const [phone, setPhone] = useState<string | null>(null)

  function showOtpAfterPhoneSumbmit() {
    toggleLoginForm(false)
    toggleOtpFomr(true)
  }

  function goBackToLoginForm() {
    toggleOtpFomr(false)
    toggleLoginForm(true)
  }

  function updateOtpId(otpId: number) {
    getOtpId(otpId)
  }

  function getPhone(phone: string) {
    setPhone(phone)
  }

  return (
    <>
      <Layout>
        {showLoginFrom && (
          <LoginForm
            passPhone={getPhone}
            showOtpAfterPhoneSumbmit={showOtpAfterPhoneSumbmit}
            goBackToLoginForm={goBackToLoginForm}
            passOtpId={updateOtpId}
          />
        )}

        {showOtpForm && returnedOtpId && phone && (
          <OtpForm
            phone={phone}
            goBackToLoginForm={goBackToLoginForm}
            otpId={returnedOtpId}
          />
        )}
      </Layout>
    </>
  )
}

export default LoginScreen
