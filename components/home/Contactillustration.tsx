import Image from "next/image"

const ContactIllustration = () => {
  return (
    <div>
      <div
        className="relative w-full h-[200px] sm:h-[260px] md:h-[320px] overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        <Image
          src="/contact-banner.png"
          alt="Contact Illustration"
          fill
          priority
          className="object-contain object-center"
        />
      </div>
    </div>
  )
}

export default ContactIllustration