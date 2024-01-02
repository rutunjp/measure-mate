import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="relative w-full  aspect-[9/16]">
        <Image fill={'contain'} src="/img.jpg" alt="Monkey Person"></Image>
      </div>
    </div>
  )
}
