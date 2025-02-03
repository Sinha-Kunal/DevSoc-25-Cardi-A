import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Activity, Brain, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Smart Health Monitoring</span>{" "}
                  <span className="block text-primary xl:inline">with Ayurvedic Wisdom</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  CardiA blends ancient Ayurvedic pulse analysis with cutting-edge AI technology for comprehensive,
                  affordable health monitoring.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                  <Link
                      href="/features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-indigo-500 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/features"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/placeholder.svg"
            alt="CardiA Smart Band"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Your path to holistic health
            </p>
          </div>

          <div className="mt-10">
            <div className="flex flex-col md:flex-row justify-around items-center space-y-10 md:space-y-0 md:space-x-10">
              {[
                { title: "Wear", description: "Put on the CardiA smart band" },
                { title: "Monitor", description: "Let CardiA track your vitals 24/7" },
                { title: "Analyze", description: "AI interprets data with Ayurvedic wisdom" },
                { title: "Act", description: "Receive personalized health insights" },
              ].map((step, index) => (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to monitor your health
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              CardiA combines Ayurvedic wisdom with modern technology to provide comprehensive health insights.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Ayurvedic Pulse Analysis",
                  description:
                    "Utilizes traditional Ayurvedic techniques to analyze your pulse and provide holistic health insights.",
                },
                {
                  icon: Activity,
                  title: "AI-Driven Health Monitoring",
                  description:
                    "Advanced AI algorithms continuously analyze your health data to provide personalized recommendations.",
                },
                {
                  icon: Brain,
                  title: "Stress Management",
                  description:
                    "Track and manage your stress levels with real-time biofeedback and guided relaxation techniques.",
                },
                {
                  icon: Bell,
                  title: "Emergency Response",
                  description: "Instant SOS alerts and emergency response features for peace of mind.",
                },
              ].map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Suhani",
                role: "Yoga Instructor",
                image: "/placeholder.svg",
                quote:
                  "CardiA has completely changed how I approach my health. The Ayurvedic insights combined with modern tech are incredibly valuable.",
              },
              {
                name: "Aditya",
                role: "Software Engineer",
                image: "/placeholder.svg",
                quote:
                  "The emergency response feature of CardiA gave me peace of mind when caring for my elderly parents. It's a lifesaver!",
              },
              {
                name: "Priya",
                role: "Fitness Enthusiast",
                image: "/placeholder.svg",
                quote:
                  "I love how CardiA helps me understand my body better. It's like having a personal health coach on my wrist 24/7.",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col justify-between">
                <CardContent className="pt-4">
                  <p className="text-lg text-gray-600">"{testimonial.quote}"</p>
                </CardContent>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {[
              {
                question: "What is CardiA?",
                answer:
                  "CardiA is a smart health monitoring device that combines Ayurvedic pulse analysis with AI-driven technology to provide comprehensive health insights and personalized recommendations.",
              },
              {
                question: "How does CardiA work?",
                answer:
                  "CardiA uses advanced sensors to analyze your pulse and other vital signs. Our AI algorithms then interpret this data, combining it with Ayurvedic principles to provide holistic health insights.",
              },
              {
                question: "Is CardiA suitable for everyone?",
                answer:
                  "CardiA is designed for adults of all ages who are interested in proactive health monitoring. However, it's always best to consult with your healthcare provider before starting any new health regimen.",
              },
              {
                question: "How accurate is CardiA's health monitoring?",
                answer:
                  "CardiA's technology has been rigorously tested and refined. While it provides valuable insights, it's not a substitute for professional medical advice or diagnosis.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to take control of your health?</span>
            <span className="block">Start using CardiA today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Join thousands of users who have already transformed their approach to health monitoring with CardiA.
          </p>
          <Button className="mt-8 w-full sm:w-auto" size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

