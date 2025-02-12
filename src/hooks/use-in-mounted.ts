import { useEffect ,useState} from 'react'

function useInMounted() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

export default useInMounted