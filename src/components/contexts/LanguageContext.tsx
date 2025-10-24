import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react"

type LanguageContextType = {
  language: string,
  setLanguage: Dispatch<SetStateAction<string>>
  localLangCode: string,
  localLangCodeByGeocode: string
}

const LanguageContext = createContext<LanguageContextType>({} as LanguageContextType)

type Props = {
  children: ReactNode
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<string>("")
  const [localLangCode, setLocalLangCode] = useState<string>("")
  const [localLangCodeByGeocode, setLocalLangCodeByGeocode] = useState<string>("")

  const getCountryCode = async () => {
    const localConfig = {"countryCode": "EN"}
    const localConfigByGeocode = "EN"
    return { localConfig: localConfig?.countryCode , localConfigByGeocode: localConfigByGeocode }
  }

  const initLanguageProvider = async () => {
    const countryCodes = await getCountryCode()
    setLocalLangCode(countryCodes.localConfig)
    setLocalLangCodeByGeocode(countryCodes.localConfigByGeocode)
    let langLocal = localStorage.getItem("i18nextLng")
    setLanguage(langLocal ?? "en")
  }

  useEffect(() => {
    initLanguageProvider()
  }, [])

  useEffect(() => {
  }, [language, setLanguage])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        localLangCode,
        localLangCodeByGeocode
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
export const useLanguage = () => useContext(LanguageContext)