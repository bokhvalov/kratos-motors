import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { digitsOnly } from '../lib/form'

export function useHomeLeadForm() {
  const { t } = useTranslation()
  const serviceListId = useId()
  const serviceWrapRef = useRef(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [vin, setVin] = useState('')
  const [service, setService] = useState('')
  const [serviceOpen, setServiceOpen] = useState(false)
  const [homeFormSuccessOpen, setHomeFormSuccessOpen] = useState(false)
  const [homeFormErrors, setHomeFormErrors] = useState({})

  const servicesList = t('home.formServicesList', { returnObjects: true })
  const services = Array.isArray(servicesList) ? servicesList : []

  const formHeadingMuted = String(t('home.formHeadingMuted') ?? '').replace(/^A\s+/, 'A\u00A0')

  const closeService = useCallback(() => setServiceOpen(false), [])

  useEffect(() => {
    if (!serviceOpen) return
    const onPointerDown = (e) => {
      if (serviceWrapRef.current && !serviceWrapRef.current.contains(e.target)) {
        setServiceOpen(false)
      }
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setServiceOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [serviceOpen])

  const closeHomeFormSuccess = useCallback(() => {
    setHomeFormSuccessOpen(false)
    setName('')
    setPhone('')
    setVin('')
    setService('')
    setHomeFormErrors({})
  }, [])

  const clearFieldError = useCallback((key) => {
    setHomeFormErrors((err) => {
      if (!err[key]) return err
      const next = { ...err }
      delete next[key]
      return next
    })
  }, [])

  function handleFormSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!name.trim()) next.name = t('form.required')
    const phoneDigits = digitsOnly(phone)
    if (!phoneDigits) next.phone = t('form.required')
    else if (phoneDigits.length < 9) next.phone = t('form.invalidPhone')
    if (!service.trim()) next.service = t('form.required')
    setHomeFormErrors(next)
    if (Object.keys(next).length > 0) return
    setHomeFormSuccessOpen(true)
  }

  return {
    t,
    serviceListId,
    serviceWrapRef,
    name,
    setName,
    phone,
    setPhone,
    vin,
    setVin,
    service,
    setService,
    serviceOpen,
    setServiceOpen,
    closeService,
    services,
    formHeadingMuted,
    homeFormSuccessOpen,
    closeHomeFormSuccess,
    homeFormErrors,
    clearFieldError,
    handleFormSubmit,
  }
}
