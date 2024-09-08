import Image from 'next/image'
 
export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      width={65}
      height={65}
      alt="App logo"
    />
  )
}