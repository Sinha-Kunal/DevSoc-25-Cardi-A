import Image from "next/image"

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Mission
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            At CardiA, we're dedicated to providing affordable, life-saving health monitoring solutions that blend
            ancient wisdom with cutting-edge technology.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the minds behind CardiA
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our diverse team of experts in Ayurveda, AI, and healthcare are committed to revolutionizing preventive
              healthcare in India and beyond.
            </p>
          </div>

          <div className="mt-10">
            <ul className="md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: "Jatin Kumar",
                  role: "Co-Founder",
                  image: "/jatin.jpg",
                  bio: "Web and AI/ML Engineer",
                },
                {
                  name: "Dhanesh Baheti",
                  role: "Co-Founder",
                  image: "/dhanesh.jpg",
                  bio: "Hardware and UI/UX Engineer",
                },
                {
                  name: "Kunal Sinha",
                  role: "Co-Founder",
                  image: "/kunal.jpg",
                  bio: "Hardware and AI/ML Engineer",
                },
              ].map((person) => (
                <li key={person.name} className="py-10 px-6 bg-gray-50 text-center rounded-lg xl:px-10 xl:text-left">
                  <div className="space-y-6 xl:space-y-10">
                    <Image
                      className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                      src={person.image || "/placeholder.svg"}
                      alt=""
                      width={224}
                      height={224}
                    />
                    <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                      <div className="font-medium text-lg leading-6 space-y-1">
                        <h3 className="text-primary">{person.name}</h3>
                        <p className="text-primary">{person.role}</p>
                      </div>
                    </div>
                    <div className="text-lg">
                      <p className="text-gray-500">{person.bio}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Smart Band Image Section */}
      <div className="mt-20 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Experience CardiA</h2>
            <p className="mt-4 text-xl text-gray-500">
              Our innovative smart band combines ancient wisdom with modern technology.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <Image
              src="/placeholder.svg" // Replace with actual smart band image
              alt="CardiA Smart Band"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block text-white">Ready to join our mission?</span>
            <span className="block text-indigo-100">Get started with CardiA today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-indigo-50"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

